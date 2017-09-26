import { addToCart } from '../cartActions';

describe('cartActions', () => {
    it('creates addToCart action', () => {
        expect(
            addToCart({
                quantity: 1,
                title: 'Type 1 code 1',
                thumbnail_image: 'image',
                price: '$3.49',
                productCode: '1',
                deliveryType: '1'
            })
        ).toMatchSnapshot();
    });
});
