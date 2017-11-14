import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import { HomeHeader } from '../HomeHeader';

describe('HomeHeader', () => {
    it('should render correctly', () => {
        const render = shallow(<HomeHeader />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly searchVisible true', () => {
        const props = { searchVisible: true };
        const render = shallow(<HomeHeader {...props} />);
        expect(render).toMatchSnapshot();
    });
});
