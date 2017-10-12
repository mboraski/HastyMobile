export const HOME_SEARCH_CHANGE = 'home_search_change';

export const homeSearchChange = (text) => dispatch => {
    dispatch({
        type: HOME_SEARCH_CHANGE,
        payload: {
            searchText: text,
        }
    });
};
