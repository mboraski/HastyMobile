// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import map from 'lodash.map';

// Relative Imports
import ProductDetail from './ProductDetail';
import { emY } from '../utils/em';

class ProductList extends Component {
    renderProducts() {
        const { products, callAddToCart, productImages } = this.props;
        return map(products, product => {
            console.log('ProductList; productImages: ', productImages);
            console.log('ProductList; product: ', product);
            const image = productImages[product.id] || '';
            const quantityTaken = product.quantityTaken;
            const quantityAvailable = product.quantityAvailable;
            const consumed = quantityTaken >= quantityAvailable;
            const inCart = quantityTaken > 0;
            return (
                <ProductDetail
                    key={product.id}
                    consumed={consumed}
                    quantityAvailable={quantityAvailable}
                    quantityTaken={quantityTaken}
                    product={product}
                    inCart={inCart}
                    image={image}
                    onPress={callAddToCart}
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
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: emY(6), // to put the last products over checkout button
        margin: 5
    }
});

export default ProductList;
