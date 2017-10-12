import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import { statusBarOnly } from '../constants/Style';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Hasty', color: '#F5A623' },
    { text: 'Just sign up and set your location', color: '#F5A623' },
    { text: 'Now start accelerating your life!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    static navigationOptions = statusBarOnly;

    state = {
        welcomeScreensSeen: null
    }

    async componentWillMount() {
        const welcomeScreensSeen = await AsyncStorage.getItem('firstTimeOpened');

        if (welcomeScreensSeen) {
            this.props.navigation.navigate('checkout');
            this.setState({ welcomeScreensSeen: true });
        } else {
            this.setState({ welcomeScreensSeen: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('checkout');
    }

    render() {
        if (_.isNull(this.state.welcomeScreensSeen)) {
            return <AppLoading />;
        }

        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;
