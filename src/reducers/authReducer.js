import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../actions/authActions';

export const initialState = {
    sessionToken: '',
    user: {
        displayName: '',
        email: '',
        emailVerified: false,
        phoneNumber: null,
        photoUrl: '',
        providerData: {},
        providerId: '',
        uid: '',
        addresses: {
            1: {
                address: '',
                logLat: { lat: null, lon: null }
            },
            2: {
                address: '',
                logLat: { lat: null, lon: null }
            },
            3: {
                address: '',
                logLat: { lat: null, lon: null }
            }
        },
        favoriteProducts: {},
        recentProductsPurchased: {},
        historyOfPurchases: {},
        recommendedProductsHidden: {}
    },
    error: {
        errorCode: '',
        errorMessage: ''
    },
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return { sessionToken: action.payload };
    case LOGIN_FAIL:
        return { sessionToken: null };
    default:
        return state;
    }
}
