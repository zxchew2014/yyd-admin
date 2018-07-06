import { FETCH_TEACHER_ATTENDANCES } from '../actions/types';

export const fetchTeacherAttendance = (state = [], action) => {
  switch (action.type) {
    case FETCH_TEACHER_ATTENDANCES:
      return action.attendance_teachers;
    default:
      return state;
  }
};
