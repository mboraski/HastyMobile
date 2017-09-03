import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import ProductDetail from './ProductDetail';

const initialState = {};

describe('ProductDetail', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<ProductDetail />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});
