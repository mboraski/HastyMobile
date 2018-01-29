// Third Party Imports
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Image, View } from 'react-native';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist/es/integration/react';

// Relative Imports
import splashImage from './src/assets/splash.png';
import Color from './src/constants/Color';
import RootContainer from './src/screens/RootContainer';
import { store, persistor } from './src/store';

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

        firebase.auth().onAuthStateChanged((user, error, completed) => {
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
                    loading={
                        <Image
                            source={splashImage}
                            style={[StyleSheet.absoluteFill, styles.splash]}
                            resizeMode="contain"
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
    splash: {
        backgroundColor: Color.YELLOW_600
    }
});

Expo.registerRootComponent(App);
