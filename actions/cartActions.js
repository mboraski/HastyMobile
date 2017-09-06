export const ADD_TO_CART = 'add_to_cart';

export const addToCart = () => {
  return (dispatch) => {
    dispatch({type: ADD_TO_CART, payload: 'stuff in cart'});
  }
}
