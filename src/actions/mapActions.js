import { Location, Permissions } from 'expo';

import { geocode } from './googleMapsActions';

export const SAVE_ADDRESS = 'save_address';
export const SET_REGION = 'set_region';
export const SET_CURRENT_LOCATION = 'set_current_location';
export const GET_CURRENT_LOCATION_REQUEST = 'get_current_location_request';
export const GET_CURRENT_LOCATION_SUCCESS = 'get_current_location_success';
export const GET_CURRENT_LOCATION_ERROR = 'get_current_location_error';
export const ADD_LOCATION_SUBSCRIPTION = 'add_location_subscription';
export const REMOVE_LOCATION_SUBSCRIPTION = 'remove_location_subscription';
export const SET_INITIAL_REGION = 'set_initial_region';

// const listenForLocationChanges = dispatch => {
//     const locationSubscription = Location.watchPositionAsync(
//         {
//             enableHighAccuracy: true,
//             timeInterval: 5000,
//             distanceInterval: 3
//         },
//         location => {
//             dispatch({
//                 type: GET_CURRENT_LOCATION_SUCCESS,
//                 payload: {
//                     timestamp: location.timestamp,
//                     coords: location.coords
//                 }
//             });
//         }
//     );
//     dispatch({
//         type: ADD_LOCATION_SUBSCRIPTION,
//         payload: locationSubscription
//     })
// };
//
// export const unlistenForProviderStatusChanges = subscription => dispatch => {
//     subscription.remove();
//     dispatch({
//         type: REMOVE_LOCATION_SUBSCRIPTION
//     })
// };
export const saveAddress = address => dispatch => {
    dispatch({ type: SAVE_ADDRESS, payload: address });
    return dispatch(geocode({ address }));
};

export const setRegion = (latitude, longitude) => ({
    type: SET_REGION,
    payload: { latitude, longitude }
});

export const getCurrentLocation = () => async dispatch => {
    try {
        dispatch({ type: GET_CURRENT_LOCATION_REQUEST });
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
        } else {
            const locationServices = await Location.getProviderStatusAsync();
            if (!locationServices.locationServicesEnabled) {
                throw new Error('Location services need to be enabled');
            }
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                maximumAge: 10000
            });
            // listenForLocationChanges(dispatch); // TODO: add back in
            dispatch({
                type: GET_CURRENT_LOCATION_SUCCESS,
                payload: {
                    timestamp: location.timestamp,
                    coords: location.coords
                }
            });
            dispatch(
                setRegion(location.coords.latitude, location.coords.longitude)
            );
        }
    } catch (error) {
        dispatch({
            type: GET_CURRENT_LOCATION_ERROR,
            error
        });
    }
};
