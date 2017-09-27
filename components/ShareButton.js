// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import { emY } from '../utils/em';

const SIZE = emY(4.6);

class ShareButton extends Component {
    onPress = () => {};

    render() {
        const { style, source } = this.props;
        return (
            <TouchableOpacity
                onPress={this.onPress}
                style={[styles.container, style]} 
            >
                <Image
                    source={source}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZE / 2,
        width: SIZE,
        height: SIZE,
        padding: emY(0.72),
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(ShareButton);
