// Third Part Imports
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import chatIcon from '../assets/icons/chat.png';
import profile from '../assets/profile.png';

const IMAGE_SIZE = emY(4.25);
const CHAT_SIZE = emY(3.375);
const CHAT_IMAGE_SIZE = emY(1.3125);

const HeroDetail = props => {
    const {
        firstName,
        lastName,
        deliveryTime,
        heroStatus,
        contractorId,
        contactContractor
    } = props;

    const callContractor = () => contactContractor(contractorId);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={profile} />
            <View style={styles.content}>
                <View style={styles.contentPrimary}>
                    <View style={styles.meta}>
                        <Text style={[styles.metaItem, styles.name]}>
                            {firstName.toUpperCase()} {lastName.toUpperCase()}
                        </Text>
                        <TouchableOpacity
                            style={styles.chatButton}
                            onPress={callContractor}
                        >
                            <Image source={chatIcon} style={styles.chatImage} />
                        </TouchableOpacity>
                        <Text style={[styles.metaItem, styles.deliveryTime]}>
                            Estimated Delivery Time: {deliveryTime / 60} min
                        </Text>
                        <Text
                            style={[
                                styles.metaItem,
                                styles.metaItemLast,
                                styles.deliveryTime
                            ]}
                        >
                            Status: {heroStatus}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

// <TouchableOpacity
//     onPress={() => {
//     }}
// >
//     <Text style={[styles.metaItem, styles.link]}>
//         <MaterialIcons name="check" size={16} style={styles.check} />{'Confirmed Order'}
//     </Text>
// </TouchableOpacity>

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingBottom: emY(0.875),
        marginLeft: 27,
        marginRight: 27,
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderColor: Color.GREY_300
    },
    content: { flex: 1 },
    contentPrimary: { flexDirection: 'row' },
    meta: {
        flex: 1,
        marginTop: emY(1)
    },
    metaItem: {
        fontSize: emY(1),
        marginBottom: emY(0.4375)
    },
    metaItemLast: {
        marginBottom: 0
    },
    link: {
        color: Color.BLUE_500
    },
    name: {},
    type: {},
    deliveryTime: {},
    check: {},
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
        marginTop: emY(1),
        marginRight: 17
    },
    chatButton: {
        backgroundColor: Color.GREY_400,
        width: CHAT_SIZE,
        height: CHAT_SIZE,
        borderRadius: CHAT_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: emY(0.625)
    },
    chatImage: {
        width: CHAT_IMAGE_SIZE,
        height: CHAT_IMAGE_SIZE
    }
});

export default HeroDetail;
