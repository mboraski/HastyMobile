import { addToCart } from '../../actions/cartActions';
import reducer, { initialState } from '../cartReducer';

describe('cartReducer', () => {
    it('handles addToCart action', () => {
        const product = {
            quantity: 1,
            title: 'Type 1 code 1',
            thumbnail_image: 'image',
            price: '$3.49',
            productCode: '1',
            deliveryType: '1'
        };
        expect(reducer(initialState, addToCart(product))).toMatchSnapshot();
    });
});
