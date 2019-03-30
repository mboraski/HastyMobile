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

class ResetPasswordContainer extends Component {
    toggleResetModal = () => {
        this.setState(prevState => ({
            resetModalVisible: !prevState.resetModalVisible
        }));
    };
    render() {
        return (
            <View>
                <Text>Forgot your password?</Text>
                <TouchableOpacity onPress={this.toggleResetModal}>
                    <Text>Reset</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.resetModalVisible}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                borderColor: 'gray',
                                borderWidth: 1,
                                textAlign: 'center'
                            }}
                            onChangeText={text =>
                                this.setState({ resetEmail: text })
                            }
                            value={this.state.resetEmail}
                            keyboardType="email-address"
                        />
                        <TouchableOpacity
                            onPress={() => resetPassword(this.state.resetEmail)}
                        >
                            <Text>Send Reset Email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleResetModal}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}
