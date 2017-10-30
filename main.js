// Third Party Imports
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { PersistGate } from 'redux-persist';

// Relative Imports
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
        <PersistGate
            persistor={persistor}
            loading={
                <Spinner
                    style={[StyleSheet.absoluteFill, styles.spinner]}
                />
            }
        >
            <Provider store={store}>
                <RootContainer />
            </Provider>
        </PersistGate>
    );
  }
}

const styles = StyleSheet.create({
    spinner: {
        backgroundColor: Color.WHITE
    },

Expo.registerRootComponent(App);
