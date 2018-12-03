import { Google, Facebook } from 'expo';
import { SubmissionError } from 'redux-form';

import { firebaseAuth, db, fire } from '../../firebase';
import { UPDATE_STRIPE_INFO } from './paymentActions';
import { persistor } from '../store';
import {
    sanitizeAndValidateName,
    sanitizeAndValidateEmail,
    sanitizeAndValidatePhoneNumber
} from '../utils/security';
import { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID } from '../keys/Google';
import { APP_ID } from '../keys/Facebook';

export const FACEBOOK_LOGIN_REQUEST = 'facebook_login_request';
export const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success';
export const FACEBOOK_LOGIN_ERROR = 'facebook_login_error';
export const GOOGLE_LOGIN_REQUEST = 'google_login_request';
export const GOOGLE_LOGIN_ERROR = 'google_login_error';
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
export const USER_READABLE_SUCCESS = 'user_readable_success';
export const USER_READABLE_ERROR = 'user_readable_fail';
export const SET_EXPO_PUSH_TOKEN_REQUEST = 'set_expo_push_token_request';

const firebaseFacebookAuth = async (token, dispatch) => {
    try {
        // Build Firebase credential with the Facebook access token.
        const credential = fire.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        const response = await firebaseAuth.signInAndRetrieveDataWithCredential(
            credential
        );
        console.log('firebaseFacebookAuth response: ', response);
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } catch (error) {
        console.log('firebaseFacebookAuth error: ', error);
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
    }
};

export const facebookLogin = facebookAuthToken => async dispatch => {
    dispatch({ type: FACEBOOK_LOGIN_REQUEST });
    try {
        if (!facebookAuthToken) {
            const response = await Facebook.logInWithReadPermissionsAsync(
                APP_ID,
                {
                    permissions: ['public_profile', 'email', 'user_friends']
                }
            );
            console.log('fb auth response ', response);
            const { type, token } = response;

            if (type === 'cancel') {
                console.log('fb login cancel');
                dispatch({ type: FACEBOOK_LOGIN_ERROR });
            } else if (type === 'success') {
                return firebaseFacebookAuth(token, dispatch);
            }
        } else {
            return firebaseFacebookAuth(facebookAuthToken, dispatch);
        }
    } catch (e) {
        console.log('fb login error ', e);
        dispatch({ type: FACEBOOK_LOGIN_ERROR });
    }
};

export const googleLogin = () => async dispatch => {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });
    try {
        const result = await Google.logInAsync({
            androidClientId: ANDROID_GOOGLE_CLIENT_ID,
            androidStandaloneAppClientId: '',
            iosStandaloneAppClientId: '',
            iosClientId: IOS_GOOGLE_CLIENT_ID,
            scopes: ['profile', 'email']
        });

        console.log('google details: ', result);
        if (result.type === 'success') {
            dispatch({ type: GOOGLE_LOGIN_SUCCESS });
            return result.accessToken;
        } else {
            return { cancelled: true };
        }
    } catch (e) {
        dispatch({ type: GOOGLE_LOGIN_ERROR });
        console.log('google login error: ', e);
        return { error: true };
    }
};

export const createUserWithEmailAndPassword = (values, dispatch) =>
    new Promise((resolve, reject) => {
        const { firstName, lastName, email, password, phoneNumber } = values;
        const safeFirstName = sanitizeAndValidateName(firstName);
        const safeLastName = sanitizeAndValidateName(lastName);
        const safeEmail = sanitizeAndValidateEmail(email);
        const safePhoneNumber = sanitizeAndValidatePhoneNumber(phoneNumber);
        dispatch({
            type: SIGNUP_REQUEST
        });
        return firebaseAuth
            .createUserWithEmailAndPassword(safeEmail, password)
            .then(userCredential =>
                db
                    .collection('users')
                    .doc(`${userCredential.user.uid}`)
                    .set({
                        firstName: safeFirstName,
                        lastName: safeLastName,
                        email: safeEmail,
                        phoneNumber: safePhoneNumber
                    })
            )
            .then(() => {
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: {
                        firstName: safeFirstName,
                        lastName: safeLastName,
                        email: safeEmail,
                        phoneNumber: safePhoneNumber
                    }
                });
                return resolve();
            })
            .catch(error => {
                dispatch({
                    type: SIGNUP_FAIL,
                    payload: error
                });
                return reject(
                    new SubmissionError({
                        _error: 'Authentication error'
                    })
                );
            });
    });

export const signInWithEmailAndPassword = (values, dispatch) =>
    new Promise((resolve, reject) => {
        const { email, password } = values;
        const safeEmail = sanitizeAndValidateEmail(email);
        dispatch({
            type: SIGNIN_REQUEST
        });
        return firebaseAuth
            .signInWithEmailAndPassword(safeEmail, password)
            .then(() => {
                dispatch({
                    type: SIGNIN_SUCCESS
                });
                return resolve();
            })
            .catch(error => {
                dispatch({
                    type: SIGNIN_FAIL,
                    payload: error
                });
                return reject(
                    new SubmissionError({
                        _error: 'Invalid username or password'
                    })
                );
            });
    });

export const signOut = () => async dispatch => {
    try {
        dispatch({ type: SIGNOUT_REQUEST });
        const result = await firebaseAuth.signOut();
        dispatch({ type: SIGNOUT_SUCCESS });
        persistor.purge();
        return result;
    } catch (error) {
        dispatch({ type: SIGNOUT_FAIL, error });
        throw error;
    }
};

export const listenToAuthChanges = () => dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
        dispatch({ type: AUTH_CHANGED, payload: user });
        if (user) {
            dispatch({ type: SIGNIN_SUCCESS });
        } else {
            dispatch({ type: SIGNOUT_SUCCESS });
        }
    });
};

export const setUserExpoPushToken = token => dispatch => {
    if (firebaseAuth.currentUser) {
        const user = firebaseAuth.currentUser;
        dispatch({ type: SET_EXPO_PUSH_TOKEN_REQUEST }); // TODO: NOT LISTENED TO
        const userDoc = db.collection('users').doc(user.uid);
        return userDoc.update({ expoPushToken: token });
    }
};

export const getUserReadable = () => dispatch => {
    if (firebaseAuth.currentUser) {
        return db
            .collection('userReadable')
            .doc(firebaseAuth.currentUser.uid)
            .get()
            .then(snap => {
                const userData = snap.data();
                dispatch({
                    type: USER_READABLE_SUCCESS,
                    payload: userData
                });
                if (
                    userData &&
                    userData.stripeInfo &&
                    userData.stripeInfo.stripeCustomerId
                ) {
                    dispatch({
                        type: UPDATE_STRIPE_INFO,
                        payload: userData.stripeInfo
                    });
                }
            })
            .catch(error =>
                dispatch({
                    type: USER_READABLE_ERROR,
                    payload: error
                })
            );
    }
};
