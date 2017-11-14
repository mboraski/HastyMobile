import {
    showSearch,
    hideSearch,
    showFeedbackForm,
    hideFeedbackForm
} from '../../actions/uiActions';
import reducer, { initialState } from '../uiReducer';

describe('uiReducer', () => {
    it('handles showSearch action', () => {
        expect(reducer(initialState, showSearch())).toMatchSnapshot();
    });
    it('handles hideSearch action', () => {
        expect(reducer(initialState, hideSearch())).toMatchSnapshot();
    });
    it('handles showFeedbackForm action', () => {
        expect(reducer(initialState, showFeedbackForm())).toMatchSnapshot();
    });
    it('handles hideFeedbackForm action', () => {
        expect(reducer(initialState, hideFeedbackForm())).toMatchSnapshot();
    });
});
