import {
  ADD_TO_CART
} from './types';

export const addToCart = () => {
  return (dispatch) => {
    dispatch({type: ADD_TO_CART, payload: 'stuff in cart'});
  }
}
