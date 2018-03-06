// Third Party Imports
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';

// Relative Imports
import ProductDetail from './ProductDetail';
import Dimensions from '../constants/Dimensions';
import { emY } from '../utils/em';

class ProductList extends Component {
    renderProducts() {
        const { products, callAddToCart } = this.props;
        return _.map(products, (product) => {
            const taken = product.quantityTaken;
            const consumed = taken >= product.quantityAvailable;
            return (
                <ProductDetail
                    key={product.productName}
                    consumed={consumed}
                    quantity={taken}
                    product={product}
                    inCart={taken > 0}
                    onPress={callAddToCart}
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
        width: ((Dimensions.window.width / 2) - 21),
        marginRight: 8,
        marginBottom: emY(0.625)
    }
});

export default ProductList;
