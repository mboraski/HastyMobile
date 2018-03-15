import firebase from '../firebase';

import orderStatuses from '../constants/Order';
// import dropdownAlert from '../actions/uiActions';
// export const FISH_ORDERS_REQUEST = 'fish_orders_request';
// export const FISH_ORDERS_SUCCESS = 'fish_orders_success';
// export const FISH_ORDERS_FAILURE = 'fish_orders_failure';
export const ORDER_CREATION_SUCCESS = 'order_creation_success';
export const ORDER_CREATION_FAILURE = 'order_creation_failure';
export const LISTEN_ORDER_REQUEST = 'listen_order_request';
export const LISTEN_ORDER_FAILURE = 'listen_order_failure';
export const ORDER_UPDATE = 'order_update';
export const NEW_HERO = 'new_hero';
export const CLEAR_ORDER = 'clear_order';


export const clearOrder = () => dispatch => dispatch({ type: CLEAR_ORDER });

export const orderCreationSuccess = (key) => dispatch => {
    dispatch({
        type: ORDER_CREATION_SUCCESS,
        payload: key
    });
};

export const orderCreationFailure = () => dispatch => dispatch({ type: ORDER_CREATION_FAILURE });

export const unlistenToOrder = (orderId) => () => {
    firebase.database().ref(`orders/US/TX/Austin/${orderId}`).off();
};

export const listenToOrder = (orderId) => dispatch => {
    dispatch({ type: LISTEN_ORDER_REQUEST });
    // console.log('orderId: ', orderId);
    firebase.database().ref(`${orderId}`) // TODO: it should be just the id and not location
        .on('value', (snapshot) => {
            const order = snapshot.val();
            switch (order.status) {
                case orderStatuses.unaccepted:
                    dispatch({
                        type: ORDER_UPDATE,
                        payload: orderStatuses.unaccepted
                    });
                    break;
                case orderStatuses.accepted:
                    dispatch({
                        type: ORDER_UPDATE,
                        payload: orderStatuses.accepted
                    });
                    dispatch({
                        type: NEW_HERO,
                        payload: order.hero
                    });
                    break;
                case orderStatuses.arrived:
                    dispatch({
                        type: ORDER_UPDATE,
                        payload: orderStatuses.arrived
                    });
                    break;
                case orderStatuses.completed:
                    dispatch({
                        type: ORDER_UPDATE,
                        payload: orderStatuses.completed
                    });
                    break;
                default:
                    break;
            }
        });
};
// .catch((err) => {
//     dispatch({
//         type: LISTEN_ORDER_FAILURE,
//         payload: err
//     });
//     dispatch(dropdownAlert(true, 'Error fetching your order status'));
//     dispatch(dropdownAlert(true, 'Retry via Menu > Order'));
// });
