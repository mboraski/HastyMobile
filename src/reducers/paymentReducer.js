import { ADD_CARD, DELETE_CARD } from '../actions/paymentActions';

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
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload.id)
            };
        default:
            return state;
    }
}
