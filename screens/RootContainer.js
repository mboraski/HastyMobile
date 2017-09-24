import React, { Component } from 'react';
import { connect } from 'react-redux';

// Relative Imports
import MenuNavigator from '../navigations/MenuNavgiator';

class RootContainer extends Component {
    state = {
        drawerOpen: false,
        drawerDisabled: false,
    }

    render() {
        return (
            <MenuNavigator />
        );
    }
}

const mapStateToProps = state => ({ isOpened: state.isOpened });

const mapDispatchToProps = function (dispatch) {
    return {};
};
  
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

