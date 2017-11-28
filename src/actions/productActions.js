import * as api from '../api/hasty';

export const GET_PRODUCTS_BY_ADDRESS_REQUEST = 'get_products_by_address_request';
export const GET_PRODUCTS_BY_ADDRESS_SUCCESS = 'get_products_by_address_success';
export const GET_PRODUCTS_BY_ADDRESS_FAIL = 'get_products_by_address_fail';

export const SELECT_DELIVERY_TYPE = 'select_delivery_type';

export const LISTEN_FOR_PRODUCT_CHANGES = 'listen_for_product_changes';
export const STOP_LISTEN_FOR_PRODUCT_CHANGES = 'stop_listen_for_product_changes';

export const selectDeliveryType = deliveryType => ({
    type: SELECT_DELIVERY_TYPE,
    payload: deliveryType
});

export const listenForProductChanges = () => ({
    type: LISTEN_FOR_PRODUCT_CHANGES,
    payload: true
});

export const stopListenForProductChanges = () => ({
    type: STOP_LISTEN_FOR_PRODUCT_CHANGES,
    payload: false
});

export const getProductsByAddress = address => async dispatch => {
    dispatch({ type: GET_PRODUCTS_BY_ADDRESS_REQUEST });
    try {
        const res = await api.getProductsByAddress({ address });
        dispatch({
            type: GET_PRODUCTS_BY_ADDRESS_SUCCESS,
            payload: res.data
        });
        return res;
    } catch (error) {
        dispatch({
            type: GET_PRODUCTS_BY_ADDRESS_FAIL,
            error
        });
        throw error;
    }
};
