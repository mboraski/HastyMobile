import orderStatuses from '../constants/Order';
import { rtdb, firebaseAuth } from '../../firebase';

export const CLEAR_ORDER = 'clear_order';
export const ORDER_CREATION_REQUEST = 'order_creation_request';
export const ORDER_CREATION_SUCCESS = 'order_creation_success';
export const ORDER_CREATION_FAILURE = 'order_creation_failure';
export const LISTEN_ORDER_REQUEST = 'listen_order_request';
export const LISTEN_ORDER_FAILURE = 'listen_order_failure';
export const ORDER_UPDATE = 'order_update';
export const NEW_HERO = 'new_hero';

export const createOrder = region => dispatch => {
    dispatch({ type: ORDER_CREATION_REQUEST });
    // Calls firebase function directly
    // firebase function compares user location to list of active Heroes
    // filters to only heroes within a 15 minute delivery radius (bike).
    // grabs the products and delivery types of the inventories of those Heroes
    // then returns the available products.
    // fires order creation error of type no available Heroes if so
    // dispatch({ type: ORDER_CREATION_FAILURE, payload: error });
    // An order is then created if there are available heroes
    // and the user is taken to the products screen where products will be fetched
    // from the store through selectors.
    rtdb.ref('orders/US/TX/Austin')
        .push({
            region,
            userId: firebaseAuth.currentUser.uid,
            status: 'open'
        })
        .then(orderRef => {
            dispatch({ type: ORDER_CREATION_SUCCESS, payload: orderRef.key });
        })
        .catch(error => {
            dispatch({ type: ORDER_CREATION_FAILURE, payload: error });
        });
};

export const clearOrder = () => dispatch => dispatch({ type: CLEAR_ORDER });

export const orderCreationSuccess = key => dispatch => {
    dispatch({
        type: ORDER_CREATION_SUCCESS,
        payload: key
    });
};

export const orderCreationFailure = () => dispatch =>
    dispatch({ type: ORDER_CREATION_FAILURE });

export const unlistenToOrder = orderId => () => {
    firebase
        .database()
        .ref(`orders/US/TX/Austin/${orderId}`)
        .off();
};

export const listenToOrder = orderId => dispatch => {
    dispatch({ type: LISTEN_ORDER_REQUEST });
    return firebase
        .database()
        .ref(`${orderId}`) // TODO: it should be just the id and not location
        .on('value', snapshot => {
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
