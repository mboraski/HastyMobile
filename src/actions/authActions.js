import { Google, Facebook } from 'expo';
import { SubmissionError } from 'redux-form';

import { firebaseAuth, db, fire } from '../../firebase';
import { UPDATE_STRIPE_INFO } from './paymentActions';
import { checkOpenOrders } from './orderActions';
import { persistor } from '../store';
import {
    sanitizeAndValidateName,
    sanitizeAndValidateEmail,
    sanitizeAndValidatePhoneNumber
} from '../utils/security';
import {
    STANDALONE_ANDROID_GOOGLE_OAUTH_ID,
    STANDALONE_IOS_GOOGLE_OAUTH_ID,
    ANDROID_GOOGLE_CLIENT_ID,
    IOS_GOOGLE_CLIENT_ID,
    WEB_CLIENT_ID
} from '../keys/Google';
import { APP_ID } from '../keys/Facebook';

export const FACEBOOK_LOGIN_REQUEST = 'facebook_login_request';
export const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success';
export const FACEBOOK_LOGIN_ERROR = 'facebook_login_error';
export const GOOGLE_LOGIN_REQUEST = 'google_login_request';
export const GOOGLE_LOGIN_SUCCESS = 'google_login_success';
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
export const AUTH_NO_LOADED = 'auth_no_loaded';
export const RESET_PASSWORD_REQUEST = 'reset_password_request';
export const RESET_PASSSWORD_SUCCESS = 'reset_password_success';
export const RESET_PASSSWORD_ERROR = 'reset_password_error';

/**
 * Sends verification email to new users
 */
const sendEmailVerification = () => {
    return firebaseAuth.currentUser
        .sendEmailVerification()
        .then(() => {
            // no response is returned, if we get here it was a success
            return null;
        })
        .catch(function(error) {
            // email failed
            // when we set up sentry, is this one place we want to put it?
            return null;
        });
};

const firebaseFacebookAuth = async ({
    dispatch,
    token,
    expires = 0,
    permissions = [],
    declinedPermissions = []
}) => {
    try {
        // Build Firebase credential with the Facebook access token.
        const credential = fire.auth.FacebookAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        const response = await firebaseAuth.signInAndRetrieveDataWithCredential(
            credential
        );
        const additionalUserInfo = response.additionalUserInfo;
        const firebaseUser = response.user;
        const {
            email,
            first_name,
            id,
            last_name,
            name,
            picture
        } = additionalUserInfo.profile;
        const safeFirstName = sanitizeAndValidateName(first_name);
        const safeLastName = sanitizeAndValidateName(last_name);
        const safeName = sanitizeAndValidateName(name);
        const safeEmail = sanitizeAndValidateEmail(email);
        const photoUrl = picture.data.url;
        if (additionalUserInfo.isNewUser) {
            await db
                .collection('users')
                .doc(`${firebaseUser.uid}`)
                .set({
                    firstName: safeFirstName,
                    lastName: safeLastName,
                    email: safeEmail,
                    photoUrl,
                    other: {
                        providerId: additionalUserInfo.providerId,
                        name: safeName,
                        picture,
                        id,
                        permissions,
                        declinedPermissions
                    }
                });
            // Send sign up email
            sendEmailVerification();
        }
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: {
                firstName: safeFirstName,
                lastName: safeLastName,
                email: safeEmail,
                photoUrl
            }
        });
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: { token, expires } });
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error
        });
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
    const behavior = __DEV__ ? 'web' : 'native';
    dispatch({ type: FACEBOOK_LOGIN_REQUEST });
    try {
        if (!facebookAuthToken) {
            const response = await Facebook.logInWithReadPermissionsAsync(
                APP_ID,
                {
                    permissions: ['public_profile', 'email'],
                    behavior
                }
            );

            if (response.type === 'cancel') {
                dispatch({ type: FACEBOOK_LOGIN_ERROR });
            } else if (response.type === 'success') {
                const {
                    token,
                    expires,
                    permissions,
                    declinedPermissions
                } = response;
                return firebaseFacebookAuth({
                    dispatch,
                    token,
                    expires,
                    permissions,
                    declinedPermissions
                });
            }
        } else {
            return firebaseFacebookAuth({
                dispatch,
                token: facebookAuthToken
            });
        }
    } catch (e) {
        dispatch({ type: FACEBOOK_LOGIN_ERROR });
    }
};

