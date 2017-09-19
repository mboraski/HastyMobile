import replaceFullWidthChars from '../replaceFullWidthChars';

describe('replaceFullWidthChars', () => {
    it('replaceFullWidthChars works correctly', () => {
        const str = '12345';
        const expected = '\uff11\uff12\uff13\uff14\uff15';
        expect(replaceFullWidthChars(str)).toBe(expected);
    });
});
