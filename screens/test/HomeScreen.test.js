import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import HomeScreen from '../HomeScreen';

const initialState = {
    product: {
        list: {
            1: {
                1: {
                    quantity: 1,
                    title: 'Type 1 code 1',
                    thumbnail_image: 'image',
                    price: '$3.49'
                }
            },
            2: {
                2: {
                    quantity: 2,
                    title: 'Type 2 code 2',
                    thumbnail_image: 'image',
                    price: '$3.49'
                }
            }
        },
        deliveryType: '1'
    },
    cart: {
        totalProducts: 0
    }
};

describe('HomeScreen', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const wrapper = shallow(<HomeScreen />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});
