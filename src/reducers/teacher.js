import { FETCH_TEACHERS, FETCH_TEACHERS_BY_BRANCH } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TEACHERS:
      return action.teachers;
    case FETCH_TEACHERS_BY_BRANCH:
      return action.teachers;
    default:
      return state;
  }
};
