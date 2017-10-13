import { TOGGLE_SEARCH, OPEN_CUSTOMER_POPUP, CLOSE_CUSTOMER_POPUP } from '../actions/uiActions';

const initialState = {
    headerVisible: true,
    searchVisible: false,
    customerPopupVisible: false
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
        default:
            return state;
    }
}
