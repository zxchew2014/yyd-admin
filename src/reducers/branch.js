import { FETCH_BRANCHES, GET_BRANCH } from '../actions/types';

export const getBranch = (state = '', action) => {
  switch (action.type) {
    case GET_BRANCH:
      return action.branch;
    default:
      return state;
  }
};

export const fetchBranchList = (state = {}, action) => {
  switch (action.type) {
    case FETCH_BRANCHES:
      return action.branches;
    default:
      return state;
  }
};
