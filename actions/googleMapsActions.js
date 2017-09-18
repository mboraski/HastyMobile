import googleMapsClient from '../api/googleMaps';

const KEY = 'AIzaSyDqrzisPO0B76kk7M7PYGemAgaHEvr7uBA';

export const MAPS_PLACES_AUTOCOMPLETE_REQUEST = 'google_maps_places_autocomplete_request';
export const MAPS_PLACES_AUTOCOMPLETE_SUCCESS = 'google_maps_places_autocomplete_success';
export const MAPS_PLACES_AUTOCOMPLETE_FAIL = 'google_maps_places_autocomplete_fail';

export const placesAutocomplete = input => async dispatch => {
    try {
        dispatch({
            type: MAPS_PLACES_AUTOCOMPLETE_REQUEST,
            payload: input
        });
        const res = await googleMapsClient.placesAutoComplete({
            params: {
                input,
                key: KEY
            }
        });
        if (res.data.error_message) {
            dispatch({
                type: MAPS_PLACES_AUTOCOMPLETE_FAIL,
                error: new Error(res.data.error_message)
            });
        } else {
            dispatch({
                type: MAPS_PLACES_AUTOCOMPLETE_SUCCESS,
                payload: res.data
            });
        }
    } catch (error) {
        dispatch({
            type: MAPS_PLACES_AUTOCOMPLETE_FAIL,
            error
        });
    }
};
