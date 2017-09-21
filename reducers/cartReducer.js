import { ADD_TO_CART } from '../actions/cartActions';

export const initialState = {
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

export default (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case ADD_TO_CART:
            console.log(addToType(state, action.payload));
            return {
                ...addToType(state, action.payload),
                totalProducts: state.totalProducts + 1
            };
        default:
            return state;
    }
};
