import moment from 'moment';

import {
    SIGNOUT,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAIL,
    AUTH_CHANGED
} from '../actions/authActions';

export const initialState = {
    user: null,
    pending: false,
    error: null,
    expirationDate: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_CHANGED:
            return {
                ...state,
                user: action.payload,
                expirationDate: action.payload
                    ? moment()
                          .add(1, 'months')
                          .toDate()
                    : null
            };
        case SIGNOUT:
            return { ...state, pending: true };
        case SIGNOUT_SUCCESS:
            return initialState;
        case SIGNOUT_FAIL:
            return { ...state, error: action.error, pending: false };
        default:
            return state;
    }
}
