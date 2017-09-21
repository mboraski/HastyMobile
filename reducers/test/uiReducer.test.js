import { toggleSearch } from '../../actions/uiActions';
import reducer, { initialState } from '../uiReducer';

describe('uiReducer', () => {
    it('handles toggleSearch action', () => {
        expect(reducer(initialState, toggleSearch())).toMatchSnapshot();
    });
});
