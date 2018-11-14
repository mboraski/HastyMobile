import { Location, Permissions } from 'expo';
import { rtdb } from '../../firebase';

import { geocode, distanceMatrix } from './googleMapsActions';
import { fetchCustomerBlock } from './productActions';
import { dropdownAlert } from './uiActions';

export const SAVE_ADDRESS = 'save_address';
export const SET_REGION = 'set_region';
export const SET_CURRENT_LOCATION = 'set_current_location';
export const GET_CURRENT_LOCATION_REQUEST = 'get_current_location_request';
export const GET_CURRENT_LOCATION_SUCCESS = 'get_current_location_success';
export const GET_CURRENT_LOCATION_ERROR = 'get_current_location_error';
export const ADD_LOCATION_SUBSCRIPTION = 'add_location_subscription';
export const REMOVE_LOCATION_SUBSCRIPTION = 'remove_location_subscription';
export const SET_INITIAL_REGION = 'set_initial_region';
export const NULLIFY_MAP_ERROR = 'nullify_map_error';
export const NO_HEROES_AVAILABLE = 'no_heroes_available';
export const DETERMINE_DELIVERY_DISTANCE_REQUEST =
    'determine_delivery_distance_request';
export const DETERMINE_DELIVERY_DISTANCE_SUCCESS =
    'determine_delivery_distance_success';
export const DETERMINE_DELIVERY_DISTANCE_ERROR =
    'determine_delivery_distance_error';

const CONTRACTOR_REGION_REF = 'activeProducts/US/TX/Austin/contractorRegion';

export const determineDeliveryDistance = region => async dispatch => {
    try {
        dispatch({ type: DETERMINE_DELIVERY_DISTANCE_REQUEST });
        const contractorRegionRef = rtdb.ref(CONTRACTOR_REGION_REF);
        await contractorRegionRef.once(
            'value',
            async snapshot => {
                const data = snapshot.val();
                if (data) {
                    const { latitude, longitude, mode } = data;
                    const result = await distanceMatrix({
                        units: 'imperial',
                        origins: `${latitude}, ${longitude}`,
                        mode,
                        destinations: `${region.latitude},${region.longitude}`
                    });
                    const delivery = result.rows[0].elements[0];
                    const duration = delivery.duration;
                    if (duration.value > 60 * 15) {
                        // TODO: log user wanted this region to the server
                        dispatch(
                            dropdownAlert(
                                true,
                                'No Heroes available in this area.'
                            )
                        );
                        dispatch({ type: NO_HEROES_AVAILABLE });
                    } else {
                        dispatch({
                            type: DETERMINE_DELIVERY_DISTANCE_SUCCESS,
                            payload: delivery
                        });
                        fetchCustomerBlock(dispatch);
                    }
                    return;
                }
            },
            () => dispatch({ type: DETERMINE_DELIVERY_DISTANCE_ERROR })
        );
    } catch (error) {
        dispatch({ type: DETERMINE_DELIVERY_DISTANCE_ERROR });
    }
    // TODO: handle resetting location after order creation
};

export const nullifyError = () => dispatch =>
    dispatch({ type: NULLIFY_MAP_ERROR });

export const saveAddress = address => dispatch => {
    dispatch({ type: SAVE_ADDRESS, payload: address });
    return dispatch(geocode({ address }));
};

export const setRegion = region => dispatch =>
    dispatch({
        type: SET_REGION,
        payload: region
    });

export const getCurrentLocation = () => async dispatch => {
    try {
        dispatch({ type: GET_CURRENT_LOCATION_REQUEST });
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            dispatch(
                dropdownAlert(true, 'Permission to access location denied!')
            );
            throw new Error('Permission to access location was denied');
        } else {
            const locationServices = await Location.getProviderStatusAsync();
            if (!locationServices.locationServicesEnabled) {
                dispatch(
                    dropdownAlert(true, 'Location services need to be enabled')
                );
                throw new Error('Location services need to be enabled');
            }
            const location = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true,
                maximumAge: 5000
            });
            // listenForLocationChanges(dispatch); // TODO: add back in
            const coords = location.coords || {};
            dispatch({
                type: SET_REGION,
                payload: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.0043,
                    longitudeDelta: 0.0043
                }
            });
            dispatch({
                type: GET_CURRENT_LOCATION_SUCCESS,
                payload: {
                    timestamp: location.timestamp,
                    coords: location.coords
                }
            });
        }
    } catch (error) {
        dispatch({
            type: GET_CURRENT_LOCATION_ERROR,
            error
        });
    }
};

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
