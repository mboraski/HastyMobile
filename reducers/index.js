import { combineReducers } from 'redux';
import auth from './authReducer';
import cart from './cartReducer';

export default combineReducers({
  auth, cart
});
