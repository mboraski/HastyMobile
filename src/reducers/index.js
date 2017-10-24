import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import cart from './cartReducer';
<<<<<<< HEAD:src/reducers/index.js
import checkout from './checkoutReducer';
=======
>>>>>>> HAMO-6: Set current location:reducers/index.js
import map from './mapReducer';
import ui from './uiReducer';
import product from './productReducer';
import header from './navigationReducer';
import notification from './notificationReducer';
import nav from './navReducer';

export default combineReducers({
    auth,
    cart,
    checkout,
    map,
    form,
    map,
    product,
    ui,
    header,
    notification,
    nav
});
