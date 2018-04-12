// 3rd Party Libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Platform,
    Animated,
    ActivityIndicator
} from 'react-native';
import { MapView } from 'expo';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Relative Imports
import firebase from '../firebase';
import BackButton from '../components/BackButton';
import TransparentButton from '../components/TransparentButton';
import OrderList from '../components/OrderList';
// import DropDown from '../components/DropDown';
import PaymentMethod from '../components/PaymentMethod';
import OopsPopup from '../components/OopsPopup';
import SuccessPopup from '../components/SuccessPopup';
import Text from '../components/Text';
import Color from '../constants/Color';
import Dimensions from '../constants/Dimensions';
import Style from '../constants/Style';
import { emY } from '../utils/em';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { dropdownAlert } from '../actions/uiActions';
import { submitPayment, submitPaymentRequest, listCards } from '../actions/paymentActions';
import { reset } from '../actions/navigationActions';
import {
    getCartOrders,
    getCartCostTotal,
    getCartTaxTotal,
    getCartServiceCharge,
    getServiceFee,
    getDeliveryFee
} from '../selectors/cartSelectors';

import beaconIcon from '../assets/icons/beacon.png';

const REMOVE_ORDER_MESSAGE = 'Are you sure you want to remove this product from your cart?';
const CHANGE_LOCATION_TITLE = 'Are you sure you want to change your delivery location?';
const CHANGE_LOCATION_MESSAGE =
    'The available products/services at your new location may be different.';
const MAP_HEIGHT = emY(8.25);

class CheckoutScreen extends Component {
    static navigationOptions = ({ navigation, pending }) => ({
        title: 'Checkout',
        headerLeft: <BackButton
            onPress={
                !pending ?
                () => navigation.goBack() :
                () => {}
            }
        />,
        headerRight: <TransparentButton />,
        headerStyle: Style.header,
        headerTitleStyle: [Style.headerTitle, Style.headerTitleLogo]
    });

    state = {
        mapLoaded: false,
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        removeOrderPopupVisible: false,
        changeLocationPopupVisible: false
    };

