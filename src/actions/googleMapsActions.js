import { Platform } from 'react-native';

import googleMapsClient from '../api/googleMaps';
import {
    TEST_GOOGLE_PLACES_KEY,
    IOS_GOOGLE_PLACES_KEY,
    ANDROID_GOOGLE_PLACES_KEY
} from '../keys/Google';

const MAP_KEY = __DEV__
    ? TEST_GOOGLE_PLACES_KEY
    : Platform.select({
          ios: IOS_GOOGLE_PLACES_KEY,
          android: ANDROID_GOOGLE_PLACES_KEY
      });

export const MAPS_PLACES_AUTOCOMPLETE_REQUEST =
    'google_maps_places_autocomplete_request';
export const MAPS_PLACES_AUTOCOMPLETE_SUCCESS =
    'google_maps_places_autocomplete_success';
export const MAPS_PLACES_AUTOCOMPLETE_FAIL =
    'google_maps_places_autocomplete_fail';

export const MAPS_GEOCODE_REQUEST = 'google_maps_geocode_request';
export const MAPS_GEOCODE_SUCCESS = 'google_maps_geocode_success';
export const MAPS_GEOCODE_FAIL = 'google_maps_geocode_fail';

export const MAPS_REVERSE_GEOCODE_REQUEST =
    'google_maps_reverse_geocode_request';
export const MAPS_REVERSE_GEOCODE_SUCCESS =
    'google_maps_reverse_geocode_success';
export const MAPS_REVERSE_GEOCODE_FAIL = 'google_maps_reverse_geocode_fail';

export const placesAutocomplete = input => async dispatch => {
    try {
        dispatch({
            type: MAPS_PLACES_AUTOCOMPLETE_REQUEST,
            payload: input
        });
        const res = await googleMapsClient.placesAutoComplete({
            params: {
                input,
                key: MAP_KEY
            }
        });
        if (res.data.error_message) {
            throw new Error(res.data.error_message);
        } else {
            dispatch({
                type: MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
                payload: res.data
            });
            return res.data;
        }
    } catch (error) {
        dispatch({
            type: MAPS_PLACES_AUTOCOMPLETE_FAIL,
            error
        });
        throw error;
    }
};

export const geocode = props => async dispatch => {
    try {
        dispatch({
            type: MAPS_GEOCODE_REQUEST,
            payload: props
        });
        const res = await googleMapsClient.geocode({
            params: {
                ...props,
                key: MAP_KEY
            }
        });
        if (res.data.error_message) {
            throw new Error(res.data.error_message);
        } else {
            dispatch({
                type: MAPS_GEOCODE_SUCCESS,
                payload: res.data
            });
            return res.data;
        }
    } catch (error) {
        dispatch({
            type: MAPS_GEOCODE_FAIL,
            error
        });
        throw error;
    }
};

/**
 * Uses the users coords to find their address
 * @param {*} props
 */
export const reverseGeocode = props => async dispatch => {
    try {
        dispatch({
            type: MAPS_REVERSE_GEOCODE_REQUEST,
            payload: props
        });
        const res = await googleMapsClient.geocode({
            params: {
                ...props,
                key: MAP_KEY
            }
        });
        if (res.data.error_message) {
            throw new Error(res.data.error_message);
        } else {
            dispatch({
                type: MAPS_REVERSE_GEOCODE_SUCCESS,
                payload: res.data
            });
            return res.data;
        }
    } catch (error) {
        dispatch({
            type: MAPS_REVERSE_GEOCODE_FAIL,
            error
        });
        throw error;
    }
};

export const distanceMatrix = async props => {
    try {
        const res = await googleMapsClient.distanceMatrix({
            params: {
                ...props,
                key: MAP_KEY
            }
        });
        if (res.data.error_message) {
            throw new Error(res.data.error_message);
        } else {
            return res.data;
        }
    } catch (error) {
        throw error;
    }
};
