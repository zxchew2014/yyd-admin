import { branchesRef } from "../configs/firebase";
import { FETCH_BRANCHES, GET_BRANCH } from "./types";
import { VALUE_KEY } from "../utils/common";

export const getBranch = (branch = "") => ({
  type: GET_BRANCH,
  branch
});

export const addBranch = branch => async dispatch => {
  branchesRef.push().set(branch);
};

export const removeBranch = branch => async dispatch => {
  branchesRef.child(branch).remove();
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
