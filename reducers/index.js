import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import cart from './cartReducer';

export default combineReducers({
    auth,
    cart,
    form
});
