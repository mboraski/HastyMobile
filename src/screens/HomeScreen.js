// Third Party Imports
import React, { Component } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MaterialIcons } from '@expo/vector-icons';
// import firebase from '../firebase';

// Relative Imports
import ProductList from '../components/ProductList';
import MenuButton from '../components/MenuButton';
import CartButton from '../components/CartButton';
import SearchBar from '../components/SearchBar';
import Text from '../components/Text';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import Style from '../constants/Style';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { selectCategory, fetchProductsSuccess } from '../actions/productActions';
import {
    getCategories,
    getProductsByCategory,
    getNumberOfProducts,
    getCategory
} from '../selectors/productSelectors';
import { emY } from '../utils/em';
import AuthScreenBackground from '../assets/AuthScreenBackground.jpg';
import MapHeader from '../containers/MapHeader';


class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Hasty',
        headerLeft: <MenuButton />,
        headerTitle: <SearchBar />,
        headerRight: <CartButton />,
        headerStyle: Style.headerLarge,
        headerTitleStyle: Style.headerTitle
    };

    componentWillReceiveProps(nextProps) {
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

    formatCategory = (category) =>
        (category ? category.toUpperCase() : '')

    goToCheckout = () => {
        this.props.navigation.navigate('checkout');
    };

    renderCategories = () => {
        const selectedCategory = this.props.category;
        return this.props.categories.map((category, i) => {
            const selectedFilter = category === selectedCategory;
            const filterButtonSelected = selectedFilter ? styles.filterButtonSelected : null;
            const filterButtonTextSelected = selectedFilter ?
                styles.filterButtonTextSelected : null;
            const onPress = () => this.props.selectFilter(category);
            return (
                <TouchableOpacity
                    key={i}
                    style={[styles.filterButton, filterButtonSelected]}
                    onPress={onPress}
                >
                    <Text style={[styles.filterButtonText, filterButtonTextSelected]}>
                        {category}
                    </Text>
                </TouchableOpacity>
            );
        });
    };

    render() {
        const {
            cart,
            products,
            productPending,
            category,
            numberOfProducts
        } = this.props;
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
                    <ImageBackground source={AuthScreenBackground} style={styles.image}>
                        <View style={[StyleSheet.absoluteFill, styles.imageTint]} />
                        <View>
                            <Text style={styles.imageTitle}>{this.formatCategory(category)}</Text>
                            <Text style={styles.imageMeta}>
                                {numberOfProducts} items
                            </Text>
                        </View>
                    </ImageBackground>
                )}
                {productPending ? (
                    <ActivityIndicator
                        size="large"
                        style={StyleSheet.absoluteFill}
                    />
                ) :
                    <View>
                        <ScrollView
                            horizontal
                            style={styles.filters}
                            contentContainerStyle={styles.filtersContent}
                        >
                            {this.renderCategories()}
                        </ScrollView>
                        <ProductList
                            cart={cart}
                            products={products}
                            callAddToCart={this.callAddToCart}
                            callRemoveFromCart={this.callRemoveFromCart}
                        />
                    </View>
                }
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

HomeScreen.navigationOptions = {
    header: <MapHeader />
};

// HomeScreen.navigationOptions = ({ navigation }) => ({
//     title: 'Hasty Logo',
//     headerLeft: <MenuButton />,
//     headerTitle: <SearchBar />,
//     headerRight: <CartButton navigation={navigation} />,
//     headerStyle: Style.headerLarge,
//     headerTitleStyle: Style.headerTitle
// });

const mapStateToProps = state => ({
    cart: state.cart,
    productPending: state.product.pending,
    products: getProductsByCategory(state),
    category: getCategory(state),
    categories: getCategories(state),
    numberOfProducts: getNumberOfProducts(state),
    header: state.header
});

const mapDispatchToProps = dispatch => ({
    selectFilter: category => dispatch(selectCategory(category)),
    addToCart: product => dispatch(addToCart(product)),
    removeFromCart: product => dispatch(removeFromCart(product)),
    fetchProductsSuccess: products => dispatch(fetchProductsSuccess(products))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
