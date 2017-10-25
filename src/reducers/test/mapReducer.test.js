import { saveAddress } from '../../actions/mapActions';
import reducer, { initialState } from '../mapReducer';

describe('mapReducer', () => {
    it('handles saveAddress action', () => {
        expect(reducer(initialState, saveAddress('address'))).toMatchSnapshot();
    });
});
