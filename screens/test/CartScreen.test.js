import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import CartScreen from '../CartScreen';

describe('CartScreen', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const initialState = {
            cart: {
                products: {},
                totalCost: 0,
                totalOrders: 0
            }
        };
        const wrapper = shallow(<CartScreen />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
    it('renders correctly with products', () => {
        const initialState = {
            cart: {
                products: {
                    1: {
                        1: {
                            deliveryType: '1',
                            price: 3.49,
                            productCode: '1',
                            quantity: 1,
                            thumbnail_image: 'image',
                            title: 'Type 1 code 1'
                        }
                    }
                },
                totalCost: 3.49,
                totalOrders: 1
            }
        };
        const wrapper = shallow(<CartScreen />, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});
