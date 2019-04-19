// Third Party Imports
import React, { Component } from 'react';
import Expo, { Font, Asset, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Sentry from 'sentry-expo';
import { FontAwesome } from '@expo/vector-icons';

// Relative Imports
import cachableImages from './src/utils/cachableImages';
import RootContainer from './src/containers/RootContainer';
import LoadingApp from './src/components/LoadingApp';
import { store, persistor } from './src/store';
import { SENTRY_PUBLIC_DSN } from './src/keys/Sentry';

// To test dev logging, change to "true."
Sentry.enableInExpoDevelopment = false;
Sentry.config(SENTRY_PUBLIC_DSN).install();

// TODO: Here until a solution can be found. (Android specific)
console.ignoredYellowBox = ['Setting a timer'];

const cacheImages = images =>
    images.map(image => Asset.fromModule(image).downloadAsync());

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

const appLoadingMessages = [
    'Loading app assets...',
    'Changing into Super Hero costume...',
    'Looking for telephone booth to change...',
    'Saving kittens from trees...',
    'Stopping global warming...',
    'Using mind reading powers...',
    'Hmm...the force is strong with you...',
    'Thinking really hard...'
];

class App extends Component {
    state = {
        ready: false
    };

    loadAssetsAsync = async () => {
        const brandFonts = {
            goodtimes: require('./src/assets/fonts/goodtimes.ttf'), // eslint-disable-line global-require
            roboto: require('./src/assets/fonts/roboto.ttf') // eslint-disable-line global-require
        };

        const fonts = [brandFonts, FontAwesome.font];
        const fontAssets = cacheFonts(fonts);

        const imageAssets = cacheImages(cachableImages);

        return await Promise.all([...fontAssets, ...imageAssets]);
    };

    handleFinishLoading = () => this.setState({ ready: true });

    handleLoadingError = error => {
        // Sentry.logError
        console.warn(error);
    };

    render() {
        return !this.state.ready ? (
            <AppLoading
                startAsync={this.loadAssetsAsync}
                onFinish={this.handleFinishLoading}
                onError={this.handleLoadingError}
            />
        ) : (
            <Provider store={store}>
                <PersistGate
                    persistor={persistor}
                    loading={<LoadingApp messages={appLoadingMessages} />}
                >
                    <RootContainer />
                </PersistGate>
            </Provider>
        );
    }
}

Expo.registerRootComponent(App);
