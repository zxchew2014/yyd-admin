import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Table } from "semantic-ui-react";
import {
  ABSENT,
  BRANCH_PUNGGOL,
  DATEFORMAT_DAY_MMM_DD_YYYY,
  DATETME_DDMMYYYSLASH_HHMMSS,
  LATE,
  MC,
  PRESENT,
  NOT_AVAILABLE,
  NO_SUCH_STUDENT,
  YYD_EDUCATION_CENTRE,
  BATCH,
  STUDENT_ATTENDANCE_REPORT
} from "../../../utils/common";

const moment = require("moment");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class GenerateStudentAttendanceList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  generatePDF = () => {
    const { startDate, endDate, branch, batch } = this.props;
    const newPDF = new jsPDF("landscape", "pt");
    const res = newPDF.autoTableHtmlToJson(
      document.getElementById("attendanceTable")
    );
    let fileName = `${YYD_EDUCATION_CENTRE} - ${branch} ${STUDENT_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;

    const header = function(data) {
      newPDF.setFontSize(14);
      newPDF.setTextColor("#000000");
      newPDF.text(fileName, data.settings.margin.left, 30);

      let str = `Page ${data.pageCount}`;
      newPDF.setFontSize(10);
      newPDF.text(str, data.settings.margin.left, 585);

      newPDF.text(data.settings.margin.left + 130, 557, "1st Verify By");
      newPDF.text(data.settings.margin.left + 200, 557, "Signature:");
      newPDF.text(data.settings.margin.left + 200, 570, "Name:");
      newPDF.text(data.settings.margin.left + 200, 585, "Role:");

      newPDF.text(data.settings.margin.left + 430, 557, "2nd Verify By");
      newPDF.text(data.settings.margin.left + 500, 557, "Signature:");
      newPDF.text(data.settings.margin.left + 500, 570, "Name:");
      newPDF.text(data.settings.margin.left + 500, 585, "Role:");
    };

    const options = {
      didDrawPage: header
    };

    newPDF.autoTable(res.columns, res.data, options);
    newPDF.save(`${fileName}.pdf`);
  };

  render() {
    const { attendanceStudents } = this.props;

    const renderHeaderRow = () => (
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Subject</Table.HeaderCell>
          <Table.HeaderCell>Teacher Name</Table.HeaderCell>
          <Table.HeaderCell>Student Name</Table.HeaderCell>
          <Table.HeaderCell>Primary</Table.HeaderCell>
          <Table.HeaderCell>Check In Status</Table.HeaderCell>
          <Table.HeaderCell>Check Out Status</Table.HeaderCell>
          <Table.HeaderCell>Final Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    const renderAttendanceRows = attendanceList =>
      attendanceList.map(attendance => (
        <Table.Row
          textAlign="center"
          key={attendance.id + "-" + attendance.timestamp}
        >
          <Table.Cell>
            {attendance.timestamp &&
              moment(attendance.timestamp, DATETME_DDMMYYYSLASH_HHMMSS).format(
                DATEFORMAT_DAY_MMM_DD_YYYY
              )}
          </Table.Cell>
          <Table.Cell>{attendance.subject}</Table.Cell>
          <Table.Cell>{attendance.teacherName}</Table.Cell>
          <Table.Cell>{attendance.studentName}</Table.Cell>
          <Table.Cell>P{attendance.primary}</Table.Cell>
          {renderStatusCell(attendance.checkInStatus)}
          {renderStatusCell(attendance.checkOutStatus)}
          {renderStatusCell(
            calculateFinalStatus(
              attendance.checkInStatus,
              attendance.checkOutStatus
            )
          )}
        </Table.Row>
      ));

    const calculateFinalStatus = (checkInStatus, checkOutStatus) => {
      if (checkInStatus && checkOutStatus) return checkOutStatus;

      if (!checkInStatus) return checkOutStatus;

      if (!checkOutStatus) return checkInStatus;
    };

    const renderStatusCell = status => {
      if (status && status != "") {
        if (status === PRESENT || status === LATE)
          return <Table.Cell positive>{status}</Table.Cell>;
        else if (status === ABSENT)
          return <Table.Cell negative>{status}</Table.Cell>;
        else if (status === MC)
          return <Table.Cell warning>{status}</Table.Cell>;
        else if (status === NOT_AVAILABLE || status === NO_SUCH_STUDENT)
          return <Table.Cell warning>{NO_SUCH_STUDENT}</Table.Cell>;
      } else return <Table.Cell warning>Attendance was not mark!</Table.Cell>;
    };

    const renderCalculateAttendancePercentage = attendanceList => {
      let noOfAbsent = 0;
      let noOfNoSuchStudent = 0;
      let studentName = "";

      attendanceList.forEach(attendance => {
        let finalStatus = calculateFinalStatus(
          attendance.checkInStatus,
          attendance.checkOutStatus
        );
        studentName = attendance.studentName;
        if (finalStatus === ABSENT) {
          noOfAbsent += 1;
        } else if (
          finalStatus === NOT_AVAILABLE ||
          finalStatus === NO_SUCH_STUDENT
        ) {
          noOfNoSuchStudent += 1;
        }
      });

      let absentPercentage = (
        (noOfAbsent / (attendanceList.length - noOfNoSuchStudent)) *
        100
      ).toFixed(2);
      if (isNaN(absentPercentage)) {
        absentPercentage = 100;
      }

      const actualPercentage = (100.0 - absentPercentage).toFixed(2);

      return (
        <Table.Row>
          <Table.Cell colSpan="8" textAlign="right">
            <b>{studentName}'s Attendance Percentage</b> : {actualPercentage}%
          </Table.Cell>
        </Table.Row>
      );
    };

    const renderAttendanceList = () => [
      <div ref={this.myRef}>
        <Button onClick={this.generatePDF}>Generate PDF</Button>
        <Table
          unstackable
          key="all-attendance"
          id="attendanceTable"
          ref="attendanceTable"
        >
          {attendanceStudents.map(key => {
            const attendanceList = key[1];

            return [
              renderHeaderRow(),
              <Table.Body>
                {renderAttendanceRows(attendanceList)}
                {renderCalculateAttendancePercentage(attendanceList)}
              </Table.Body>
            ];
          })}
        </Table>
      </div>
    ];

    return renderAttendanceList();
  }
}

GenerateStudentAttendanceList.propTypes = {
  attendances: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  branch: PropTypes.string,
  batch: PropTypes.string || ""
};

const mapStateToProps = ({ attendanceStudents }) => ({
  attendanceStudents
});

export default connect(mapStateToProps, {})(GenerateStudentAttendanceList);
