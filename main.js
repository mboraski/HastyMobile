// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, Platform, ActivityIndicator } from 'react-native';
import Expo, { Font } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import firebase from 'firebase';

// Relative Imports
import splashImage from './src/assets/splash.png';
import Color from './src/constants/Color';
import RootContainer from './src/containers/RootContainer';
import { store, persistor } from './src/store';

class App extends Component {
    state = {
        fontLoaded: false
    };

    async componentDidMount() {
        const config = {
            apiKey: 'AIzaSyBEIuNlAAKU8byP2NUptaZTPtHobhYqMQA',
            authDomain: 'hasty-14d18.firebaseapp.com',
            databaseURL: 'https://hasty-14d18.firebaseio.com',
            projectId: 'hasty-14d18',
            storageBucket: 'hasty-14d18.appspot.com',
            messagingSenderId: '734280961973'
        };

        firebase.initializeApp(config);

        const fonts = {
            goodtimes: require('./src/assets/fonts/goodtimes.ttf') // eslint-disable-line global-require
        };

        if (Platform.OS === 'android') {
            fonts.Arial = require('./src/assets/fonts/arial.ttf'); // eslint-disable-line global-require
        }

        await Font.loadAsync(fonts);
        this.setState({ fontLoaded: true });
    }

    render() {
        return this.state.fontLoaded ? (
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
                    <React.StrictMode>
                        <RootContainer />
                    </React.StrictMode>
                </PersistGate>
            </Provider>
        ) : (
            <ActivityIndicator size={'large'} />
        );
    }
}

const styles = StyleSheet.create({
    splash: {
        backgroundColor: Color.YELLOW_600
    }
});

Expo.registerRootComponent(App);
