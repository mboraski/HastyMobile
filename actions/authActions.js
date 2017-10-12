import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import { auth as fbAuth, database as fbDb } from 'firebase';
import { SubmissionError } from 'redux-form';
import { errorTypes } from '../constants/UserFeedbackStrings';

const ACTIONS = {
    LOGIN_SUCCESS: 'login_success',
    LOGIN_FAIL: 'login_fail',
    LOGOUT_SUCCESS: 'logout_success',
    SIGNUP_FAIL: 'signup_fail',
    REDIRECT_TO_SIGNUP: 'redirect_to_signup',
    LOGIN_USER: 'login_user'
};

const doEmailPasswordLogin = async (dispatch, user) => {
    try {
        const { stsTokenManager } = user;
        const { accessToken } = stsTokenManager;

        await AsyncStorage.setItem('auth_type', 'emailPassword');
        await AsyncStorage.setItem('auth_token', accessToken);

        dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: user });
        dispatch({ type: ACTIONS.LOGIN_USER, payload: accessToken });
    } catch (error) {
        console.log('authActions loginUserSuccess catch error: ', error);
        dispatch({ type: ACTIONS.LOGIN_FAIL });
    }
};

/** Helper Functions **/
const doFacebookLogin = async dispatch => {
    try {
        const response = await Facebook.logInWithReadPermissionsAsync('1873998396207588', {
            permissions: ['public_profile', 'email', 'user_friends']
        });
        console.log('fb auth response ', response);
        const { type, token } = response;

        if (type === 'cancel') {
            return dispatch({ type: ACTIONS.LOGIN_FAIL });
        }

        await AsyncStorage.setItem('auth_type', 'facebook');
        await AsyncStorage.setItem('auth_token', token);

        dispatch({ type: ACTIONS.LOGIN_SUCCESS, payload: response });
        dispatch({ type: ACTIONS.LOGIN_USER, payload: token });
    } catch (error) {
        console.log('authActions doFacebookLogin catch error: ', error);
        dispatch({ type: ACTIONS.LOGIN_FAIL });
    }
};

const addUserToDb = (uid, fullProfile, dispatch) => {
    const userRef = fbDb().ref(`users/${uid}`);
    userRef.once('value', snapshot => {
        if (snapshot.val()) {
            dispatch({ type: ACTIONS.SIGNUP_FAIL });
            throw new SubmissionError({
                _error: errorTypes.dbUserExists
            });
        } else {
            userRef.set({ ...fullProfile })
                .then((response) => {
                    doEmailPasswordLogin(dispatch, response);
                })
                .catch(() => {
                    dispatch({ type: ACTIONS.SIGNUP_FAIL });
                    throw new SubmissionError({
                        _error: errorTypes.dbAddUser
                    });
                });
        }
    });
};
/** Helper Functions End **/

const facebookLogin = () => async dispatch => {
    const token = await AsyncStorage.getItem('auth_token');

    if (token) {
        dispatch({ type: ACTIONS.LOGIN_USER, payload: token });
    } else {
        doFacebookLogin(dispatch);
    }
};

const logout = () => async dispatch => {
    const token = await AsyncStorage.getItem('auth_token');

    if (token) {
        console.log('Logging Out, Bye');
        const wipedToken = await AsyncStorage.setItem('auth_token', null);
        dispatch({ type: ACTIONS.LOGOUT_SUCCESS, payload: wipedToken });
    } else {
        console.log('Already Logged Out');
    }
};

const createUser = (values) => {
    const { name, email, number, confirmPassword } = values;
    return (dispatch) =>
        fbAuth().createUserWithEmailAndPassword(email, confirmPassword)
            .then((response) => {
                // TODO: Add property escaping (along with form field validation)
                const fullProfile = {
                    displayName: String(name),
                    email: String(email),
                    phoneNumber: Number(number),
                    refreshToken: String(response.refreshToken) || '',
                    photoUrl: '',
                    providerId: null,
                    emailVerified: false,
                    providerData: {}
                };
                const uid = String(response.uid) || '';
                addUserToDb(uid, fullProfile, dispatch);
            })
            .catch((error) => {
                console.log('authActions #submit catch error: ', error);
                dispatch({ type: ACTIONS.SIGNUP_FAIL });
                throw new SubmissionError({
                    _error: error
                });
            });
};

const loginEmailPassword = (values) => {
    const { email, password } = values;
    return (dispatch) =>
        fbAuth().signInWithEmailAndPassword(email, password)
            .then(user => doEmailPasswordLogin(dispatch, user))
            .catch((error) => {
                console.log('authActions loginEmailPassword signInWithEmailAndPassword catch error: ', error);
                dispatch({ type: ACTIONS.LOGIN_FAIL });
                throw new SubmissionError({
                    _error: error
                });
            });
};

const ACTION_CREATORS = {
    facebookLogin,
    logout,
    createUser,
    loginEmailPassword
};

export default { ...ACTIONS, ...ACTION_CREATORS };
