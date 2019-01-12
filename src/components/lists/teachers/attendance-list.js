import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";
import * as ATTENDANCES from "../../../actions/attendances";

const moment = require("moment");
const JSPDF = require("jspdf");
require("jspdf-autotable");

class AttendanceList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  generatePDF = () => {
    const { startDate, endDate } = this.props;
    const newPDF = new JSPDF("landscape", "pt");
    const res = newPDF.autoTableHtmlToJson(
      document.getElementById("attendanceTable")
    );

    const header = function(data) {
      newPDF.setFontSize(14);
      newPDF.setTextColor("#000000");
      newPDF.setFontStyle("normal");
      newPDF.text(
        `YYD Education Center - Teacher Attendance Report on ${startDate} to ${endDate}`,
        data.settings.margin.left,
        30
      );

      let str = `Page ${data.pageCount}`;
      newPDF.setFontSize(10);
      newPDF.text(str, data.settings.margin.left, 585);

      newPDF.text(data.settings.margin.left + 130, 540, "1st Verify By");
      newPDF.text(data.settings.margin.left + 200, 540, "Signature:");
      newPDF.text(data.settings.margin.left + 200, 570, "Name:");
      newPDF.text(data.settings.margin.left + 200, 585, "Role:");

      newPDF.text(data.settings.margin.left + 430, 540, "2nd Verify By");
      newPDF.text(data.settings.margin.left + 500, 540, "Signature:");
      newPDF.text(data.settings.margin.left + 500, 570, "Name:");
      newPDF.text(data.settings.margin.left + 500, 585, "Role:");
    };

    const options = {
      beforePageContent: header
    };

    newPDF.autoTable(res.columns, res.data, options);
    newPDF.save(
      `YYD Education Center - Teacher Attendance Report on ${startDate} to ${endDate}.pdf`
    );
  };

  render() {
    const FERNVALE = "Fernvale";
    const { attendance_teachers } = this.props;

    const renderHeaderRow = () => (
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Clock In</Table.HeaderCell>
          <Table.HeaderCell>Clock Out</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Subject</Table.HeaderCell>
          <Table.HeaderCell>Branch</Table.HeaderCell>
          <Table.HeaderCell>Batch</Table.HeaderCell>
          <Table.HeaderCell>Relief</Table.HeaderCell>
          <Table.HeaderCell>Primary</Table.HeaderCell>
          <Table.HeaderCell>Class No</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    const renderAttendanceRows = attendances =>
      attendances.map(attendance => {
        return (
          <Table.Row textAlign="center" key={attendance}>
            <Table.Cell>
              {(attendance.clockIn &&
                moment(attendance.clockIn, "DD/MM/YYYY, HH:mm:ss").format(
                  "ddd MMM DD YYYY"
                )) ||
                moment(attendance.clockOut, "DD/MM/YYYY, HH:mm:ss").format(
                  "ddd MMM DD YYYY"
                )}
            </Table.Cell>
            <Table.Cell>
              {(attendance.clockIn &&
                moment(attendance.clockIn, "DD/MM/YYYY, HH:mm:ss").format(
                  "LT"
                )) ||
                ""}
            </Table.Cell>
            <Table.Cell>
              {(attendance.clockOut &&
                moment(attendance.clockOut, "DD/MM/YYYY, HH:mm:ss").format(
                  "LT"
                )) ||
                ""}
            </Table.Cell>
            <Table.Cell>{attendance.teacher}</Table.Cell>
            <Table.Cell>{attendance.subject}</Table.Cell>
            <Table.Cell>{attendance.branch}</Table.Cell>
            <Table.Cell>
              {attendance.batch ? `Batch ${attendance.batch}` : "-"}
            </Table.Cell>
            <Table.Cell>{attendance.relief ? "Yes" : "No"}</Table.Cell>
            <Table.Cell>P{attendance.primary.join(", P")}</Table.Cell>
            <Table.Cell>
              {attendance.classNo
                ? `P5 Class ${attendance.classNo.join(", P5 Class ")}`
                : "-"}
            </Table.Cell>
          </Table.Row>
        );
      });

    const renderTotalLessonTaught = attendances => {
      let noOfClasses = 0;
      attendances.forEach(attendance => {
        noOfClasses += attendance.primary.length;
        if (attendance.branch === FERNVALE) {
          if (attendance.classNo && attendance.classNo.length === 2)
            noOfClasses += 1;
        }
      });

      return (
        <Table.Row>
          <Table.Cell colSpan="10" textAlign="right">
            <b>Total class taught</b> : {noOfClasses}
          </Table.Cell>
        </Table.Row>
      );
    };

    const renderAttendanceList = () => {
      return [
        <div ref={this.myRef}>
          <Button onClick={this.generatePDF}>Generate PDF</Button>
          <Table
            unstackable
            key="all-attendance"
            id="attendanceTable"
            ref="attendanceTable"
          >
            {renderHeaderRow()}
            {attendance_teachers.map(key => {
              const attendances = key[1];
              return [
                <Table.Body>
                  {renderAttendanceRows(attendances)}
                  {renderTotalLessonTaught(attendances)}
                </Table.Body>
              ];
            })}
          </Table>
        </div>
      ];
    };

    return renderAttendanceList();
  }
}

AttendanceList.propTypes = {
  attendances: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

const mapStateToProps = ({ attendance_teachers }) => {
  return {
    attendance_teachers
  };
};

export default connect(
  mapStateToProps,
  ATTENDANCES
)(AttendanceList);
