import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Color from '../constants/Color';
import { emY } from '../utils/em';

export default function EmptyState({ style, title }) {
    return (
        <View style={[StyleSheet.absoluteFill, styles.container, style]}>
            <MaterialIcons name="info" color={Color.GREY_500} size={200} style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginBottom: 10
    },
    title: {
        fontSize: emY(2)
    }
});
