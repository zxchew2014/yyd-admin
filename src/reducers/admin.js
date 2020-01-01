import {
    ADMIN_LOGGED_OUT,
    FETCH_ADMIN,
    FETCH_ADMINS,
    FETCH_EDIT_ADMIN
} from "../actions/types";

export const fetchAdminList = (state = null, action) => {
    if (action.type === FETCH_ADMINS) {
        return action.admins;
    } else {
        return state;
    }
};
export const fetchAdmin = (state = null, action) => {
    if (action.type === FETCH_ADMIN) {
        return action.admin;
    } else if (action.type === ADMIN_LOGGED_OUT) {
        return null;
    } else {
        return state;
    }
};

export const fetchEditAdmin = (state = null, action) => {
    if (action.type === FETCH_EDIT_ADMIN) {
        return action.editAdmin;
    } else {
        return state;
    }
};
