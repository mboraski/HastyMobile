import { toggleSearch } from '../uiActions';

describe('uiActions', () => {
    it('creates toggleSearch action', () => {
        expect(toggleSearch()).toMatchSnapshot();
    });
});
