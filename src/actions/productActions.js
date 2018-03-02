export const GET_PRODUCTS_BY_ADDRESS_REQUEST = 'get_products_by_address_request';
export const GET_PRODUCTS_BY_ADDRESS_SUCCESS = 'get_products_by_address_success';
export const GET_PRODUCTS_BY_ADDRESS_FAIL = 'get_products_by_address_fail';
export const SELECT_DELIVERY_TYPE = 'select_delivery_type';
export const FETCHED_PRODUCTS_SUCCESS = 'received_products_success';
export const FETCHED_PRODUCTS_FAILURE = 'received_products_failure';

export const fetchedProductsSuccess = products => ({
    type: FETCHED_PRODUCTS_SUCCESS,
    payload: products
});

export const selectDeliveryType = deliveryType => ({
    type: SELECT_DELIVERY_TYPE,
    payload: deliveryType
});

// export const getProductsByAddress = address => async dispatch => {
//     dispatch({ type: GET_PRODUCTS_BY_ADDRESS_REQUEST });
//     try {
//         const res = await api.getProductsByAddress({ address });
//         dispatch({
//             type: GET_PRODUCTS_BY_ADDRESS_SUCCESS,
//             payload: res.data
//         });
//         return res;
//     } catch (error) {
//         dispatch({
//             type: GET_PRODUCTS_BY_ADDRESS_FAIL,
//             error
//         });
//         throw error;
//     }
// };
