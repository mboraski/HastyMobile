export const ADD_TO_CART = 'add_to_cart';
export const REMOVE_FROM_CART = 'remove_from_cart';
export const SET_CURRENT_LOCATION = 'set_current_location';
export const CHECK_CART_VALID = 'check_cart_valid';

export const addToCart = productInfo => ({
    type: ADD_TO_CART,
    payload: productInfo
});

export const removeFromCart = productInfo => ({
    type: REMOVE_FROM_CART,
    payload: productInfo
});

export const setCurrentLocation = (address, region) => ({
    type: SET_CURRENT_LOCATION,
    payload: {
        address,
        region
    }
});

export const checkCartValid = (products) => ({
    type: CHECK_CART_VALID,
    payload: products
});
