import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { emY } from '../utils/em';

const RADIO_ICON_SIZE = 25;

const Radio = ({ input, ...rest }) => (
    <TouchableOpacity {...input} {...rest} onPress={() => input.onChange(!input.value)}>
        <View style={styles.container}>
            <View style={[styles.iconContainer, input.value && styles.iconContainerSelected]}>
                <MaterialIcons
                    name="check"
                    size={RADIO_ICON_SIZE - 5}
                    color="#fff"
                    style={[styles.radioIcon, input.value && styles.radioIconSelected]}
                />
            </View>
            <Text style={styles.radioText}>Save information</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: emY(30 / 16),
    },
    iconContainer: {
        width: RADIO_ICON_SIZE,
        height: RADIO_ICON_SIZE,
        borderRadius: RADIO_ICON_SIZE / 2,
        borderColor: '#000',
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
        marginRight: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainerSelected: {
        backgroundColor: 'black'
    },
    icon: {},
    iconSelected: {},
    radioText: {}
});

export default Radio;
