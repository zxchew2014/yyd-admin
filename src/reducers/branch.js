import { FETCH_BRANCHES, GET_BRANCH } from '../actions/types';

export function fetch_branches(state = {}, action) {
  switch (action.type) {
    case FETCH_BRANCHES:
      return action.branches;
    default:
      return state;
  }
}

export function get_branch(state = '', action) {
  switch (action.type) {
    case GET_BRANCH:
      return action.branch;
    default:
      return state;
  }
}
