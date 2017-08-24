// 3rd Party Libraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';

// Relative Imports
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import Color from '../constants/Color';

const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };

class AuthScreen extends Component {
    state = { signUp: true };

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    openSignUpForm = () => {
        this.setState({ signUp: true });
    };

    openSignInForm = () => {
        this.setState({ signUp: false });
    };

    render() {
        const signUp = this.state.signUp;
        const signUpButtonHighlighted = signUp ? styles.buttonHighlighted : null;
        const loginButtonHighlighted = !signUp ? styles.buttonHighlighted : null;
        const signUpButtonTextHighlighted = signUp ? styles.buttonTextHighlighted : null;
        const loginButtonTextHighlighted = !signUp ? styles.buttonTextHighlighted : null;
        const form = signUp ? <SignUpForm /> : <SignInForm />;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={SOURCE} style={[styles.image]}>
                        <Text style={styles.imageText}>HELLO</Text>
                    </Image>
                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        title="Sign Up"
                        buttonStyle={[styles.button, signUpButtonHighlighted]}
                        textStyle={[styles.buttonText, signUpButtonTextHighlighted]}
                        onPress={this.openSignUpForm}
                    />
                    <Button
                        title="Log In"
                        buttonStyle={[styles.button, loginButtonHighlighted]}
                        textStyle={[styles.buttonText, loginButtonTextHighlighted]}
                        onPress={this.openSignInForm}
                    />
                </View>
                {form}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageContainer: {},
    image: {
        flexGrow: 1,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 35,
        textAlign: 'center',
        letterSpacing: 5
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 40
    },
    button: {
        minWidth: 120,
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_100,
        backgroundColor: '#fff'
    },
    buttonText: {
        color: Color.GREY_100,
        fontSize: 14
    },
    buttonHighlighted: {
        backgroundColor: Color.GREY_100,
        borderColor: '#fff'
    },
    buttonTextHighlighted: {
        color: '#fff'
    }
});

export default AuthScreen;
