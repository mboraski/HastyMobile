import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';

import {
    signInWithEmailAndPassword,
    signInWithFacebook
} from '../actions/authActions';
import Color from '../constants/Color';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import LogoSpinner from '../components/LogoSpinner';
import SuccessState from '../components/SuccessState';
import Text from '../components/Text';
import { getUser } from '../selectors/authSelectors';
import required from '../validation/required';
import validEmail from '../validation/validEmail';
import validPassword from '../validation/validPassword';
import { emY } from '../utils/em';
import { formatError } from '../utils/errors';

class SignInForm extends Component {
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        if (props.user && !this.props.user) {
            this.props.onAuthSuccess();
        }
    };

    signInWithFacebook = () => {
        this.props
            .signInWithFacebook()
            .catch(error => Alert.alert('Error', error.message));
    };

    render() {
        // TODO: Show correctly login failure notice. Part of store.
        const {
            anyTouched,
            pending,
            submitting,
            submitSucceeded,
            asyncValidating,
            invalid,
            pristine,
            error,
            handleSubmit
        } = this.props;
        const disabled =
            pending || submitting || asyncValidating || invalid || pristine;
        const submitText =
            anyTouched && invalid
                ? 'Please fix issues before continuing'
                : 'Continue';
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField
                        autoCapitalize={'none'}
                        containerStyle={styles.fieldContainer}
                        name="email"
                        label="Email"
                        keyboardType="email-address"
                        validate={[required, validEmail]}
                    />
                    <InlineLabelTextInputField
                        autoCapitalize={'none'}
                        containerStyle={styles.fieldContainer}
                        name="password"
                        label="Password"
                        secureTextEntry
                        validate={[required, validPassword]}
                    />
                    {submitting ? (
                        <LogoSpinner
                            style={[StyleSheet.absoluteFill, styles.spinner]}
                        />
                    ) : null}
                    {submitSucceeded ? (
                        <SuccessState
                            style={[StyleSheet.absoluteFill]}
                            onAnimationEnd={this.props.onAuthSuccess}
                        />
                    ) : null}
                </View>
                {error && (
                    <Text style={styles.signUpError}>{formatError(error)}</Text>
                )}
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                        styles.button,
                        styles.buttonMargin,
                        !anyTouched && invalid && styles.buttonDisabled,
                        anyTouched && invalid && styles.buttonInvalid
                    ]}
                    disabled={disabled}
                >
                    <Text style={styles.buttonText}>{submitText}</Text>
                </TouchableOpacity>
                {/* <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(promoCode) => this.setState({ promoCode })}
                    value={this.state.promoCode}
                /> */}
                <Text style={styles.legalText}>
                    By signing up, you agree to the Terms of Service found here:
                    https://www.myhasty.com/terms.html & Privacy Policy fround
                    here: https://www.myhasty.com/privacy.html
                </Text>
                <Button
                    onPress={this.signInWithGoogle}
                    title="Sign In with Google"
                    icon={{
                        type: 'material-community',
                        name: 'google-plus-box',
                        color: '#fff',
                        size: 25
                    }}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                <Button
                    onPress={this.signInWithGithub}
                    title="Sign In with Github"
                    icon={{
                        type: 'material-community',
                        name: 'github-circle',
                        color: '#fff',
                        size: 25
                    }}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                <Button
                    onPress={this.signInWithFacebook}
                    title="Sign In with Facebook"
                    icon={{
                        type: 'material-community',
                        name: 'facebook-box',
                        color: '#fff',
                        size: 25
                    }}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                <Button
                    onPress={this.signInWithTwitter}
                    title="Sign In with Twitter"
                    icon={{
                        type: 'material-community',
                        name: 'twitter-circle',
                        color: '#fff',
                        size: 25
                    }}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    authState: {
        paddingBottom: emY(2)
    },
    container: {
        flex: 1,
        marginBottom: 15
    },
    formInputs: {
        paddingHorizontal: 15,
        marginBottom: emY(2.0),
        marginTop: emY(1.7)
    },
    fieldContainer: {
        backgroundColor: '#fff'
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0
    },
    button: {
        backgroundColor: '#000',
        marginHorizontal: 25,
        justifyContent: 'center',
        height: emY(3)
    },
    buttonDisabled: {
        backgroundColor: Color.GREY_500
    },
    buttonInvalid: {
        backgroundColor: Color.RED_500
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: emY(0.9)
    },
    buttonMargin: {
        marginBottom: 10
    },
    spinner: {
        backgroundColor: Color.WHITE
    },
    signUpError: {
        color: Color.RED_500,
        textAlign: 'center',
        fontSize: emY(0.9),
        paddingHorizontal: 15,
        paddingBottom: emY(1.5)
    }
});

const formOptions = {
    form: 'SignIn',
    onSubmit(values, dispatch, props) {
        return props.signInWithEmailAndPassword(values).catch(error => {
            throw new SubmissionError({ _error: error.message });
        });
    }
};

const mapStateToProps = state => ({
    user: getUser(state),
    initialValues: __DEV__
        ? {
              email: 'example@email.com'
          }
        : undefined
});

const mapDispatchToProps = {
    signInWithFacebook,
    signInWithEmailAndPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm(formOptions)(SignInForm)
);
