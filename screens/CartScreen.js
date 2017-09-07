// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

// Relative Imports
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import OrderList from '../components/OrderList';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';

class CartScreen extends Component {
    static navigationOptions = {
        title: 'Cart',
        headerLeft: <BackButton />,
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    };

    state = {
        quantity: 5,
        cost: 499.95,
        orders: Array(5)
            .fill()
            .map((e, i) => ({
                id: i,
                name: `Item ${i}`,
                price: 99.99,
                delivery_type: 'Instant',
                image: 'https://facebook.github.io/react/img/logo_og.png',
                quantity: 1
            }))
    };

    handleAddOrder = order => {
        const { orders, quantity, cost } = this.state;
        this.setState({
            orders: orders.map(item => {
                if (item.id !== order.id) {
                    return item;
                }
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }),
            quantity: quantity + 1,
            cost: Math.max(0, (cost + order.price).toFixed(2))
        });
    };

    handleRemoveOrder = order => {
        const { orders, quantity, cost } = this.state;
        if (order.quantity === 1) {
            this.setState({
                orders: orders.filter((item) => item.id !== order.id),
                quantity: quantity - 1,
                cost: Math.max(0, (cost - order.price).toFixed(2))
            });
        } else {
            this.setState({
                orders: orders.map(item => {
                    if (item.id !== order.id) {
                        return item;
                    }
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }),
                quantity: quantity - 1,
                cost: Math.max(0, (cost - order.price).toFixed(2))
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <OrderList
                    orders={this.state.orders}
                    onAddOrder={this.handleAddOrder}
                    onRemoveOrder={this.handleRemoveOrder}
                />
                <View style={styles.cart}>
                    <View style={styles.meta}>
                        <Text style={styles.label}>Order Total:</Text>
                        <Text style={styles.quantity}>{this.state.quantity} items</Text>
                        <Text style={styles.cost}>${this.state.cost}</Text>
                    </View>
                    <Button
                        title="CONFIRM ORDER"
                        containerViewStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    cart: {
        paddingHorizontal: 27,
        paddingTop: emY(1.6875),
        paddingBottom: emY(1),
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: emY(0.625) },
                shadowOpacity: 0.5,
                shadowRadius: emY(1.5)
            },
            android: {
                elevation: 6
            }
        })
    },
    meta: {
        flexDirection: 'row',
        marginBottom: emY(1.375),
        alignItems: 'center'
    },
    label: {
        fontSize: emY(1),
        color: Color.GREY_600,
        marginRight: 11
    },
    quantity: {
        fontSize: emY(1),
        flex: 1
    },
    cost: {
        fontSize: emY(1.25)
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: emY(0.875)
    },
    buttonText: {
        fontSize: emY(0.8125)
    }
});

export default CartScreen;
