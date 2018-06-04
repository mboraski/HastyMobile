// 3rd Party Libraries
import React, { Component } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import SignInForm from '../containers/SignInForm';
import SignUpForm from '../containers/SignUpForm';
import { signInWithFacebook } from '../actions/authActions';
import { reset } from '../actions/navigationActions';
import { listCards } from '../actions/paymentActions';
// import RatingPopup from '../components/RatingPopup';
// import CommunicationPopup from '../components/CommunicationPopup';
// import SuccessPopup from '../components/SuccessPopup';
// import OopsPopup from '../components/OopsPopup';
// import ContinuePopup from '../components/ContinuePopup';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import { statusBarOnly } from '../constants/Style';
import { emY } from '../utils/em';

// TODO: replace with real image that gets fetched
const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };
// TODO: add width then use for drawer width. Save to store.

class AuthScreen extends Component {
    static navigationOptions = statusBarOnly;

    state = {
        signUp: true,
        openModal: false
    };

    componentDidMount() {
        if (this.props.firstTimeOpened) {
            this.props.navigation.dispatch(reset('welcome'));
        }
    }

    openSignUpForm = () => {
        this.setState({ signUp: true });
    };

    openSignInForm = () => {
        this.setState({
            signUp: false,
            openModal: true
        });
    };

    goToMap = () => {
        this.props.navigation.navigate('map');
    };

    goToPayment = async () => {
        const result = await this.props.listCards(this.props.user.uid);
        if (result.paymentInfo && result.paymentInfo.total_count === 0) {
            this.props.navigation.navigate('map');
            this.props.navigation.navigate('paymentMethod', { signedUp: true });
        } else {
            this.props.navigation.navigate('map');
        }
    };

    closeModal = () => {
        this.setState({ openModal: false });
    };

    render() {
        const signUp = this.state.signUp;
        const signUpButtonHighlighted = signUp
            ? styles.buttonHighlighted
            : null;
        const loginButtonHighlighted = !signUp
            ? styles.buttonHighlighted
            : null;
        const signUpButtonTextHighlighted = signUp
            ? styles.buttonTextHighlighted
            : null;
        const loginButtonTextHighlighted = !signUp
            ? styles.buttonTextHighlighted
            : null;

        return (
            <ScrollView style={styles.container} keyboardDismissMode="on-drag">
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="position"
                >
                    <ImageBackground source={SOURCE} style={styles.image}>
                        <Text style={styles.imageText}>HELLO</Text>
                    </ImageBackground>
                    <View style={styles.buttonsRow}>
                        <Button
                            title="Sign Up"
                            buttonStyle={[
                                styles.button,
                                signUpButtonHighlighted
                            ]}
                            textStyle={[
                                styles.buttonText,
                                signUpButtonTextHighlighted
                            ]}
                            onPress={this.openSignUpForm}
                        />
                        <Button
                            title="Log In"
                            buttonStyle={[
                                styles.button,
                                loginButtonHighlighted
                            ]}
                            textStyle={[
                                styles.buttonText,
                                loginButtonTextHighlighted
                            ]}
                            onPress={this.openSignInForm}
                        />
                    </View>
                    {signUp ? (
                        <SignUpForm onAuthSuccess={this.goToPayment} />
                    ) : (
                        <SignInForm onAuthSuccess={this.goToMap} />
                    )}
                </KeyboardAvoidingView>
                {/* <RatingPopup openModal={openModal} closeModal={this.closeModal} />
                <CommunicationPopup openModal={openModal} closeModal={this.closeModal} />
                <SuccessPopup openModal={openModal} closeModal={this.closeModal} />
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
        height: Dimensions.window.height / 4,
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
        paddingVertical: emY(1)
    },
    button: {
        minWidth: 120,
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_500,
        backgroundColor: '#fff',
        height: emY(3)
    },
    buttonText: {
        color: Color.GREY_500,
        fontSize: emY(1)
    },
    buttonHighlighted: {
        backgroundColor: Color.GREY_500,
        borderColor: '#fff'
    },
    buttonTextHighlighted: {
        color: '#fff'
    }
});

const mapStateToProps = state => ({
    user: state.auth.user,
    firstTimeOpened: state.ui.firstTimeOpened
});

const mapDispatchToProps = {
    listCards
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
