import { studentsRef, yydASDb } from "../configs/firebase";
import { FETCH_STUDENTS_BY_BRANCH } from "./types";
import {VALUE_KEY, URL_STUDENTS} from "../utils/common";

export const addStudent = student => async dispatch => {
  const branch = student.Branch;
  const myRef = studentsRef.child(branch).push();
  const newKey = myRef.key;
  student.Id = newKey;

  const updateData = {};
  updateData[`${URL_STUDENTS}/${branch}/${newKey}`] = student;
  yydASDb
    .ref()
    .update(updateData)
    .then(() => dispatch(fetchStudentsByBranch(branch)));
};

export const fetchStudentsByBranch = branch => async dispatch => {
  const studentByBranchRef = yydASDb.ref(`${URL_STUDENTS}/${branch}`).orderByKey();

  studentByBranchRef.on(VALUE_KEY, data => {
    dispatch({
      type: FETCH_STUDENTS_BY_BRANCH,
      students: data.val()
    });
  });
};
