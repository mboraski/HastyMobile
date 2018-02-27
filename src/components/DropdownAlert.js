// Third Party Imports
import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, StatusBar, Platform } from 'react-native';

// Relative Imports
import Color from '../constants/Color';

export default class DropdownAlert extends Component {
    constructor(props) {
        super(props);
        this.animation = new Animated.Value(-100);
    }

    componentDidMount() {
        if (this.props.visible) {
            Animated.timing(this.animation, {
                toValue: 0,
                duration: 500
            }).start();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            if (nextProps.visible) {
                Animated.timing(this.animation, {
                    toValue: 0,
                    duration: 500
                }).start();
            } else {
                Animated.timing(this.animation, {
                    toValue: -100,
                    duration: 500
                }).start();
            }
        }
    }

    onLayout = event => {
        const { height } = event.nativeEvent.layout;
        this.setState({ height });
    };

    render() {
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
                        transform: [
                            {
                                translateY: this.animation
                            }
                        ]
                    }
                ]}
            >
                <Text style={styles.text}>{this.props.text}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.YELLOW_600,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    text: {
        padding: 10,
        color: '#fff'
    }
});
