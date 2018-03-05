import { createSelector } from 'reselect';
import _ from 'lodash';

import { getCartTotalQuantity, getCartProducts } from './cartSelectors';

export const getAvailableProducts = state => state.product.availableProducts;
export const getProductsPending = state => state.product.pending;
export const getCategory = state => state.product.category.toUpperCase();
export const getHeader = state => state.header;

export const getCategories = createSelector(
    [getAvailableProducts],
    (availableProducts) => {
        const categories = _.reduce(availableProducts.instant, (accum, product) => {
            _.forEach(product.categories, (category, key) => {
                if (!accum[key]) {
                    accum[key] = key; // eslint-disable-line
                }
            });
            return accum;
        }, {});
        return Object.keys(categories).map((category) => category.toUpperCase());
    }
);

export const getProductsByCategory = createSelector(
    [getCategory, getAvailableProducts],
    (category, availableProducts) => {
        if (availableProducts.instant) {
            return _.filter(availableProducts.instant, (product) =>
                product.categories[category.toLowerCase()]);
        }
    }
);

export const getNumberOfProducts = createSelector(
    [getProductsByCategory],
    (products) =>
        (products ? Object.keys(products).length : null)
);

export const getProductPicRefs = createSelector(
    [], () => {}
);

const getProductsState = createSelector(
    [
        getCartProducts,
        getCartTotalQuantity,
        getProductsPending,
        getProductsByCategory,
        getCategory,
        getCategories,
        getNumberOfProducts,
        getHeader
    ],
    (
        cart,
        cartQuantity,
        productPending,
        products,
        category,
        categories,
        numberOfProducts,
        header
    ) => ({
        cart,
        cartQuantity,
        productPending,
        products,
        category,
        categories,
        numberOfProducts,
        header
    })
);

export default getProductsState;
