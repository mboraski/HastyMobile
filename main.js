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

class App extends Component {
    componentDidMount() {
        // TODO: HAMO-28: Wire up push notifications

        auth.onAuthStateChanged((user, error, completed) => {
            if (user) {
                console.log('main.js logged in :)', user);
                console.log('main.js logged in completed: ', completed);
            } else {
                console.log('main.js logged out :(', error);
                AsyncStorage.removeItem('auth_token');
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    persistor={persistor}
                    loading={<Spinner style={[StyleSheet.absoluteFill, styles.spinner]} />}
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
