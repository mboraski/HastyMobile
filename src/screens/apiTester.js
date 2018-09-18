import isNull from 'lodash.isnull';
import React, { Component } from 'react';
import { Button, Text, ScrollView, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';

import { fire, db, firebaseAuth } from '../../firebase';
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
    };

    componentDidMount() {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    user: JSON.stringify(user)
                });
            } else {
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
    };
    onSignUp = () =>
        db
            .collection('users')
            .doc('kpop')
            .set({
                whatItIs: 'I love k-pop'
            })
            .then(() => console.log('success'))
            .catch(error => console.log('error: ', error));
    // fireerroerror => console.log('error: ', error));
    //     .auth()
    //     .createUserWithEmailAndPassword('m@m.com', 'Password1')
    //     .then(() => {
    //         this.setState({
    //             signUp: 'Signup Worked'
    //         });
    //         firebaseAuth.currentUser.updateProfile({
    //             displayName: 'Mark B',
    //             phoneNumber: '1112223344'
    //         });
    //     })
    //     .catch(error => {
    //         this.setState({
    //             signUp: JSON.stringify(error)
    //         });
    //     });
    onDeleteUser = () => {
        const user = firebaseAuth.currentUser;
        user.delete()
            .then(response => {
                this.setState({
                    deleteUser: JSON.stringify(response),
                    login: null,
                    signup: null
                });
            })
            .catch(error => {
                this.setState({
                    deleteUser: JSON.stringify(error),
                    signup: JSON.stringify(error)
                });
            });
    };
    onLogin = () => {
        fire.auth()
            .signInWithEmailAndPassword('markb539@gmail.com', 'Password1')
            .then(response => {
                this.setState({
                    logout: JSON.stringify(response)
                });
            })
            .catch(error => {
                this.setState({
                    login: JSON.stringify(error)
                });
            });
    };
    onLogout = () => {
        fire.auth()
            .signOut()
            .then(response => {
                this.setState({
                    login: JSON.stringify(response)
                });
            })
            .catch(error => {
                this.setState({
                    logout: JSON.stringify(error)
                });
            });
    };
    onAddStripeCustomerSource = () => {
        const user = firebaseAuth.currentUser;
        stripe
            .createToken({
                card: {
                    number: '4242 4242 4242 4242',
                    exp_month: '12',
                    exp_year: '2019',
                    cvc: '747',
                    name: 'Jenny Rosen'
                }
            })
            .then(card => {
                const args = { uid: user.uid, source: card.id };
                addStripeCustomerSource(args)
                    .then(() => {
                        this.setState({
                            addStripeCustomerSource:
                                'Stripe source added successfully'
                        });
                    })
                    .catch(error => {
                        this.setState({
                            addStripeCustomerSource: error
                        });
                    });
            })
            .catch(error => {
                this.setState({
                    addStripeCustomerSource: JSON.stringify(error)
                });
            });
    };
    onRemoveStripeCustomerSource = () => {
        const user = firebaseAuth.currentUser;
        const args = { uid: user.uid, source: this.state.currentCard };
        return removeStripeCustomerSource(args)
            .then(() => {
                this.setState({
                    removeStripeCustomerSource:
                        'Stripe source removed successfully'
                });
            })
            .catch(error => {
                this.setState({
                    removeStripeCustomerSource: error
                });
            });
    };
    onFetchStripeCustomerPaymentInfo = () => {
        const user = firebaseAuth.currentUser;
        const uid = user.uid;
        const docRef = fire
            .firestore()
            .collection('userOwned')
            .doc(uid);
        return docRef
            .get()
            .then(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    const paymentInfo = data.paymentInfo;
                    this.setState({
                        paymentInfo: JSON.stringify(paymentInfo)
                    });
                    this.setState({
                        currentCard: paymentInfo.data[0].id
                    });
                } else {
                    // doc.data() will be undefined in this case
                }
            })
            .catch(error => {});
    };
    onChargeCurrentCard = () => {
        const user = firebaseAuth.currentUser;
        const uid = user.uid;
        const charge = {
            amount: 190.0,
            currency: 'usd',
            source: this.state.currentCard
        };
        return chargeStripeCustomerSource({ uid, charge });
    };
    onLightBeacon = () => {
        fire.database()
            .ref('/userOwned/orders/US/TX/Austin')
            .add({
                currentSetAddress:
                    '1007 S Congress Ave, Apt 242, Austin, TX 78704',
                currentSetLatLon: { lat: 43.23223, lon: 97.293023 },
                status: 'open'
            });
    };

    renderContent = () => {
        let content;
        if (this.state.user) {
            content = (
                <View>
                    <Text style={styles.titleText}>{'User'}</Text>
                    <Text style={styles.titleText}>{this.state.user}</Text>
                    <Text style={styles.titleText}>{this.state.test}</Text>
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
                    <Text style={styles.titleText}>{this.state.logout}</Text>
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
                    <Text style={styles.titleText}>{'User'}</Text>
                    <Text style={styles.titleText}>{this.state.user}</Text>
                    <Text style={styles.titleText}>{this.state.test}</Text>
                    <Button
                        onPress={this.onPressTestButton}
                        title="Test Button"
                        color="#841584"
                        accessibilityLabel="This button tests the api"
                    />
                    <Text style={styles.titleText}>{this.state.signUp}</Text>
                    <Button
                        onPress={this.onSignUp}
                        title="Sign Up"
                        color="#841584"
                    />
                    <Text style={styles.titleText}>{this.state.login}</Text>
                    <Button
                        onPress={this.onLogin}
                        title="Login"
                        color="#841584"
                    />
                </View>
            );
        }

        return content;
    };

    render() {
        if (isNull(this.state.welcomeScreensSeen)) {
            return <AppLoading />;
        }

        return <ScrollView>{this.renderContent()}</ScrollView>;
    }
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 14
    }
});

export default ApiTester;
