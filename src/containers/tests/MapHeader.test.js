import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import { MapHeader } from '../MapHeader';

describe('MapHeader', () => {
    it('should render correctly', () => {
        const render = shallow(<MapHeader />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly searchVisible true', () => {
        const props = { searchVisible: true };
        const render = shallow(<MapHeader {...props} />);
        expect(render).toMatchSnapshot();
    });
});
