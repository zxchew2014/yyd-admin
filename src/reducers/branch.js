import { FETCH_BRANCHES, GET_BRANCH } from "../actions/types";

export const getBranch = (state = "", action) => {
  if (action.type === GET_BRANCH) {
    return action.branch;
  } else {
    return state;
  }
};

export const fetchBranchList = (state = {}, action) => {
  if (action.type === FETCH_BRANCHES) {
    return action.branches;
  } else {
    return state;
  }
};
