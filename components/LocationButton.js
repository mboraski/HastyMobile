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
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 1
            },
            android: {
                elevation: 4
            }
        })
    },
    icon: {
        color: Color.GREY_600,
        transform: [
            {
                rotate: '45deg'
            }
        ]
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(LocationButton);
