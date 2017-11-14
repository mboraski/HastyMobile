export const SET_SEARCH_QUERY = 'set_search_query';

export const setSearchQuery = text => dispatch => {
    dispatch({
        type: SET_SEARCH_QUERY,
        payload: text
    });
};
