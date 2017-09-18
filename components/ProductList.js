// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

// Relative Imports
import ProductDetail from './ProductDetail';
import { emY } from '../utils/em';

const SCREEN_WIDTH = Dimensions.get('window').width;

const PRODUCTS = [
    {
        title: 'Redbull',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$3.49',
        deliveryType: 1,
        productCode: 1
    },
    {
        title: 'Monster',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$3.49',
        deliveryType: 2,
        productCode: 2
    },
    {
        title: 'Gatorade',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$2.49',
        deliveryType: 1,
        productCode: 3
    },
    {
        title: 'Water',
        thumbnail_image: 'https://facebook.github.io/react/img/logo_og.png',
        price: '$0.99',
        deliveryType: 2,
        productCode: 4
    }
];

class ProductList extends Component {
    renderProducts() {
        return PRODUCTS.map(product => {
            const onPress = () => this.props.callAddToCart(product);
            const type = this.props.cart[product.deliveryType];
            const added =
                type && type[product.productCode] && type[product.productCode].quantity > 0;
            return (
                <ProductDetail
                    key={product.title}
                    product={product}
                    onPress={onPress}
                    added={added}
                    style={styles.product}
                />
            );
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {this.renderProducts()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 20,
        paddingRight: 5
    },
    product: {
        width: SCREEN_WIDTH / 2 - 21,
        marginRight: 8,
        marginBottom: emY(0.625)
    }
});

export default ProductList;
