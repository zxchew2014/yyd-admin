import { studentsRef, teachersRef, yydASDb } from '../configs/firebase';
import {
  FETCH_STUDENTS,
  FETCH_STUDENTS_BY_BRANCH,
  FETCH_TEACHERS,
  FETCH_TEACHERS_BY_BRANCH
} from './types';

export const fetchStudentsByBranch = (branch = null) => async dispatch => {
  const studentsRef = studentsRef.orderByChild('Branch').equalTo(branch);

  studentsRef.on('value', data => {
    dispatch({
      type: FETCH_TEACHERS_BY_BRANCH,
      student: data.val()
    });
  });
};
