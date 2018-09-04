import { createSelector } from 'reselect';
import reduce from 'lodash.reduce';
import filter from 'lodash.filter';

// import { getAvailableProducts } from './productSelectors';

export const getCartProducts = state => state.cart.products;
export const getItemCountUp = state => state.cart.products;
export const getItemCountDown = state => state.cart.products;
export const getDeliveryFee = state => state.cart.deliveryFee;
export const getTaxRate = state => state.cart.localSalesTaxRate;
export const getServiceRate = state => state.cart.serviceRate;
export const getServiceFee = state => state.cart.serviceFee;
export const getCurrentSetAddress = state => state.cart.currentSetAddress;
export const getRegion = state => state.cart.region;

export const getCartInstantProducts = createSelector(
    [getCartProducts],
    products => products.instant
);

export const getCartTotalQuantity = createSelector(
    [getCartInstantProducts],
    products =>
        reduce(products, (acc, product) => acc + product.quantityTaken, 0)
);

export const getDeliveryTypes = createSelector(getCartProducts, products =>
    Object.keys(products)
);

/**
 * Turns product map into 1D array with code and type and removes orders with 0 quantity
 */
export const getCartOrders = createSelector(
    [getCartInstantProducts],
    products => filter(products, product => product.quantityTaken > 0)
);

export const getCartPureTotal = createSelector([getCartOrders], orders =>
    orders.reduce((acc, order) => acc + order.price * order.quantityTaken, 0)
);

export const getCartTaxTotal = createSelector(
    [getCartPureTotal, getTaxRate],
    (total, taxRate) => total * taxRate
);

export const getCartServiceCharge = createSelector(
    [getCartPureTotal, getServiceRate],
    (total, serviceRate) => total * serviceRate
);

export const getCartCostTotal = createSelector(
    [getCartPureTotal, getCartServiceCharge, getDeliveryFee, getServiceFee],
    (total, serviceCharge, deliveryFee, serviceFee) =>
        total + serviceCharge + deliveryFee + serviceFee
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
