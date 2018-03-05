import {
    SELECT_CATEGORY,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
} from '../actions/productActions';

export const initialState = {
    pending: false,
    error: null,
    availableProducts: {},
    category: 'SXSW',
    products: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                availableProducts: action.payload,
                error: null,
                pending: false,
            };
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                pending: false,
            };
        case SELECT_CATEGORY:
            return {
                ...state,
                category: action.payload
            };
        default:
            return state;
    }
}
