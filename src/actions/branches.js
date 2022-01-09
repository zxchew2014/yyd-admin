import { branchesRef, yydASDb } from "../configs/firebase";
import { FETCH_BRANCHES, GET_BRANCH } from "./types";
import { VALUE_KEY, URL_BRANCHES } from "../utils/common";
import { removeStudentsByBranch } from "./students";
import { removeTeachersByBranch } from "./teachers";

export const getBranch = (branch = "") => ({
  type: GET_BRANCH,
  branch
});

export const addBranch = branch => async dispatch => {
  const myRef = branchesRef.push();
  const newKey = myRef.key;
  branch.Id = newKey;

  console.log(branch);

  const insertData = {};
  insertData[`${URL_BRANCHES}/${newKey}`] = branch;
  await yydASDb.ref().update(insertData);
};

export const updateBranch = branch => async dispatch => {
  const updateData = {};
  updateData[`${URL_BRANCHES}/${branch.Id}`] = branch;
  yydASDb
    .ref()
    .update(updateData)
    .then(() => dispatch(removeStudentsByBranch(branch)))
    .then(() => dispatch(removeTeachersByBranch(branch)))
    .then(() =>
      dispatch({
        type: GET_BRANCH,
        branch: null
      })
    );
};

export const updateBranchDetail = branch => async dispatch => {
  const updateData = {};
  updateData[`${URL_BRANCHES}/${branch.Id}`] = branch;
  yydASDb
    .ref()
    .update(updateData)
    .then(() =>
      dispatch({
        type: GET_BRANCH,
        branch: null
      })
    );
};

export const fetchBranch = branch => async dispatch => {
  const branchesRef = yydASDb.ref(`${URL_BRANCHES}/${branch.Id}`);
  branchesRef.on(VALUE_KEY, data => {
    dispatch({
      type: GET_BRANCH,
      branch: data.val()
    });
  });
};

export const removeBranch = branch => async dispatch => {
  branchesRef
    .child(branch.Id)
    .remove()
    .then(() =>
      dispatch({
        type: GET_BRANCH,
        branch: null
      })
    );
};

export const fetchBranches = () => async dispatch => {
  branchesRef.on(VALUE_KEY, data => {
    const list = [];
    const branches = [].concat(...Object.values(data.val()));

    branches.forEach(branch => {
      list.push(branch.Branch_Name);
    });

    list.sort();
    dispatch({
      type: FETCH_BRANCHES,
      branches: list
    });
  });
};

export const fetchBranchList = () => async dispatch => {
  branchesRef.orderByValue().on(VALUE_KEY, data => {
    const branches = data.val();
    const sortList = [];

    Object.keys(branches).forEach(key => {
      sortList.push(branches[key]);
    });

    sortList.sort((a, b) => {
      return b.Branch_Name.localeCompare(a.Branch_Name);
    });

    dispatch({
      type: FETCH_BRANCHES,
      branches: sortList
    });
  });
};
