export const TOGGLE_SEARCH = 'ui_toggle_search';

export const toggleSearch = () => dispatch => {
    dispatch({ type: TOGGLE_SEARCH });
};
