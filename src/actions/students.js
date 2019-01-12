import { studentsRef, yydASDb } from "../configs/firebase";
import { FETCH_STUDENTS_BY_BRANCH } from "./types";

export const addStudent = student => async dispatch => {
  const branch = student.Branch;
  const name = student.Name;
  const myRef = studentsRef.child(branch).push();
  const newKey = myRef.key;
  student.Id = newKey;

  const updateData = {};
  updateData[`/New_Students/${branch}/${newKey}`] = student;
  yydASDb
    .ref()
    .update(updateData)
    .then(() => dispatch(fetchStudentsByBranch(branch)));
};

export const fetchStudentsByBranch = branch => async dispatch => {
  const studentByBranchRef = yydASDb.ref(`New_Students/${branch}`).orderByKey();

  studentByBranchRef.on("value", data => {
    dispatch({
      type: FETCH_STUDENTS_BY_BRANCH,
      students: data.val()
    });
  });
};
