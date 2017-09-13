import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Field } from 'redux-form';

import Color from '../constants/Color';
import { emY } from '../utils/em';

const renderInput = ({ input: { onChange, ...restInput }, ...props }) => (
    <TextInput style={styles.textInput} onChangeText={onChange} {...restInput} {...props} />
);

const LabelTextInputField = ({ label, containerStyle, labelStyle, style, ...props }) => (
    <View style={[styles.formInputGroup, containerStyle]}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        <View style={styles.textInputContainer}>
            <Field {...props} component={renderInput} style={[styles.textInput, style]} />
        </View>
    </View>
);

export const styles = StyleSheet.create({
    formInputGroup: {},
    label: {
        fontSize: emY(0.8125),
        paddingHorizontal: 25,
        paddingTop: emY(1.9),
        paddingBottom: emY(0.8)
    },
    textInputContainer: {
        backgroundColor: Color.GREY_100,
        borderRadius: 7,
        marginHorizontal: 15
    },
    textInput: {
        fontSize: emY(1),
        height: emY(50 / 16),
        paddingHorizontal: 20
    }
});

export default LabelTextInputField;
