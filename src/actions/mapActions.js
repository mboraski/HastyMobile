import { geocode } from './googleMapsActions';

export const SAVE_ADDRESS = 'save_address';
export const SET_REGION = 'set_region';

export const saveAddress = address => ({ type: SAVE_ADDRESS, payload: address });
export const setRegion = region => dispatch => {
    dispatch({ type: SET_REGION, payload: region });
    return dispatch(geocode({ latlng: `${region.latitude},${region.longitude}` }));
};
