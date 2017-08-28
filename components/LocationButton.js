import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import Color from '../constants/Color';

class LocationButton extends Component {
    onPress = () => {};
    render() {
        return (
            <Icon
                name="navigation"
                size={25}
                containerStyle={styles.iconContainer}
                iconStyle={styles.icon}
                onPress={this.onPress}
                raised
            />
        );
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: Color.GREY_300,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                // shadowColor: Color.GREY_400,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                // shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 2
            }
        })
    },
    icon: {
        color: Color.GREY_600
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(LocationButton);
