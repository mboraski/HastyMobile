// Third Party Imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import map from 'lodash.map';

// Relative Imports
import ProductDetail from './ProductDetail';
import { emY } from '../utils/em';

class ProductList extends Component {
    static propTypes = {
        products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        searchText: PropTypes.string.isRequired,
        handleAddToCart: PropTypes.func.isRequired,
        handleRequestProduct: PropTypes.func.isRequired,
        productImages: PropTypes.shape({}).isRequired
    };

    filterProducts = () => {
        const { products, searchText } = this.props;
        if (searchText.trim().length) {
            return products.filter(product => {
                return (
                    product.productName
                        .toLowerCase()
                        .indexOf(searchText.toLowerCase()) > -1
                );
            });
        }
        return products;
    };

    renderProducts() {
        const {
            handleAddToCart,
            handleRequestProduct,
            productImages
        } = this.props;
        return map(this.filterProducts(), product => {
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
                    handleAddToCart={handleAddToCart}
                    handleRequestProduct={handleRequestProduct}
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
