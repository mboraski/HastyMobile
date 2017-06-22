// 3rd Party Libraries
import Expo from 'expo';
import React from 'react';
import firebase from 'firebase';
// import { TabNavigator, StackNavigator } from 'react-navigation';

// Relative Imports
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

// Styles
import { StyleSheet, Text, View } from 'react-native';


class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyBEIuNlAAKU8byP2NUptaZTPtHobhYqMQA",
      authDomain: "hasty-14d18.firebaseapp.com",
      databaseURL: "https://hasty-14d18.firebaseio.com",
      projectId: "hasty-14d18",
      storageBucket: "hasty-14d18.appspot.com",
      messagingSenderId: "734280961973"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

Expo.registerRootComponent(App);
