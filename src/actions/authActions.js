import firebase from 'firebase';

export const AUTH_CHANGED = 'auth_changed';
export const SIGNUP_REQUEST = 'signup_request';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAIL = 'signup_fail';
export const SIGNIN_REQUEST = 'signin_request';
export const SIGNIN_SUCCESS = 'signin_success';
export const SIGNIN_FAIL = 'signin_fail';
export const SIGNOUT_REQUEST = 'signout_request';
export const SIGNOUT_SUCCESS = 'signout_success';
export const SIGNOUT_FAIL = 'signout_fail';

export const createUserWithEmailAndPassword = (
    email,
    password,
    phoneNumber
) => async dispatch => {
    try {
        dispatch({
            type: SIGNUP_REQUEST
        });
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password, phoneNumber);
        dispatch({
            type: SIGNUP_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error
        });
    }
};

export const signInWithEmailAndPassword = (
    email,
    password
) => async dispatch => {
    try {
        dispatch({
            type: SIGNIN_REQUEST
        });
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch({
            type: SIGNIN_SUCCESS
        });
    } catch (error) {
        dispatch({
            type: SIGNIN_FAIL,
            payload: error
        });
    }
};

export const signOut = () => async dispatch => {
    try {
        dispatch({ type: SIGNOUT_REQUEST });
        const result = await firebase.auth().signOut();

        dispatch({ type: SIGNOUT_SUCCESS });
        return result;
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, error });
        throw error;
    }
};

export const authChanged = user => ({ type: AUTH_CHANGED, payload: user });
