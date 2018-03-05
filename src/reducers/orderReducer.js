import {
    ORDER_CREATION_SUCCESS
    // ORDER_CREATION_FAILURE
} from '../actions/orderActions';

const initialState = {
    currentOrderDatabaseKey: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ORDER_CREATION_SUCCESS:
            return {
                ...state,
                currentOrderDatabaseKey: action.payload
            };
        default:
            return state;
    }
}
