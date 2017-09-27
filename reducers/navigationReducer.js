import {
    TOGGLE_MENU
} from '../actions/navigationActions';

const initialState = {
    isMenuOpen: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: action.isOpen
            };
        default:
            return state;
    }
}
