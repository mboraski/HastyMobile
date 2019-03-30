import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { resetPassword } from '../actions/authActions';

import Color from '../constants/Color';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import SuccessState from '../components/SuccessState';
import Text from '../components/Text';
import TextInput from '../components/TextInput';

import required from '../validation/required';
import validEmail from '../validation/validEmail';

import { emY } from '../utils/em';
import { formatError } from '../utils/errors';

class ResetPasswordFormContainer extends Component {
    state = { resetModalVisible: false };
    toggleResetModal = () => {
        this.setState(prevState => ({
            resetModalVisible: !prevState.resetModalVisible
        }));
    };
    render() {
        const { handleSubmit } = this.props;
        return (
            <View>
                <Text>Forgot your password?</Text>
                <TouchableOpacity
                    style={[styles.button, styles.buttonMargin]}
                    onPress={this.toggleResetModal}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.resetModalVisible}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center'
                        }}
                    >
                        <View style={styles.formInputs}>
                            <InlineLabelTextInputField
                                autoCapitalize={'none'}
                                containerStyle={styles.fieldContainer}
                                name="email"
                                label="Email"
                                keyboardType="email-address"
                                validate={[required, validEmail]}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonMargin]}
                            onPress={handleSubmit(resetPassword)}
                        >
                            <Text style={styles.buttonText}>
                                Send Reset Email
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonMargin]}
                            onPress={this.toggleResetModal}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
        paddingHorizontal: 20,
        marginBottom: 15
    },
    formInputs: {
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
        borderRadius: 5,
        backgroundColor: Color.DEFAULT,
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
        paddingBottom: emY(1.5)
    }
});

const formOptions = {
    form: 'ResetPassword',
    validate(values) {
        const errors = {};
        if (!values.email) {
            errors.missingValues = 'Please provide a valid email address';
        }
        return errors;
    }
};

export default reduxForm(formOptions)(ResetPasswordFormContainer);
