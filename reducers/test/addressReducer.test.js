import { saveAddress } from '../../actions/addressActions';
import reducer, { initialState } from '../addressReducer';

describe('addressReducer', () => {
    it('handles saveAddress action', () => {
        expect(reducer(initialState, saveAddress('address'))).toMatchSnapshot();
    });
});
