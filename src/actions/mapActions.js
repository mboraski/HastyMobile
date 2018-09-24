import { Location, Permissions } from 'expo';

import { geocode } from './googleMapsActions';
// import Dimensions from '../constants/Dimensions';

// const ASPECT_RATIO = Dimensions.window.width / Dimensions.window.height;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const SAVE_ADDRESS = 'save_address';
export const SET_REGION = 'set_region';
export const SET_CURRENT_LOCATION = 'set_current_location';
export const GET_CURRENT_LOCATION_REQUEST = 'get_current_location_request';
export const GET_CURRENT_LOCATION_SUCCESS = 'get_current_location_success';
export const GET_CURRENT_LOCATION_ERROR = 'get_current_location_error';

const listenForChanges = dispatch => {
    Location.watchPositionAsync(
        {
            enableHighAccuracy: true,
            timeInterval: 5000,
            distanceInterval: 3
        },
        () => {
            dispatch({
                type: GET_CURRENT_LOCATION_SUCCESS,
                payload: {
                    timestamp: location.timestamp,
                    coords: location.coords
                }
            });
        }
    );
};

export const saveAddress = address => dispatch => {
    dispatch({ type: SAVE_ADDRESS, payload: address });
    return dispatch(geocode({ address }));
};

export const setRegion = region => ({ type: SET_REGION, payload: region });

export const getCurrentLocation = () => async dispatch => {
    try {
        dispatch({ type: GET_CURRENT_LOCATION_REQUEST });
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            dispatch({
                type: GET_CURRENT_LOCATION_ERROR,
                error: new Error('Permission to access location was denied')
            });
        } else {
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                maximumAge: 10000
            });
            dispatch({
                type: GET_CURRENT_LOCATION_SUCCESS,
                payload: {
                    timestamp: location.timestamp,
                    coords: location.coords
                }
            });
            listenForChanges(dispatch);
        }
    } catch (error) {
        dispatch({
            type: GET_CURRENT_LOCATION_ERROR,
            error: new Error('Error collecting location information')
        });
    }
};
