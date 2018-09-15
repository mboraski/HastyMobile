import moment from 'moment';

import {
    AUTH_CHANGED,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SIGNIN_REQUEST,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNOUT_REQUEST,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAIL
} from '../actions/authActions';

const initialState = {
    user: null,
    userReadable: null,
    pending: false,
    error: null,
    expirationDate: null
};

export default function(state = initialState, action) {
    const payload = action.payload;

    switch (action.type) {
        case AUTH_CHANGED:
            return {
                ...state,
                user: payload,
                expirationDate: payload
                    ? moment()
                          .add(1, 'months')
                          .toDate()
                    : null
            };
        case SIGNUP_REQUEST:
            return { ...state, pending: true };
        case SIGNUP_SUCCESS:
            return { ...state, userReadable: payload, pending: false };
        case SIGNUP_FAIL:
            return { ...state, pending: false, error: payload };
        case SIGNIN_REQUEST:
            return { ...state, pending: true };
        case SIGNIN_SUCCESS:
            return { ...state, userReadable: payload, pending: false };
        case SIGNIN_FAIL:
            return { ...state, pending: false, error: payload };
        case SIGNOUT_REQUEST:
            return { ...state, pending: true };
        case SIGNOUT_SUCCESS:
            return initialState;
        case SIGNOUT_FAIL:
            return { ...state, error: payload, pending: false };
        default:
            return state;
    }
}
