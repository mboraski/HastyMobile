import orderStatuses from '../constants/Order';
import { rtdb } from '../../firebase';

const ORDER_REF = 'activeProducts/US/TX/Austin/orders';

export const SET_CONTRACTORS = 'set_contractors';
export const CLEAR_ORDER = 'clear_order';
export const ORDER_CREATION_SUCCESS = 'order_creation_success';
export const LISTEN_ORDER_FULFILLMENT = 'listen_order_fulfillment';
export const LISTEN_ORDER_STATUS = 'listen_order_status';
export const LISTEN_ORDER_ERROR = 'listen_order_error';
export const ORDER_STATUS_UPDATE = 'order_status_update';
export const UPDATE_ORDER_FULFILLMENT = 'update_order_fulfillment';
export const UPDATE_ORDER_ERROR = 'update_order_error';

export const setContractors = contractors => ({
    type: SET_CONTRACTORS,
    payload: contractors
});

export const clearOrder = () => dispatch => dispatch({ type: CLEAR_ORDER });

export const capturePayment = () => {
    // TODO: capture the stripe payment for the order
};

export const listenToOrderStatus = orderId => dispatch => {
    dispatch({ type: LISTEN_ORDER_STATUS });

    return rtdb.ref(`${ORDER_REF}/${orderId}/status`).on('value', snapshot => {
        const status = snapshot.val();
        // look at just what has changed
        switch (status) {
            case orderStatuses.open:
                dispatch({
                    type: ORDER_STATUS_UPDATE,
                    payload: orderStatuses.open
                });
                break;
            case orderStatuses.cancelled:
                dispatch({
                    type: ORDER_STATUS_UPDATE,
                    payload: orderStatuses.cancelled
                });
                break;
            case orderStatuses.inprogress:
                dispatch({
                    type: ORDER_STATUS_UPDATE,
                    payload: orderStatuses.inprogress
                });
                break;
            case orderStatuses.completed:
                capturePayment();
                dispatch({
                    type: ORDER_STATUS_UPDATE,
                    payload: orderStatuses.completed
                });
                break;
            default:
                break;
        }
    });
};

export const unListenOrderStatus = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}/status`).off();

export const listenToOrderFulfillment = orderId => dispatch => {
    // dispatch({ type: LISTEN_ORDER_FULFILLMENT });

    return rtdb
        .ref(`${ORDER_REF}/${orderId}/fulfillment/actualFulfillment`)
        .on('value', snapshot => {
            const fulfillment = snapshot.val();
            if (fulfillment) {
                dispatch({
                    type: UPDATE_ORDER_FULFILLMENT,
                    payload: fulfillment
                });
            }
        });
};

export const unListenToOrderFulfillment = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}/fulfillment/actualFulfillment`).off();

export const listenToOrderError = orderId => dispatch => {
    dispatch({ type: LISTEN_ORDER_ERROR });

    return rtdb
        .ref(`${ORDER_REF}/${orderId}/fulfillment/error`)
        .on('value', snapshot => {
            const error = snapshot.val();
            if (error) {
                dispatch({ type: UPDATE_ORDER_ERROR, payload: error });
            }
        });
};

export const unListenOrderError = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}/fulfillment/error`).off();
