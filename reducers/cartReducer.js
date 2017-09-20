import { ADD_TO_CART } from '../actions/cartActions';

const INITIAL_STATE = {
    totalProducts: 0
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
        [product.productCode]: addToQuantity(state[product.productCode])
    };
}

function addToQuantity(state = { quantity: 0 }) {
    return {
        ...state,
        quantity: state.quantity + 1
    };
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...addToType(state, action.payload),
                totalProducts: state.totalProducts + 1,
            };
        default:
            return state;
    }
};
