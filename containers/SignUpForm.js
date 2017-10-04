import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import AuthActions from '../actions/authActions';
import Color from '../constants/Color';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import Spinner from '../components/Spinner';
import SuccessState from '../components/SuccessState';
import required from '../validation/required';
import validEmail from '../validation/validEmail';
import validPhoneNumber from '../validation/validPhoneNumber';
import validPassword from '../validation/validPassword';
import { emY } from '../utils/em';

const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';

class SignUpForm extends Component {
    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        if (props.token) {
            this.props.onAuthSuccess();
        }
    };

    render() {
        const {
            facebookLogin,
            submit,
            anyTouched,
            pending,
            submitting,
            submitSucceeded,
            asyncValidating,
            invalid,
            pristine
        } = this.props;
        const disabled = pending || submitting || asyncValidating || invalid || pristine;
        const submitText =
            anyTouched && invalid ? 'Please fix issues before continuing' : 'Create Account';
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField
                        containerStyle={styles.fieldContainer}
                        name="name"
                        label="Name"
                        validate={[required]}
                    />
                    <InlineLabelTextInputField
                        containerStyle={styles.fieldContainer}
                        name="email"
                        label="Email"
                        keyboardType="email-address"
                        validate={[required, validEmail]}
                    />
                    <InlineLabelTextInputField
                        containerStyle={styles.fieldContainer}
                        name="number"
                        label="Phone Number"
                        keyboardType="phone-pad"
                        validate={[required, validPhoneNumber]}
                    />
                    <InlineLabelTextInputField
                        containerStyle={styles.fieldContainer}
                        name="password"
                        label="Password"
                        secureTextEntry
                        validate={[required, validPassword]}
                    />
                    <InlineLabelTextInputField
                        containerStyle={styles.fieldContainer}
                        name="confirmPassword"
                        label="Confirm Password"
                        secureTextEntry
                        validate={[required, validPassword]}
                    />
                    {submitting ? (
                        <Spinner style={[StyleSheet.absoluteFill, styles.spinner]} />
                    ) : null}
                    {submitSucceeded ? (
                        <SuccessState
                            style={StyleSheet.absoluteFill}
                            onAnimationEnd={this.props.onAuthSuccess}
                        />
                    ) : null}
                </View>
                <TouchableOpacity
                    onPress={submit}
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
                    onPress={facebookLogin}
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
    container: {
        flex: 1,
        marginBottom: 15
    },
    formInputs: {
        paddingHorizontal: 15,
        marginBottom: 50
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
    buttonIcon: {
        marginRight: 10
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
    }
});

const formOptions = {
    form: 'SignUp',
    validate(values) {
        const errors = {};
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords must match';
        }
        return errors;
    },
    async onSubmit(values) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await axios.post(`${ROOT_URL}/createUser`, { phone: values.number });
        return axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: values.number });
    }
};

const mapStateToProps = ({ auth }) => ({ token: auth.token });

const mapDispatchToProps = dispatch => {
    const authActions = bindActionCreators(AuthActions, dispatch);

    return {
        actions: {
            facebookLogin: authActions.facebookLogin
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(SignUpForm));
