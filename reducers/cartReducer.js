import {
  ADD_TO_CART
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return action.payload;
    default:
      return state;
  }
};
