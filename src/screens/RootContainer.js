import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';

// Relative Imports
import MenuNavigator from '../navigations/MenuNavigator';
import CommunicationPopup from '../components/CommunicationPopup';
import { closeCustomerPopup as closeCustomerPopupAction } from '../actions/uiActions';


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
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav
        });
        return (
            <View style={styles.container}>
                <MenuNavigator navigation={navigation} />
                <CommunicationPopup
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
    customerPopupVisible: state.ui.customerPopupVisible,
    nav: state.nav
});

const mapDispatchToProps = dispatch => {
    const closeCustomerPopup = bindActionCreators(closeCustomerPopupAction, dispatch);

    return {
        closeCustomerPopup,
        dispatch
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
