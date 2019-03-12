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
import ProductList from '../components/ProductList';
import Text from '../components/Text';

import Color from '../constants/Color';
import { addToCart } from '../actions/cartActions';
import { selectCategory } from '../actions/productActions';
import { dropdownAlert } from '../actions/uiActions';

import {
    getCartTotalQuantity,
    getCartInstantProducts
} from '../selectors/cartSelectors';
import {
    getCategory,
    getItemCountUp,
    getItemCountDown,
    getProductsPending,
    getProductsByCategory,
    getCategories,
    getProductImages,
    getHeader
} from '../selectors/productSelectors';

import { emY } from '../utils/em';

import ProductsHeaderContainer from '../containers/ProductsHeaderContainer';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

class ProductsScreen extends Component {
    componentWillReceiveProps(nextProps) {
        if (!this.props.itemCountUp && nextProps.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        } else if (!this.props.itemCountDown && nextProps.itemCountDown) {
            this.props.dropdownAlert(
                true,
                'Some products are no longer available'
            );
        }
    }

    callAddToCart = product => {
        this.props.addToCart(product);
    };

    formatCategory = category => (category ? category.toUpperCase() : '');

    goToCheckout = () => {
        this.props.navigation.navigate('checkout');
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
            const onPress = () => this.props.selectFilter(category);
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
            productImages
        } = this.props;
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
                    <View style={styles.container}>
                        <ScrollView
                            horizontal
                            contentContainerStyle={styles.filtersContent}
                        >
                            {this.renderCategories()}
                        </ScrollView>
                        {productsShown ? (
                            <ProductList
                                products={productsShown}
                                productImages={productImages}
                                callAddToCart={this.callAddToCart}
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
    filtersContent: {
        maxHeight: emY(2.5),
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
    }
});

ProductsScreen.navigationOptions = {
    header: <ProductsHeaderContainer />
};

const mapStateToProps = state => ({
    cart: getCartInstantProducts(state),
    cartQuantity: getCartTotalQuantity(state),
    itemCountUp: getItemCountUp(state),
    itemCountDown: getItemCountDown(state),
    productPending: getProductsPending(state),
    productsShown: getProductsByCategory(state),
    category: getCategory(state),
    categories: getCategories(state),
    productImages: getProductImages(state),
    header: getHeader(state)
});

// TODO: Change formatting of mapDispatchToProps?
const mapDispatchToProps = dispatch => ({
    selectFilter: category => dispatch(selectCategory(category)),
    addToCart: productInfo => dispatch(addToCart(productInfo)),
    dropdownAlert: (visible, message) =>
        dispatch(dropdownAlert(visible, message))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductsScreen);
