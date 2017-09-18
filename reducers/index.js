import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import cart from './cartReducer';
import address from './addressReducer';
import ui from './uiReducer';

export default combineReducers({
    address,
    auth,
    cart,
    form,
    ui
});
