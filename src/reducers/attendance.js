import {
  FETCH_TEACHER_ATTENDANCES,
  FETCH_STUDENT_ATTENDANCES
} from "../actions/types";

export const fetchTeacherAttendance = (state = null, action) => {
  switch (action.type) {
    case FETCH_TEACHER_ATTENDANCES:
      return action.attendanceTeachers || [] ;
    default:
      return state;
  }
};

export const fetchStudentAttendance = (state = null, action) => {
  switch (action.type) {
    case FETCH_STUDENT_ATTENDANCES:
      return action.attendanceStudents || [];
    default:
      return state;
  }
};
