import { yydASAuth } from '../firebase';
import { USER_LOGGED_IN } from '../types';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const login = () => dispatch => {
  localStorage.user = yydASAuth.currentUser;
  dispatch(userLoggedIn(yydASAuth.currentUser));
};
