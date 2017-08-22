// 3rd Party Libraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

// Relative Imports
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';


class AuthScreen extends Component {
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
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

export default AuthScreen;
