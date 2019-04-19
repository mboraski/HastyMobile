import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Text from '../components/Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import logo from '../assets/icons/logo-white.png';

class LoadingApp extends Component {
    state = {
        message: this.props.messages[0]
    };

    render() {
        return (
            <View style={styles.loading}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.loadingMessage}>{this.state.message}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: Color.DEFAULT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: emY(5)
    },
    loadingMessage: {
        color: Color.WHITE,
        marginTop: 20,
        fontSize: emY(1)
    }
});

export default LoadingApp;
