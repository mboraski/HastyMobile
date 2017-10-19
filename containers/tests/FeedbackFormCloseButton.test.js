import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { FeedbackFormCloseButton } from '../FeedbackFormCloseButton';

describe('FeedbackFormCloseButton', () => {
    it('should render correctly', () => {
        const props = {};
        const render = shallow(<FeedbackFormCloseButton {...props} />);
        expect(render.dive()).toMatchSnapshot();
    });
    it('should render correctly form visible', () => {
        const props = { feedbackFormVisible: true };
        const render = shallow(<FeedbackFormCloseButton {...props} />);
        expect(render.dive()).toMatchSnapshot();
    });
});
