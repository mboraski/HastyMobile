import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import SearchBarButton from '../SearchBarButton';

describe('SearchBar', () => {
    it('renders correctly', () => {
        const render = shallow(<SearchBarButton />);
        expect(render).toMatchSnapshot();
    });
});
