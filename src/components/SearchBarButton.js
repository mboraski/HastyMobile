import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';

import Color from '../constants/Color';
import { emY } from '../utils/em';
import searchIcon from '../assets/icons/search.png';

const ICON_SIZE = emY(1.5);

class SearchBarButton extends Component {
    render() {
        return (
            <TouchableOpacity {...this.props} style={styles.container}>
                <Image source={searchIcon} style={styles.image} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Color.GREY_100,
        borderRadius: 50,
        paddingHorizontal: 20,
        paddingVertical: emY(0.625),
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                width: '100%'
            },
            android: {
                width: '90%'
            }
        })
    },
    image: {
        width: ICON_SIZE,
        height: ICON_SIZE
    }
});

export default SearchBarButton;
