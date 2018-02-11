// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import stripeClient from 'stripe-client';

// Relative Imports
import { addCard, deleteCard } from '../actions/paymentActions';
import TextInputField from '../components/TextInputField';
import CardNumberInputField from '../components/CardNumberInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Spinner from '../components/Spinner';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import formatCardNumber from '../formatting/formatCardNumber';
import formatCardExpiry from '../formatting/formatCardExpiry';
import required from '../validation/required';

const stripe = stripeClient('pk_test_5W0mS0OlfYGw7fRu0linjLeH');

const keyboardVerticalOffset = emY(1);

class CreditCardForm extends Component {
    deleteCard = async () => {
        await this.props.deleteCard(this.props.navigation.state.params.card);
        this.props.navigation.goBack();
    };

    render() {
        const { pending, error, submitting, navigation: { state: { params } } } = this.props;
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
                                editable={!card}
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
                        <TextInputField name="name" label="CARDHOLDER NAME" validate={required} />
                        <TextInputField
                            name="cvc"
                            label="CVC"
                            secureTextEntry
                            containerStyle={styles.cvcContainer}
                            keyboardType="number-pad"
                            validate={required}
                            editable={!card}
                        />
                    </View>
                    {card ? (
                        <Button
                            title="Delete Card"
                            onPress={this.deleteCard}
                            containerViewStyle={styles.buttonContainer}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                    ) : null}
                    {submitting || pending ? (
                        <Spinner style={[StyleSheet.absoluteFill, styles.spinner]} />
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
        width: 120
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
    form: 'CreditCard',
    async onSubmit(values, dispatch, props) {
        const exp = values.exp.split('/');
        const information = {
            card: {
                number: values.number.replace(' ', ''),
                exp_month: Number(exp[0] || 0),
                exp_year: Number(exp[1] || 0),
                cvc: values.cvc,
                name: values.name
            }
        };
        const card = await stripe.createSource(information);
        if (card.error) {
            let error;
            if (card.error.param) {
                error = { _error: 'Card is invalid' };
                if (card.error.param === 'exp_month' || card.error.param === 'exp_year') {
                    error.exp = card.error.message;
                } else {
                    error[card.error.param] = card.error.message;
                }
            } else {
                error = { _error: card.error.message };
            }
            throw new SubmissionError(error);
        }
        return props.addCard(card.source);
    }
};

const mapStateToProps = (state, props) => {
    const card = props.navigation.state.params && props.navigation.state.params.card;
    return {
        initialValues: card
            ? {
                  number: card.last4,
                  exp: `${card.exp_month}/${card.exp_year}`,
                  name: card.name,
                  cvc: '***'
              }
            : {},
        pending: state.payment.pending
    };
};

const mapDispatchToProps = {
    addCard,
    deleteCard
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formOptions)(CreditCardForm));
