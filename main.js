// Third Party Imports
import React, { Component } from 'react';
import Expo from 'expo';
import { StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

// Relative Imports
import SearchForHeroScreen from './screens/SearchForHeroScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import store from './store';

class App extends Component {
  componentDidMount() {
    // TODO: HAMO-28: Wire up push notifications
  }

  render() {
    const MainNavigator = StackNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          home: { screen: HomeScreen },
          searchForHero: { screen: SearchForHeroScreen }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: styles.labelStyle
          }
        })
      }
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

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 12
  }
});

Expo.registerRootComponent(App);
