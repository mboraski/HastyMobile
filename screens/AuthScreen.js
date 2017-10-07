// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    StyleSheet,
    Text,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions
} from 'react-native';
import { Button } from 'react-native-elements';

// Relative Imports
import SignUpForm from '../containers/SignUpForm';
import SignInForm from '../containers/SignInForm';
import RatingPopup from '../components/RatingPopup';
import CustomerServicePopup from '../components/CustomerPopup';
import SuccessPopup from '../components/SuccessPopup';
import OopsPopup from '../components/OopsPopup';
import ContinuePopup from '../components/ContinuePopup';
import Color from '../constants/Color';
import { emY } from '../utils/em';

const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

class AuthScreen extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        signUp: true,
        openModal: false
    };

    openSignUpForm = () => {
        this.setState({ signUp: true });
    };

    openSignInForm = () => {
        this.setState({
            signUp: false,
            openModal: true,
        });
    };

    goToMap = () => {
        this.props.navigation.navigate('map');
    };

    closeModal = () => {
        this.setState({ openModal: false });
    };

    render() {
        const signUp = this.state.signUp;
        const signUpButtonHighlighted = signUp ? styles.buttonHighlighted : null;
        const loginButtonHighlighted = !signUp ? styles.buttonHighlighted : null;
        const signUpButtonTextHighlighted = signUp ? styles.buttonTextHighlighted : null;
        const loginButtonTextHighlighted = !signUp ? styles.buttonTextHighlighted : null;
        const { openModal } = this.state;

        return (
            <ScrollView style={styles.container} keyboardDismissMode="on-drag">
                <KeyboardAvoidingView style={styles.container} behavior="position">
                    <Image source={SOURCE} style={styles.image}>
                        <Text style={styles.imageText}>HELLO</Text>
                    </Image>
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
                    {signUp ? (
                        <SignUpForm onAuthSuccess={this.goToMap} />
                    ) : (
                        <SignInForm onAuthSuccess={this.goToMap} />
                    )}
                </KeyboardAvoidingView>
                {/* <RatingPopup openModal={openModal} closeModal={this.closeModal} /> */}
                <CustomerServicePopup openModal={openModal} closeModal={this.closeModal} />
                {/* <SuccessPopup openModal={openModal} closeModal={this.closeModal} />
                <OopsPopup openModal={openModal} closeModal={this.closeModal} />
                <ContinuePopup openModal={openModal} closeModal={this.closeModal} /> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        height: SCREEN_HEIGHT / 4,
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
        paddingVertical: emY(1.8)
    },
    button: {
        minWidth: 120,
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_500,
        backgroundColor: '#fff'
    },
    buttonText: {
        color: Color.GREY_500,
        fontSize: 14
    },
    buttonHighlighted: {
        backgroundColor: Color.GREY_500,
        borderColor: '#fff'
    },
    buttonTextHighlighted: {
        color: '#fff'
    }
});

export default AuthScreen;
