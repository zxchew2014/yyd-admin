import { FETCH_STUDENTS, FETCH_STUDENTS_BY_BRANCH } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.students;
    case FETCH_STUDENTS_BY_BRANCH:
      return action.students || {};
    default:
      return state;
  }
};
