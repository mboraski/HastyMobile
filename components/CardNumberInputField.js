import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Field } from 'redux-form';
import valid from 'card-validator';

import { styles as baseStyles } from './TextInputField';
import bankAmericaIcon from '../assets/icons/bank-america.png';
import masterCardIcon from '../assets/icons/master-card.png';
import visaIcon from '../assets/icons/visa.png';
import formatCardNumber from '../formatting/formatCardNumber';

const VISA = 'visa';
const MASTERCARD = 'master-card';
const AMERICAN_EXPRESS = 'american-express';
const DINERS_CLUB = 'diners-club';
const DISCOVER = 'discover';
const JCB = 'jcb';
const UNIONPAY = 'unionpay';
const MAESTRO = 'maestro';
// not supported
const BANK_AMERICA = 'bank-america';

const sources = {
    [BANK_AMERICA]: bankAmericaIcon,
    [MASTERCARD]: masterCardIcon,
    // [AMERICAN_EXPRESS]: americanExpressIcon,
    // [DINERS_CLUB]: dinersClubIcon,
    // [DISCOVER]: discoverIcon,
    // [JCB]: jcbIcon,
    // [UNIONPAY]: unionpayIcon,
    // [MAESTRO]: maestroIcon,
    [VISA]: visaIcon,
    // discover: discoverIcon,
    // maestro: maestroIcon
};

const renderInput = ({ input: { onChange, ...restInput }, style, ...props }) => {
    const { card } = valid.number(restInput.value);
    let source = null;
    if (card) {
        source = sources[card.type];
    }
    return (
        <View style={[baseStyles.textInputContainer, styles.textInputContainer]}>
            <Image source={source} style={styles.card} resizeMode="contain" />
            <TextInput
                style={[baseStyles.textInput, styles.textInput, style]}
                onChangeText={onChange}
                normalize={formatCardNumber}
                keyboardType="number-pad"
                {...restInput}
                {...props}
            />
        </View>
    );
};

const CardNumberInputField = ({ label, containerStyle, labelStyle, ...props }) => (
    <View style={[baseStyles.formInputGroup, containerStyle]}>
        <Text style={[baseStyles.label, labelStyle]}>{label}</Text>
        <Field component={renderInput} {...props} />
    </View>
);

const styles = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row'
    },
    textInput: {
        flex: 1
    },
    card: {
        alignSelf: 'center',
        width: 50,
        height: 20,
        marginLeft: 10
    }
});

export default CardNumberInputField;
