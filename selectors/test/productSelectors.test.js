import { getProductsByDeliveryType } from '../productSelectors';

describe('productSelector', () => {
    it('getProductsByDeliveryType', () => {
        const state = {
            product: {
                list: {
                    1: {
                        1: {
                            quantity: 1,
                            title: 'Type 1 code 1',
                            thumbnail_image: 'image',
                            price: '$3.49'
                        }
                    },
                    2: {
                        2: {
                            quantity: 2,
                            title: 'Type 2 code 2',
                            thumbnail_image: 'image',
                            price: '$3.49'
                        }
                    }
                },
                deliveryType: '1'
            }
        };
        expect(getProductsByDeliveryType(state)).toMatchSnapshot();
    });
});
