// 3rd Party Libraries
import Expo from 'expo';
import React, {Component} from 'react';
// import firebase from 'firebase';
import { StyleSheet, Text, View, Alert } from 'react-native';
// import { TabNavigator, StackNavigator } from 'react-navigation';
// import { Provider } from 'react-redux';

// Relative Imports
// import registerForNotifications from './services/push_notifications';
// import store from './store';
// import AuthScreen from './screens/AuthScreen';
// import WelcomeScreen from './screens/WelcomeScreen';
// import MapScreen from './screens/MapScreen';
// import DeckScreen from './screens/DeckScreen';
// import SettingsScreen from './screens/SettingsScreen';
// import ReviewScreen from './screens/ReviewScreen';


class App extends Component {
  componentDidMount() {
    // registerForNotifications();
    // Notifications.addListener((notification) => {
    //   const { data: { text }, origin } = notification;
    //
    //   if (origin === 'received' && text) {
    //     Alert.alert(
    //       'New Push Notification',
    //       text,
    //       [{ text: 'Ok.' }]
    //     );
    //   }
    // });
    // const config = {
    //   apiKey: "AIzaSyBEIuNlAAKU8byP2NUptaZTPtHobhYqMQA",
    //   authDomain: "hasty-14d18.firebaseapp.com",
    //   databaseURL: "https://hasty-14d18.firebaseio.com",
    //   projectId: "hasty-14d18",
    //   storageBucket: "hasty-14d18.appspot.com",
    //   messagingSenderId: "734280961973"
    // };
    // firebase.initializeApp(config);
  }

  render() {
    // const MainNavigator = TabNavigator({
    //   welcome: { screen: WelcomeScreen },
    //   auth: { screen: AuthScreen },
    //   main: {
    //     screen: TabNavigator({
    //       map: { screen: MapScreen },
    //       deck: { screen: DeckScreen },
    //       review: {
    //         screen: StackNavigator({
    //           review: { screen: ReviewScreen },
    //           settings: { screen: SettingsScreen }
    //         })
    //       }
    //     }, {
    //       tabBarPosition: 'bottom',
    //       tabBarOptions: {
    //         labelStyle: { fontSize: 12 }
    //       }
    //     })
    //   }
    // }, {
    //   tabBarOptions: {
    //     tabBar: { visible: false }
    //   },
    //   lazy: true
    // }); // Note: as of react navigation beta 9, lazyLoad has become lazy!

    return (
        <View><Text>Hello</Text></View>
    );
  }
}
// <Provider store={store}>
// </Provider>

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: '#ff4',
//     flex: 1,
//     justifyContent: 'center'
//   },
// });


Expo.registerRootComponent(App);
