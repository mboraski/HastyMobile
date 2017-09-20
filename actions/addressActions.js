export const SAVE_ADDRESS = 'save_address';

export const saveAddress = address => dispatch => {
    dispatch({ type: SAVE_ADDRESS, payload: address });
};
