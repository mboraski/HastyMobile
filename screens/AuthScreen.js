// 3rd Party Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { bindActionCreators } from 'redux';

// Relative Imports
import AuthActions from '../actions/authActions';
import SignUpForm from '../components/SignUpForm';
import SignInForm from '../components/SignInForm';
import Color from '../constants/Color';

const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };

type Props = { token: string };

class AuthScreen extends Component {
    static defaultProps = { token: '' };

    state = { signUp: true };

    props: Props;

    openSignUpForm = () => {
        this.setState({ signUp: true });
    };

    openSignInForm = () => {
        this.setState({ signUp: false });
    };

    render() {
        const { actions } = this.props;
        const signUp = this.state.signUp;
        const signUpButtonHighlighted = signUp ? styles.buttonHighlighted : null;
        const loginButtonHighlighted = !signUp ? styles.buttonHighlighted : null;
        const signUpButtonTextHighlighted = signUp ? styles.buttonTextHighlighted : null;
        const loginButtonTextHighlighted = !signUp ? styles.buttonTextHighlighted : null;

        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={SOURCE} style={[styles.image]}>
                        <Text style={styles.imageText}>HELLO</Text>
                    </Image>
                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        title="Sign Up"
                        buttonStyle={[styles.button, signUpButtonHighlighted]}
                        textStyle={[styles.buttonText, signUpButtonTextHighlighted]}
                        onPress={this.openSignUpForm}
                    />
                    <Button
                        title="Log In"
                        buttonStyle={[styles.button, loginButtonHighlighted]}
                        textStyle={[styles.buttonText, loginButtonTextHighlighted]}
                        onPress={this.openSignInForm}
                    />
                </View>
                {signUp
                    ? <SignUpForm {...actions} />
                    : <SignInForm
                        {...actions}
                        token={this.props.token}
                        navigation={this.props.navigation}
                    />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageContainer: {},
    image: {
        flexGrow: 1,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 35,
        textAlign: 'center',
        letterSpacing: 5
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 40
    },
    button: {
        minWidth: 120,
        borderRadius: 25,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_500,
        backgroundColor: '#fff'
    },
    buttonText: {
        color: Color.GREY_500,
        fontSize: 14
    },
    buttonHighlighted: {
        backgroundColor: Color.GREY_500,
        borderColor: '#fff'
    },
    buttonTextHighlighted: {
        color: '#fff'
    }
});

const mapStateToProps = ({ auth }) => ({ token: auth.token });

const mapDispatchToProps = (dispatch) => {
    const authActions = bindActionCreators(AuthActions, dispatch);

    return {
        actions: {
            facebookLogin: authActions.facebookLogin
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
