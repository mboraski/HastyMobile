export const SET_PRODUCTS_OBSERVER = 'set_products_observer';
export const REMOVE_PRODUCTS_OBSERVER = 'remove_products_observer';

export const setProductsObserver = observer => ({
    type: SET_PRODUCTS_OBSERVER,
    payload: observer
});

export const removeProductsObserver = () => ({
    type: REMOVE_PRODUCTS_OBSERVER
});
