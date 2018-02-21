import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';

// Relative Imports
import { auth } from '../firebase';
import MenuNavigator from '../navigations/MenuNavigator';
import CommunicationPopup from '../components/CommunicationPopup';
import { authChanged } from '../actions/authActions';
import { closeCustomerPopup } from '../actions/uiActions';
import { reduxBoundAddListener } from '../store';

class RootContainer extends Component {
    componentWillMount() {
        auth.onAuthStateChanged(user => {
            this.props.authChanged(user);
        });
    }

    handleCustomerPopupClose = () => {
        this.props.closeCustomerPopup();
    };

    render() {
        const { customerPopupVisible } = this.props;
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addListener: reduxBoundAddListener
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
    user: state.auth.user,
    isOpened: state.isOpened,
    customerPopupVisible: state.ui.customerPopupVisible,
    nav: state.nav
});

const mapDispatchToProps = dispatch => ({
    dispatch,
    ...bindActionCreators(
        {
            closeCustomerPopup,
            authChanged
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
