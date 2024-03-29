import {
    SELECT_CATEGORY,
    FETCH_CUSTOMER_BLOCK_REQUEST,
    FETCH_CUSTOMER_BLOCK_SUCCESS,
    FETCH_CUSTOMER_BLOCK_ERROR,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    SET_IMAGE,
    EDIT_PRODUCT_SEARCH_TEXT
} from '../actions/productActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

export const initialState = {
    pending: false,
    error: null,
    availableProducts: {
        instant: {}
    },
    category: 'beverage',
    productImages: {},
    searchText: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case FETCH_CUSTOMER_BLOCK_REQUEST:
            return {
                ...state,
                pending: true
            };
        case FETCH_CUSTOMER_BLOCK_SUCCESS:
            return {
                ...state,
                error: null,
                pending: false
            };
        case FETCH_CUSTOMER_BLOCK_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                availableProducts: action.payload,
                error: null
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SELECT_CATEGORY:
            return {
                ...state,
                category: action.payload,
                searchText: ''
            };
        case SET_IMAGE: {
            const { productId, url } = action.payload;
            const productImages = Object.assign({}, state.productImages, {
                [productId]: url
            });
            return {
                ...state,
                productImages
            };
        }
        case EDIT_PRODUCT_SEARCH_TEXT:
            return { ...state, searchText: action.searchText };
        default:
            return state;
    }
}
