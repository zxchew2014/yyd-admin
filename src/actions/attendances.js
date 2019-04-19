import _ from "lodash";
import { attendancesRef } from "../configs/firebase";
import { FETCH_TEACHER_ATTENDANCES, FETCH_STUDENT_ATTENDANCES } from "./types";
import {
  NOT_AVAILABLE,
  DATETME_DDMMYYYSLASH_HHMMSS,
  BRANCH_PUNGGOL,
  CAMELCASED_CLOCK_IN,
  CAMELCASED_CLOCK_OUT,
  DATEFORMAT_DDSLASHMMSLASHYYYY,
  VALUE_KEY
} from "../utils/common";

const moment = require("moment");

export const fetchTeacherAttendanceClockOut = date => async dispatch => {
  const { startDate, endDate } = date;
  const start = new Date(startDate);
  const end = new Date(endDate);

  attendancesRef.on(VALUE_KEY, data => {
    const result = data.val();
    const mapClockInAsc = filterAttendanceByDate(
      result,
      start,
      end,
      CAMELCASED_CLOCK_IN
    );
    const mapTeacherClockInAsc = sortTeacherMapByTeacherName(mapClockInAsc);

    const mapClockOutAsc = filterAttendanceByDate(
      result,
      start,
      end,
      CAMELCASED_CLOCK_OUT
    );
    const mapTeacherClockOutAsc = sortTeacherMapByTeacherName(mapClockOutAsc);
    const mapFinalAttendance = mergeTeacherAttendance(
      mapTeacherClockInAsc,
      mapTeacherClockOutAsc
    );

    dispatch({
      type: FETCH_TEACHER_ATTENDANCES,
      attendanceTeachers: [...mapFinalAttendance]
    });
  });
};

const filterAttendanceByDate = (result, start, end, clockType) => {
  const mapDate = new Map();

  Object.keys(result).forEach(key => {
    if (_.camelCase(key) === clockType) {
      const clockList = result[key];
      Object.keys(clockList).forEach(yearKey => {
        const dateList = clockList[yearKey];
        if (yearKey >= start.getFullYear() && yearKey <= end.getFullYear()) {
          Object.keys(dateList).forEach(dateKey => {
            const currentDate = new Date(dateKey);
            const second = currentDate.getTime() / 1000;
            if (currentDate >= start && currentDate <= end)
              mapDate.set(second, dateList[dateKey]);
          });
        }
      });
    }
  });
  return new Map([...mapDate.entries()].sort());
};

const filterStudentAttendance = (
  result,
  start,
  end,
  branch,
  batch,
  clockType
) => {
  const mapDate = new Map();

  Object.keys(result).forEach(key => {
    if (_.camelCase(key) === clockType) {
      const clockList = result[key];
      Object.keys(clockList).forEach(yearKey => {
        const dateList = clockList[yearKey];
        if (yearKey >= start.getFullYear() && yearKey <= end.getFullYear()) {
          Object.keys(dateList).forEach(dateKey => {
            const currentDate = new Date(dateKey);
            if (currentDate >= start && currentDate <= end) {
              const attendanceList = dateList[dateKey];
              Object.keys(attendanceList).forEach(attendanceKey => {
                const attendance = attendanceList[attendanceKey];
                const attendanceId = attendance.id;
                const attendanceBranch = attendance.branch;

                if (branch === attendanceBranch) {
                  if (attendanceBranch === BRANCH_PUNGGOL) {
                    const attendanceBatch = attendance.batch;
                    if (attendanceBatch === batch) {
                      mapDate.set(attendanceId, attendance);
                    }
                  } else {
                    mapDate.set(attendanceId, attendance);
                  }
                }
              });
            }
          });
        }
      });
    }
  });
  return new Map([...mapDate.entries()].sort());
};

const sortTeacherMapByTeacherName = result => {
  const mapTeacher = new Map();

  result.forEach((value, key) => {
    Object.keys(value).forEach(attendanceKey => {
      const attendance = teacherFieldsRemove(value[attendanceKey]);

      if (mapTeacher.has(attendance.teacher)) {
        const currentAttendance = mapTeacher.get(attendance.teacher);
        currentAttendance.push(attendance);
        mapTeacher.set(attendance.teacher, currentAttendance);
      } else {
        const arrayOfAttendance = new Array(attendance);
        mapTeacher.set(attendance.teacher, arrayOfAttendance);
      }
    });
  });
  return new Map([...mapTeacher.entries()].sort());
};

