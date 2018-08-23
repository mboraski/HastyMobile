import {
    addProductToCart,
    removeProductFromCart,
    mutateProductsIntoCart,
    mergeCarts
} from './utils/cartReducerUtils';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_CURRENT_LOCATION,
    UPDATE_CART,
    CLEAR_CART
} from '../actions/cartActions';

// function normalizeCurrency(currency) {
//     if (typeof currency === 'string') return Number(currency.replace(/[^0-9\.-]+/g, ''));
//     return currency;
// }

const initialState = {
    products: {
        instant: {}
    },
    itemCountUp: false,
    itemCountDown: false,
    serviceFee: 0,
    deliveryFee: 200,
    serviceRate: 0.1,
    localSalesTaxRate: 0.0625,
    currentSetAddress: '310 E 5th St, Austin, TX 78701',
    region: {
        latitude: 30.2666247,
        longitude: -97.7405174,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_CART: {
            return {
                ...state,
                products: {
                    instant: {}
                }
            };
        }
        case ADD_TO_CART: {
            const product = action.payload;
            const newCart = addProductToCart(product, state.products.instant);
            return {
                ...state,
                products: {
                    instant: newCart
                }
            };
        }
        case REMOVE_FROM_CART: {
            const product = action.payload;
            const newCart = removeProductFromCart(
                product,
                state.products.instant
            );
            return {
                ...state,
                products: {
                    instant: newCart
                }
            };
        }
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentSetAddress: action.payload.address,
                region: action.payload.region
            };
        case UPDATE_CART: {
            const translate = mutateProductsIntoCart(action.payload);
            const merge = mergeCarts(translate, state.products);
            // console.log('translate: ', translate);
            // console.log('merge: ', merge);
            return {
                ...state,
                products: merge.netCart,
                itemCountUp: merge.itemCountUp,
                itemCountDown: merge.itemCountDown
            };
        }
        default:
            return state;
    }
};