    componentDidMount() {
        const user = firebase.auth().currentUser;
        if (user) {
            const uid = user.uid;
            this.props.listCards(uid);
        }
        if (this.props.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        } else if (this.props.itemCountDown) {
            this.props.dropdownAlert(true, 'Some products are no longer available');
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (!this.props.cart && nextProps.cart) {
        //     this.props.fetchProductsRequest();
        // }
        if (!this.props.itemCountUp && nextProps.itemCountUp) {
            this.props.dropdownAlert(true, 'More products available!');
        } else if (!this.props.itemCountDown && nextProps.itemCountDown) {
            this.props.dropdownAlert(true, 'Some products are no longer available');
        } else {
            this.props.dropdownAlert(false, '');
        }
    }

    handleRemoveOrder = order => {
        if (order.quantityTaken === 1) {
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

    changeLocation = () => {
        this.setState({ changeLocationPopupVisible: true });
    };

    changeLocationConfirmed = confirmed => {
        if (confirmed) {
            this.props.navigation.dispatch(reset('map'));
        }
        this.setState({ changeLocationPopupVisible: false });
    };

    lightABeacon = () => {
        const { selectedCard, navigation, totalCost, notes, orderId, cart } = this.props;
        if (selectedCard) {
            const cardId = selectedCard.id;
            this.props.submitPaymentRequest();
            this.props.submitPayment(
                navigation,
                cardId,
                totalCost,
                notes,
                orderId,
                cart
            );
        } else {
            this.props.dropdownAlert(true, 'Go to Menu to add payment method');
        }
    };

    openDeliveryNotes = () => {
        this.props.navigation.navigate('deliveryNotes');
    };

    render() {
        const {
            cart,
            cartImages,
            tax,
            serviceCharge,
            serviceFee,
            deliveryFee,
            totalCost,
            notes,
            address,
            region,
            selectedCard,
            pending
        } = this.props;
        const { removeOrderPopupVisible, changeLocationPopupVisible } = this.state;
        const serviceChargeFormatted = serviceCharge ? (serviceCharge / 100).toFixed(2) : 0;
        const serviceFeeFormatted = serviceFee ? (serviceFee / 100).toFixed(2) : 0;
        const deliveryFeeFormatted = deliveryFee ? (deliveryFee / 100).toFixed(2) : 0;
        const taxFormatted = tax ? (tax / 100).toFixed(2) : 0;
        const totalCostFormatted = totalCost ? (totalCost / 100).toFixed(2) : 0;

        return (
            <View style={styles.container}>
                {pending ?
                    <ActivityIndicator
                        size="large"
                        style={StyleSheet.absoluteFill}
                    /> :
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.container}>
                            <MapView region={region} style={styles.map}>
                                <MapView.Marker
                                    image={beaconIcon}
                                    coordinate={region}
                                    title="You"
                                    description="Your Delivery Location"
                                    anchor={{ x: 0.2, y: 1 }}
                                    centerOffset={{ x: 12, y: -25 }}
                                />
                            </MapView>
                            <Button
                                onPress={this.lightABeacon}
                                title="LIGHT A BEACON!"
                                containerViewStyle={styles.buttonContainer}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                            />
                            <View style={styles.itemHeader}>
                                <Text stye={styles.itemHeaderLabel}>PAYMENT METHOD</Text>
                            </View>
                            <View style={styles.dropdownContainer}>
                                <PaymentMethod
                                    type={selectedCard.brand}
                                    text={selectedCard.last4}
                                />
                            </View>
                            <View style={styles.itemHeader}>
                                <Text stye={styles.itemHeaderLabel}>DELIVERY LOCATION</Text>
                            </View>
                            <View style={styles.itemBody}>
                                <Text style={styles.itemBodyLabel}>{address}</Text>
                                <TouchableOpacity
                                    style={styles.itemButton}
                                    onPress={this.changeLocation}
                                >
                                    <Text style={styles.itemButtonText}>Change</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemHeaderLabel}>DELIVERY NOTES</Text>
                                <Text style={styles.itemHeaderLabelNotes}>(Help your hero find you. What color shirt are you wearing? What can help identify you and your location?)</Text>
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
                                orders={cart}
                                orderImages={cartImages}
                                onAddOrder={this.props.addToCart}
                                onRemoveOrder={this.handleRemoveOrder}
                            />
                        </View>
                        <View style={styles.cart}>
                            {!!serviceCharge && <View style={styles.meta}>
                                <Text style={styles.label}>Service Charge:</Text>
                                <Text style={styles.cost}>${serviceChargeFormatted}</Text>
                            </View>}
                            {!!serviceFee && <View style={styles.meta}>
                                <Text style={styles.label}>Service Fee:</Text>
                                <Text style={styles.cost}>${serviceFeeFormatted}</Text>
                            </View>}
                            {!!deliveryFee && <View style={styles.meta}>
                                <Text style={styles.label}>Delivery Fee:</Text>
                                <Text style={styles.cost}>${deliveryFeeFormatted}</Text>
                            </View>}
                            <View style={styles.meta}>
                                <Text style={styles.label}>Tax:</Text>
                                <Text style={styles.cost}>${taxFormatted}</Text>
                            </View>
                            <View style={styles.meta}>
                                <Text style={styles.label}>Order Total:</Text>
                                <Text style={styles.cost}>${totalCostFormatted}</Text>
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
                }
                <OopsPopup
                    openModal={removeOrderPopupVisible}
                    closeModal={this.removeOrderConfirmed}
                    message={REMOVE_ORDER_MESSAGE}
                    showIcon={false}
                />
                <SuccessPopup
                    openModal={changeLocationPopupVisible}
                    closeModal={this.changeLocationConfirmed}
                    title={CHANGE_LOCATION_TITLE}
                    message={CHANGE_LOCATION_MESSAGE}
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
        height: MAP_HEIGHT,
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
    itemHeaderLabelNotes: {
        fontSize: emY(0.8),
        color: Color.GREY_500
    },
    itemBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: emY(0.8),
        backgroundColor: Color.GREY_100
    },
    itemBodyLabel: {
        width: Dimensions.window.width - 160,
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
        marginBottom: emY(1.08)
    },
    cart: {
        position: 'relative',
        backgroundColor: '#fff',
        paddingHorizontal: 23,
        paddingVertical: 20,
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
        marginBottom: 5,
        alignItems: 'center'
    },
    label: {
        fontSize: 14,
        color: Color.GREY_600,
        marginRight: 11
    },
    cost: {
        fontSize: 14
    },
    buttonContainer: {
        marginTop: 10
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
    cart: getCartOrders(state),
    cartImages: state.product.productImages,
    totalCost: getCartCostTotal(state),
    tax: getCartTaxTotal(state),
    serviceFee: getServiceFee(state),
    deliveryFee: getDeliveryFee(state),
    serviceCharge: getCartServiceCharge(state),
    notes: state.checkout.notes,
    address: state.cart.currentSetAddress,
    region: state.cart.region,
    cards: state.payment.cards,
    selectedCard: state.payment.selectedCard,
    pending: state.payment.pending,
    orderId: state.order.currentOrderDatabaseKey
});

const mapDispatchToProps = {
    addToCart,
    removeFromCart,
    dropdownAlert,
    submitPayment,
    submitPaymentRequest,
    listCards
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);
