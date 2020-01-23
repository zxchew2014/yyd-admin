import {
  FETCH_TEACHER_ATTENDANCES,
  FETCH_STUDENT_ATTENDANCES
} from "../actions/types";

export const fetchTeacherAttendance = (state = null, action) => {
  if (action.type === FETCH_TEACHER_ATTENDANCES) {
    return action.attendanceTeachers;
  } else {
    return state;
  }
};

export const fetchStudentAttendance = (state = null, action) => {
  if (action.type === FETCH_STUDENT_ATTENDANCES) {
    return action.attendanceStudents;
  } else {
    return state;
  }
};
