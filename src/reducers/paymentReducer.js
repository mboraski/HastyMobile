import { ADD_CARD } from '../actions/paymentActions';

const initialState = {
    cards: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload.card]
            };
        default:
            return state;
    }
}
