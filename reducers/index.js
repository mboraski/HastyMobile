import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import cart from './cartReducer';
import address from './addressReducer';
import ui from './uiReducer';
import product from './productReducer';
import header from './navigationReducer';
import notification from './notificationReducer';
import nav from './navReducer';

export default combineReducers({
    address,
    auth,
    cart,
    form,
    product,
    ui,
    header,
    notification,
    nav
});
