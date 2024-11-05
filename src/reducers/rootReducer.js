import { combineReducers } from "redux";
import user from "./user";
import { getBranch, fetchBranchList } from "./branch";
import { fetchTeacherAttendance, fetchStudentAttendance } from "./attendance";
import { fetchTeacher, fetchTeacherList } from "./teacher";
import { fetchStudent, fetchStudentList } from "./student";
import { fetchAdmin, fetchAdminList, fetchEditAdmin } from "./admin";
import { fetchFeatureFlag} from "./feature_flag";

export default combineReducers({
  user,
  branches: fetchBranchList,
  branch: getBranch,
  attendanceTeachers: fetchTeacherAttendance,
  attendanceStudents: fetchStudentAttendance,
  teacher: fetchTeacher,
  teachers: fetchTeacherList,
  student: fetchStudent,
  students: fetchStudentList,
  admin: fetchAdmin,
  admins: fetchAdminList,
  editAdmin: fetchEditAdmin,
  feature_flag: fetchFeatureFlag
});
