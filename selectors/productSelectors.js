import { createSelector } from 'reselect';

const getDeliveryType = state => state.product.deliveryType;

const getProducts = state => state.product.list;

export const getProductsByDeliveryType = createSelector(
    [getDeliveryType, getProducts],
    (deliveryType, products) => {
        const productsByDeliveryType = products[deliveryType] || {};
        return Object.keys(productsByDeliveryType).map(productCode => ({
            ...productsByDeliveryType[productCode],
            productCode,
            deliveryType
        }));
    }
);
