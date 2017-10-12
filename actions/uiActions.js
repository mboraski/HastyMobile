export const TOGGLE_SEARCH = 'ui_toggle_search';
export const OPEN_CUSTOMER_POPUP = 'ui_open_customer_popup';
export const CLOSE_CUSTOMER_POPUP = 'ui_close_customer_popup';

export const toggleSearch = () => dispatch => {
    dispatch({ type: TOGGLE_SEARCH });
};

export const openCustomerPopup = () => ({ type: OPEN_CUSTOMER_POPUP });
export const closeCustomerPopup = () => ({ type: CLOSE_CUSTOMER_POPUP });
