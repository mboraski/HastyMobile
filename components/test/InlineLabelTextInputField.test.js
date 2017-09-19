import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import InlineLabelTextInputField from '../InlineLabelTextInputField';

describe('InlineLabelTextInputField', () => {
    it('renders correctly', () => {
        const render = shallow(<InlineLabelTextInputField textInputName={'Test_Input_Name'} />);
        expect(render).toMatchSnapshot();
    });
});
