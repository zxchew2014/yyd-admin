import {yydASAuth} from "../configs/firebase";
import {USER_LOGGED_IN, USER_LOGGED_OUT} from "./types";
import {USER_KEY} from "../utils/common";

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = () => dispatch => {
    localStorage.user = yydASAuth.currentUser;

    const accountVerified = yydASAuth.currentUser.emailVerified;
    if (accountVerified) {
        dispatch(userLoggedIn(yydASAuth.currentUser));
    } else {
        yydASAuth.currentUser
            .sendEmailVerification()
            .then(() => {
                dispatch(userLoggedOut());
            })
            .catch(error => {
                throw error;
            });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem(USER_KEY);
    yydASAuth
        .signOut()
        .then(() => dispatch(userLoggedOut()))
        .catch(error => console.log(error));
};
