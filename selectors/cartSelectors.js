import { createSelector } from 'reselect';

export const getCartProducts = state => state.cart.products;

export const getDeliveryTypes = createSelector(getCartProducts, products => Object.keys(products));

/**
 * Turns product map into 1D array with code and type and removes orders with 0 quantity
 */
export const getCartOrders = createSelector(
    getCartProducts,
    getDeliveryTypes,
    (products, deliveryTypes) =>
        deliveryTypes
            .map(deliveryType =>
                Object.keys(products[deliveryType]).map(productCode => ({
                    ...products[deliveryType][productCode],
                    productCode,
                    deliveryType
                }))
            )
            .reduce((a, b) => a.concat(b), [])
            .filter(order => order.quantity > 0)
);

export const getCartTotalQuantity = createSelector(getCartOrders, orders =>
    orders.reduce((acc, order) => acc + order.quantity, 0)
);

export const getCartTotalCost = createSelector(getCartOrders, orders =>
    orders.reduce((acc, order) => (acc + order.price * order.quantity).toFixed(2), 0)
);
