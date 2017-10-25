// 3rd Party Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Animated,
    Dimensions
} from 'react-native';
import { MapView } from 'expo';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import OrderList from '../components/OrderList';
import DropDown from '../components/DropDown';
import PaymentDropDownItem from '../components/PaymentDropDownItem';
import OopsPopup from '../components/OopsPopup';
import Color from '../constants/Color';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import { getCartOrders } from '../selectors/cartSelectors';
import * as actions from '../actions/cartActions';

import pinIcon from '../assets/icons/pin.png';

export class CheckoutScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Your Order',
        headerLeft: <BackButton onPress={() => navigation.goBack()} />,
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: Style.headerTitle
    });

    state = {
        mapLoaded: false,
        region: {
            longitude: -97.76,
            latitude: 30.26,
            longitudeDelta: 0.1,
            latitudeDelta: 0.25
        },
        address: '3004 N Lamar Blvd',
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        removeOrderPopupVisible: false
    };

    handleRemoveOrder = order => {
        if (order.quantity === 1) {
            this.setState({ removeOrderPopupVisible: true, orderToRemove: order });
        } else {
            this.props.removeFromCart(order);
        }
    };

    removeOrderConfirmed = confirmed => {
        if (confirmed) {
            this.props.removeFromCart(this.state.orderToRemove);
            this.setState({ removeOrderPopupVisible: false, orderToRemove: null });
        }
    };

    lightABeacon = () => {
        this.props.navigation.navigate('deliveryStatus');
    };

    openDeliveryNotes = () => {
        this.props.navigation.navigate('deliveryNotes');
    };

    render() {
        const { orders, addToCart, totalOrders, totalCost, notes } = this.props;
        const { region, address, removeOrderPopupVisible } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.container}>
                        <MapView region={region} style={styles.map}>
                            <MapView.Marker
                                image={pinIcon}
                                coordinate={{
                                    latitude: region.latitude,
                                    longitude: region.longitude
                                }}
                                title="You"
                                description="Your Delivery Location"
                            />
                        </MapView>
                        <View style={styles.itemHeader}>
                            <Text stye={styles.itemHeaderLabel}>DELIVERY LOCATION</Text>
                        </View>
                        <View style={styles.itemBody}>
                            <Text style={styles.itemBodyLabel}>{address}</Text>
                            <TouchableOpacity style={styles.itemButton}>
                                <Text style={styles.itemButtonText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemHeader}>
                            <Text style={styles.itemHeaderLabel}>DELIVERY NOTES</Text>
                        </View>
                        <View style={styles.itemBody}>
                            <Text style={styles.itemBodyLabel}>{notes}</Text>
                            <TouchableOpacity
                                style={styles.itemButton}
                                onPress={this.openDeliveryNotes}
                            >
                                <Text style={styles.itemButtonText}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemHeader}>
                            <Text stye={styles.itemHeaderLabel}>PRODUCT SUMMARY</Text>
                        </View>
                        <OrderList
                            orders={orders}
                            onAddOrder={addToCart}
                            onRemoveOrder={this.handleRemoveOrder}
                        />
                        <View style={styles.itemHeader}>
                            <Text stye={styles.itemHeaderLabel}>PAYMENT METHOD</Text>
                        </View>
                        <View style={styles.dropdownContainer}>
                            <DropDown header={<PaymentDropDownItem isHeaderItem />}>
                                <PaymentDropDownItem isHeaderItem={false} />
                                <PaymentDropDownItem isHeaderItem={false} />
                            </DropDown>
                        </View>
                    </View>
                    <View style={styles.cart}>
                        <View style={styles.meta}>
                            <Text style={styles.label}>Delivery Fee:</Text>
                            <Text style={styles.cost}>${totalCost}</Text>
                        </View>
                        <View style={styles.meta}>
                            <Text style={styles.label}>Tax:</Text>
                            <Text style={styles.cost}>$14.78</Text>
                        </View>
                        <View style={styles.meta}>
                            <Text style={styles.label}>Order Total:</Text>
                            <Text style={styles.cost}>${totalCost}</Text>
                        </View>
                        <Button
                            onPress={this.lightABeacon}
                            title="LIGHT A BEACON!"
                            containerViewStyle={styles.buttonContainer}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                        />
                    </View>
                </ScrollView>
                <OopsPopup
                    openModal={removeOrderPopupVisible}
                    closeModal={this.removeOrderConfirmed}
                    message="Are you sure you want to remove this product from your cart?"
                    showIcon={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: emY(13.81)
    },
    map: {
        height: emY(9.25),
        shadowColor: 'transparent'
    },
    itemHeader: {
        paddingHorizontal: 20,
        paddingVertical: emY(0.8)
    },
    itemHeaderLabel: {
        fontSize: emY(0.83),
        color: Color.GREY_600
    },
    itemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: emY(0.8),
        backgroundColor: Color.GREY_100
    },
    itemBodyLabel: {
        width: Dimensions.get('window').width - 160,
        fontSize: emY(1.08),
        color: Color.GREY_800
    },
    itemButton: {
        width: 80,
        height: emY(1.5),
        alignItems: 'flex-end'
    },
    itemButtonText: {
        fontSize: emY(1.08),
        color: Color.BLUE_500
    },
    dropdownContainer: {
        marginBottom: emY(19.19)
    },
    cart: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 23,
        paddingTop: emY(1.25),
        paddingBottom: emY(1.32),
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
        justifyContent: 'space-between',
        marginBottom: emY(0.5),
        alignItems: 'center'
    },
    label: {
        fontSize: emY(1),
        color: Color.GREY_600,
        marginRight: 11
    },
    cost: {
        fontSize: emY(1.25)
    },
    buttonContainer: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: emY(1)
    },
    button: {
        backgroundColor: '#000',
        height: emY(3.75)
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
    notes: state.checkout.notes
});

const mapDispatchToProps = {
    addToCart: actions.addToCart,
    removeFromCart: actions.removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
