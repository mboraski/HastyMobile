// Third Party Imports
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
// import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import moment from 'moment';
import { Permissions } from 'expo';

// Relative Imports
import MenuNavigator from '../navigations/MenuNavigator';
import CommunicationPopup from '../components/CommunicationPopup';
import DropdownAlert from '../components/DropdownAlert';
import { listenToAuthChanges, signOut } from '../actions/authActions';
import { closeCustomerPopup, dropdownAlert } from '../actions/uiActions';
import { unListenProductsRef } from '../actions/productActions';
import { listenToOrder, unlistenToOrder } from '../actions/orderActions';

class RootContainer extends Component {
    async componentWillMount() {
        if (
            this.props.user &&
            moment().isAfter(moment(this.props.authExpirationDate))
        ) {
            this.props.signOut();
        }

        this.props.listenToAuthChanges();

        if (this.props.orderId) {
            this.props.listenToOrder(this.props.orderId);
        }

        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(
                Permissions.NOTIFICATIONS
            );
            finalStatus = status;
        }

        if (finalStatus === 'granted') {
            // Get the token that uniquely identifies this device
            // let token = await Notifications.getExpoPushTokenAsync();
            // Handle notifications that are received or selected while the app
            // is open. If the app was closed and then opened by tapping the
            // notification (rather than just tapping the app icon to open it),
            // this function will fire on the next tick after the app starts
            // with the notification data.
            // this.notificationSubscription = Notifications.addListener(
            //     this.handleNotification
            // );
        }
    }

    componentWillUnMount() {
        this.props.unListenProductsRef();
        this.props.unlistenToOrder(this.props.orderId);
    }

    // handleNotification = notification => {
    //     if (notification.data) {
    //         if (notification.data.type === 'feedback') {
    //             this.props.dispatch(
    //                 NavigationActions.navigate({
    //                     routeName: 'notificationFeedback',
    //                     params: notification.data
    //                 })
    //             );
    //         }
    //     }
    // };

    handleCustomerPopupClose = () => {
        this.props.closeCustomerPopup();
    };

    handleDropdownAlertCloseAnimationComplete = () => {
        this.props.dropdownAlert(false);
    };

    render() {
        const {
            customerPopupVisible,
            dropdownAlertVisible,
            dropdownAlertText
        } = this.props;
        // const navigation = addNavigationHelpers({
        //     dispatch,
        //     state: nav
        //     // addListener: reduxBoundAddListener
        // });
        return (
            <View style={styles.container}>
                <MenuNavigator />
                <CommunicationPopup
                    openModal={customerPopupVisible}
                    closeModal={this.handleCustomerPopupClose}
                />
                <DropdownAlert
                    visible={dropdownAlertVisible}
                    text={dropdownAlertText}
                    onCloseAnimationComplete={
                        this.handleDropdownAlertCloseAnimationComplete
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});

const mapStateToProps = state => ({
    user: state.auth.user,
    authExpirationDate: state.auth.expirationDate,
    customerPopupVisible: state.ui.customerPopupVisible,
    dropdownAlertVisible: state.ui.dropdownAlertVisible,
    dropdownAlertText: state.ui.dropdownAlertText,
    nav: state.nav
});

const mapDispatchToProps = {
    unListenProductsRef,
    closeCustomerPopup,
    dropdownAlert,
    listenToAuthChanges,
    signOut,
    listenToOrder,
    unlistenToOrder
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);
