import { REHYDRATE } from 'redux-persist/constants';
import {
    MAPS_PLACES_AUTOCOMPLETE_REQUEST,
    MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
    MAPS_PLACES_AUTOCOMPLETE_FAIL
} from '../actions/googleMapsActions';
import { SAVE_ADDRESS } from '../actions/addressActions';

const initialState = {
    pending: false,
    predictions: [],
    saved: [],
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case REHYDRATE:
            if (action.payload.address) {
                return {
                    ...state,
                    ...action.payload.address,
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
        case SAVE_ADDRESS:
            if (!state.saved.includes(action.payload)) {
                return {
                    ...state,
                    saved: [...state.saved, action.payload]
                };
            }
            return state;
        default:
            return state;
    }
}
