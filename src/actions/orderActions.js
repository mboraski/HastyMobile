export const ORDER_CREATION_SUCCESS = 'order/ORDER_CREATION_SUCCESS';
export const ORDER_CREATION_FAILURE = 'order/ORDER_CREATION_FAILURE';

export const orderCreationSuccess = (key) => dispatch => {
    dispatch({
        type: ORDER_CREATION_SUCCESS,
        payload: key
    });
};

export const orderCreationFailure = () => dispatch => dispatch({ type: ORDER_CREATION_FAILURE });
