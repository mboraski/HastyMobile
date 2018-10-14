import {
    SET_CONTRACTORS,
    ORDER_CREATION_SUCCESS,
    LISTEN_ORDER_REQUEST,
    LISTEN_ORDER_FAILURE,
    ORDER_UPDATE,
    NEW_HERO,
    CLEAR_ORDER
} from '../actions/orderActions';

const initialState = {
    orderId: '',
    contractors: null,
    pending: false,
    status: '',
    hero: {}
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTRACTORS:
            return {
                ...state,
                contractors: action.payload
            };
        case ORDER_CREATION_SUCCESS:
            return {
                ...state,
                orderId: action.payload
            };
        case CLEAR_ORDER:
            return {
                ...state,
                orderId: '',
                pending: false,
                hero: {}
            };
        case LISTEN_ORDER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case LISTEN_ORDER_FAILURE:
            return {
                ...state,
                pending: false
            };
        case ORDER_UPDATE:
            return {
                ...state,
                status: action.payload,
                pending: false
            };
        case NEW_HERO:
            return {
                ...state,
                hero: action.payload,
                pending: false
            };
        default:
            return state;
    }
};

export default orderReducer;
