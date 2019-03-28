import { Location, Permissions } from 'expo';
import { rtdb, firebaseAuth } from '../../firebase';

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
export const LOCATION_FEEDBACK_POPUP_CLOSE = 'location_feedback_popup_close';
export const DETERMINE_DELIVERY_DISTANCE_REQUEST =
    'determine_delivery_distance_request';
export const DETERMINE_DELIVERY_DISTANCE_SUCCESS =
    'determine_delivery_distance_success';
export const DETERMINE_DELIVERY_DISTANCE_ERROR =
    'determine_delivery_distance_error';

const CONTRACTOR_REGION_REF = 'activeProducts/US/TX/Austin/contractorRegion';
const LOCATION_FEEDBACK_REF = 'locationFeedback';

export const determineDeliveryDistance = (
    region,
    navigation
) => async dispatch => {
    try {
        dispatch({ type: DETERMINE_DELIVERY_DISTANCE_REQUEST });
        // bc there is only one Hero, we are looking at his current set location
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
                    // Is user within 20 min delivery distance of Hero?
                    if (duration.value > 60 * 20) {
                        dispatch(
                            dropdownAlert(
                                true,
                                'No Heroes available in this area.'
                            )
                        );
                        dispatch({ type: NO_HEROES_AVAILABLE });
                    } else {
                        // Save estimated delivery distance and time
                        dispatch({
                            type: DETERMINE_DELIVERY_DISTANCE_SUCCESS,
                            payload: delivery
                        });
                        // Fetch the products made available by Hero(es) to this location
                        fetchCustomerBlock(dispatch);
                        // navigate to product screen
                        navigation.navigate('products');
                    }
                } else {
                    dispatch(
                        dropdownAlert(true, 'No Heroes available in this area.')
                    );
                    dispatch({ type: NO_HEROES_AVAILABLE });
                }
            },
            () => {
                dispatch(
                    dropdownAlert(true, 'No Heroes available in this area.')
                );
                dispatch({ type: NO_HEROES_AVAILABLE });
            }
        );
    } catch (error) {
        dispatch({ type: DETERMINE_DELIVERY_DISTANCE_ERROR });
    }
    // TODO: handle resetting location after order creation
};

export const closeLocationFeedbackPopup = () => dispatch =>
    dispatch({ type: LOCATION_FEEDBACK_POPUP_CLOSE });

export const sendLocationFeedback = (region, timestamp) => dispatch => {
    if (firebaseAuth.currentUser) {
        const uid = firebaseAuth.currentUser.uid;
        const locationFeedbackRef = rtdb.ref(`${LOCATION_FEEDBACK_REF}/${uid}`);
        const newFeedback = locationFeedbackRef.push();
        return newFeedback.set({ region, timestamp });
    }
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
