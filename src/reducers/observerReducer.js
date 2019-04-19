import {
    SET_PRODUCTS_OBSERVER,
    REMOVE_PRODUCTS_OBSERVER
} from '../actions/observerActions';
import { SIGNOUT_SUCCESS } from '../actions/authActions';

export const initialState = {
    productsObserver: () => {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SIGNOUT_SUCCESS:
            return initialState;
        case SET_PRODUCTS_OBSERVER:
            return { ...state, productsObserver: action.payload };
        case REMOVE_PRODUCTS_OBSERVER:
            state.productsObserver();
            return { ...state, productsObserver: () => {} };
        default:
            return state;
    }
}
