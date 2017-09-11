import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'redux-form';

import Color from '../constants/Color';

const renderInput = ({ input: { onChange, ...restInput } }) => (
    <TextInput style={styles.textInput} onChangeText={onChange} {...restInput} />
);

const InlineLabelTextInputField = ({ label, ...props }) => (
    <View style={styles.formInputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.textInputContainer}>
            <Field component={renderInput} style={styles.textInput} {...props} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    formInputGroup: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: Color.GREY_100,
        borderColor: Color.GREY_300,
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
    }
});

export default InlineLabelTextInputField;
