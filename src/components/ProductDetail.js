// Third Part Imports
import React, { PureComponent } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

// Relative Imports
import Text from './Text';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import defaultImage from '../assets/icons/logo-orange.png';
import Dimensions from '../constants/Dimensions';

const ICON_SIZE = emY(1.3);

const determineCta = (consumed, available) => {
    let cta = 'Request We Stock';
    if (consumed && available) {
        cta = 'Limit Reached';
    } else if (available) {
        cta = 'Add to Cart';
    }
    return cta;
};

class ProductDetail extends PureComponent {
    render() {
        const {
            consumed,
            quantityAvailable,
            quantityTaken,
            product,
            image,
            handleRequestProduct,
            handleAddToCart
        } = this.props;

        const { productName, price } = product;
        const available = quantityAvailable > 0;
        const callToAction = determineCta(consumed, available);
        const formattedPrice = `${Number.parseFloat(price).toFixed(2)}`;
        const productImage = image ? { uri: image } : defaultImage;
        const limitReached = () => {};
        const onClickHandler = () => {
            if (consumed && available) {
                limitReached();
            } else if (available) {
                handleAddToCart(product);
            } else {
                handleRequestProduct(product);
            }
        };
        console.log('render', product.id);

        return (
            <TouchableOpacity
                onPress={onClickHandler}
                style={[Style.shadow, styles.container]}
            >
                <View style={[styles.quantityRow]}>
                    <Text
                        style={[styles.quantity, available && styles.available]}
                    >
                        {available && quantityTaken}
                    </Text>
                    <Foundation
                        name={'plus'}
                        size={ICON_SIZE}
                        style={[
                            styles.plusIcon,
                            available && styles.available,
                            consumed && available && styles.consumed
                        ]}
                    />
                </View>
                <Image
                    style={styles.image}
                    source={productImage}
                    resizeMode="contain"
                />
                <View style={styles.meta}>
                    <Text style={[styles.title]} numberOfLines={2}>
                        {productName}
                    </Text>
                    <Text style={[styles.price]}>${formattedPrice}</Text>
                </View>
                <View
                    style={[styles.ctaButton, available && styles.ctaAvailable]}
                >
                    <Text style={[styles.ctaButtonText]}>{callToAction}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: Color.WHITE,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
        height: 200,
        width: Dimensions.window.width / 3 - 5,
        marginBottom: emY(0.25)
    },
    button: {
        backgroundColor: Color.DEFAULT
    },
    ctaButton: {
        flex: 1,
        height: 17,
        maxHeight: 17,
        padding: 0,
        borderRadius: 3,
        justifyContent: 'center',
        paddingHorizontal: 3,
        backgroundColor: Color.DEFAULT
    },
    ctaButtonText: {
        color: Color.WHITE,
        fontSize: emY(0.8),
        textAlign: 'center'
    },
    quantityRow: {
        zIndex: 10,
        position: 'absolute',
        top: 5,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    quantityContainer: {
        backgroundColor: Color.GREEN_500,
        borderRadius: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 13,
        paddingVertical: emY(0.5)
    },
    quantity: {
        fontSize: emY(1.1),
        color: Color.DEFAULT,
        right: 3
    },
    plusIcon: {
        marginRight: 5,
        color: Color.DEFAULT
    },
    available: {
        color: Color.GREEN_500
    },
    consumed: {
        color: Color.GREY_300
    },
    ctaAvailable: {
        backgroundColor: Color.GREEN_500
    },
    image: {
        paddingTop: 10,
        height: 120,
        width: '100%'
    },
    meta: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: emY(0.8),
        marginHorizontal: 3,
        overflow: 'hidden',
        width: '100%',
        textAlign: 'center'
    },
    price: {
        fontSize: emY(0.8),
        padding: 3,
        color: Color.GREY_600
    }
});

export default ProductDetail;
