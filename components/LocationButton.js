import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        ...Platform.select({
            ios: {
                // shadowColor: '#000',
                shadowColor: 'rgba(0, 0, 0, 1)',
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
        color: 'rgba(0,0,0,0.70)'
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(LocationButton);
