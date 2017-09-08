import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CartScreen from './CartScreen';

const initialState = {};

describe('CartScreen', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<CartScreen />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});
