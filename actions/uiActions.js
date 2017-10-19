export const TOGGLE_SEARCH = 'ui_toggle_search';
export const OPEN_CUSTOMER_POPUP = 'ui_open_customer_popup';
export const CLOSE_CUSTOMER_POPUP = 'ui_close_customer_popup';
export const SHOW_FEEDBACK_FORM = 'show_feedback_form';
export const CLOSE_FEEDBACK_FORM = 'close_feedback_form';

export const toggleSearch = () => dispatch => {
    dispatch({ type: TOGGLE_SEARCH });
};

export const openCustomerPopup = () => ({ type: OPEN_CUSTOMER_POPUP });
export const closeCustomerPopup = () => ({ type: CLOSE_CUSTOMER_POPUP });

export const showFeedbackForm = () => ({ type: SHOW_FEEDBACK_FORM });
export const hideFeedbackForm = () => ({ type: CLOSE_FEEDBACK_FORM });
