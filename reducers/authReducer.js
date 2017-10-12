import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/authActions';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { token: action.payload };
    case LOGIN_FAIL:
      return { token: null };
    default:
      return state;
  }
}
