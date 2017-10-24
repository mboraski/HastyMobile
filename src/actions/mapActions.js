import { geocode } from './googleMapsActions';

export const SAVE_ADDRESS = 'save_address';
export const SET_CURRENT_LOCATION = 'set_current_location';

export const saveAddress = address => ({ type: SAVE_ADDRESS, payload: address });
export const setCurrentLocation = region => dispatch => {
    dispatch({ type: SET_CURRENT_LOCATION, payload: region });
    return dispatch(geocode({ latlng: `${region.latitude},${region.longitude}` }));
};
