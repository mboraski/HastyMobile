import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

function normalizeCurrency(currency) {
    if (typeof currency === 'string') return Number(currency.replace(/[^0-9\.-]+/g, ''));
    return currency;
}

export const initialState = {
    totalOrders: 0,
    totalCost: 0,
    products: {}
};

function addToType(state = {}, product) {
    return {
        ...state,
        [product.deliveryType]: addToCode(state[product.deliveryType], product)
    };
}

function addToCode(state = {}, product) {
    return {
        ...state,
        [product.productCode]: addToOrder(state[product.productCode], product)
    };
}

function addToOrder(state = { quantity: 0 }, product) {
    return {
        ...product,
        ...state,
        price: !state.price ? normalizeCurrency(product.price) : state.price,
        quantity: state.quantity + 1
    };
}

function removeFromType(state, product) {
    return {
        ...state,
        [product.deliveryType]: removeFromCode(state[product.deliveryType], product)
    };
}

function removeFromCode(state, product) {
    return {
        ...state,
        [product.productCode]: removeFromOrder(state[product.productCode])
    };
}

function removeFromOrder(state) {
    if (state.quantity === 0) {
        return state;
    }
    return {
        ...state,
        quantity: state.quantity - 1
    };
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                products: addToType(state.products, action.payload),
                totalOrders: state.totalOrders + 1,
                totalCost: Math.max(
                    0,
                    (state.totalCost + normalizeCurrency(action.payload.price)).toFixed(2)
                )
            };
        case REMOVE_FROM_CART:
            return {
                products: removeFromType(state.products, action.payload),
                totalOrders: Math.max(0, state.totalOrders - 1),
                totalCost: Math.max(
                    0,
                    (state.totalCost - normalizeCurrency(action.payload.price)).toFixed(2)
                )
            };
        default:
            return state;
    }
};
