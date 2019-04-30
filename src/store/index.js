import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSecureStore from 'redux-persist-expo-securestore';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import logger from 'redux-logger';
// import MainNavigator from '../navigations/MainNavigator';
import MenuNavigator from '../navigations/MenuNavigator';
import * as reducers from '../reducers';

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const navMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);
const App = reduxifyNavigator(MenuNavigator, 'root');
const mapStateToProps = state => ({
    state: state.nav
});
export const AppWithNavigationState = connect(mapStateToProps)(App);

const storage = createSecureStore();
const persistConfig = {
    timeout: 10000,
    key: 'root',
    storage,
    debug: __DEV__,
    blacklist: ['form']
};

const middlewares = [thunk];

middlewares.push(navMiddleware);

if (__DEV__) {
    middlewares.push(logger);
}

// Enable debugging remotely in real device
import { NativeModules } from 'react-native';

if (__DEV__) {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
}

const Reducer = persistCombineReducers(persistConfig, reducers);
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

export const store = createStore(Reducer, {}, enhancer);
export const persistor = persistStore(store);

// clears async storage
// persistor.purge();

export default { persistor, store };
