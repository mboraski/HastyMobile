// 3rd Party Libraries
import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    Image,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import { listCards } from '../actions/paymentActions';
import { signInWithFacebook } from '../actions/authActions';
import EntryMessage from '../components/EntryMessage';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import { statusBarOnly } from '../constants/Style';
import { emY } from '../utils/em';

// TODO: replace with real image that gets fetched
const SOURCE = { uri: 'https://source.unsplash.com/random/800x600' };
// TODO: add width then use for drawer width. Save to store.

class AuthScreen extends Component {
    static navigationOptions = statusBarOnly;

    state = {
        signUp: true,
        openModal: true
    };

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete = props => {
        if (props.user && !this.props.user) {
            this.onAuthSuccess(props.user);
        }
    };

    onAuthSuccess = (user) => {
        this.goToPayment(user);
    }

    signInWithFacebook = () => {
        this.props
            .signInWithFacebook()
            .catch(error => Alert.alert('Error', error.message));
    };

    goToMap = () => {
        this.props.navigation.navigate('map');
    };

    goToPayment = async (user) => {
        const result = await this.props.listCards(user.uid);
        if (result.paymentInfo && result.paymentInfo.total_count === 0) {
            this.goToMap();
            this.props.navigation.navigate('paymentMethod', { signedUp: true });
        } else {
            this.goToMap();
        }
    };

    closeModal = () => {
        this.setState({ openModal: false });
    };

    render() {
        return (
            <ScrollView style={styles.container} keyboardDismissMode="on-drag">
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="position"
                >
                    <Image source={SOURCE} style={styles.image}>
                        <Text style={styles.imageText}>HELLO</Text>
                    </Image>
                    <Button
                        onPress={this.signInWithFacebook}
                        title="Sign In with Facebook"
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
                </KeyboardAvoidingView>
                <EntryMessage
                    openModal={this.state.openModal}
                    closeModal={this.closeModal}
                    message={'Hello and welcome to our official SXSW soft launch! Thanks so much for being a part of this amazing journey! Signup or login with Facebook above.'}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#000',
        marginHorizontal: 20,
        justifyContent: 'center',
        height: emY(3)
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 30,
        paddingBottom: 30
    },
    buttonHighlighted: {
        backgroundColor: Color.GREY_500,
        borderColor: '#fff'
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: emY(1)
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: emY(1)
    },
    buttonTextHighlighted: {
        color: '#fff'
    },
    image: {
        height: Dimensions.window.height / 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageText: {
        color: 'white',
        backgroundColor: 'transparent',
        fontSize: 35,
        textAlign: 'center',
        letterSpacing: 5
    }
});

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = {
    signInWithFacebook,
    listCards
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
