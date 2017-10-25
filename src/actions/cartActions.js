export const ADD_TO_CART = 'add_to_cart';
export const REMOVE_FROM_CART = 'remove_from_cart';

export const addToCart = product => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = product => ({ type: REMOVE_FROM_CART, payload: product });
