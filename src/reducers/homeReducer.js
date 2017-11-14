import { SET_SEARCH_QUERY } from '../actions/homeActions';

export const initialState = {
    searchQuery: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload
            };
        default:
            return state;
    }
}
