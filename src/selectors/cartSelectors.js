import { createSelector } from 'reselect';
import reduce from 'lodash.reduce';
import filter from 'lodash.filter';

import {
    getSalesTaxRate,
    getServiceFeeRate,
    getDeliveryFee,
    getDiscount
} from './checkoutSelectors';

export const getCartProducts = state => state.cart.products;
export const getCartImages = state => state.cart.images; //TODO: set images in this part of state
export const getItemCountUp = state => state.cart.products;
export const getItemCountDown = state => state.cart.products;
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

export const getCartServiceFee = createSelector(
    [getCartPureTotal, getServiceFeeRate],
    (total, serviceFeeRate) => total * serviceFeeRate + 1
);

export const getCartPreTaxTotal = createSelector(
    [getCartPureTotal, getCartServiceFee, getDeliveryFee, getDiscount],
    (total, serviceFee, deliveryFee, discount) =>
        total + serviceFee + deliveryFee - discount
);

export const getCartTax = createSelector(
    [getCartPureTotal, getSalesTaxRate],
    (total, taxRate) => total * taxRate
);

export const getCartCostTotal = createSelector(
    [getCartPreTaxTotal, getCartTax],
    (total, tax) => total + tax
);
