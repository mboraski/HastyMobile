import { createSelector } from 'reselect';
import _ from 'lodash';

// import { getAvailableProducts } from './productSelectors';

export const getCartProducts = state => state.cart.products;
export const getTaxRate = state => state.cart.localSalesTaxRate;
export const getServiceRate = state => state.cart.serviceRate;
export const getDeliveryFee = state => state.cart.deliveryFee;
export const getServiceFee = state => state.cart.serviceFee;

export const getCartInstantProducts = createSelector(
    [getCartProducts],
    (products) =>
        products.instant
);

export const getCartTotalQuantity = createSelector(
    [getCartInstantProducts],
    (products) =>
        _.reduce(products, (acc, product) => acc + product.quantityTaken, 0)
);

export const getDeliveryTypes = createSelector(getCartProducts, products => Object.keys(products));

/**
 * Turns product map into 1D array with code and type and removes orders with 0 quantity
 */
export const getCartOrders = createSelector(
    [getCartInstantProducts],
    (products) =>
        _.filter(products, (product) =>
            (product.quantityTaken > 0))
);

export const getCartCostTotal = createSelector(
    [getCartOrders],
    (orders) =>
        orders.reduce((acc, order) => acc + (order.price * order.quantityTaken), 0)
);

export const getCartTaxTotal = createSelector(
    [getCartCostTotal, getTaxRate],
    (total, taxRate) =>
        total + (total * taxRate)
);

export const getCartServiceCharge = createSelector(
    [getCartCostTotal, getServiceRate, getDeliveryFee, getServiceFee],
    (total, serviceRate, deliveryFee, serviceFee) =>
        (total * serviceRate) + deliveryFee + serviceFee
);
// export const getCartOrders = createSelector(
//     getCartProducts,
//     getDeliveryTypes,
//     (products, deliveryTypes) =>
//         deliveryTypes
//             .map(deliveryType =>
//                 Object.keys(products[deliveryType]).map(productCode => ({
//                     ...products[deliveryType][productCode],
//                     productCode,
//                     deliveryType
//                 }))
//             )
//             .reduce((a, b) => a.concat(b), [])
//             .filter(order => order.quantity > 0)
// );