const firebaseGoogleAuth = async ({
    dispatch,
    token,
    accessToken = '',
    refreshToken = '',
    serverAuthCode = '',
    user = {}
}) => {
    try {
        // Build Firebase credential with the Facebook access token.
        const credential = fire.auth.GoogleAuthProvider.credential(token);
        // Sign in with credential from the Facebook user.
        const response = await firebaseAuth.signInAndRetrieveDataWithCredential(
            credential
        );
        const additionalUserInfo = response.additionalUserInfo;
        const firebaseUser = response.user;
        // TODO: change to not user provider data as reuse of auth token will fail
        const { email, givenName, id, familyName, name, photoUrl } = user;
        const safeFirstName = sanitizeAndValidateName(givenName);
        const safeLastName = sanitizeAndValidateName(familyName);
        const safeName = sanitizeAndValidateName(name);
        const safeEmail = email ? sanitizeAndValidateEmail(email) : '';
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: {
                firstName: safeFirstName,
                lastName: safeLastName,
                email: safeEmail,
                photoUrl
            }
        });
        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: { token, accessToken, refreshToken }
        });
        if (additionalUserInfo.isNewUser) {
            await db
                .collection('users')
                .doc(`${firebaseUser.uid}`)
                .set({
                    firstName: safeFirstName,
                    lastName: safeLastName,
                    email: safeEmail,
                    photoUrl,
                    other: {
                        providerId: additionalUserInfo.providerId,
                        name: safeName,
                        id,
                        idToken: token,
                        accessToken,
                        refreshToken,
                        serverAuthCode
                    }
                });
            // Send sign up email
            sendEmailVerification();
        }
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error
        });
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // // The email of the user's account used.
        // var email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
    }
};

export const googleLogin = googleAuthToken => async dispatch => {
    const behavior = __DEV__ ? 'web' : 'system';
    dispatch({ type: GOOGLE_LOGIN_REQUEST });
    try {
        if (!googleAuthToken) {
            // if (__DEV__) {
            //     let result = await Expo.AuthSession.startAsync({
            //     authUrl:
            //         `https://accounts.google.com/o/oauth2/v2/auth?` +
            //         `&client_id=${WEB_CLIENT_ID}` +
            //         `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
            //         `&response_type=code` +
            //         `&access_type=offline` +
            //         `&scope=profile,email`,
            //     });
            //
            // }
            const response = await Google.logInAsync({
                androidStandaloneAppClientId: STANDALONE_ANDROID_GOOGLE_OAUTH_ID,
                iosStandaloneAppClientId: STANDALONE_IOS_GOOGLE_OAUTH_ID,
                androidClientId: ANDROID_GOOGLE_CLIENT_ID,
                iosClientId: IOS_GOOGLE_CLIENT_ID,
                webClientId: WEB_CLIENT_ID,
                scopes: ['profile', 'email'],
                behavior
            });

            if (response.type === 'cancel') {
                dispatch({ type: GOOGLE_LOGIN_ERROR });
            } else if (response.type === 'success') {
                const {
                    accessToken,
                    idToken,
                    refreshToken,
                    serverAuthCode,
                    user
                } = response;
                return firebaseGoogleAuth({
                    dispatch,
                    token: idToken,
                    accessToken,
                    refreshToken,
                    serverAuthCode,
                    user
                });
            }
        } else {
            return firebaseGoogleAuth({
                dispatch,
                token: googleAuthToken
            });
        }
    } catch (e) {
        dispatch({ type: GOOGLE_LOGIN_ERROR });
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
                // Send sign up email
                sendEmailVerification();
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
            checkOpenOrders(dispatch);
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
                if (userData) {
                    dispatch({
                        type: USER_READABLE_SUCCESS,
                        payload: userData
                    });
                }
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

/**
 * Sends email to reset password
 * @param {string} email
 */
export const resetPassword = ({ email }, dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    return firebaseAuth
        .sendPasswordResetEmail(email)
        .then(response => {
            dispatch({ type: RESET_PASSSWORD_SUCCESS });
        })
        .catch(error => {
            dispatch({
                type: RESET_PASSSWORD_ERROR,
                payload: error.code
            });
        });
};
