import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Text, ScrollView, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';

import firebase from '../firebase';
import {
    addStripeCustomerSource,
    removeStripeCustomerSource,
    chargeStripeCustomerSource
} from '../api/hasty';

import { STRIPE_CLIENT_KEY } from '../constants/Stripe';
import { statusBarOnly } from '../constants/Style';

const stripe = require('stripe-client')(STRIPE_CLIENT_KEY);

class ApiTester extends Component {
    static navigationOptions = statusBarOnly;

    state = {
        test: null,
        signUp: null,
        deleteUser: null,
        login: null,
        logout: null,
        addStripeCustomerSource: null,
        removeStripeCustomerSource: null,
        currentCard: 'No currently set card',
        chargeCurrentCard: null,
        paymentInfo: null,
        selectedSource: null,
        currentOrder: null,
        user: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed IN!');
                this.setState({
                    user: JSON.stringify(user)
                });
            } else {
                console.log('User is signed OUT!');
                this.setState({
                    user: null
                });
            }
        });
    }

    onPressTestButton = () => {
        this.setState({
            test: 'Test Works'
        });
    }
    onSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword('markb539@gmail.com', 'Password1')
            .then((response) => {
                console.log('createUserWithEmailAndPassword success: ', response);
                this.setState({
                    signUp: 'Signup Worked'
                });
            })
            .catch((error) => {
                console.log('createUserWithEmailAndPassword error: ', error);
                this.setState({
                    signUp: JSON.stringify(error)
                });
            });
    }
    onDeleteUser = () => {
        const user = firebase.auth().currentUser;
        user.delete()
            .then((response) => {
                console.log('deleteUser success: ', response);
                this.setState({
                    deleteUser: JSON.stringify(response),
                    login: null,
                    signup: null
                });
            })
            .catch((error) => {
                console.log('deleteUser error: ', error);
                this.setState({
                    deleteUser: JSON.stringify(error),
                    signup: JSON.stringify(error)
                });
            });
    }
    onLogin = () => {
        firebase.auth().signInWithEmailAndPassword('markb539@gmail.com', 'Password1')
            .then((response) => {
                console.log('signInWithEmailAndPassword success: ', response);
                this.setState({
                    logout: JSON.stringify(response)
                });
            })
            .catch((error) => {
                console.log('signInWithEmailAndPassword error: ', error);
                this.setState({
                    login: JSON.stringify(error)
                });
            });
    }
    onLogout = () => {
        firebase.auth().signOut()
            .then((response) => {
                console.log('signOut success: ', response);
                this.setState({
                    login: JSON.stringify(response)
                });
            })
            .catch((error) => {
                console.log('signOut error: ', error);
                this.setState({
                    logout: JSON.stringify(error)
                });
            });
    }
    onAddStripeCustomerSource = () => {
        const user = firebase.auth().currentUser;
        console.log('client user uid: ', user.uid);
        // console.log('some token as proof of authenticated request: ', user.uid);
        stripe.createToken({
            card: {
                number: '4242 4242 4242 4242',
                exp_month: '12',
                exp_year: '2019',
                cvc: '747',
                name: 'Jenny Rosen'
            }
        })
        .then((card) => {
            const args = { uid: user.uid, source: card.id };
            addStripeCustomerSource(args)
                .then(() => {
                    this.setState({
                        addStripeCustomerSource: 'Stripe source added successfully'
                    });
                })
                .catch((error) => {
                    this.setState({
                        addStripeCustomerSource: error
                    });
                });
        })
        .catch((error) => {
            this.setState({
                addStripeCustomerSource: JSON.stringify(error)
            });
        });
    }
    onRemoveStripeCustomerSource = () => {
        const user = firebase.auth().currentUser;
        const args = { uid: user.uid, source: this.state.currentCard };
        return removeStripeCustomerSource(args)
            .then(() => {
                this.setState({
                    removeStripeCustomerSource: 'Stripe source removed successfully'
                });
            })
            .catch((error) => {
                this.setState({
                    removeStripeCustomerSource: error
                });
            });
    }
    onFetchStripeCustomerPaymentInfo = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const docRef = firebase.firestore().collection('userOwned').doc(uid);
        return docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    console.log('fetched payment info: ', data.paymentInfo);
                    const paymentInfo = data.paymentInfo;
                    this.setState({
                        paymentInfo: JSON.stringify(paymentInfo)
                    });
                    this.setState({
                        currentCard: paymentInfo.data[0].id
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document with payment info!');
                }
            })
            .catch((error) => {
                console.log('Error getting document:', error);
            });
    }
    onChargeCurrentCard = () => {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const charge = {
            amount: 190.00,
            currency: 'usd',
            source: this.state.currentCard
        };
        return chargeStripeCustomerSource({ uid, charge });
    }
    onLightBeacon = () => {
        firebase.database().ref('/userOwned/orders/US/TX/Austin').add({
            currentSetAddress: '1007 S Congress Ave, Apt 242, Austin, TX 78704',
            currentSetLatLon: { lat: 43.23223, lon: 97.293023 },
            status: 'open'
        });
    };

    renderContent = () => {
        let content;
        if (this.state.user) {
            content = (
                <View>
                    <Text style={styles.titleText}>
                        {'User'}
                    </Text>
                    <Text style={styles.titleText}>
                        {this.state.user}
                    </Text>
                    <Text style={styles.titleText}>
                        {this.state.test}
                    </Text>
                    <Button
                        onPress={this.onPressTestButton}
                        title="Test Button"
                        color="#841584"
                        accessibilityLabel="This button tests the api"
                    />
                    <Text style={styles.titleText}>
                        {this.state.deleteUser}
                    </Text>
                    <Button
                        onPress={this.onDeleteUser}
                        title="Delete Account :("
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.logout}
                    </Text>
                    <Button
                        onPress={this.onLogout}
                        title="Logout"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.addStripeCustomerSource}
                    </Text>
                    <Button
                        onPress={this.onAddStripeCustomerSource}
                        title="Add Customer Payment Info"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.paymentInfo}
                    </Text>
                    <Button
                        onPress={this.onFetchStripeCustomerPaymentInfo}
                        title="Fetch Customer Payment Info"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.currentCard}
                    </Text>
                    <Text style={styles.titleText}>
                        {this.state.removeStripeCustomerSource}
                    </Text>
                    <Button
                        onPress={this.onRemoveStripeCustomerSource}
                        title="Remove Customer Payment Info"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.chargeCurrentCard}
                    </Text>
                    <Button
                        onPress={this.onChargeCurrentCard}
                        title="Charge Current Card"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.currentOrder}
                    </Text>
                    <Button
                        onPress={this.onLightBeacon}
                        title="Light A Beacon"
                        color="#841584"
                    />
                </View>
            );
        } else {
            content = (
                <View>
                    <Text style={styles.titleText}>
                        {'User'}
                    </Text>
                    <Text style={styles.titleText}>
                        {this.state.user}
                    </Text>
                    <Text style={styles.titleText}>
                        {this.state.test}
                    </Text>
                    <Button
                        onPress={this.onPressTestButton}
                        title="Test Button"
                        color="#841584"
                        accessibilityLabel="This button tests the api"
                    />
                    <Text style={styles.titleText}>
                        {this.state.signUp}
                    </Text>
                    <Button
                        onPress={this.onSignUp}
                        title="Sign Up"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.login}
                    </Text>
                    <Button
                        onPress={this.onLogin}
                        title="Login"
                        color="#841584"
                    />
                </View>
            );
        }

        return content;
    }

    render() {
        if (_.isNull(this.state.welcomeScreensSeen)) {
            return <AppLoading />;
        }

        return (
            <ScrollView>
                {this.renderContent()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 14
    }
});

export default ApiTester;
