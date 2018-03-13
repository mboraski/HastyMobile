import React, { Component } from 'react';
import { StyleSheet, Animated, View, Platform } from 'react-native';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import Text from './Text';
// import NotificationActions from '../actions/notificationActions';
import Color from '../constants/Color';
import { emY } from '../utils/em';
import orderStatuses from '../constants/Order';

export class Notification extends Component {
    state = {
        topValue: new Animated.Value(emY(11)),
        opacity: new Animated.Value(1),
        nextNotification: 'Searching the skies for a hero...',
        currNotification: 'Searching the skies for a hero...'
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    getNotification = () => {
        switch (this.props.status) {
            case orderStatuses.unaccepted:
                return 'Searching the skyies for a hero...';
            case orderStatuses.accepted:
                return 'Found a hero!';
            case orderStatuses.arrived:
                return 'Hero has arrived!';
            case orderStatuses.completed:
                return 'Order complete';
            default:
                break;
        }
    }

    receiveNotification = () => {
        this.setState({ currNotification: this.state.currNotification });
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
            const newNotificaiton = this.getNotification();
            this.setState({ nextNotification: newNotificaiton });
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
        const { nextNotification, currNotification } = this.state;
        return (
            <View style={styles.alertSection}>
                <Animated.View
                    style={[styles.alert, { opacity: this.state.opacity, top: 0 }]}
                >
                    <Text style={styles.alertText}>{nextNotification}</Text>
                </Animated.View>
                <Animated.View
                    style={[styles.alert, { top: this.state.topValue }]}
                >
                    <Text style={styles.alertText}>{currNotification}</Text>
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
        backgroundColor: '#F5A623',
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

const mapStateToProps = state => ({
    status: state.order.status,
    pending: state.order.pending
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
