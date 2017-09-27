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
import DeliveryDetailScreen from './screens/DeliveryDetailScreen';
import DeliveryStatusScreen from './screens/DeliveryStatusScreen';
import CartScreen from './screens/CartScreen';
import CreditCardScreen from './screens/CreditCardScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import GeneralShareScreen from './screens/GeneralShareScreen';
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
      deliveryDetail: { screen: DeliveryDetailScreen },
      deliveryStatus: { screen: DeliveryStatusScreen },
      cart: { screen: CartScreen },
      creditCard: { screen: CreditCardScreen },
      paymentMethod: { screen: PaymentMethodScreen },
      generalShare: { screen: GeneralShareScreen }
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
