import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class MenuButton extends Component {
    onPress = () => {};

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.container}>
                <Image source={require('../assets/icons/menu.png')} style={styles.image} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    image: {
        width: 30,
        height: 30
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(MenuButton);
