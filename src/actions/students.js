import { branchesRef, studentsRef, yydASDb } from "../configs/firebase";
import {
  FETCH_STUDENTS_BY_BRANCH,
  FETCH_STUDENT,
  REMOVE_STUDENTS_BY_BRANCH,
  FETCH_BRANCHES
} from "./types";
import { VALUE_KEY, URL_STUDENTS, BRANCH_PUNGGOL } from "../utils/common";
import { getBranch } from "./branches";

export const addStudent = student => async dispatch => {
  console.log(student, "1");
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
export const fetchStudentsByBranch = (
  branch,
  batch,
  level = "Primary"
) => async dispatch => {
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
    } else {
      const newStudentList = [];
      Object.keys(studentList).forEach(key => {
        const student = studentList[key];
        if (
          !student.level &&
          (level === "Primary" || student.level === level)
        ) {
          student.Id = key;
          student.level = level;
          newStudentList.push(student);
        } else if (student.level === level) {
          student.Id = key;
          newStudentList.push(student);
        }
      });

      if (level === "Primary") {
        newStudentList.sort((a, b) => {
          //console.log(a, b, b.Name);
          return (
            parseInt(a.Primary, 10) - parseInt(b.Primary, 10) ||
            a.Name.localeCompare(b.Name)
          );
        });
      }
      if (level === "Secondary") {
        // For secondary students
        newStudentList.sort((a, b) => {
          return (
            parseInt(a.Secondary, 10) - parseInt(b.Secondary, 10) ||
            a.Name.localeCompare(b.Name)
          );
        });
      }

      dispatch({
        type: FETCH_STUDENTS_BY_BRANCH,
        students: newStudentList
      });
    }
  });
};

export const fetchStudent = student => async dispatch => {
  const studentRef = yydASDb.ref(
    `${URL_STUDENTS}/${student.Branch}/${student.Id}`
  );
  studentRef.on(VALUE_KEY, data => {
    const student = data.val();
    const level = student.level;
    if (!level) student.level = "Primary";

    dispatch({
      type: FETCH_STUDENT,
      student
    });
  });
};

export const fetchBranchList = (level = "Primary") => async dispatch => {
  branchesRef.orderByValue().on(VALUE_KEY, data => {
    const branches = data.val();
    const sortList = [];

    Object.keys(branches).forEach(key => {
      if (level === "Primary" && branches[key].primary) {
        sortList.push(branches[key]);
      } else if (level === "Secondary" && branches[key].secondary) {
        sortList.push(branches[key]);
      }
    });

    sortList.sort((a, b) => {
      return (
        Number(b.Active) - Number(a.Active) ||
        a.Branch_Name.localeCompare(b.Branch_Name)
      );
    });

    dispatch({
      type: FETCH_BRANCHES,
      branches: sortList
    });
  });
};
