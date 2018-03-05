import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SET_CURRENT_LOCATION,
    CHECK_CART_VALID
} from '../actions/cartActions';

function normalizeCurrency(currency) {
    if (typeof currency === 'string') return Number(currency.replace(/[^0-9\.-]+/g, ''));
    return currency;
}

export const initialState = {
    products: {},
    serviceFee: 0,
    deliveryFee: 0,
    localSalesTax: 0.0625,
    preTaxTotal: 0,
    tax: 0,
    total: 0
};

const addProductToCart = (product, key, cartProducts) => {
    const cart = cartProducts;
    const cartItem = cart[key] || null;
    if (!cartItem) {
        cart[key] = {
            productName: product.productName,
            quantity: 1
        };
    } else {
        cartItem.quantity = ++cartItem.quantity;
    }
    return cart;
};

const removeProductFromCart = (product, key, cartProducts) => {
    let cartItem = cartProducts[key] || null;
    if (!cartItem) {
        cartItem = product;
    } else {
        cartItem.quantity = --cartItem.quantity;
    }
    return cartItem;
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const { product, key } = action.payload;
            const preTaxTotal = Math.max(
                0,
                (state.preTaxTotal + normalizeCurrency(product.price)).toFixed(2)
            );
            const calculatedTax = (preTaxTotal * state.localSalesTax);
            const calculatedTotal = preTaxTotal + calculatedTax;
            return {
                ...state,
                products: addProductToCart(product, key, state.products),
                total: calculatedTotal,
                tax: calculatedTax,
                preTaxTotal
            };
        }
        case REMOVE_FROM_CART: {
            const { product, key } = action.payload;
            const preTaxTotal = Math.max(
                0,
                (state.preTaxTotal - normalizeCurrency(product.price)).toFixed(2)
            );
            const calculatedTax = (preTaxTotal * state.localSalesTax);
            const calculatedTotal = preTaxTotal + calculatedTax;
            return {
                ...state,
                products: addProductToCart(product, key, state),
                total: calculatedTotal,
                tax: calculatedTax,
                preTaxTotal
            };
        }
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentSetAddress: action.payload.address,
                currentSetLatLon: {
                    lat: action.payload.region.latitude,
                    lon: action.payload.region.longitude
                }
            };
        // case CHECK_CART_VALID: {
        //     // const products = action.payload;
        //     // return {
        //     //     ...state,
        //     //     currentSetAddress: action.payload.address,
        //     //     currentSetLatLon: {
        //     //         lat: action.payload.region.latitude,
        //     //         lon: action.payload.region.longitude
        //     //     }
        //     // };
        // }
        default:
            return state;
    }
};
