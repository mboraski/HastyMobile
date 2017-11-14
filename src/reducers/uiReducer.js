import {
    SHOW_SEARCH,
    HIDE_SEARCH,
    OPEN_CUSTOMER_POPUP,
    CLOSE_CUSTOMER_POPUP,
    SHOW_FEEDBACK_FORM,
    HIDE_FEEDBACK_FORM
} from '../actions/uiActions';

const initialState = {
    searchVisible: false,
    customerPopupVisible: false,
    feedbackFormVisible: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SHOW_SEARCH:
            return {
                ...state,
                searchVisible: true
            };
        case HIDE_SEARCH:
            return {
                ...state,
                searchVisible: false
            };
        case OPEN_CUSTOMER_POPUP:
            return {
                ...state,
                customerPopupVisible: true
            };
        case CLOSE_CUSTOMER_POPUP:
            return {
                ...state,
                customerPopupVisible: false
            };
        case SHOW_FEEDBACK_FORM:
            return {
                ...state,
                feedbackFormVisible: true
            };
        case HIDE_FEEDBACK_FORM:
            return {
                ...state,
                feedbackFormVisible: false
            };
        default:
            return state;
    }
}
