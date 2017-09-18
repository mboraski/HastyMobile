import formatCardNumber from '../formatCardNumber';

describe('formatCardNumber', () => {
    it('formatCardNumber works correctly', () => {
        const str = '';
        const expected = '';
        expect(formatCardNumber(str)).toBe(expected);
    });
});
