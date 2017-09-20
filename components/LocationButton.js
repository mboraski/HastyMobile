import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

import Color from '../constants/Color';
import { emY } from '../utils/em';

const SIZE = emY(1.5625);

class LocationButton extends Component {
    onPress = () => {};

    render() {
        const { style, ...props } = this.props;
        return (
            <Icon
                {...props}
                name="navigation"
                size={SIZE}
                containerStyle={[styles.iconContainer, style]}
                iconStyle={styles.icon}
                onPress={this.onPress}
                raised
            />
        );
    }
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: Color.GREY_100,
        marginRight: 12,
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
        color: Color.GREY_700,
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
