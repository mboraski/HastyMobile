// Third Party Imports
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import map from 'lodash.map';

// Relative Imports
import HeroDetail from '../components/HeroDetail';
import Text from '../components/Text';
import {
    getFullActualFulfillment,
    getNotificationCount
} from '../selectors/orderSelectors';
import { getPhoneNumber } from '../selectors/authSelectors';

import {
    contactContractor,
    openChatModal,
    clearChatNotificationCount
} from '../actions/orderActions';

import Color from '../constants/Color';
import { heroStatuses } from '../constants/Order';
import { emY } from '../utils/em';

class HeroListContainer extends Component {
    contactContractor = contractorId => {
        this.props.openChatModal(contractorId);
    };

    renderHeroes = () => {
        const { fullHeroes, notificationCount } = this.props;
        return map(fullHeroes, (hero, id) => {
            const { firstName, lastName, deliveryTime, status } = hero;
            const heroStatus = heroStatuses[status] || 'Pending...';
            return (
                <HeroDetail
                    key={id}
                    firstName={firstName}
                    lastName={lastName}
                    deliveryTime={deliveryTime}
                    type={'Full Order'}
                    heroStatus={heroStatus}
                    contractorId={id}
                    contactContractor={() => this.contactContractor(id)}
                    notificationCount={notificationCount}
                />
            );
        });
    };

    render() {
        const { fullHeroes } = this.props;
        let result;
        if (fullHeroes) {
            result = (
                <View style={styles.container}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Hero Details:</Text>
                    </View>
                    {this.renderHeroes()}
                </View>
            );
        } else {
            result = null;
        }
        return result;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    label: {
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderColor: Color.GREY_300,
        backgroundColor: Color.WHITE,
        paddingBottom: 5,
        marginLeft: 27,
        marginRight: 27
    },
    labelAlt: {
        borderColor: Color.GREY_300,
        backgroundColor: Color.WHITE,
        paddingBottom: 5,
        marginLeft: 27,
        marginRight: 27,
        marginVertical: 10
    },
    labelText: {
        color: Color.GREY_600,
        fontSize: emY(1.0625),
        letterSpacing: 0.5
    }
});

const mapStateToProps = state => ({
    fullHeroes: getFullActualFulfillment(state),
    phoneNumber: getPhoneNumber(state),
    notificationCount: getNotificationCount(state)
});

const mapDispatchToProps = {
    contactContractor,
    openChatModal,
    clearChatNotificationCount
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeroListContainer);
