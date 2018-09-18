import firebase from 'firebase';

export const AUTH_CHANGED = 'auth_changed';
export const CREATE_USER_SUCCESS = 'create_user_success';
export const SIGNUP_REQUEST = 'signup_request';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAIL = 'signup_fail';
export const SIGNIN_REQUEST = 'signin_request';
export const SIGNIN_SUCCESS = 'signin_success';
export const SIGNIN_FAIL = 'signin_fail';
export const SIGNOUT_REQUEST = 'signout_request';
export const SIGNOUT_SUCCESS = 'signout_success';
export const SIGNOUT_FAIL = 'signout_fail';

export const createUserWithEmailAndPassword = async (
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dispatch
) => {
    try {
        dispatch({
            type: SIGNUP_REQUEST
        });
        const user = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: {
                firstName,
                lastName,
                email,
                phoneNumber
            }
        });
        await firebase
            .firestore()
            .doc(`users/${user.uid}`)
            .set({
                firstName,
                lastName,
                email,
                phoneNumber
            });
        dispatch({
            type: CREATE_USER_SUCCESS
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
        return result;
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, error });
        throw error;
    }
};

export const listenToAuthChanges = () => dispatch =>
    firebase.auth().onAuthStateChanged(async user => {
        dispatch({ type: AUTH_CHANGED, payload: user });
        if (user) {
            dispatch({ type: SIGNIN_SUCCESS });
        } else {
            dispatch({ type: SIGNOUT_SUCCESS });
        }
    });
