// Third Party Imports
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Expo from 'expo';
import { Provider } from 'react-redux';
import firebase from 'firebase';

// Relative Imports
import RootContainer from './screens/RootContainer';
import store from './store';

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
          AsyncStorage.setItem('auth_token', null);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
