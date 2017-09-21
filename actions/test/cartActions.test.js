import { addToCart } from '../cartActions';

describe('cartActions', () => {
    it('creates addToCart action', () => {
        expect(addToCart()).toMatchSnapshot();
    });
});
