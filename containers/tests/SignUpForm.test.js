import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import { SignUpForm } from '../SignUpForm';

describe('SignUpForm', () => {
    it('should render correctly', () => {
        const props = {
            anyTouched: false,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: false,
            pristine: true,
            fields: {
                email: {
                    value: '',
                    touched: false,
                    error: null
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            }
        };
        const render = shallow(<SignUpForm {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with untouched disabled', () => {
        const props = {
            anyTouched: false,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: true,
            pristine: false,
            fields: {
                email: {
                    value: '',
                    touched: false,
                    error: null
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            }
        };
        const render = shallow(<SignUpForm {...props} />);
        expect(render).toMatchSnapshot();
    });
    it('should render correctly with error', () => {
        const props = {
            anyTouched: true,
            pending: false,
            submitting: false,
            asyncValidating: false,
            invalid: true,
            pristine: false,
            fields: {
                email: {
                    value: '',
                    touched: true,
                    error: 'error'
                },
                password: {
                    value: '',
                    touched: false,
                    error: null
                }
            }
        };
        const render = shallow(<SignUpForm {...props} />);
        expect(render).toMatchSnapshot();
    });
});
