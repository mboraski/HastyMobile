// Third Party Imports
import React, { Component } from 'react';
import Expo from 'expo';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

// Relative Imports
import SearchForHeroScreen from './screens/SearchForHeroScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import DeliveryStatusScreen from './screens/DeliveryStatusScreen';
import CartScreen from './screens/CartScreen';
import store from './store';

class App extends Component {
  componentDidMount() {
    // TODO: HAMO-28: Wire up push notifications
  }

  render() {
    const MainNavigator = StackNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      map: { screen: MapScreen },
      home: { screen: HomeScreen },
      searchForHero: { screen: SearchForHeroScreen },
      deliveryStatus: { screen: DeliveryStatusScreen },
      cart: { screen: CartScreen }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
