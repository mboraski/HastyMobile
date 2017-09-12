// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';
import closeIcon from '../assets/icons/close.png';

const SIZE = emY(1.25);

class CloseButton extends Component {
    onPress = () => {};

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.container}>
                <Image
                    source={closeIcon}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(CloseButton);
