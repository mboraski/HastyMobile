// Third Party Imports
import React, { Component } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import map from 'lodash.map';

// Relative Imports
import RequestPopup from '../components/RequestPopup';
import ProductList from '../components/ProductList';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import Color from '../constants/Color';
import Marketing from '../constants/Marketing';
import { addToCart } from '../actions/cartActions';
import {
    selectCategory,
    fetchProducts,
    editSearchText
} from '../actions/productActions';
import { dropdownAlert } from '../actions/uiActions';
import {
    sendProductRequest,
    openRequestPopup,
    closeRequestPopup
} from '../actions/feedbackActions';

import {
    getCartTotalQuantity,
    getCartInstantProducts
} from '../selectors/cartSelectors';
import {
    getCategory,
    getItemCountUp,
    getProductsPending,
    getProductsByCategory,
    getCategories,
    getProductImages,
    getHeader,
    getSearchText
} from '../selectors/productSelectors';
import {
    getRequestPopupVisible,
    getRequestProduct
} from '../selectors/feedbackSelectors';

import { emY } from '../utils/em';

import ProductsHeaderContainer from '../containers/ProductsHeaderContainer';
import { logScreenView, logCategoryClick } from '../actions/analyticsActions';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

class ProductsScreen extends Component {
    componentDidMount() {
        this.props.logScreenView('products', Date.now());
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.itemCountUp && nextProps.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        }
    }

    handleAddToCart = product => {
        this.props.addToCart(product);
    };

    handleRequestProduct = product => {
        this.props.openRequestPopup(product);
    };

    formatCategory = category => (category ? category.toUpperCase() : '');

    goToCheckout = () => {
        this.props.navigation.navigate('checkout');
    };

    closeRequestPopup = agree => {
        const { product } = this.props;
        const timestamp = Date.now();
        if (agree) {
            this.props.sendProductRequest(product.id, timestamp);
            // If boosted, add to cart
            // this.props.addToCart(product);
            this.props.dropdownAlert(true, 'Thanks for the feedback!');
        }
        this.props.closeRequestPopup();
    };

    renderCategories = () => {
        const selectedCategory = this.props.category;
        return map(this.props.categories, (category, i) => {
            const selectedFilter =
                category.toLowerCase() === selectedCategory.toLowerCase();
            const filterButtonSelected = selectedFilter
                ? styles.filterButtonSelected
                : null;
            const filterButtonTextSelected = selectedFilter
                ? styles.filterButtonTextSelected
                : null;
            const onPress = () => {
                this.props.selectFilter(category);
                this.props.logCategoryClick(category, Date.now());
            };

            return (
                <TouchableOpacity
                    key={i}
                    style={[styles.filterButton, filterButtonSelected]}
                    onPress={onPress}
                >
                    <Text
                        style={[
                            styles.filterButtonText,
                            filterButtonTextSelected
                        ]}
                    >
                        {category}
                    </Text>
                </TouchableOpacity>
            );
        });
    };

    render() {
        const {
            cartQuantity,
            productPending,
            productsShown,
            productImages,
            requestPopupVisible,
            product,
            searchText
        } = this.props;
        const requestMessage = Marketing.requestProductMessage;
        const cartFill =
            cartQuantity > 0 ? { backgroundColor: Color.GREEN_500 } : {};
        return (
            <View style={styles.container}>
                {productPending ? (
                    <View style={styles.overlay}>
                        <ActivityIndicator
                            animating={productPending}
                            size="large"
                            color="#f5a623"
                        />
                    </View>
                ) : (
                    <View style={styles.productListContainer}>
                        <View style={styles.ScrollViewHeightWrapper}>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator
                                contentContainerStyle={styles.filtersContent}
                            >
                                {this.renderCategories()}
                            </ScrollView>
                        </View>
                        <TextInput
                            style={styles.searchBar}
                            onChangeText={this.props.editSearchText}
                            value={searchText}
                            placeholder="Type to search this category"
                            clearButtonMode="always"
                        />
                        {productsShown ? (
                            <ProductList
                                products={productsShown}
                                productImages={productImages}
                                handleAddToCart={this.handleAddToCart}
                                handleRequestProduct={this.handleRequestProduct}
                                searchText={searchText}
                            />
                        ) : (
                            <View style={styles.container}>
                                <Text>
                                    {'Set location on map screen for products'}
                                </Text>
                            </View>
                        )}
                        <View style={styles.buttonContainer}>
                            <Button
                                large
                                title="Go to Checkout"
                                onPress={this.goToCheckout}
                                buttonStyle={[styles.button, cartFill]}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                )}
                <RequestPopup
                    openModal={requestPopupVisible}
                    closeModal={this.closeRequestPopup}
                    title={'Request we stock this product for you'}
                    message={requestMessage}
                    confirmText={'Request Product'}
                    productImages={productImages}
                    product={product}
                    showIcon
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        maxWidth: WINDOW_WIDTH,
        maxHeight: WINDOW_HEIGHT
    },
    productListContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: emY(1.25),
        left: 0,
        right: 0
    },
    button: {
        backgroundColor: Color.DEFAULT,
        borderRadius: 5,
        justifyContent: 'center',
        height: emY(3.9),
        padding: 0
    },
    buttonText: {
        color: Color.WHITE,
        fontSize: emY(1.5),
        textAlign: 'center'
    },
    ScrollViewHeightWrapper: {
        maxHeight: emY(2.5)
    },
    filtersContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 5
    },
    filterButton: {
        minWidth: 120,
        height: emY(2),
        borderColor: Color.DEFAULT,
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    },
    filterButtonSelected: {
        borderColor: Color.DEFAULT,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        backgroundColor: Color.WHITE
    },
    filterButtonText: {
        color: Color.DEFAULT,
        fontSize: emY(1.125),
        textAlign: 'center'
    },
    filterButtonTextSelected: {
        color: Color.GREY_600
    },
    overlay: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        justifyContent: 'center',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    searchBar: {
        width: WINDOW_WIDTH,
        height: 50,
        paddingHorizontal: 20
    }
});

ProductsScreen.navigationOptions = {
    header: <ProductsHeaderContainer />
};

const mapStateToProps = state => ({
    cart: getCartInstantProducts(state),
    cartQuantity: getCartTotalQuantity(state),
    itemCountUp: getItemCountUp(state),
    productPending: getProductsPending(state),
    productsShown: getProductsByCategory(state),
    category: getCategory(state),
    categories: getCategories(state),
    productImages: getProductImages(state),
    header: getHeader(state),
    requestPopupVisible: getRequestPopupVisible(state),
    product: getRequestProduct(state),
    searchText: getSearchText(state)
});

// TODO: Change formatting of mapDispatchToProps?
const mapDispatchToProps = {
    selectFilter: selectCategory,
    addToCart,
    sendProductRequest,
    dropdownAlert,
    openRequestPopup,
    closeRequestPopup,
    fetchProducts,
    editSearchText,
    logScreenView,
    logCategoryClick
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsScreen);
