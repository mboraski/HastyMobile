import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

export const getDeliveryType = state => state.product.deliveryType;

export const getAvailableProducts = state => state.product.availableProducts;

export const getProductsByDeliveryType = createSelector(
    [getDeliveryType, getAvailableProducts],
    (deliveryType, products) => {
        const productsByDeliveryType = products[deliveryType] || {};
        return Object.keys(productsByDeliveryType).map(productCode => ({
            ...productsByDeliveryType[productCode],
            productCode,
            deliveryType
        }));
    }
);

export const getSimilarProducts = query =>
    createSelector(getProductsByDeliveryType, products => {
        if (!query) {
            return products;
        }
        const options = {
            shouldSort: true,
            keys: ['title']
        };
        const fuse = new Fuse(products, options); // "list" is the item array
        return fuse.search(query);
    });
