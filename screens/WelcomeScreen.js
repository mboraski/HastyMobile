import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

// Note: this component uses logic in react over redux just for show.
// In redux app, this should be done with actions
class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token }); // we set state here to close AppLoading (lazyLoad gotcha)
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    // the navigation library automatically passes down navigation prop
    this.props.navigation.navigate('auth');
  }

  render() {
    // using isNull bc the token can be null or false and both would
    // not enter into the if statement
    if (_.isNull(this.state.token)) {
      return <AppLoading />; // keeps loading screen open
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
