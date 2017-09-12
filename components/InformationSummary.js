// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Field } from 'redux-form';

// Relative Imports
import InlineLabelTextInputField from './InlineLabelTextInputField';
import Radio from './Radio';
import Color from '../constants/Color';
import { emY } from '../utils/em';

class InformationSummary extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.formSection}>INFORMATION</Text>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField
                        name="name"
                        label="Full Name"
                    />
                    <InlineLabelTextInputField
                        name="number"
                        label="Phone Number"
                    />
                    <InlineLabelTextInputField
                        name="email"
                        label="Email"
                        keyboardType="email-address"
                    />
                </View>
                <Text style={styles.formSection}>ADDRESS</Text>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField
                        name="country"
                        label="Country"
                    />
                    <InlineLabelTextInputField
                        name="state"
                        label="State"
                    />
                    <InlineLabelTextInputField
                        name="city"
                        label="City"
                    />
                    <InlineLabelTextInputField
                        name="address"
                        label="Address"
                    />
                    <InlineLabelTextInputField
                        name="zip"
                        label="ZIP code"
                    />
                </View>
                <Field name="save" component={Radio} />
                <Button
                    title="PAY"
                    onPress={this.onButtonPress}
                    containerViewStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
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
    formSection: {
        fontSize: emY(0.8125),
        color: Color.GREY_600,
        paddingHorizontal: 15,
        paddingTop: emY(2.1875),
        paddingBottom: emY(1)
    },
    formInputs: {},
    buttonContainer: {},
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(1)
    },
    buttonText: {
        fontSize: emY(0.8125)
    }
});

export default InformationSummary;
