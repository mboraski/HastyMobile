// 3rd Party Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// Relative Imports
import { firebaseAuth } from '../../firebase';
import { addCard, deleteCard, listCards } from '../actions/paymentActions';

import { getPending } from '../selectors/paymentSelectors';
import { getStripeCustomerId } from '../selectors/authSelectors';

import TextInputField from '../components/TextInputField';
import CardNumberInputField from '../components/CardNumberInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';

import Color from '../constants/Color';
import { emY } from '../utils/em';

import formatCardNumber from '../formatting/formatCardNumber';
import formatCardExpiry from '../formatting/formatCardExpiry';
import required from '../validation/required';

const keyboardVerticalOffset = emY(1);

export class CreditCardFormContainer extends Component {
    deleteCardConfirm = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this card?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: this.deleteCard }
        ]);
    };

    deleteCard = async () => {
        await this.props.deleteCard({
            uid: firebaseAuth.currentUser.uid,
            source: this.props.navigation.state.params.card.id
        });
        this.props.listCards(firebaseAuth.currentUser.uid);
        this.props.navigation.goBack();
    };

    render() {
        const {
            pending,
            error,
            submitting,
            navigation: {
                state: { params }
            }
        } = this.props;
        const card = params && params.card;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <DismissKeyboardView style={styles.container}>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <View style={styles.form}>
                        <View style={styles.formInputs}>
                            <CardNumberInputField
                                name="number"
                                label="CARD NUMBER"
                                containerStyle={styles.numberContainer}
                                normalize={formatCardNumber}
                                keyboardType="number-pad"
                                validate={required}
                                placeholder={
                                    card ? `**** **** **** + ${card.last4}` : ''
                                }
                            />
                            <TextInputField
                                name="exp"
                                label="EXP. DATE"
                                containerStyle={styles.expiryContainer}
                                style={styles.expiry}
                                normalize={formatCardExpiry}
                                keyboardType="number-pad"
                                validate={required}
                            />
                        </View>
                        <TextInputField
                            name="name"
                            label="CARDHOLDER NAME"
                            validate={required}
                        />
                        <TextInputField
                            name="cvc"
                            label="CVC"
                            secureTextEntry
                            containerStyle={styles.cvcContainer}
                            keyboardType="number-pad"
                            validate={required}
                            placeholder={card ? '***' : ''}
                        />
                    </View>
                    {card ? (
                        <Button
                            title="Delete Card"
                            onPress={this.deleteCardConfirm}
                            containerViewStyle={styles.buttonContainer}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                    ) : null}
                    {submitting || pending ? (
                        <ActivityIndicator
                            size="large"
                            style={StyleSheet.absoluteFill}
                        />
                    ) : null}
                </DismissKeyboardView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    form: {
        flex: 1
    },
    formInputs: {
        flexDirection: 'row'
    },
    numberContainer: {
        flex: 1
    },
    expiryContainer: {
        width: 140
    },
    expiry: {
        textAlign: 'center'
    },
    cvcContainer: {
        width: 120
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: emY(20 / 16),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Color.GREY_300
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: emY(22 / 15),
        paddingVertical: emY(15 / 16),
        justifyContent: 'flex-start'
    },
    buttonText: {
        color: '#000',
        fontSize: emY(1)
    },
    error: {
        paddingHorizontal: 25,
        fontSize: emY(0.8),
        color: Color.RED_500,
        marginTop: emY(0.5)
    },
    spinner: {
        backgroundColor: Color.WHITE
    }
});

const formOptions = {
    form: 'CreditCard'
};

const mapStateToProps = (state, props) => {
    const card =
        props.navigation.state.params && props.navigation.state.params.card;
    return {
        initialValues: card
            ? {
                  exp: `${card.exp_month}/${card.exp_year}`,
                  name: card.name
              }
            : {},
        pending: getPending(state),
        stripeCustomerId: getStripeCustomerId(state)
    };
};

const mapDispatchToProps = {
    addCard,
    deleteCard,
    listCards
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm(formOptions)(CreditCardFormContainer));
