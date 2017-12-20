// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { reduxForm, SubmissionError } from 'redux-form';
import stripeClient from 'stripe-client';

// Relative Imports
import { addCard } from '../actions/paymentActions';
import BackButton from '../components/BackButton';
import RemoteSubmitTextButton from '../components/RemoteSubmitTextButton';
import TextInputField from '../components/TextInputField';
import CardNumberInputField from '../components/CardNumberInputField';
import DismissKeyboardView from '../components/DismissKeyboardView';
import Spinner from '../components/Spinner';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import formatCardNumber from '../formatting/formatCardNumber';
import formatCardExpiry from '../formatting/formatCardExpiry';
import required from '../validation/required';

const stripe = stripeClient('pk_test_5W0mS0OlfYGw7fRu0linjLeH');

class CreditCardScreen extends Component {
    render() {
        const { error, submitting } = this.props;
        return (
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
                    />
                </View>
                <Button
                    title="Delete Card"
                    onPress={this.onButtonPress}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />
                {submitting ? <Spinner style={[StyleSheet.absoluteFill, styles.spinner]} /> : null}
            </DismissKeyboardView>
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
                exp_month: Number(exp[0]),
                exp_year: Number(exp[1]),
                cvc: values.cvc,
                name: values.name
            }
        };
        const card = await stripe.createToken(information);
        if (card.error) {
            throw new SubmissionError({ _error: card.error.message });
        }
        return props.addCard(card);
    },
    onSubmitSuccess(result, dispatch, props) {
        props.navigation.navigate('map');
    }
};

const mapDispatchToProps = {
    addCard
};

const CreditCardScreenForm = connect(null, mapDispatchToProps)(
    reduxForm(formOptions)(CreditCardScreen)
);

CreditCardScreenForm.navigationOptions = ({ navigation }) => ({
    title: 'Edit Card',
    headerLeft: <BackButton onPress={() => navigation.goBack()} />,
    headerRight: <RemoteSubmitTextButton title="Save" formName="CreditCard" />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
});

export default CreditCardScreenForm;
