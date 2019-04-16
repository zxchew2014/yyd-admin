import { teachersRef, yydASDb } from "../configs/firebase";
import { FETCH_TEACHERS, FETCH_TEACHERS_BY_BRANCH,FETCH_TEACHER } from "./types";
import { getBranch } from "./branches";

export const addTeacher = teacher => async dispatch => {
  const myRef = teachersRef.child(teacher.Branch).push();
  const newKey = myRef.key;
  teacher.Id = newKey;

  const updateData = {};
  updateData[`/Teacher_Allocation/${teacher.Branch}/${newKey}`] = teacher;
  yydASDb
    .ref()
    .update(updateData)
    .then(() => dispatch(getBranch(teacher.Branch)))
    .then(() => dispatch(fetchTeachersByBranch(teacher.Branch)));
};

export const updateTeacher = teacher => async dispatch => {
  const updateData = {};
  updateData[`/Teacher_Allocation/${teacher.Branch}/${teacher.Id}`] = teacher;
  yydASDb
      .ref()
      .update(updateData)
      .then(() => dispatch(getBranch(teacher.Branch)))
      .then(() => dispatch(fetchTeachersByBranch(teacher.Branch)));
};

export const removeTeacher = (teacher, branch) => async dispatch => {
  teachersRef
    .child(branch)
    .child(teacher)
    .remove()
    .then(() => dispatch(getBranch(branch)))
    .then(result => {
      dispatch(fetchTeachersByBranch(branch));
    });
};

export const fetchAllTeachers = () => async dispatch => {
  teachersRef.on("value", data => {

    dispatch({
      type: FETCH_TEACHERS,
      teachers: data.val()
    });


  });
};

export const fetchTeachersByBranch = (branch = null) => async dispatch => {
  const teacherbyBranchRef = yydASDb
    .ref(`Teacher_Allocation/${branch}`)
    .orderByChild("Name");

  teacherbyBranchRef.on("value", data => {
    dispatch({
      type: FETCH_TEACHERS_BY_BRANCH,
      teachers: data.val()
    });
  });
};

export const fetchTeacher = teacher => async dispatch => {
  const teacherRef = yydASDb.ref(`Teacher_Allocation/${teacher.Branch}/${teacher.Id}`);
  teacherRef.on("value", data => {
    dispatch({
      type: FETCH_TEACHER,
      teacher: data.val()
    });
  });
};