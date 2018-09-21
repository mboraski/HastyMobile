import { SubmissionError } from 'redux-form';

import { firebaseAuth, db } from '../../firebase';

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
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dispatch
) =>
    new Promise(resolve => {
        dispatch({
            type: SIGNUP_REQUEST
        });
        return firebaseAuth
            .createUserWithEmailAndPassword(email, password)
            .then(user =>
                db
                    .collection('users')
                    .doc(`${user.uid}`)
                    .set({
                        firstName,
                        lastName,
                        email,
                        phoneNumber
                    })
            )
            .then(() => {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: {
                        firstName,
                        lastName,
                        email,
                        phoneNumber
                    }
                });
                return resolve();
            })
            .catch(error => {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: error
                });
                throw new SubmissionError({
                    _error: 'Crrrazy error'
                });
            });
    });

export const signInWithEmailAndPassword = (
    email,
    password
) => async dispatch => {
    try {
        dispatch({
            type: SIGNIN_REQUEST
        });
        await firebaseAuth.signInWithEmailAndPassword(email, password);
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
        const result = await firebaseAuth.signOut();
        return result;
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, error });
        throw error;
    }
};

export const listenToAuthChanges = () => dispatch =>
    firebaseAuth.onAuthStateChanged(async user => {
        dispatch({ type: AUTH_CHANGED, payload: user });
        if (user) {
            dispatch({ type: SIGNIN_SUCCESS });
        } else {
            dispatch({ type: SIGNOUT_SUCCESS });
        }
    });
