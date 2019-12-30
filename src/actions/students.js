import { studentsRef, yydASDb } from "../configs/firebase";
import {
  FETCH_STUDENTS_BY_BRANCH,
  FETCH_STUDENT,
  REMOVE_STUDENTS_BY_BRANCH
} from "./types";
import { VALUE_KEY, URL_STUDENTS, BRANCH_PUNGGOL } from "../utils/common";
import { getBranch } from "./branches";

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
    .then(() => dispatch(getBranch(branch)))
    .then(() => dispatch(fetchStudentsByBranch(branch)));
};

export const updateStudent = student => async dispatch => {
  const updateData = {};
  updateData[`${URL_STUDENTS}/${student.Branch}/${student.Id}`] = student;
  yydASDb
    .ref()
    .update(updateData)
    .then(() => dispatch(getBranch(student.Branch)))
    .then(() => dispatch(fetchStudentsByBranch(student.Branch)))
    .then(() =>
      dispatch({
        type: FETCH_STUDENT,
        student: null
      })
    );
};

export const removeStudent = (studentKey, branch, batch) => async dispatch => {
  studentsRef
    .child(branch)
    .child(studentKey)
    .remove()
    .then(() => dispatch(getBranch(branch)))
    .then(result => {
      dispatch(fetchStudentsByBranch(branch, batch));
    })
    .then(() =>
      dispatch({
        type: FETCH_STUDENT,
        student: null
      })
    );
};

export const removeStudentsByBranch = branch => async dispatch => {
  studentsRef
    .child(branch.Branch_Name)
    .remove()
    .then(() =>
      dispatch({
        type: REMOVE_STUDENTS_BY_BRANCH,
        students: null
      })
    );
};
export const fetchStudentsByBranch = (branch, batch) => async dispatch => {
  const studentByBranchRef = yydASDb
    .ref(`${URL_STUDENTS}/${branch}`)
    .orderByChild("Name");

  studentByBranchRef.on(VALUE_KEY, data => {
    const studentList = data.val();

    if (studentList === null) {
      dispatch({
        type: FETCH_STUDENTS_BY_BRANCH,
        students: null
      });
    }

    if (branch === BRANCH_PUNGGOL) {
      if (batch !== null || batch !== "") {
        const newStudentList = [];
        Object.keys(studentList).forEach(key => {
          const student = studentList[key];
          if (student.Batch === batch) {
            student.Id = key;
            newStudentList.push(student);
          }
        });

        newStudentList.sort(
          (a, b) => parseInt(a.Primary, 10) - parseInt(b.Primary, 10)
        );

        dispatch({
          type: FETCH_STUDENTS_BY_BRANCH,
          students: newStudentList
        });
      }
    } else {
      if (studentList === null) {
        dispatch({
          type: FETCH_STUDENTS_BY_BRANCH,
          students: null
        });
      } else {
        const newStudentList = [];
        Object.keys(studentList).forEach(key => {
          const student = studentList[key];
          student.Id = key;
          newStudentList.push(student);
        });

        newStudentList.sort(
          (a, b) => parseInt(a.Primary, 10) - parseInt(b.Primary, 10)
        );

        dispatch({
          type: FETCH_STUDENTS_BY_BRANCH,
          students: newStudentList
        });
      }
    }
  });
};

export const fetchStudent = student => async dispatch => {
  const studentRef = yydASDb.ref(
    `${URL_STUDENTS}/${student.Branch}/${student.Id}`
  );
  studentRef.on(VALUE_KEY, data => {
    dispatch({
      type: FETCH_STUDENT,
      student: data.val()
    });
  });
};
