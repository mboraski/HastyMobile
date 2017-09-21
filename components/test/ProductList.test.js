import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import ProductList from '../ProductList';

describe('ProductList', () => {
    it('renders correctly', () => {
        const products = [
            {
                quantity: 1,
                title: 'Type 1 code 1',
                thumbnail_image: 'image',
                price: '$3.49'
            }
        ];
        const wrapper = shallow(<ProductList products={products} />);
        expect(wrapper).toMatchSnapshot();
    });
});
