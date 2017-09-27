import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';

import Color from '../constants/Color';
import { emY } from '../utils/em';

const DEFAULT_NOTIFICATION = 'Notification';

class Notification extends Component {
    state = { 
        topValue: new Animated.Value(emY(11)),
        opacity: new Animated.Value(1),
        index: 0,
        prevNotificaiton: DEFAULT_NOTIFICATION,
        currNotificaiton: DEFAULT_NOTIFICATION
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    receiveNotification = () => {
        const { index } = this.state;
        this.setState({ index: index + 1 });
        const newNotificaiton = DEFAULT_NOTIFICATION + String('  ') + this.state.index;
        this.setState({ currNotificaiton: newNotificaiton });
        Animated.parallel([
            Animated.timing(this.state.topValue,
                { 
                    toValue: 0,
                    duration: 500
                }
            ),
            Animated.timing(this.state.opacity,
                { 
                    toValue: 0,
                    duration: 500
                }
            )
        ]).start(() => {
            this.setState({ prevNotificaiton: newNotificaiton });
            Animated.parallel([
                Animated.timing(this.state.topValue,
                    { 
                        toValue: emY(11),
                        duration: 0
                    }
                ),
                Animated.timing(this.state.opacity,
                    { 
                        toValue: 1,
                        duration: 0
                    }
                )
            ]).start();
        });
    }

    render() {
        const { prevNotificaiton, currNotificaiton } = this.state;
        return (
            <View style={styles.alertSection}>
                <Animated.View 
                    style={[styles.alert, { opacity: this.state.opacity, top: 0 }]}
                >
                    <Text style={styles.alertText}>{prevNotificaiton}</Text>
                </Animated.View>
                <Animated.View 
                    style={[styles.alert, { top: this.state.topValue }]}
                >
                    <Text style={styles.alertText}>{currNotificaiton}</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    alertSection: {
        height: emY(10),
        overflow: 'hidden'
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
        position: 'absolute',
        left: 27,
        right: 27
    },
    alertText: {
        fontSize: emY(1.0625),
        color: '#fff',
        textAlign: 'center'
    },
});

const mapDispatchToProps = function (dispatch) {
    return {};
};

export default connect(null, mapDispatchToProps)(Notification);
