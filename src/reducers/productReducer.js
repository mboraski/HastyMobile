import {
    GET_PRODUCTS_BY_ADDRESS_REQUEST,
    GET_PRODUCTS_BY_ADDRESS_SUCCESS,
    GET_PRODUCTS_BY_ADDRESS_FAIL,
    SELECT_DELIVERY_TYPE,
    FETCHED_PRODUCTS_SUCCESS,
    FETCHED_PRODUCTS_FAILURE
} from '../actions/productActions';

export const initialState = {
    pending: false,
    error: null,
    availableProducts: {},
    deliveryType: '1'
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHED_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                availableProducts: action.payload,
                error: null
            };
        case FETCHED_PRODUCTS_FAILURE:
            return {
                ...state,
                pending: false
            };
        case GET_PRODUCTS_BY_ADDRESS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case GET_PRODUCTS_BY_ADDRESS_SUCCESS:
            return {
                ...state,
                pending: false,
                availableProducts: action.payload.productList,
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
