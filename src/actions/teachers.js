import { branchesRef, teachersRef, yydASDb } from "../configs/firebase";
import {
  FETCH_TEACHERS,
  FETCH_TEACHERS_BY_BRANCH,
  FETCH_TEACHER,
  REMOVE_TEACHERS_BY_BRANCH,
  FETCH_BRANCHES
} from "./types";
import { getBranch } from "./branches";
import { VALUE_KEY, URL_TEACHERS } from "../utils/common";

export const addTeacher = teacher => async dispatch => {
  const myRef = teachersRef.child(teacher.Branch).push();
  const newKey = myRef.key;
  teacher.Id = newKey;

  const insertData = {};
  insertData[`${URL_TEACHERS}/${teacher.Branch}/${newKey}`] = teacher;
  yydASDb
    .ref()
    .update(insertData)
    .then(() => dispatch(getBranch(teacher.Branch)))
    .then(() => dispatch(fetchAllTeachers()));
};

export const updateTeacher = teacher => async dispatch => {
  const updateData = {};
  updateData[`${URL_TEACHERS}/${teacher.Branch}/${teacher.Id}`] = teacher;
  yydASDb
    .ref()
    .update(updateData)
    .then(() => dispatch(getBranch(teacher.Branch)))
    .then(() => dispatch(fetchAllTeachers()))
    .then(() =>
      dispatch({
        type: FETCH_TEACHER,
        teacher: null
      })
    );
};

export const removeTeacher = teacher => async dispatch => {
  teachersRef
    .child(teacher.Branch)
    .child(teacher.Id)
    .remove()
    .then(() => dispatch(getBranch(teacher.Branch)))
    .then(result => {
      dispatch(fetchAllTeachers());
    })
    .then(() =>
      dispatch({
        type: FETCH_TEACHER,
        teacher: null
      })
    );
};

export const removeTeachersByBranch = branch => async dispatch => {
  teachersRef
    .child(branch.Branch_Name)
    .remove()
    .then(() =>
      dispatch({
        type: REMOVE_TEACHERS_BY_BRANCH,
        teachers: null
      })
    );
};

const isEmptyObject = value => {
  return Object.keys(value).length === 0 && value.constructor === Object;
};
export const fetchAllTeachers = (level = "Primary") => async dispatch => {
  teachersRef.on(VALUE_KEY, data => {
    if (data.exists()) {
      const branches = data.val();
      const branchWithTeacherList = {};
      Object.keys(branches).forEach(key => {
        const teachers = branches[key];
        const teacherList = retrieveTeacherList(teachers, level);

        if (!isEmptyObject(teacherList)) {
          branchWithTeacherList[key] = sortTeacherWithName(teacherList);
        }
      });
      dispatch({
        type: FETCH_TEACHERS,
        teachers: branchWithTeacherList
      });
    } else {
      dispatch({
        type: FETCH_TEACHERS,
        teachers: null
      });
    }
  });
};

const retrieveTeacherList = (teachers, level) => {
  const teacherList = {};
  Object.keys(teachers).forEach(tKey => {
    const teacher = teachers[tKey];
    if (level === "Primary" && (!teacher.level || teacher.level === level)) {
      teacher.level = level;
      teacherList[tKey] = teacher;
    }
    if (level === "Secondary" && teacher.level === level) {
      teacherList[tKey] = teacher;
    }
  });

  return teacherList;
};

const sortTeacherWithName = list => {
  return Object.keys(list)
    .sort((a, b) => list[a].Name.localeCompare(list[b].Name))
    .reduce((r, k) => ({ ...r, [k]: list[k] }), {});
};

export const fetchTeachersByBranch = (
  branch = null,
  level = "Primary"
) => async dispatch => {
  const teacherbyBranchRef = yydASDb
    .ref(`${URL_TEACHERS}/${branch}`)
    .orderByChild("Name");

  teacherbyBranchRef.on(VALUE_KEY, data => {
    if (data.exists()) {
      const teachers = data.val();
      const teacherList = retrieveTeacherList(teachers, level);

      dispatch({
        type: FETCH_TEACHERS_BY_BRANCH,
        teachers: sortTeacherWithName(teacherList)
      });
    } else {
      dispatch({
        type: FETCH_TEACHERS_BY_BRANCH,
        teachers: null
      });
    }
  });
};

export const fetchTeacher = teacher => async dispatch => {
  const teacherRef = yydASDb.ref(
    `${URL_TEACHERS}/${teacher.Branch}/${teacher.Id}`
  );
  teacherRef.on(VALUE_KEY, data => {
    const teacher = data.val();
    const level = teacher.level;
    if(!level) teacher.level = "Primary"

    dispatch({
      type: FETCH_TEACHER,
      teacher
    });
  });
};

export const fetchBranchList = (level = "Primary") => async dispatch => {
  branchesRef.orderByValue().on(VALUE_KEY, data => {
    if (data.exists()) {
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
    } else {
      dispatch({
        type: FETCH_BRANCHES,
        branches: []
      });
    }
  });
};
