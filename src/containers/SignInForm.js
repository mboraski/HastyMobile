import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';

import { signInWithEmailAndPassword, signInWithFacebook } from '../actions/authActions';
import Color from '../constants/Color';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import Spinner from '../components/Spinner';
import SuccessState from '../components/SuccessState';
import required from '../validation/required';
import validEmail from '../validation/validEmail';
import validPassword from '../validation/validPassword';
import { emY } from '../utils/em';
import { formatError } from '../utils/errors';

// const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';

class SignInForm extends Component {
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        if (props.token) {
            this.props.onAuthSuccess();
        }
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
            handleSubmit,
            signInWithFacebook
        } = this.props;
        const disabled = pending || submitting || asyncValidating || invalid || pristine;
        const submitText =
            anyTouched && invalid ? 'Please fix issues before continuing' : 'Continue';
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
                        <Spinner style={[StyleSheet.absoluteFill, styles.spinner]} />
                    ) : null}
                    {submitSucceeded ? (
                        <SuccessState
                            style={[StyleSheet.absoluteFill]}
                            onAnimationEnd={this.props.onAuthSuccess}
                        />
                    ) : null}
                </View>
                {error && <Text style={styles.signUpError}>{formatError(error)}</Text>}
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
                <Button
                    onPress={this.props.signInWithFacebook}
                    title="Login with Facebook"
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
    },
    onSubmitFail(errors, dispatch, submitError, props) {
        console.log('onSubmitFail errors: ', errors);
        console.log('onSubmitFail submitError: ', submitError);
        console.log('onSubmitFail props: ', props);
    }
};

const mapStateToProps = ({ auth }) => ({
    token: auth.token,
    initialValues: __DEV__
        ? {
              email: 'markb539@gmail.com'
          }
        : undefined
});

const mapDispatchToProps = {
    signInWithFacebook,
    signInWithEmailAndPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(SignInForm));
