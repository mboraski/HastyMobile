import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

// const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';

class SignInForm extends Component {
    state = { phone: '', code: '' };

    handleSubmit = async () => {
        try {
            const data = { token: '209nv2049vm' };

            // use the returned JWT
            firebase.auth().signInWithCustomToken(data.token);
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formInputs}>
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
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            style={styles.textInput}
                            secureTextEntry
                        />
                    </View>
                </View>
                <Button
                    onPress={this.handleSubmit}
                    title="Continue"
                    backgroundColor="#000"
                    buttonStyle={{ marginBottom: 10 }}
                />
                <Button
                    onPress={this.facebookLogin}
                    title="Login with Facebook"
                    backgroundColor="#000"
                    icon={{
                        type: 'material-community',
                        name: 'facebook-box',
                        color: '#fff',
                        size: 25
                    }}
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

export default SignInForm;
