import { REHYDRATE } from 'redux-persist/lib/constants';
import {
    MAPS_PLACES_AUTOCOMPLETE_REQUEST,
    MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
    MAPS_PLACES_AUTOCOMPLETE_FAIL,
    MAPS_REVERSE_GEOCODE_REQUEST,
    MAPS_REVERSE_GEOCODE_SUCCESS,
    MAPS_REVERSE_GEOCODE_FAIL
} from '../actions/googleMapsActions';
import { SAVE_ADDRESS, SET_CURRENT_LOCATION } from '../actions/mapActions';
import { GET_PRODUCTS_BY_ADDRESS_SUCCESS } from '../actions/productActions';

function getFormattedAddress(payload) {
    const result = payload.results[0];
    if (result) {
        return result.formatted_address;
    }
    return '';
}

export const initialState = {
    pending: false,
    predictions: [],
    saved: [],
    region: null,
    address: null,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REHYDRATE:
            if (action.payload && action.payload.map) {
                return {
                    ...state,
                    ...action.payload.map,
                    predictions: []
                };
            }
            return state;
        case MAPS_PLACES_AUTOCOMPLETE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_PLACES_AUTOCOMPLETE_SUCCESS:
            return {
                ...state,
                pending: false,
                predictions: action.payload.predictions || [],
                error: null
            };
        case MAPS_PLACES_AUTOCOMPLETE_FAIL:
            return {
                ...state,
                pending: false,
                predictions: [],
                error: action.error
            };
        case MAPS_REVERSE_GEOCODE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case MAPS_REVERSE_GEOCODE_SUCCESS:
            return {
                ...state,
                pending: false,
                address: getFormattedAddress(action.payload)
            };
        case MAPS_REVERSE_GEOCODE_FAIL:
            return {
                ...state,
                pending: false,
                address: '',
                error: action.error
            };
        case SAVE_ADDRESS:
            if (!state.saved.includes(action.payload)) {
                return {
                    ...state,
                    saved: [...state.saved, action.payload]
                };
            }
            return state;
        case GET_PRODUCTS_BY_ADDRESS_SUCCESS:
            return {
                ...state,
                currentSetAddress: action.payload.currentSetAddress,
                currentSetLatLon: action.payload.currentSetLatLon
            };
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                region: action.payload
            };
        default:
            return state;
    }
}
