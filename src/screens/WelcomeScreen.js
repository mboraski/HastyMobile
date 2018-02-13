import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';

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
    };

    async componentWillMount() {
        const welcomeScreensSeen = await AsyncStorage.getItem(
            'firstTimeOpened'
        );

        if (welcomeScreensSeen) {
            if (this.props.user) {
                this.props.navigation.navigate('map');
            } else {
                this.props.navigation.navigate('auth');
            }
            this.setState({ welcomeScreensSeen: true });
        } else {
            this.setState({ welcomeScreensSeen: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    };

    render() {
        if (_.isNull(this.state.welcomeScreensSeen)) {
            return <AppLoading />;
        }

        return <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />;
    }
}

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(mapStateToProps)(WelcomeScreen);
