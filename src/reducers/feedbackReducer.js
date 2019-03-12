import {
    OPEN_FEEDBACK_REQUEST,
    OPEN_FEEDBACK_SUCCESS,
    OPEN_FEEDBACK_ERROR
} from '../actions/feedbackActions';

const initialState = {
    pending: false,
    error: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case OPEN_FEEDBACK_REQUEST:
            return {
                ...state,
                pending: true
            };
        case OPEN_FEEDBACK_SUCCESS:
            return {
                ...state,
                pending: false
            };
        case OPEN_FEEDBACK_ERROR:
            return {
                ...state,
                pending: false,
                error: action.payload
            };
        default:
            return state;
    }
}
