// Third Party Imports
import React, { Component } from 'react';
import Expo from 'expo';
import { Provider } from 'react-redux';

// Relative Imports
import RootContainer from './screens/RootContainer';
import store from './store';

class App extends Component {
  componentDidMount() {
    // TODO: HAMO-28: Wire up push notifications
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
