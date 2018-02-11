import _ from 'lodash';
import React, { Component } from 'react';
import { auth, firestore } from 'firebase';
import { Button, Text, ScrollView, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import { stripe as stripeClient } from 'stripe-client';

import {
    addStripeCustomerSource,
    removeStripeCustomerSource,
    chargeStripeCustomerSource
} from '../api/hasty';
import { statusBarOnly } from '../constants/Style';
import { STRIPE_CLIENT_KEY } from '../constants/Stripe';

const stripe = stripeClient(STRIPE_CLIENT_KEY);

class ApiTester extends Component {
    static navigationOptions = statusBarOnly;

    state = {
        test: null,
        signUp: null,
        deleteUser: null,
        login: null,
        logout: null,
        addStripeCustomerSource: null,
        selectedSource: null,
        user: null
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
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
        auth().createUserWithEmailAndPassword('markb539@gmail.com', 'Password1')
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
        const user = auth().currentUser;
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
        auth().signInWithEmailAndPassword('markb539@gmail.com', 'Password1')
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
        auth().signOut()
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
        stripe.createSource({
            number: '4242 4242 4242 4242',
            exp_month: 12,
            exp_year: 19,
            cvc: 747,
            name: 'Jenny Rosen'
        })
        .then((source) => {
            addStripeCustomerSource(source)
                .then((response) => {
                    this.setState({
                        addStripeCustomerSource: JSON.stringify(response)
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
        const source = this.state.user.selectedSource;
        return removeStripeCustomerSource(source);
    }
    getStripeCustomerPaymentInfo = () => {
        const uid = this.state.user.uid;
        const docRef = firestore().collection('userOwned').doc(uid);
        return docRef.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    paymentInfo: doc.sources
                });
            } else {
                // doc.data() will be undefined in this case
                console.log('No such document with payment info!');
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
        });
    }
    // updateStripeCustomerDefaultSource = () => {
    //
    // }
    chargeStripeCustomerSource = () => {
        const charge = {
            amount: 190.00,
            currency: 'usd',
            source: this.state.selectedSource
        };
        return chargeStripeCustomerSource(charge);
    }

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
                        onPress={this.onAddStripeCustomerPaymentInfo}
                        title="Add Customer Payment Info"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>
                        {this.state.deleteStripeCustomerPaymentInfo}
                    </Text>
                    <Button
                        onPress={this.onDeleteStripeCustomerPaymentInfo}
                        title="Delete Customer Payment Info"
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
