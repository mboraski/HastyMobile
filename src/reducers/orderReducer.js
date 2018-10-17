import {
    SET_CONTRACTORS,
    ORDER_CREATION_SUCCESS,
    LISTEN_ORDER_REQUEST,
    ORDER_UPDATE,
    SET_ORDER,
    CLEAR_ORDER,
    ORDER_COMPLETE
} from '../actions/orderActions';

const initialState = {
    orderId: '',
    contactorIds: {},
    pending: false,
    status: '',
    order: {}
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTRACTORS:
            return {
                ...state,
                contactorIds: action.payload
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
        case ORDER_UPDATE:
            return {
                ...state,
                status: action.payload
            };
        case SET_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case ORDER_COMPLETE:
            return {
                ...state,
                status: action.payload,
                pending: false
            };
        default:
            return state;
    }
};

export default orderReducer;
