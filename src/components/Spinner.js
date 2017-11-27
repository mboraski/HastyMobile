import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';

import loaderGradient from '../assets/loader-gradient.png';
import loaderTicks from '../assets/loader-ticks.png';
import loaderIcon from '../assets/icons/address.png';
import Color from '../constants/Color';
import { emY } from '../utils/em';

const SIZE = emY(5);
const IMAGE_CONTAINER_SIZE = SIZE + emY(3);
const RING_SIZE = IMAGE_CONTAINER_SIZE + emY(1);
const TICKS_SIZE = RING_SIZE + emY(1.5);

export default class Spinner extends Component {
    static defaultProps = {
        image: loaderIcon,
        disabled: false
    };

    rotate = new Animated.Value(0);
    interpolatedRotate = this.rotate.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
    });

    componentDidMount() {
        if (!this.props.disabled) {
            this.animate();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.disabled !== nextProps.disabled) {
            if (nextProps.disabled) {
                this.animation && this.animation.stop();
            } else {
                this.animation && this.animation.start(this.animate);
            }
        }
    }

    animate = () => {
        this.rotate.setValue(0);
        this.animation = Animated.timing(this.rotate, {
            toValue: 360,
            duration: 2500,
            easing: Easing.linear
        }).start(this.animate);
    };

    render() {
        const { style, image, imageStyle } = this.props;
        return (
            <View style={[styles.loader, style]}>
                <View style={styles.ring}>
                    <View style={styles.imageContainer}>
                        <Image source={image} style={[styles.image, imageStyle]} />
                    </View>
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
    ring: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth * 10,
        borderColor: Color.GREY_300,
        height: RING_SIZE,
        width: RING_SIZE,
        borderRadius: RING_SIZE / 2
    },
    imageContainer: {
        height: IMAGE_CONTAINER_SIZE,
        width: IMAGE_CONTAINER_SIZE,
        borderRadius: IMAGE_CONTAINER_SIZE / 2,
        backgroundColor: Color.BLACK,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: SIZE,
        height: SIZE
    },
    gradientContainer: {
        position: 'absolute',
        width: RING_SIZE,
        height: RING_SIZE,
        overflow: 'visible'
    },
    gradient: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: RING_SIZE,
        height: RING_SIZE,
        transform: [{ translate: [0, -RING_SIZE * 1] }]
    },
    ticks: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: TICKS_SIZE,
        height: TICKS_SIZE,
        transform: [{ translate: [-TICKS_SIZE / 2, -TICKS_SIZE / 2] }]
    }
});
