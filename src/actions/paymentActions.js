import * as api from '../api/hasty';
import { dropdownAlert } from './uiActions';
import { firebaseAuth } from '../../firebase';

export const UPDATE_STRIPE_INFO = 'update_stripe_info';
export const ADD_CARD_REQUEST = 'add_card_request';
export const ADD_CARD_SUCCESS = 'add_card_success';
export const ADD_CARD_FAIL = 'add_card_fail';
export const DELETE_CARD_REQUEST = 'delete_card_request';
export const DELETE_CARD_SUCCESS = 'delete_card_success';
export const DELETE_CARD_FAIL = 'delete_card_fail';
export const LIST_CARDS_REQUEST = 'list_cards';
export const LIST_CARDS_SUCCESS = 'list_cards_success';
export const LIST_CARDS_FAIL = 'list_cards_fail';
export const SELECTED_CARD = 'selected_card';
export const SUBMIT_PAYMENT_REQUEST = 'submit_payment_request';
export const SUBMIT_PAYMENT_SUCCESS = 'submit_payment_success';
export const SUBMIT_PAYMENT_FAILURE = 'submit_payment_failure';
export const CREATE_STRIPE_ACCOUNT_REQUEST = 'create_stripe_account_request';
export const CREATE_STRIPE_ACCOUNT_SUCCESS = 'create_stripe_account_success';
export const CREATE_STRIPE_ACCOUNT_ERROR = 'create_stripe_account_error';

export const submitPaymentRequest = () => dispatch =>
    dispatch({ type: SUBMIT_PAYMENT_REQUEST });

export const submitPayment = (
    navigation,
    cardId,
    totalCost,
    notes,
    orderId,
    cart
) => async dispatch => {
    // TODO: do something with notes
    const user = firebaseAuth.currentUser;
    const uid = user.uid;
    const charge = {
        amount: Math.ceil(totalCost),
        currency: 'usd',
        source: cardId
    };
    // TODO: !!!! change from api to direct card charge and then order creation and contractor ping
    return api
        .chargeStripeCustomerSource({ uid, charge, notes, orderId, cart })
        .then(() => {
            dropdownAlert(true, 'Payment success');
            dispatch({ type: SUBMIT_PAYMENT_SUCCESS });
            navigation.navigate('deliveryStatus');
        })
        .catch(() => {
            dropdownAlert(true, 'Error submitting payment');
            dispatch({ type: SUBMIT_PAYMENT_FAILURE });
        });
};

export const addCard = async args => {
    const { stripeCustomerId, source, dispatch } = args;
    dispatch({ type: ADD_CARD_REQUEST });
    try {
        const res = await api.addStripeCustomerSource({
            stripeCustomerId,
            source
        });
        const { defaultSource, sources } = res;
        dispatch({
            type: ADD_CARD_SUCCESS,
            payload: {
                defaultSource,
                sources
            }
        });
        dispatch(dropdownAlert(true, 'Successfully added card!'));
        return res;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to add card!'));
        dispatch({
            type: ADD_CARD_FAIL,
            error
        });
        throw error;
    }
};

export const createStripeAccountWithCard = async args => {
    const { email, source, dispatch } = args;
    dispatch({ type: CREATE_STRIPE_ACCOUNT_REQUEST });
    try {
        const res = await api.createStripeAccountWithCard({ email, source });
        const { stripeCustomerId, defaultSource, sources } = res;
        dispatch({
            type: CREATE_STRIPE_ACCOUNT_SUCCESS,
            payload: {
                stripeCustomerId,
                defaultSource,
                sources
            }
        });
        dispatch(dropdownAlert(true, 'Successfully added card!'));
        return res;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to add card!'));
        dispatch({
            type: CREATE_STRIPE_ACCOUNT_ERROR,
            error
        });
        throw error;
    }
};

export const deleteCard = args => async dispatch => {
    const { stripeCustomerId, source } = args;
    dispatch({ type: DELETE_CARD_REQUEST });
    try {
        const res = await api.removeStripeCustomerSource({
            stripeCustomerId,
            source
        });
        dispatch({ type: DELETE_CARD_SUCCESS });
        dispatch(dropdownAlert(true, 'Successfully deleted card!'));
        return res;
    } catch (error) {
        dispatch(dropdownAlert(true, 'Failed to delete card!'));
        dispatch({
            type: DELETE_CARD_FAIL,
            error
        });
        throw error;
    }
};

export const selectCard = card => dispatch => {
    dispatch({ type: SELECTED_CARD, payload: card.id });
};

export const listCards = () => async dispatch => {
    try {
        dispatch({ type: LIST_CARDS_REQUEST });
        const docRef = firebase
            .firestore()
            .collection('userOwned')
            .doc(uid);
        const doc = await docRef.get();
        if (doc.exists) {
            const data = doc.data();
            dispatch({
                type: LIST_CARDS_SUCCESS,
                payload: data
            });
            selectCard(data);
            return data;
        }
        throw new Error('No such record of payment info!');
    } catch (error) {
        dispatch(dropdownAlert(true, 'No payment record on file!'));
        dispatch({
            type: LIST_CARDS_FAIL,
            error
        });
        throw error;
    }
};
