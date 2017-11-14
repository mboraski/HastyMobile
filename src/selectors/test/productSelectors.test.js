import {
    getDeliveryType,
    getAvailableProducts,
    getProductsByDeliveryType,
    getSimilarProducts
} from '../productSelectors';

describe('productSelector', () => {
    it('getDeliveryType', () => {
        const state = {
            product: {
                deliveryType: 'deliveryType'
            }
        };
        expect(getDeliveryType(state)).toEqual(state.product.deliveryType);
    });
    it('getAvailableProducts', () => {
        const state = {
            product: {
                availableProducts: 'availableProducts'
            }
        };
        expect(getAvailableProducts(state)).toEqual(state.product.availableProducts);
    });
    it('getProductsByDeliveryType', () => {
        const state = {
            product: {
                availableProducts: {
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
    it('getProductsByDeliveryType with empty list', () => {
        const state = {
            product: {
                availableProducts: {},
                deliveryType: '1'
            }
        };
        expect(getProductsByDeliveryType(state)).toMatchSnapshot();
    });
    it('getSimilarProducts', () => {
        const state = {
            product: {
                availableProducts: {
                    1: [
                        'pizza',
                        'pizzas',
                        'pizzeria',
                        'pizza house',
                        'house of pizza',
                        'PIZZA',
                        'PIZZAS',
                        'PIZZERIA',
                        'PIZZA HOUSE',
                        'HOUSE OF PIZZA',
                        'house'
                    ].reduce((acc, value, index) => {
                        acc[index] = { title: value };
                        return acc;
                    }, {})
                },
                deliveryType: '1'
            }
        };
        expect(getSimilarProducts('pizza')(state)).toMatchSnapshot();
    });
});
