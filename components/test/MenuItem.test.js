import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import MenuItem from '../MenuItem';
import notificationIcon from '../../assets/icons/notification.png';

const initialState = {};

describe('MenuItem', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<MenuItem 
            image={notificationIcon} title="Notifications" badge="3" 
        />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});
