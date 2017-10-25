import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import DropDown from '../DropDown';
import PaymentDropDownItem from '../PaymentDropDownItem';

const initialState = {};

describe('DropDown', () => {
    const middlewares = [];
    const mockStore = configureStore(middlewares);
    it('renders correctly', () => {
        const mark = (
            <DropDown 
                header={<PaymentDropDownItem isHeaderItem={true} />}
            >
                <PaymentDropDownItem isHeaderItem={false} />
                <PaymentDropDownItem isHeaderItem={false} />
            </DropDown>
            );
        const wrapper = shallow(mark, {
            context: { store: mockStore(initialState) }
        });
        const render = wrapper.dive();
        expect(render).toMatchSnapshot();
    });
});
