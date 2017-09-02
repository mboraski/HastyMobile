import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Hasty', color: '#03A9F4' },
  { text: 'Just sign up and set your location', color: '#009688' },
  { text: 'Now start accelerating your life!', color: '#03A9F4' }
];

// Note: Just experimenting with this screen series, so it is out of redux flow
class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token }); // we set state here to close AppLoading (lazyLoad gotcha)
    } else {
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('map');
  }

  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
