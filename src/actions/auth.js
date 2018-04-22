import { yydASAuth } from '../firebase';
import { USER_LOGGED_IN } from '../types';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const login = () => dispatch => {
  localStorage.user = yydASAuth.currentUser;
  const accountVerified = yydASAuth.currentUser.emailVerified;
  if (accountVerified) dispatch(userLoggedIn(yydASAuth.currentUser));
  else {
    yydASAuth.currentUser
      .sendEmailVerification()
      .then(function() {
        dispatch(userLoggedIn(yydASAuth.currentUser));
      })
      .catch(function(error) {
        throw error;
      });
  }
};
