import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

import loaderGradient from '../assets/loader-gradient.png';
import loaderTicks from '../assets/loader-ticks.png';
import loaderIcon from '../assets/icons/address.png';
import Color from '../constants/Color';
import { emY } from '../utils/em';

const SIZE = emY(7);
const IMAGE_CONTAINER_SIZE = SIZE + emY(1.25);

export default class Spinner extends Component {
    rotate = new Animated.Value(0);
    interpolatedRotate = this.rotate.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
    });

    componentDidMount() {
        this.animate();
    }

    animate = () => {
        this.rotate.setValue(0);
        Animated.timing(this.rotate, {
            toValue: 360,
            duration: 2500,
            easing: Easing.linear
        }).start(this.animate);
    };

    render() {
        const { style } = this.props;
        return (
            <View style={[styles.loader, style]}>
                <View style={styles.imageContainer}>
                    <Image source={loaderIcon} style={styles.image} />
                </View>
                <Animated.View
                    style={[
                        styles.gradientContainer,
                        {
                            transform: [{ rotate: this.interpolatedRotate }]
                        }
                    ]}
                >
                    <Image source={loaderGradient} style={[styles.gradient]} />
                    <Image source={loaderTicks} style={styles.ticks} />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loader: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderColor: Color.BLACK,
        height: IMAGE_CONTAINER_SIZE,
        width: IMAGE_CONTAINER_SIZE,
        borderRadius: IMAGE_CONTAINER_SIZE / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: Color.BLACK
    },
    gradientContainer: {
        position: 'absolute',
        width: IMAGE_CONTAINER_SIZE,
        height: IMAGE_CONTAINER_SIZE,
        overflow: 'visible'
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [0, -SIZE * 1] }, { scale: 1 }]
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: SIZE,
        height: SIZE,
        transform: [{ translate: [-SIZE / 2, -SIZE / 2] }, { scale: 1.4 }]
    }
});
