import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import TextInputField from '../TextInputField';

describe('TextInputField', () => {
    it('renders correctly', () => {
        const render = shallow(<TextInputField />);
        expect(render).toMatchSnapshot();
    });
});
