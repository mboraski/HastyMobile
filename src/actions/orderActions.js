import orderStatuses from '../constants/Order';
import { rtdb } from '../../firebase';

const ORDER_REF = 'activeProducts/US/TX/Austin/orders';

export const SET_CONTRACTORS = 'set_contractors';
export const CLEAR_ORDER = 'clear_order';
export const ORDER_CREATION_REQUEST = 'order_creation_request';
export const ORDER_CREATION_SUCCESS = 'order_creation_success';
export const ORDER_CREATION_FAILURE = 'order_creation_failure';
export const LISTEN_ORDER_REQUEST = 'listen_order_request';
export const LISTEN_ORDER_FAILURE = 'listen_order_failure';
export const ORDER_UPDATE = 'order_update';
export const UPDATE_CONTRACTORS = 'update_contractors';
export const ORDER_COMPLETE = 'order_complete';

export const setContractors = contractors => ({
    type: SET_CONTRACTORS,
    payload: contractors
});

export const clearOrder = () => dispatch => dispatch({ type: CLEAR_ORDER });

export const listenToOrderRef = (dispatch, orderId) => {
    dispatch({ type: LISTEN_ORDER_REQUEST });

    return rtdb.ref(`${ORDER_REF}/${orderId}`).on('value', snapshot => {
        const order = snapshot.val();
        // look at just what has changed
        switch (order.status) {
            case orderStatuses.open:
                dispatch({
                    type: ORDER_UPDATE,
                    payload: orderStatuses.open
                });
                break;
            case orderStatuses.cancelled:
                dispatch({
                    type: ORDER_UPDATE,
                    payload: orderStatuses.cancelled
                });
                break;
            case orderStatuses.inprogress:
                dispatch({
                    type: ORDER_UPDATE,
                    payload: orderStatuses.inprogress
                });
                break;
            case orderStatuses.completed:
                dispatch({
                    type: ORDER_COMPLETE,
                    payload: orderStatuses.completed
                });
                break;
            default:
                break;
        }
        if (order.actualfulfillment) {
            dispatch({
                type: UPDATE_CONTRACTORS,
                payload: order.actualfulfillment
            });
        }
    });
};

export const unListenOrderRef = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}`).off();
