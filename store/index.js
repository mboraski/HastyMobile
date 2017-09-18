import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

const middlewares = [thunk];
if (__DEV__) {
    middlewares.push(logger);
}

const store = createStore(reducers, {}, compose(applyMiddleware(...middlewares), autoRehydrate()));

persistStore(store, { storage: AsyncStorage, example: ['example'], blacklist: ['ui'] });

export default store;
