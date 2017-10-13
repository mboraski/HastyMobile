import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Relative Imports
import MenuNavigator from '../navigations/MenuNavgiator';
import CustomerPopup from '../components/CustomerPopup';
import { closeCustomerPopup } from '../actions/uiActions';

class RootContainer extends Component {
    state = {
        drawerOpen: false,
        drawerDisabled: false
    };

    handleCustomerPopupClose = () => {
        this.props.closeCustomerPopup();
    };

    render() {
        const { customerPopupVisible } = this.props;
        return (
            <View style={styles.container}>
                <MenuNavigator />
                <CustomerPopup
                    openModal={customerPopupVisible}
                    closeModal={this.handleCustomerPopupClose}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 }
});

const mapStateToProps = state => ({
    isOpened: state.isOpened,
    customerPopupVisible: state.ui.customerPopupVisible
});

const mapDispatchToProps = {
    closeCustomerPopup
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
