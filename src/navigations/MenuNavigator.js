// Third Party Imports
import React from 'react';
import { DrawerNavigator } from 'react-navigation';

// Relative Imports
import MenuContainer from '../containers/MenuContainer';
import MainNavigator from './MainNavigator';

const MenuNavgiator = DrawerNavigator(
    {
        mainNavigator: { screen: MainNavigator }
    },
    {
        drawerWidth: 300, // TODO: change to a percentation of the screen width
        drawerPosition: 'left',
        contentComponent: props => <MenuContainer {...props} />
    }
);

export default MenuNavgiator;
