import { Facebook } from 'expo';
import firebase from '../firebase';

import { APP_ID } from '../constants/Facebook';

export const AUTH_CHANGED = 'auth_changed';
export const AUTH_RESET_STATE = 'auth_reset_state';
export const SIGNUP = 'signup';
export const SIGNUP_SUCCESS = 'signup_success';
export const SIGNUP_FAIL = 'signup_fail';
export const SIGNOUT = 'signout';
export const SIGNOUT_SUCCESS = 'signout_success';
export const SIGNOUT_FAIL = 'signout_fail';
export const REDIRECT_TO_SIGNUP = 'redirect_to_signup';
export const UPDATE_ACCOUNT = 'update_account';
export const UPDATE_ACCOUNT_SUCCESS = 'update_account_success';
export const UPDATE_ACCOUNT_FAIL = 'update_account_fail';
export const LOGIN_FACEBOOK = 'login_facebook';
export const LOGIN_FACEBOOK_SUCCESS = 'login_facebook_success';
export const LOGIN_FACEBOOK_FAIL = 'login_facebook_fail';

export const signInWithFacebook = async () => {
    try {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            APP_ID,
            {
                permissions: ['public_profile', 'email', 'user_friends']
            }
        );
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(
                token
            );
            const user = await firebase.auth().signInWithCredential(credential);
            return user;
        } else if (type === 'cancel') {
            const error = new Error('Facebook authentication canceled');
            throw error;
        }
        return token;
    } catch (error) {
        throw error;
    }
};

export const signInWithEmailAndPassword = async ({ email, password }) =>
    await firebase.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => async dispatch => {
    try {
        dispatch({ type: SIGNOUT });
        const result = await firebase.auth().signOut();

        dispatch({ type: SIGNOUT_SUCCESS });
        dispatch({ type: AUTH_RESET_STATE });
        return result;
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, error });
        throw error;
    }
};

export const authChanged = user => ({ type: AUTH_CHANGED, payload: user });
