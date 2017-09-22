// 3rd Party Libraries
import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import OrderList from '../components/OrderList';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import { getCartOrders } from '../selectors/cartSelectors';
import { addToCart, removeFromCart } from '../actions/cartActions';

class CartScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Cart',
        headerLeft: <BackButton onPress={() => navigation.goBack()} />,
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    });

    render() {
        return (
            <View style={styles.container}>
                <OrderList
                    orders={this.props.orders}
                    onAddOrder={this.props.addToCart}
                    onRemoveOrder={this.props.removeFromCart}
                />
                <View style={styles.cart}>
                    <View style={styles.meta}>
                        <Text style={styles.label}>Order Total:</Text>
                        <Text style={styles.quantity}>{this.props.totalOrders} items</Text>
                        <Text style={styles.cost}>${this.props.totalCost}</Text>
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
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
                elevation: 10
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

const mapStateToProps = state => ({
    cart: state.cart,
    orders: getCartOrders(state),
    totalCost: state.cart.totalCost,
    totalOrders: state.cart.totalOrders,
});

const mapDispatchToProps = {
    addToCart,
    removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
