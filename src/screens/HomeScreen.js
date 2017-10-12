// Third Party Imports
import React, { Component } from 'react';
import {
    ScrollView,
    Animated,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from '@expo/vector-icons';

// Relative Imports
import { addToCart, removeFromCart } from '../actions/cartActions';
import { selectDeliveryType } from '../actions/productActions';
import { toggleSearch } from '../actions/uiActions';
import ProductList from '../components/ProductList';
import HomeHeader from '../containers/HomeHeader';
import { getProductsByDeliveryType } from '../selectors/productSelectors';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import { emY } from '../utils/em';

const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };
const FILTERS = [{ name: 'For You', id: '1' }, { name: 'Food', id: '2' }];
const OPACITY_DURATION = 300;

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: null,
        header: <HomeHeader navigation={navigation} />,
    });

    state = {
        filter: FILTERS[0],
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        searchRendered: false
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.searchVisible !== nextProps.searchVisible) {
            this.animate(nextProps.searchVisible);
        }
        if (this.props.header.toggleState !== nextProps.header.toggleState) {
            if (nextProps.header.isMenuOpen) {
                this.props.navigation.navigate('DrawerOpen');
            } else {
                this.props.navigation.navigate('DrawerClose');
            }
        }
    }

    onPressFilter(filter) {
        console.log(filter);
    }

    callAddToCart = product => {
        this.props.addToCart(product);
    };

    callRemoveFromCart = product => {
        this.props.removeFromCart(product);
    };

    goToCheckout = () => {
        this.props.navigation.navigate('checkout');
    };

    animate = searchVisible => {
        if (this.state.searchRendered) {
            this.afterSetState(searchVisible);
        } else {
            this.setState({ searchRendered: searchVisible }, () =>
                this.afterSetState(searchVisible)
            );
        }
    };

    afterSetState = searchVisible => {
        Animated.parallel([
            Animated.timing(this.state.translateY, {
                toValue: searchVisible ? -100 : 0,
                duration: OPACITY_DURATION
            }),
            Animated.timing(this.state.opacity, {
                toValue: searchVisible ? 0 : 1,
                duration: OPACITY_DURATION
            })
        ]).start(() => {
            this.setState({
                searchRendered: searchVisible
            });
        });
    };

    handleAddressFocus = () => {
        this.props.toggleSearch();
    };

    renderFilter = filter => {
        const selectedFilter = this.props.deliveryType === filter.id;
        const filterButtonSelected = selectedFilter ? styles.filterButtonSelected : null;
        const filterButtonTextSelected = selectedFilter ? styles.filterButtonTextSelected : null;
        const onPress = () => this.props.selectFilter(filter.id);
        return (
            <TouchableOpacity
                key={filter.id}
                style={[styles.filterButton, filterButtonSelected]}
                onPress={onPress}
            >
                <Text style={[styles.filterButtonText, filterButtonTextSelected]}>
                    {filter.name}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        const { cart, products } = this.props;
        const { homeSearch } = this.props;
        const searchText = homeSearch.searchText.toLowerCase();
        const filteredProducts = (searchText === '') ?
            products : 
            products.filter(product => product.title.toLowerCase().indexOf(searchText) > -1);
        return (
            <View style={styles.container}>
                {cart.totalQuantity > 0 ? (
                    <TouchableOpacity style={styles.checkout} onPress={this.goToCheckout}>
                        <Text style={styles.imageTitle}>Go to Checkout</Text>
                        <View style={styles.checkoutIconContainer}>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                color="#fff"
                                size={50}
                                style={styles.checkoutIcon}
                            />
                        </View>
                    </TouchableOpacity>
                ) : (
                    <Image source={SOURCE} style={styles.image}>
                        <View style={[StyleSheet.absoluteFill, styles.imageTint]} />
                        <View>
                            <Text style={styles.imageTitle}>Recommended</Text>
                            <Text style={styles.imageMeta}>215 items</Text>
                        </View>
                    </Image>
                )}
                <ScrollView
                    horizontal
                    style={styles.filters}
                    contentContainerStyle={styles.filtersContent}
                >
                    {FILTERS.map(this.renderFilter)}
                </ScrollView>
                <ProductList
                    cart={cart}
                    products={filteredProducts}
                    callAddToCart={this.callAddToCart}
                    callRemoveFromCart={this.callRemoveFromCart}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        height: Dimensions.window.height / 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageTint: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    imageTitle: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1.875),
        textAlign: 'center'
    },
    imageMeta: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: emY(1),
        textAlign: 'center'
    },
    checkout: {
        height: Dimensions.window.height / 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.GREEN_500
    },
    checkoutIconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 50,
        justifyContent: 'center'
    },
    checkoutIcon: {
        backgroundColor: 'transparent'
    },
    filters: {
        ...Platform.select({
            ios: {
                height: emY(6.25)
            },
            android: {
                height: emY(6.25) + 30
            }
        })
    },
    filtersContent: {
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterButton: {
        minWidth: 120,
        height: emY(2.5),
        borderColor: Color.GREY_400,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: 50,
        paddingVertical: emY(0.75),
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filterButtonSelected: {
        borderColor: Color.GREY_300,
        backgroundColor: Color.GREY_300
    },
    filterButtonText: {
        color: Color.GREY_400,
        fontSize: emY(1.125)
    },
    filterButtonTextSelected: {
        color: '#fff'
    }
});

const mapStateToProps = state => ({
    cart: state.cart,
    products: getProductsByDeliveryType(state),
    deliveryType: state.product.deliveryType,
    searchVisible: state.ui.searchVisible,
    header: state.header,
    homeSearch: state.homeSearch,
});

const mapDispatchToProps = dispatch => ({
    selectFilter: filter => dispatch(selectDeliveryType(filter)),
    addToCart: product => dispatch(addToCart(product)),
    removeFromCart: product => dispatch(removeFromCart(product)),
    toggleSearch: () => dispatch(toggleSearch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
