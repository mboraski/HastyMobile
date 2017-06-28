// 3rd Party Libraries
import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import * as actions from '../actions';
// import SignUpForm from '../components/SignUpForm';
// import SignInForm from '../components/SignInForm';


class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props); // this call isn't necessary here right now
  }

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
      <View />
    );
  }
}
// <View style={styles.container}>
//   <SignUpForm />
//   <SignInForm />
// </View>

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
// });

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
