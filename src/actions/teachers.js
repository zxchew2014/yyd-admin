import {teachersRef, yydASDb} from "../configs/firebase";
import {FETCH_TEACHERS, FETCH_TEACHERS_BY_BRANCH} from "./types";
import {getBranch} from "./branches";

export const addTeacher = (teacher, branch) => async dispatch => {
    teachersRef
        .child(branch)
        .push()
        .set(teacher)
        .then(() => dispatch(getBranch(branch)))
        .then(() => dispatch(fetchTeachersByBranch(branch)));
};

export const removeTeacher = (teacher, branch) => async dispatch => {
    teachersRef
        .child(branch)
        .child(teacher)
        .remove()
        .then(() => dispatch(getBranch(branch)))
        .then(result => {
            console.log(result);
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
