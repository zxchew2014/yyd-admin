import {FETCH_TEACHERS, FETCH_TEACHERS_BY_BRANCH, FETCH_TEACHER} from '../actions/types';

export const fetchTeacherList =(state = {}, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_BY_BRANCH:
      return action.teachers || {};
    case FETCH_TEACHERS:
      return action.teachers || {};
    default:
      return state;
  }
};
export const fetchTeacher = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TEACHER:
      return action.teacher;
    default:
      return state;
  }
};

