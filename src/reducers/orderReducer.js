import {
    SET_CONTRACTORS,
    CLEAR_ORDER,
    ORDER_CREATION_SUCCESS,
    LISTEN_ORDER_STATUS,
    UPDATE_ORDER_STATUS,
    UPDATE_ORDER_FULFILLMENT,
    UPDATE_ORDER_ERROR,
    OPEN_CHAT_MODAL,
    CLOSE_CHAT_MODAL,
    OPEN_ORDER_FOUND
} from '../actions/orderActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

import { orderStatuses } from '../constants/Order';

const initialState = {
    orderId: '',
    contactorIds: {},
    pending: false,
    status: '',
    order: {},
    error: null,
    chatModalVisible: false,
    chatId: ''
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
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
        case OPEN_ORDER_FOUND:
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
            return {
                ...state,
                status: action.payload,
                pending: action.payload !== orderStatuses.completed
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
        case OPEN_CHAT_MODAL:
            return {
                ...state,
                chatId: action.payload,
                chatModalVisible: true
            };
        case CLOSE_CHAT_MODAL:
            return {
                ...state,
                chatId: '',
                chatModalVisible: false
            };
        default:
            return state;
    }
};

export default orderReducer;
