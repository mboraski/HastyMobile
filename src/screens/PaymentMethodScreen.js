// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import MenuAndBackButton from '../components/MenuAndBackButton';
import Text from '../components/Text';
import SectionTitle from '../components/SectionTitle';
import PaymentMethod from '../components/PaymentMethod';
import TextButton from '../components/TextButton';

import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

import { listCards } from '../actions/paymentActions';

import { getCards, getStripeCustomerId } from '../selectors/paymentSelectors';
import { getSignUpAddPaymentMethodText } from '../selectors/marketingSelectors';

class PaymentMethodScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const signedUp = navigation.getParam('signedUp', false);
        const onPressHeaderRight = () => navigation.goBack();
        return {
            title: 'Payment Method',
            headerLeft: signedUp ? null : (
                <MenuAndBackButton navigation={navigation} />
            ),
            headerRight: signedUp ? (
                <TextButton title="Skip" onPress={onPressHeaderRight} />
            ) : null,
            headerStyle: Style.header,
            headerTitleStyle: Style.headerTitle
        };
    };

    componentDidMount() {
        const { stripeCustomerId } = this.props;
        if (stripeCustomerId) {
            this.props.listCards();
        }
    }

    addCard = () => {
        this.props.navigation.navigate('creditCard');
    };

    selectPaymentMethod = card => {
        this.props.navigation.navigate('creditCard', { card });
    };

    renderCard = (card, index) => {
        const onPress = () => this.selectPaymentMethod(card);
        return (
            <PaymentMethod
                key={index}
                type={card.brand}
                text={card.last4}
                onPress={onPress}
            />
        );
    };

    render() {
        const { cards, navigation, signUpAddPaymentMethodText } = this.props;
        const signedUp = navigation.getParam('signedUp', false);
        return (
            <ScrollView style={styles.container}>
                {signedUp && (
                    <Text style={styles.signUpAddPaymentMethodText}>
                        {signUpAddPaymentMethodText}
                    </Text>
                )}
                <SectionTitle title="MY CARDS" />
                {!signedUp && cards.map(this.renderCard)}
                <PaymentMethod text="Add Card" onPress={this.addCard} />
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
    signUpAddPaymentMethodText: {
        fontFamily: 'goodtimes'
    }
});

const mapStateToProps = state => ({
    stripeCustomerId: getStripeCustomerId(state),
    cards: getCards(state),
    signUpAddPaymentMethodText: getSignUpAddPaymentMethodText(state)
});

const mapDispatchToProps = {
    listCards
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentMethodScreen);
