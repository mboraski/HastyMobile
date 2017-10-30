import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import {
    auth,
    cart,
    checkout,
    map,
    product,
    header,
    notification
} from '../reducers';

const persistConfig = {
  key: 'root',
  AsyncStorage
  // blacklist: ['ui', 'form', 'nav']
}
const middlewares = [thunk];

if (__DEV__) {
    middlewares.push(logger);
}

const Reducer = combineReducers({
    auth: persistReducer(persistConfig, auth),
    cart: persistReducer(persistConfig, cart),
    checkout: persistReducer(persistConfig, checkout),
    map: persistReducer(persistConfig, map),
    product: persistReducer(persistConfig, product),
    header: persistReducer(persistConfig, header),
    notification: persistReducer(persistConfig, notification)
});
const store = createStore(
    Reducer,
    {},
    compose(
        applyMiddleware(...middlewares)
    )
);
const persistor = persistStore(store);

export default { persistor, store };
