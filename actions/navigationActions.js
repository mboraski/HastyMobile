export const TOGGLE_MENU = 'nav_toggle_menu';

export const toggleMenu = (toggleFlag) => dispatch => {
    dispatch({ 
        type: TOGGLE_MENU,
        isOpen: toggleFlag
    });
};

