import { orderStatuses } from '../constants/Order';
import { rtdb } from '../../firebase';
import * as api from '../api/hasty';

const ORDER_REF = 'activeProducts/US/TX/Austin/orders';

export const SET_CONTRACTORS = 'set_contractors';
export const CLEAR_ORDER = 'clear_order';
export const ORDER_CREATION_SUCCESS = 'order_creation_success';
export const LISTEN_ORDER_STATUS = 'listen_order_status';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const UPDATE_ORDER_FULFILLMENT = 'update_order_fulfillment';
export const UPDATE_ORDER_ERROR = 'update_order_error';
export const CALL_CONTRACTOR_REQUEST = 'call_contractor_request';

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

    return rtdb
        .ref(`${ORDER_REF}/${orderId}/fulfillment/status`)
        .on('value', snapshot => {
            const status = snapshot.val();
            // look at just what has changed
            switch (status) {
                case orderStatuses.open:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.open
                    });
                    break;
                case orderStatuses.cancelled:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.cancelled
                    });
                    break;
                case orderStatuses.inprogress:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.inprogress
                    });
                    break;
                case orderStatuses.satisfied:
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.satisfied
                    });
                    break;
                case orderStatuses.completed:
                    capturePayment();
                    dispatch({
                        type: UPDATE_ORDER_STATUS,
                        payload: orderStatuses.completed
                    });
                    break;
                default:
                    break;
            }
        });
};

export const unListenOrderStatus = orderId =>
    rtdb.ref(`${ORDER_REF}/${orderId}/fulfillment/status`).off();

export const listenToOrderFulfillment = orderId => dispatch => {
    return rtdb
        .ref(`${ORDER_REF}/${orderId}/fulfillment/actualFulfillment`)
        .on('value', snapshot => {
            const fulfillment = snapshot.val();
            if (fulfillment) {
                console.log('order fulfillment listener ran');
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

export const contactContractor = (
    contractorId,
    phoneNumber
) => async dispatch => {
    dispatch({ type: CALL_CONTRACTOR_REQUEST }); // TODO: nothing listening yet
    try {
        const call = await api.consumerCallsContractor({
            contractorId,
            phoneNumber
        });
        console.log('call to contractor started: ', call);
    } catch (err) {
        console.log('call to contractor errored: ', err);
    }
};
