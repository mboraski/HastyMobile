import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import axios from 'axios';
import { reduxForm } from 'redux-form';

import Color from '../constants/Color';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import required from '../validation/required';
import validEmail from '../validation/validEmail';
import validPhoneNumber from '../validation/validPhoneNumber';
import validPassword from '../validation/validPassword';
import { emY } from '../utils/em';

const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';

export class SignUpForm extends Component {
    render() {
        const {
            submit,
            anyTouched,
            pending,
            submitting,
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
                </View>
                <TouchableOpacity
                    onPress={submit}
                    style={[styles.button, anyTouched && invalid && styles.buttonInvalid]}
                    disabled={disabled}
                >
                    <Text style={styles.buttonText}>{submitText}</Text>
                </TouchableOpacity>
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
    button: {
        backgroundColor: '#000',
        marginHorizontal: 25,
        paddingVertical: emY(1)
    },
    buttonInvalid: {
        backgroundColor: Color.RED_500
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: emY(0.9)
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
        await axios.post(`${ROOT_URL}/createUser`, { phone: values.number });
        return axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: values.number });
    }
};

export default reduxForm(formOptions)(SignUpForm);
