import firebase from '../firebase';

export const SELECT_CATEGORY = 'select_category';
export const FETCH_PRODUCTS_REQUEST = 'fetch_products_request';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_FAILURE = 'fetch_products_failure';

export const fetchProductsRequest = () =>
    async (dispatch) => {
        console.log('fetchProductsRequest action ran dispatch: ', dispatch);
        dispatch({ type: FETCH_PRODUCTS_REQUEST });
        return await firebase.database().ref('products/US/TX/Austin')
            .on('value', (snapshot) => {
                const products = snapshot.val();
                dispatch(fetchProductsSuccess(products));
            });
    };

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error
});

export const selectCategory = category => ({
    type: SELECT_CATEGORY,
    payload: category
});
