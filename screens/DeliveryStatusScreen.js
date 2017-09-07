// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import { Button } from 'react-native-elements';

// Relative Imports
import loaderGradient from '../assets/loader-gradient.png';
import loaderTicks from '../assets/loader-ticks.png';
import BrandButton from '../components/BrandButton';
import MenuButtonRight from '../components/MenuButtonRight';
import HeroList from '../components/HeroList';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

const SIZE = emY(7);
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25);

class DeliveryStatusScreen extends Component {
    render() {
        return (
            <View style={styles.container}> 
                <View style={styles.loader}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={styles.image} />
                    </View>
                    <Image source={loaderGradient} style={styles.gradient} />
                    <Image source={loaderTicks} style={styles.ticks} />
                </View>
                <Text style={styles.searching}>Searching...</Text>
                <View style={styles.alert}>
                    <Text style={styles.alertText}>New Hero Found!</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Located Heroes...</Text>
                </View>
                <HeroList />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loader: {
        height: emY(11),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: emY(1)
    },
    imageContainer: {
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderColor: Color.GREY_300,
        height: IMAGE_CONTAINER_SIZE,
        width: IMAGE_CONTAINER_SIZE,
        borderRadius: (IMAGE_CONTAINER_SIZE) / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [
            { translate: [0, -SIZE * 1] },
            { scale: 1 }
        ],
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [
            { translate: [-SIZE / 2, -SIZE / 2] }, 
            { scale: 1.4 }
        ],
    },
    searching: {
        color: Color.GREY_600,
        fontSize: emY(1.4375),
        textAlign: 'center',
        marginBottom: emY(3)
    },
    alert: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: emY(0.375) },
                shadowOpacity: 0.25,
                shadowRadius: emY(0.8125)
            },
            android: {
                elevation: 6
            }
        }),
        backgroundColor: Color.YELLOW_500,
        paddingVertical: emY(1.25),
        marginHorizontal: 27,
        marginBottom: emY(6)
    },
    alertText: {
        fontSize: emY(1.0625),
        color: '#fff',
        textAlign: 'center'
    },
    label: {
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderColor: Color.GREY_300,
        paddingBottom: emY(0.375),
        marginLeft: 27,
        marginRight: 27,
    },
    labelText: {
        color: Color.GREY_600,
        fontSize: emY(1.0625),
        letterSpacing: 0.5
    }
});

DeliveryStatusScreen.navigationOptions = {
    title: 'Hasty',
    headerLeft: <BrandButton />,
    headerRight: <MenuButtonRight />,
    headerStyle: Style.header,
    headerTitleStyle: Style.headerTitle
};

export default DeliveryStatusScreen;
