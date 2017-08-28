import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';

class MenuButton extends Component {
    onPress = () => {};
    render() {
        return <Icon name="menu" size={30} iconStyle={styles.icon} onPress={this.onPress} />;
    }
}

const styles = StyleSheet.create({
    icon: {
        color: 'rgba(0, 0, 0, 0.70)',
        marginLeft: 20
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(MenuButton);
