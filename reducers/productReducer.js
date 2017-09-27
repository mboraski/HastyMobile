import {
    GET_PRODUCTS_BY_ADDRESS_REQUEST,
    GET_PRODUCTS_BY_ADDRESS_SUCCESS,
    GET_PRODUCTS_BY_ADDRESS_FAIL,
    SELECT_DELIVERY_TYPE
} from '../actions/productActions';

export const initialState = {
    pending: false,
    list: {},
    error: null,
    deliveryType: '1'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_ADDRESS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case GET_PRODUCTS_BY_ADDRESS_SUCCESS:
            return {
                ...state,
                pending: false,
                list: action.payload.productList,
                error: null
            };
        case GET_PRODUCTS_BY_ADDRESS_FAIL:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        case SELECT_DELIVERY_TYPE:
            return {
                ...state,
                deliveryType: action.payload
            };
        default:
            return state;
    }
}
