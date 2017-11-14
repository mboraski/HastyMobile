import { showSearch, hideSearch, showFeedbackForm, hideFeedbackForm } from '../uiActions';

describe('uiActions', () => {
    it('creates showSearch action', () => {
        expect(showSearch()).toMatchSnapshot();
    });
    it('creates hideSearch action', () => {
        expect(hideSearch()).toMatchSnapshot();
    });
    it('creates showFeedbackForm action', () => {
        expect(showFeedbackForm()).toMatchSnapshot();
    });
    it('creates hideFeedbackForm action', () => {
        expect(hideFeedbackForm()).toMatchSnapshot();
    });
});
