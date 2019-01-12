import _ from "lodash";
import { attendancesRef } from "../configs/firebase";
import { FETCH_TEACHER_ATTENDANCES } from "./types";

const moment = require("moment");

export const fetchTeacherAttendanceClockOut = date => async dispatch => {
  const { startDate, endDate } = date;
  const start = new Date(startDate);
  const end = new Date(endDate);

  attendancesRef.on("value", data => {
    const result = data.val();
    const mapClockInAsc = filterAttendanceByDate(result, start, end, "clockIn");
    const mapTeacherClockInAsc = sortTeacherMapByTeacherName(mapClockInAsc);

    const mapClockOutAsc = filterAttendanceByDate(
      result,
      start,
      end,
      "clockOut"
    );
    const mapTeacherClockOutAsc = sortTeacherMapByTeacherName(mapClockOutAsc);
    const mapFinalAttendance = mergeTeacherAttendance(
      mapTeacherClockInAsc,
      mapTeacherClockOutAsc
    );

    dispatch({
      type: FETCH_TEACHER_ATTENDANCES,
      attendance_teachers: [...mapFinalAttendance]
    });
  });
};

const filterAttendanceByDate = (result, start, end, clockType) => {
  const mapDate = new Map();

  Object.keys(result).forEach(key => {
    if (_.camelCase(key) === clockType) {
      const clockList = result[key];
      Object.keys(clockList).forEach(dateKey => {
        const currentDate = new Date(dateKey);
        const second = currentDate.getTime() / 1000;
        if (currentDate >= start && currentDate <= end)
          mapDate.set(second, clockList[dateKey]);
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

const mergeTeacherAttendance = (clockInMap, clockOutMap) => {
  clockInMap.forEach((value, key) => {
    const clockInArray = value;
    const clockOutArray = clockOutMap.get(key);
    Object.keys(clockInArray).forEach(clockInIndex => {
      const clockInAttendance = clockInArray[clockInIndex];
      if (clockOutArray && clockOutArray.length > 0) {
        const clockInDate = moment(
          clockInAttendance.clockIn,
          "DD/MM/YYYY, HH:mm:ss"
        ).format("L");
        Object.keys(clockOutArray).some(clockOutIndex => {
          const clockOutDate = moment(
            clockOutArray[clockOutIndex].clockOut,
            "DD/MM/YYYY, HH:mm:ss"
          ).format("L");
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
          "DD/MM/YYYY, HH:mm:ss"
        ).format("L");
        Object.keys(clockInArray).some(clockInIndex => {
          const clockInDate = moment(
            clockInArray[clockInIndex].clockIn,
            "DD/MM/YYYY, HH:mm:ss"
          ).format("L");
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
        moment(a.timestamp, "DD/MM/YYYY, HH:mm:ss").toDate() -
        moment(b.timestamp, "DD/MM/YYYY, HH:mm:ss").toDate()
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
  if (attendance.clock === "Clock In") {
    attendance.clockIn = attendance.timestamp;
  } else {
    attendance.clockOut = attendance.timestamp;
  }
  delete attendance.clock;
  delete attendance.classroomSetup;
  delete attendance.students;
  return attendance;
};
