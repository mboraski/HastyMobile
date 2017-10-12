// Third Party Imports
import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

// Relative Imports
import { Spinner } from './common';
import Color from '../constants/Color';

// const ROOT_URL = 'https://us-central1-hasty-14d18.cloudfunctions.net';
type Props = {
    token: string,
    fbLoginError: string
}

class SignInForm extends Component {
    static defaultProps = {
        token: '',
        fbLoginError: ''
    }

    state = {
        email: '',
        password: '',
        loading: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.fbLoginError) {
            // TODO: show error state
            this.setState({ loading: false });
        }
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        console.log('onAuthComplete props: ', props);
        if (props.token) {
            this.setState({ loading: false });
            // this.props.navigation.navigate('map');
        }
    }

    props: Props;

    handleEmail = email => {
        this.setState({ email });
    }

    handlePassword = password => {
        this.setState({ password });
    }

    handleFacebookLogin = () => {
        const { facebookLogin } = this.props;
        // this.setState({ loading: true });
        facebookLogin();
    }

    render() {
        switch (this.state.loading) {
            case true:
                return <Spinner size="large" />;
            case false:
                return (
                    <View style={styles.container}>
                        <View style={styles.formInputs}>
                            <View style={styles.formInputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <View style={styles.textInputContainer}>
                                    <TextInput
                                        value={this.state.email}
                                        onChangeText={this.handleEmail}
                                        style={styles.textInput}
                                        keyboardType="email-address"
                                    />
                                </View>
                            </View>
                            <View style={styles.formInputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    value={this.state.password}
                                    onChangeText={this.handlePassword}
                                    style={styles.textInput}
                                    secureTextEntry
                                />
                            </View>
                        </View>
                        <Button
                            onPress={this.handleSubmit}
                            title="Continue"
                            buttonStyle={[styles.button, styles.buttonMargin]}
                        />
                        <Button
                            onPress={this.handleFacebookLogin}
                            title="Login with Facebook"
                            icon={{
                                type: 'material-community',
                                name: 'facebook-box',
                                color: '#fff',
                                size: 25
                            }}
                            buttonStyle={styles.button}
                        />
                    </View>
                );
            default:
                return <Spinner size="large" />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15
    },
    formInputs: {
        flex: 1,
        paddingHorizontal: 15
    },
    formInputGroup: {
        flexDirection: 'row',
        borderColor: Color.GREY_500,
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
    textInput: {
        flex: 1,
        textAlign: 'right'
    },
    button: {
        backgroundColor: '#000'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14
    },
    buttonMargin: {
        marginBottom: 10
    }
});

export default SignInForm;
