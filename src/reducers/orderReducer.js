import {
    ORDER_CREATION_REQUEST,
    ORDER_CREATION_SUCCESS,
    ORDER_CREATION_FAILURE,
    LISTEN_ORDER_REQUEST,
    LISTEN_ORDER_FAILURE,
    ORDER_UPDATE,
    NEW_HERO,
    CLEAR_ORDER
} from '../actions/orderActions';

const initialState = {
    currentOrderDatabaseKey: '',
    pending: false,
    status: '',
    hero: {}
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATION_REQUEST:
            return {
                ...state,
                pending: true
            };
        case ORDER_CREATION_SUCCESS:
            return {
                ...state,
                currentOrderDatabaseKey: action.payload,
                pending: false
            };
        case ORDER_CREATION_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        case CLEAR_ORDER:
            return {
                ...state,
                currentOrderDatabaseKey: '',
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
