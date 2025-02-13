import {
  FETCH_ALL_STUDENTS_BY_BRANCH,
  FETCH_STUDENT,
  FETCH_STUDENTS,
  FETCH_STUDENTS_BY_BRANCH,
  REMOVE_STUDENTS_BY_BRANCH
} from "../actions/types";

export const fetchStudentList = (state = null, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.students;
    case FETCH_STUDENTS_BY_BRANCH:
      return action.students;
    case REMOVE_STUDENTS_BY_BRANCH:
      return action.students;
    case FETCH_ALL_STUDENTS_BY_BRANCH:
      return action.students;
    default:
      return state;
  }
};

export const fetchStudent = (state = null, action) => {
  if (action.type === FETCH_STUDENT) {
    return action.student;
  } else {
    return state;
  }
};
