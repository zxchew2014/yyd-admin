import {yydASAuth} from "../configs/firebase";
import {USER_LOGGED_IN, USER_LOGGED_OUT} from "./types";
import {USER_KEY} from "../utils/common";
import {adminLoggedOut, fetchAdmin} from "./admins";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const login = () => async dispatch => {
  const user = yydASAuth.currentUser;
  localStorage.user = user;
  const accountVerified = user.emailVerified;
  if (!accountVerified) {
    user.sendEmailVerification().catch(error => {
      console.log(error);
    });
  }
  dispatch(fetchAdmin(user));
  dispatch(userLoggedIn(user));
};

export const logout = () => async dispatch => {
  localStorage.removeItem(USER_KEY);
  yydASAuth
      .signOut()
      .then(() => dispatch(userLoggedOut()))
      .then(() => dispatch(adminLoggedOut()))
    .catch(error => console.log(error));
};
