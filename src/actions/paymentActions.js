import * as api from '../api/hasty';

export const ADD_CARD = 'add_card';
export const ADD_CARD_SUCCESS = 'add_card_success';
export const ADD_CARD_FAIL = 'add_card_fail';

export const DELETE_CARD = 'delete_card';
export const DELETE_CARD_SUCCESS = 'delete_card_success';
export const DELETE_CARD_FAIL = 'delete_card_fail';

export const LIST_CARDS = 'list_card';
export const LIST_CARDS_SUCCESS = 'list_card_success';
export const LIST_CARDS_FAIL = 'list_card_fail';

export const addCard = card => async dispatch => {
    try {
        dispatch({ type: ADD_CARD });
        const res = await api.addCard(card);
        dispatch({
            type: ADD_CARD_SUCCESS,
            // payload: res.data
            payload: card
        });
        return res;
    } catch (error) {
        dispatch({
            type: ADD_CARD_FAIL,
            error
        });
        throw error;
    }
};

export const deleteCard = card => async dispatch => {
    try {
        dispatch({ type: DELETE_CARD });
        const res = await api.deleteCard(card);
        dispatch({
            type: DELETE_CARD_SUCCESS,
            // payload: res.data
            payload: card
        });
        return res;
    } catch (error) {
        dispatch({
            type: DELETE_CARD_FAIL,
            error
        });
        throw error;
    }
};

export const listCards = () => async dispatch => {
    try {
        dispatch({ type: LIST_CARDS });
        const res = await api.listCards();
        dispatch({
            type: LIST_CARDS_SUCCESS,
            payload: res.data
        });
        return res;
    } catch (error) {
        dispatch({
            type: LIST_CARDS_FAIL,
            error
        });
        throw error;
    }
};
