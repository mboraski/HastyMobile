import formatCardExpiry from '../formatCardExpiry';

describe('formatCardExpiry', () => {
    it('formatCardNumber works correctly', () => {
        const str = '';
        const expected = '';
        expect(formatCardExpiry(str)).toBe(expected);
    });
});
