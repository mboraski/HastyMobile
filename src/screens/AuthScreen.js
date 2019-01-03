// 3rd Party Libraries
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import { firebaseAuth } from '../../firebase';
import SignInFormContainer from '../containers/SignInFormContainer';
import SignUpFormContainer from '../containers/SignUpFormContainer';
import { facebookLogin, googleLogin } from '../actions/authActions';
import { getUser } from '../selectors/authSelectors';
import { getFirstTimeOpened } from '../selectors/uiSelectors';
import { emY } from '../utils/em';
import googleLogo from '../assets/icons/google-logo-white.png';
import facebookLogo from '../assets/icons/facebook_white.png';

import Color from '../constants/Color';
import { statusBarOnly } from '../constants/Style';
// TODO: add width then use for drawer width. Save to store.

class AuthScreen extends Component {
    static navigationOptions = statusBarOnly;

    state = {
        signUp: true,
        openModal: false
    };

    componentWillMount() {
        const navParams = this.props.navigation.state.params || {};
        if (navParams && navParams.logIn) {
            this.setState({ signUp: false });
        }
    }

    componentDidMount() {
        if (firebaseAuth.currentUser) {
            this.props.navigation.navigate('map');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && firebaseAuth.currentUser) {
            this.props.navigation.navigate('map');
        }
    }

    facebookLogin = () => this.props.facebookLogin();

    googleLogin = () => this.props.googleLogin();

    openSignUpForm = () => {
        this.setState({ signUp: true });
    };

    openSignInForm = () => {
        this.setState({
            signUp: false,
            openModal: true
        });
    };

    closeModal = () => {
        this.setState({ openModal: false });
    };

    render() {
        const { navigation } = this.props;
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
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView style={styles.container} keyboardDismissMode="none">
                    <View style={styles.buttonsRow}>
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
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.socialButton,
                            styles.facebookSocialButton
                        ]}
                        onPress={this.facebookLogin}
                    >
                        <Image
                            style={styles.facebookLogo}
                            source={facebookLogo}
                            resizeMode={'contain'}
                        />
                        <Text style={styles.facebookText}>
                            {'Continue with Facebook'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.socialButton, styles.googleSocialButton]}
                        onPress={this.googleLogin}
                    >
                        <Image
                            style={styles.googleLogo}
                            source={googleLogo}
                            resizeMode={'contain'}
                        />
                        <Text style={styles.googleText}>
                            {'Continue with Google'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.secondaryText}>
                        or continue with email
                    </Text>
                    <View style={styles.emailForm}>
                        {signUp && (
                            <SignUpFormContainer navigation={navigation} />
                        )}
                        {!signUp && (
                            <SignInFormContainer navigation={navigation} />
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: emY(1)
    },
    button: {
        minWidth: 120,
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.DEFAULT,
        backgroundColor: Color.DEFAULT,
        height: emY(3),
        padding: 0
    },
    buttonText: {
        color: '#fff',
        fontSize: emY(1)
    },
    socialButton: {
        height: emY(3),
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 5
    },
    googleSocialButton: {
        backgroundColor: Color.GOOGLE_BLUE,
        marginBottom: 10
    },
    googleLogo: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: emY(3),
        width: emY(3),
        borderRadius: 5
    },
    googleText: {
        flex: 1,
        textAlign: 'center',
        fontSize: emY(1.3),
        color: '#fff',
        fontFamily: 'roboto'
    },
    facebookSocialButton: {
        backgroundColor: Color.FACEBOOK_BLUE,
        marginBottom: 15
    },
    facebookLogo: {
        position: 'absolute',
        left: emY(3) / 2 - emY(2) / 2.138 / 2,
        top: emY(0.5),
        height: emY(2)
    },
    facebookText: {
        flex: 1,
        textAlign: 'center',
        fontSize: emY(1.3),
        color: '#fff',
        fontFamily: 'roboto'
    },
    secondaryText: {
        color: Color.GREY_700,
        fontSize: emY(1),
        justifyContent: 'center',
        textAlign: 'center',
        marginVertical: 10
    },
    buttonHighlighted: {
        backgroundColor: Color.GREY_500,
        borderColor: Color.GREY_500
    },
    buttonTextHighlighted: {
        color: '#fff'
    },
    emailForm: {
        backgroundColor: '#fff'
    }
});

const formOptions = {
    form: 'SignUp',
    validate(values) {
        const errors = {};
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        } else if (
            !values.firstName ||
            !values.lastName ||
            !values.email ||
            !values.number ||
            !values.password ||
            !values.confirmPassword
        ) {
            errors.missingValues = 'Some form field values are missing';
        }
        return errors;
    }
};

const mapStateToProps = state => ({
    user: getUser(state),
    firstTimeOpened: getFirstTimeOpened(state)
});

const mapDispatchToProps = {
    facebookLogin,
    googleLogin
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthScreen);
