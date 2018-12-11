import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { firebaseAuth } from '../../firebase';
import { statusBarOnly } from '../constants/Style';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import Slides from '../components/Slides';
import { setFirstTimeOpened } from '../actions/uiActions';
import { getUser } from '../selectors/authSelectors';
import logoHeader from '../assets/LogoWithIconOrangeWithWhiteBackground.png';

const SLIDE_DATA = [
    {
        text:
            'Welcome to Hasty, the FASTEST delivery network ever! Swipe left to continue.'
    },
    {
        text:
            'Just sign up, set your location, and fill your cart up with products. Swipe left to continue.'
    },
    {
        text:
            'Light a beacon and a Hero will arrive with your products shortly!'
    }
];

class WelcomeScreen extends Component {
    static navigationOptions = statusBarOnly;

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && firebaseAuth.currentUser) {
            this.props.navigation.navigate('map');
        }
    }

    logIn = () => {
        this.props.navigation.navigate('auth', { logIn: true });
    };

    signUp = () => {
        this.props.navigation.navigate('auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoHeaderWrapper}>
                    <Image style={styles.logoHeader} source={logoHeader} />
                </View>
                <Slides data={SLIDE_DATA} />
                <Button
                    onPress={this.logIn}
                    title="Login"
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.signInButton}
                    textStyle={styles.signInButtonText}
                />
                <Button
                    onPress={this.signUp}
                    title="Get Started"
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.signUpButton}
                    textStyle={styles.signUpButtonText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    logoHeaderWrapper: {
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoHeader: {
        width: 223,
        height: 40
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0
    },
    signInButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 5,
        marginHorizontal: 15,
        justifyContent: 'center',
        height: emY(4)
    },
    signUpButton: {
        backgroundColor: Color.DEFAULT,
        borderRadius: 5,
        borderColor: Color.DEFAULT,
        borderWidth: 1,
        marginVertical: 15,
        marginHorizontal: 15,
        justifyContent: 'center',
        height: emY(4)
    },
    signInButtonText: {
        color: '#000',
        textAlign: 'center',
        fontSize: emY(1.5)
    },
    signUpButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: emY(1.5)
    }
});

const mapStateToProps = state => ({
    user: getUser(state)
});

const mapDispatchToProps = {
    setFirstTimeOpened
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WelcomeScreen);
