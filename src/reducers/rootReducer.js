import { combineReducers } from 'redux';
import user from './user';
import { getBranch, fetchBranchList } from './branch';
import { fetchTeacherAttendance, fetchStudentAttendance } from './attendance';
import {fetchTeacher , fetchTeacherList} from './teacher';
import students from './student';

export default combineReducers({
  user,
  branches: fetchBranchList,
  branch: getBranch,
  attendanceTeachers: fetchTeacherAttendance,
  attendanceStudents: fetchStudentAttendance,
  teacher: fetchTeacher,
  teachers: fetchTeacherList,
  students
});
