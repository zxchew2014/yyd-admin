import _ from "lodash";
import {attendancesRef} from "../configs/firebase";
import {FETCH_TEACHER_ATTENDANCES} from "./types";

export const fetchTeacherAttendanceClockOut = date => async dispatch => {
    const {startDate, endDate} = date;
    const start = new Date(startDate);
    const end = new Date(endDate);

    attendancesRef.on("value", data => {
        const result = data.val();
        const mapDateAsc = filterAttendanceByDate(result, start, end, "clockIn");
        const mapTeacherAsc = sortTeacherMapByTeacherName(mapDateAsc);
        dispatch({
            type: FETCH_TEACHER_ATTENDANCES,
            attendance_teachers: [...mapTeacherAsc]
        });
    });
};

const filterAttendanceByDate = (result, start, end, clockType) => {
    const mapDate = new Map();

    Object.keys(result).map(key => {
        if (_.camelCase(key) === clockType) {
            const clockList = result[key];
            Object.keys(clockList).map(dateKey => {
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
        Object.keys(value).map(attendanceKey => {
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

const teacherFieldsRemove = attendance => {
    delete attendance.clock;
    delete attendance.classroomSetup;
    delete attendance.students;
    return attendance;
};