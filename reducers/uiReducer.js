import {
    TOGGLE_SEARCH,
    OPEN_CUSTOMER_POPUP,
    CLOSE_CUSTOMER_POPUP,
    SHOW_FEEDBACK_FORM,
    HIDE_FEEDBACK_FORM
} from '../actions/uiActions';

const initialState = {
    headerVisible: true,
    searchVisible: false,
    customerPopupVisible: false,
    feedbackFormVisible: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SEARCH:
            return {
                ...state,
                headerVisible: !state.headerVisible,
                searchVisible: !state.searchVisible
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
