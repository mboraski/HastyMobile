import {
    HOME_SEARCH_CHANGE
} from '../actions/homeSearchActions';

export const initialState = {
    searchText: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case HOME_SEARCH_CHANGE:
            return {
                ...state,
                searchText: action.payload.searchText
            };
        default:
            return state;
    }
}