const sortStudentMapByName = result => {
  const mapStudent = new Map();

  result.forEach((value, key) => {
    const attendance = studentFieldsRemove(value);
    const studentList = attendance.students;

    Object.keys(studentList).forEach(studentKey => {
      const student = studentList[studentKey];

      const studentName = student.Name;
      const primary = student.Primary;
      const combineKey = `P${primary}_${studentName}`;
      const status = student.Status;

      if (status !== NOT_AVAILABLE) {
        const newStudentAttendanceDetail = {
          subject: attendance.subject,
          timestamp: attendance.timestamp,
          studentName,
          primary,
          status,
          id: combineKey
        };

        if (mapStudent.has(combineKey)) {
          const currentAttendance = mapStudent.get(combineKey);
          currentAttendance.push(newStudentAttendanceDetail);
          mapStudent.set(combineKey, currentAttendance);
        } else {
          const newArrayAttendance = [];
          newArrayAttendance.push(newStudentAttendanceDetail);
          mapStudent.set(combineKey, newArrayAttendance);
        }
      }
    });
  });
  return new Map([...mapStudent.entries()].sort());
};

const mergeTeacherAttendance = (clockInMap, clockOutMap) => {
  clockInMap.forEach((value, key) => {
    const clockInArray = value;
    const clockOutArray = clockOutMap.get(key);
    Object.keys(clockInArray).forEach(clockInIndex => {
      const clockInAttendance = clockInArray[clockInIndex];
      if (clockOutArray && clockOutArray.length > 0) {
        const clockInDate = moment(
          clockInAttendance.clockIn,
          DATETME_DDMMYYYSLASH_HHMMSS
        ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);
        Object.keys(clockOutArray).some(clockOutIndex => {
          const clockOutDate = moment(
            clockOutArray[clockOutIndex].clockOut,
            DATETME_DDMMYYYSLASH_HHMMSS
          ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);
          const dateCheck = clockInDate === clockOutDate;
          const subjectCheck =
            clockInAttendance.subject === clockOutArray[clockOutIndex].subject;
          const branchCheck =
            clockInAttendance.branch === clockOutArray[clockOutIndex].branch;
          const primaryCheck = comparePrimaryClass(
            clockInAttendance.primary,
            clockOutArray[clockOutIndex].primary
          );

          if (primaryCheck && dateCheck && subjectCheck && branchCheck) {
            clockInAttendance.clockOut = clockOutArray[clockOutIndex].clockOut;
            return true;
          }
        });
      } else {
        clockInAttendance.clockOut = "";
      }
    });
  });

  let checkDuplication = false;

  clockOutMap.forEach((value, key) => {
    const clockOutArray = value;
    const clockInArray = clockInMap.get(key);
    Object.keys(clockOutArray).forEach(clockOutIndex => {
      const clockOutAttendance = clockOutArray[clockOutIndex];
      if (clockInArray && clockInArray.length > 0) {
        const clockOutDate = moment(
          clockOutAttendance.clockOut,
          DATETME_DDMMYYYSLASH_HHMMSS
        ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);
        Object.keys(clockInArray).some(clockInIndex => {
          const clockInDate = moment(
            clockInArray[clockInIndex].clockIn,
            DATETME_DDMMYYYSLASH_HHMMSS
          ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);
          const dateCheck = clockInDate === clockOutDate;
          const subjectCheck =
            clockOutAttendance.subject === clockInArray[clockInIndex].subject;
          const branchCheck =
            clockOutAttendance.branch === clockInArray[clockInIndex].branch;
          const primaryCheck = comparePrimaryClass(
            clockOutAttendance.primary,
            clockInArray[clockInIndex].primary
          );

          if (primaryCheck && dateCheck && subjectCheck && branchCheck) {
            checkDuplication = true;
            return true;
          }
        });
      }

      if (checkDuplication) {
        checkDuplication = false;
      } else if (clockInMap.has(key)) {
        const currentAttendance = clockInMap.get(key);
        clockOutAttendance.clockIn = "";
        currentAttendance.push(clockOutAttendance);
        clockInMap.set(key, currentAttendance);
      } else {
        clockOutAttendance.clockIn = "";
        const arrayOfAttendance = new Array(clockOutAttendance);
        clockInMap.set(key, arrayOfAttendance);
      }
    });
  });

  clockInMap.forEach((value, key) => {
    value.sort(
      (a, b) =>
        moment(a.timestamp, DATETME_DDMMYYYSLASH_HHMMSS).toDate() -
        moment(b.timestamp, DATETME_DDMMYYYSLASH_HHMMSS).toDate()
    );
  });

  return new Map([...clockInMap.entries()].sort());
};

