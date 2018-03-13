import {
    ORDER_CREATION_SUCCESS,
    ORDER_CREATION_FAILURE,
    LISTEN_ORDER_REQUEST,
    LISTEN_ORDER_FAILURE,
    ORDER_UPDATE
} from '../actions/orderActions';
// import orderStatuses from '../constants/Order';

const initialState = {
    currentOrderDatabaseKey: '',
    pending: false,
    status: ''
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_CREATION_SUCCESS:
            return {
                ...state,
                currentOrderDatabaseKey: action.payload
            };
        case ORDER_CREATION_FAILURE:
            return {
                ...state,
                pending: false
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
        default:
            return state;
    }
};

export default orderReducer;
