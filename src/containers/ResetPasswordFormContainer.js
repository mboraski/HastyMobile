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
        const {
            handleSubmit,
            requestError,
            pending,
            resetEmailSent
        } = this.props;

        let errorMessage = '';
        if (requestError === 'auth/user-not-found') {
            errorMessage =
                'There is no user corresponding to this email address';
        }
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ textAlign: 'center' }}>
                    Forgot your password?
                </Text>
                <TouchableOpacity
                    style={[styles.resetButton, styles.buttonMargin]}
                    onPress={this.toggleResetModal}
                >
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.resetModalVisible}
                >
                    {resetEmailSent ? (
                        <View style={styles.container}>
                            <SuccessState />
                            <Text style={styles.emailText}>
                                An email to reset your password has been sent to
                                that address
                            </Text>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonMargin]}
                                onPress={this.toggleResetModal}
                            >
                                <Text style={styles.buttonText}>Done</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonMargin]}
                                onPress={handleSubmit(resetPassword)}
                            >
                                <Text style={styles.buttonText}>
                                    Send Again
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <View
                                style={{ flex: 1, justifyContent: 'flex-end' }}
                            >
                                <Text>{errorMessage}</Text>
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
                            </View>
                            <View style={{ flex: 1 }}>
                                {pending ? (
                                    <ActivityIndicator />
                                ) : (
                                    <View>
                                        <TouchableOpacity
                                            style={[
                                                styles.button,
                                                styles.buttonMargin
                                            ]}
                                            onPress={handleSubmit(
                                                resetPassword
                                            )}
                                        >
                                            <Text style={styles.buttonText}>
                                                Send Password Reset Email
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[
                                                styles.button,
                                                styles.buttonMargin
                                            ]}
                                            onPress={this.toggleResetModal}
                                        >
                                            <Text style={styles.buttonText}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    )}
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: 15,
        justifyContent: 'center'
    },
    formInputs: {
        marginBottom: emY(2.0),
        marginTop: emY(1.7)
    },
    fieldContainer: {
        backgroundColor: '#fff'
    },
    resetButton: {
        backgroundColor: Color.WHITE
    },
    resetText: {
        color: Color.GREY_500,
        textAlign: 'center',
        fontSize: emY(0.9)
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
    emailText: {
        textAlign: 'center',
        marginVertical: 20
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

const mapStateToProps = state => ({
    requestError: state.auth.error,
    pending: state.auth.pending,
    resetEmailSent: state.auth.resetEmailSent
});

export default connect(mapStateToProps)(
    reduxForm(formOptions)(ResetPasswordFormContainer)
);

// export default reduxForm(formOptions)(ResetPasswordFormContainer);