const mergeStudentAttendance = (clockInMap, clockOutMap) => {
  clockInMap.forEach((value, key) => {
    const clockInArray = value;
    const clockOutArray = clockOutMap.get(key);

    Object.keys(clockInArray).forEach(clockInIndex => {
      const clockInAttendance = clockInArray[clockInIndex];
      if (clockOutArray && clockOutArray.length > 0) {
        const clockInDate = moment(
          clockInAttendance.timestamp,
          DATETME_DDMMYYYSLASH_HHMMSS
        ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);
        Object.keys(clockOutArray).some(clockOutIndex => {
          const clockOutDate = moment(
            clockOutArray[clockOutIndex].timestamp,
            DATETME_DDMMYYYSLASH_HHMMSS
          ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);

          const studentNameCheck =
            clockInAttendance.studentName ===
            clockOutArray[clockOutIndex].studentName;
          const dateCheck = clockInDate === clockOutDate;
          const subjectCheck =
            clockInAttendance.subject === clockOutArray[clockOutIndex].subject;

          if (studentNameCheck && dateCheck && subjectCheck) {
            clockInAttendance.status = clockOutArray[clockOutIndex].status;
            return true;
          }
        });
      }
    });
  });

  let checkDuplication = false;

  clockOutMap.forEach((value, key) => {
    const clockOutArray = value;
    const clockInArray = clockInMap.get(key);
    Object.keys(clockOutArray).forEach(clockOutIndex => {
      const clockOutAttendance = clockOutArray[clockOutIndex];
      if (clockInArray && clockInArray.length > 0) {
        const clockOutDate = moment(
          clockOutAttendance.timestamp,
          DATETME_DDMMYYYSLASH_HHMMSS
        ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);
        Object.keys(clockInArray).some(clockInIndex => {
          const clockInDate = moment(
            clockInArray[clockInIndex].timestamp,
            DATETME_DDMMYYYSLASH_HHMMSS
          ).format(DATEFORMAT_DDSLASHMMSLASHYYYY);

          const studentNameCheck =
            clockOutAttendance.studentName ===
            clockInArray[clockInIndex].studentName;
          const dateCheck = clockInDate === clockOutDate;
          const subjectCheck =
            clockOutAttendance.subject === clockInArray[clockInIndex].subject;

          if (studentNameCheck && dateCheck && subjectCheck) {
            checkDuplication = true;
            return true;
          }
        });
      }

      if (checkDuplication) {
        checkDuplication = false;
      } else if (clockInMap.has(key)) {
        const currentAttendance = clockInMap.get(key);
        currentAttendance.push(clockOutAttendance);
        clockInMap.set(key, currentAttendance);
      } else {
        const arrayOfAttendance = new Array(clockOutAttendance);
        clockInMap.set(key, arrayOfAttendance);
      }
    });
  });

  clockInMap.forEach((value, key) => {
    value.sort(
      (a, b) =>
        moment(a.timestamp, DATETME_DDMMYYYSLASH_HHMMSS).toDate() -
        moment(b.timestamp, DATETME_DDMMYYYSLASH_HHMMSS).toDate()
    );
  });

  return new Map([...clockInMap.entries()].sort());
};

const comparePrimaryClass = (oldClass, newClass) => {
  let check = false;
  oldClass.some(p1 =>
    // eslint-disable-next-line
    newClass.some(p2 => {
      if (p1 === p2) {
        check = true;
        return true;
      }
    })
  );
  return check;
};

const teacherFieldsRemove = attendance => {
  if (_.camelCase(attendance.clock) === CAMELCASED_CLOCK_IN) {
    attendance.clockIn = attendance.timestamp;
  } else {
    attendance.clockOut = attendance.timestamp;
  }
  delete attendance.classroomSetup;
  delete attendance.students;
  return attendance;
};

const studentFieldsRemove = attendance => {
  delete attendance.branch;
  delete attendance.batch;
  delete attendance.clock;
  delete attendance.relief;
  delete attendance.feedback;
  delete attendance.primary;
  delete attendance.classroomSetup;
  delete attendance.teacher;
  return attendance;
};

export const fetchStudentAttendanceClockOut = inputData => async dispatch => {
  const { startDate, endDate, branch, batch } = inputData;

  const start = new Date(startDate);
  const end = new Date(endDate);

  attendancesRef.on(VALUE_KEY, data => {
    const result = data.val();
    const mapClockInAsc = filterStudentAttendance(
      result,
      start,
      end,
      branch,
      batch,
      CAMELCASED_CLOCK_IN
    );

    const mapStudentClockInAsc = sortStudentMapByName(mapClockInAsc);

    const mapClockOutAsc = filterStudentAttendance(
      result,
      start,
      end,
      branch,
      batch,
      CAMELCASED_CLOCK_OUT
    );

    const mapStudentClockOutAsc = sortStudentMapByName(mapClockOutAsc);

    const mapFinalAttendance = mergeStudentAttendance(
      mapStudentClockInAsc,
      mapStudentClockOutAsc
    );

    dispatch({
      type: FETCH_STUDENT_ATTENDANCES,
      attendanceStudents: [...mapFinalAttendance]
    });
  });
};
