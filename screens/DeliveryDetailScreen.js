// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';

// Relative Imports
import CloseButton from '../components/BrandButton';
import InlineLabelTextInputField from '../components/InlineLabelTextInputField';
import Radio from '../components/Radio';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

class DeliveryDetailScreen extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.formSection}>INFORMATION</Text>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField name="name" label="Name" />
                    <InlineLabelTextInputField name="number" label="Phone Number" />
                    <InlineLabelTextInputField name="email" label="Email" keyboardType="email-address" />
                </View>
                <Text style={styles.formSection}>ADDRESS</Text>
                <View style={styles.formInputs}>
                    <InlineLabelTextInputField name="country" label="Country" />
                    <InlineLabelTextInputField name="state" label="State" />
                    <InlineLabelTextInputField name="city" label="City" />
                    <InlineLabelTextInputField name="address" label="Address" />
                    <InlineLabelTextInputField name="zip" label="ZIP code" />
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
        fontSize: emY(12 / 16),
        color: Color.GREY_600,
        paddingHorizontal: 15,
        paddingTop: emY(45 / 16),
        paddingBottom: emY(20 / 16)
    },
    formInputs: {},
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
    },
    buttonContainer: {},
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(0.875)
    },
    buttonText: {
        fontSize: emY(0.8125)
    }
});

DeliveryDetailScreen = reduxForm({
    form: 'deliveryDetail'
})(DeliveryDetailScreen);

DeliveryDetailScreen.navigationOptions = {
    title: 'Payment Details',
    headerLeft: <CloseButton />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
};

export default DeliveryDetailScreen;
