import {adminsRef, yydASDb} from "../configs/firebase";
import {URL_ADMINS, VALUE_KEY} from "../utils/common";
import {
  ADMIN_LOGGED_OUT,
  FETCH_ADMIN,
  FETCH_ADMINS,
  FETCH_EDIT_ADMIN
} from "./types";

export const adminLoggedOut = () => ({
  type: ADMIN_LOGGED_OUT
});

export const addAdmin = admin => async dispatch => {
  const myRef = adminsRef.push();
  const newKey = myRef.key;
  admin.Id = newKey;
  admin.emailAddress = admin.emailAddress.toLowerCase();

  const insertData = {};
  insertData[`${URL_ADMINS}/${newKey}`] = admin;
  yydASDb.ref().update(insertData);
};

export const fetchAdminList = () => async dispatch => {
  adminsRef.on(VALUE_KEY, data => {
    dispatch({
      type: FETCH_ADMINS,
      admins: data.val()
    });
  });
};

export const fetchEditAdmin = currentAdmin => async dispatch => {
  const adminRef = yydASDb.ref(`${URL_ADMINS}/${currentAdmin.Id}`);
  adminRef.on(VALUE_KEY, data => {
    dispatch({
      type: FETCH_EDIT_ADMIN,
      editAdmin: data.val()
    });
  });
};

export const fetchAdmin = user => async dispatch => {
  const adminRef = yydASDb
      .ref(`${URL_ADMINS}`)
      .orderByChild("emailAddress")
      .equalTo(user.email)
      .limitToFirst(1);
  adminRef.on(VALUE_KEY, data => {
    if (data.exists()) {
      const result = data.val();
      Object.keys(result).forEach(key => {
        const admin = result[key];
        dispatch({
          type: FETCH_ADMIN,
          admin
        });
      });
    } else {
      dispatch({
        type: FETCH_ADMIN,
        admin: null
      });
    }
  });
};

export const updateAdmin = admin => async dispatch => {
  const updateData = {};
  updateData[`${URL_ADMINS}/${admin.Id}`] = admin;
  yydASDb
      .ref()
      .update(updateData)
      .then(() =>
          dispatch({
            type: FETCH_EDIT_ADMIN,
            editAdmin: null
          })
      );
};

export const removeAdmin = admin => async dispatch => {
  adminsRef.child(admin.Id).remove();
};
