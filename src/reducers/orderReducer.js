import {
    SET_CONTRACTORS,
    CLEAR_ORDER,
    ORDER_CREATION_SUCCESS,
    // LISTEN_ORDER_FULFILLMENT,
    LISTEN_ORDER_STATUS,
    // LISTEN_ORDER_ERROR,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_FULFILLMENT,
    UPDATE_ORDER_ERROR
} from '../actions/orderActions';

const initialState = {
    orderId: '',
    contactorIds: {},
    pending: false,
    status: '',
    order: {},
    error: null
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTRACTORS:
            return {
                ...state,
                contactorIds: action.payload
            };
        case CLEAR_ORDER:
            return {
                ...state,
                ...initialState
            };
        case ORDER_CREATION_SUCCESS:
            return {
                ...state,
                orderId: action.payload
            };
        case LISTEN_ORDER_STATUS:
            return {
                ...state,
                pending: true
            };
        case UPDATE_ORDER_STATUS:
            const
            return {
                ...state,
                status: action.payload,
                pending: (action.payload !== orderStatuses.completed)
            };
        case UPDATE_ORDER_FULFILLMENT:
            return {
                ...state,
                order: action.payload
            };
        case UPDATE_ORDER_ERROR:
            return {
                ...state,
                error: action.payload,
                pending: false
            };
        default:
            return state;
    }
};

export default orderReducer;
