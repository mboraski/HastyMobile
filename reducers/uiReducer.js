import {
    TOGGLE_SEARCH
} from '../actions/uiActions';

const initialState = {
    headerVisible: true,
    searchVisible: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SEARCH:
            return {
                ...state,
                headerVisible: !state.headerVisible,
                searchVisible: !state.searchVisible
            };
        default:
            return state;
    }
}
