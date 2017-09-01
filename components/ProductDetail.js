import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import Style from '../constants/Style';
import { emX, emY } from '../utils/em';

const ProductDetail = props => {
    const { title, thumbnail_image, price, added } = props.product;
    const discount_price = (regular_price = price);
    const callAddToCart = props.callAddToCart;

    return (
        <View style={[Style.shadow, styles.container, props.style]}>
            <View style={styles.iconContainer}>
                <Icon
                    onPress={callAddToCart}
                    type="foundation"
                    name="plus"
                    size={35}
                    iconStyle={[styles.icon, added && styles.iconAdded]}
                />
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: thumbnail_image }} />
            </View>
            <View style={styles.meta}>
                <Text style={[styles.metaItem, styles.title]}>
                    {title}
                </Text>
                <Text style={[styles.metaItem, styles.price]}>
                    {price}
                </Text>
                <View style={styles.discountPriceContainer}>
                    <Text style={[styles.metaItem, styles.discountPrice]}>
                        {discount_price}
                    </Text>
                </View>
                <Text style={styles.regularPrice}>
                    {regular_price}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: emY(0.9375),
        borderRadius: 11
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: emY(1.125)
    },
    icon: {
        color: '#E4E4E4'
    },
    iconAdded: {
        color: '#3aa2fc'
    },
    imageContainer: {
        marginBottom: emY(2.1875)
    },
    image: {
        minHeight: emY(6.25)
    },
    meta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    metaItem: {
        fontSize: emY(1),
        marginRight: 12,
        marginBottom: emY(0.375)
    },
    title: {},
    price: {
        fontWeight: 'bold',
        color: '#3aa2fc'
    },
    discountPriceContainer: {
        marginRight: 12,
        backgroundColor: '#3aa2fc',
        borderRadius: 50,
        overflow: 'hidden'
    },
    discountPrice: {
        marginHorizontal: 12,
        marginVertical: emY(0.375),
        color: '#fff'
    },
    regularPrice: {
        color: '#cccccc',
        textDecorationLine: 'line-through'
    }
});

export default ProductDetail;
