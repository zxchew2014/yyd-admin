import { combineReducers } from 'redux';
import user from './user';
import { getBranch, fetchBranchList } from './branch';
import { fetchTeacherAttendance } from './attendance';
import teachers from './teacher';
import students from './student';

export default combineReducers({
  user,
  branches: fetchBranchList,
  branch: getBranch,
  attendance_teachers: fetchTeacherAttendance,
  teachers,
  students
});
