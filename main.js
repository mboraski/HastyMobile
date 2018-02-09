// Third Party Imports
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import Expo from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

// Relative Imports
import { auth } from './src/firebase';
import Spinner from './src/components/Spinner';
import Color from './src/constants/Color';
import RootContainer from './src/screens/RootContainer';
import { store, persistor } from './src/store';

import { AUTH_CHANGED } from './src/actions/authActions';

class App extends Component {
    componentDidMount() {
        // TODO: HAMO-28: Wire up push notifications
        const config = {
            apiKey: 'AIzaSyBEIuNlAAKU8byP2NUptaZTPtHobhYqMQA',
            authDomain: 'hasty-14d18.firebaseapp.com',
            databaseURL: 'https://hasty-14d18.firebaseio.com',
            projectId: 'hasty-14d18',
            storageBucket: 'hasty-14d18.appspot.com',
            messagingSenderId: '734280961973'
        };
        firebase.initializeApp(config);
        firebase
            .auth()
            .onAuthStateChanged(user =>
                store.dispatch({ type: AUTH_CHANGED, payload: user })
            );
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    persistor={persistor}
                    loading={
                        <Spinner
                            style={[StyleSheet.absoluteFill, styles.spinner]}
                        />
                    }
                >
                    <RootContainer />
                </PersistGate>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    spinner: {
        backgroundColor: Color.WHITE
    }
});

Expo.registerRootComponent(App);
