// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import Style from '../constants/Style';
import { emY } from '../utils/em';
import mapIcon from '../assets/icons/menu.png';

const SIZE = emY(1.875);

class MenuButton extends Component {
    onPress = () => {};

    render() {
        const { style, ...props } = this.props;
        return (
            <TouchableOpacity {...props} style={[Style.headerLeft, styles.container, style]}>
                <Image source={mapIcon} style={styles.image} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: SIZE,
        height: SIZE
    }
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(MenuButton);
