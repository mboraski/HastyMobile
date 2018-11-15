import {
    SET_DELIVERY_NOTES,
    SET_SALES_TAX_RATE,
    SET_SERVICE_FEE
} from '../actions/checkoutActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

export const initialState = {
    notes: '',
    salesTaxRate: 0.0825,
    serviceFee: 899
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case SET_DELIVERY_NOTES:
            return {
                ...state,
                notes: action.payload
            };
        case SET_SALES_TAX_RATE:
            return {
                ...state,
                salesTaxRate: action.payload
            };
        case SET_SERVICE_FEE:
            return {
                ...state,
                serviceFee: action.payload
            };
        default:
            return state;
    }
};
