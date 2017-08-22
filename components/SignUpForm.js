import React, { Component } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';

class SignUpForm extends Component {
    state = { phone: '' };

    handleSubmit = async () => {
        try {
            await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone });
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })}
                                style={styles.textInput}
                            />
                        </View>
                    </View>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                                style={styles.textInput}
                                keyboardType="email-address"
                            />
                        </View>
                    </View>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={this.state.phoneNumber}
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                                style={styles.textInput}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                    <View style={styles.formInputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                    <View style={[styles.formInputGroup, { marginBottom: 20 }]}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                </View>
                <Button onPress={this.handleSubmit} title="Create Account" backgroundColor="#000" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15
    },
    formInputs: { flex: 1, paddingHorizontal: 15 },
    formInputGroup: {
        flexDirection: 'row',
        borderColor: '#9A9A9A',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center'
    },
    label: {
        color: '#000',
        fontWeight: 'normal',
        paddingVertical: 10,
        marginRight: 15
    },
    textInputContainer: {
        flex: 1
    },
    textInput: { flex: 1, textAlign: 'right' },
    button: {
        width: 120,
        borderRadius: 25
    },
    buttonText: {
        color: '#fff',
        fontSize: 14
    }
});

export default SignUpForm;
