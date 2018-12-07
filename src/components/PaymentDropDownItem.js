// Third Party Imports
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Relative Imports
import Text from './Text';
import CardImage from '../components/CardImage';
import Color from '../constants/Color';
// import Style from '../constants/Style';
import { emY } from '../utils/em';

export default function PaymentDropDownItem({
    type,
    brand,
    last4,
    style,
    isHeaderItem,
    ...props
}) {
    return (
        <TouchableOpacity {...props} style={[styles.container, style]}>
            {type ? (
                <CardImage type={type.toLowerCase()} style={styles.card} />
            ) : null}
            <Text style={styles.cardTypeText}>{brand}</Text>
            {last4 && <Text style={styles.cardNumbers}>**** {last4}</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: emY(3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: Color.GREY_100
    },
    card: {
        marginRight: 10
    },
    cardTypeText: {
        flex: 1,
        fontSize: emY(1.1)
    },
    cardNumbers: {
        flex: 1,
        fontSize: emY(1.1),
        textAlign: 'right',
        marginRight: 25,
        color: Color.GREY_800
    }
});
