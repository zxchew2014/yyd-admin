import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";
import {
  DATETME_DDMMYYYSLASH_HHMMSS,
  COLOUR_BLACK,
  RELIEF_YES,
  RELIEF_NO,
  TEACHER_ATTENDANCE_REPORT,
  YYD_EDUCATION_CENTRE, FULL_TIMESTAMP
} from "../../../utils/common";

const moment = require("moment");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class AttendanceList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  generatePDF = () => {
    const { startDate, endDate } = this.props;
    const newPDF = new jsPDF("landscape", "pt");
    const res = newPDF.autoTableHtmlToJson(
      document.getElementById("attendanceTable")
    );
    const fileName = `${YYD_EDUCATION_CENTRE} - ${TEACHER_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;

    const header = function(data) {
      newPDF.setFontSize(14);
      newPDF.setTextColor(COLOUR_BLACK);
      newPDF.text(fileName, data.settings.margin.left, 30);

      let str = `Page ${data.pageCount}`;
      newPDF.setFontSize(10);
      newPDF.text(str, data.settings.margin.left, 585);

      newPDF.text(data.settings.margin.left + 130, 565, "1st Verify By");
      newPDF.text(data.settings.margin.left + 200, 565, "Signature:");
      newPDF.text(data.settings.margin.left + 200, 577, "Name:");
      newPDF.text(data.settings.margin.left + 200, 590, "Role:");

      newPDF.text(data.settings.margin.left + 430, 565, "2nd Verify By");
      newPDF.text(data.settings.margin.left + 500, 565, "Signature:");
      newPDF.text(data.settings.margin.left + 500, 577, "Name:");
      newPDF.text(data.settings.margin.left + 500, 590, "Role:");
    };

    const options = {
      styles: { fontSize: 8 },
      didDrawPage: header
    };

    newPDF.autoTable(res.columns, res.data, options);
    newPDF.save(`${fileName}.pdf`);
  };

  render() {
    const { attendanceTeachers } = this.props;

    const renderHeaderRow = () => (
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Subject</Table.HeaderCell>
          <Table.HeaderCell>Branch</Table.HeaderCell>
          <Table.HeaderCell>Batch</Table.HeaderCell>
          <Table.HeaderCell>Relief</Table.HeaderCell>
          <Table.HeaderCell>Primary</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    const renderAttendanceRows = attendanceList =>
      attendanceList.map(attendance => (
        <Table.Row textAlign="center" key={attendance}>
          <Table.Cell>
            {attendance.clockOut &&
              moment(attendance.clockOut, DATETME_DDMMYYYSLASH_HHMMSS).format(FULL_TIMESTAMP)}
          </Table.Cell>
          <Table.Cell>{attendance.teacher}</Table.Cell>
          <Table.Cell>{attendance.subject}</Table.Cell>
          <Table.Cell>{attendance.branch}</Table.Cell>
          <Table.Cell>
            {attendance.batch ? `Batch ${attendance.batch}` : "-"}
          </Table.Cell>
          <Table.Cell>{attendance.relief ? RELIEF_YES : RELIEF_NO}</Table.Cell>
          <Table.Cell>P{attendance.primary.join(", P")}</Table.Cell>
        </Table.Row>
      ));

    const renderTotalLessonTaught = attendanceList => {
      let noOfClasses = 0;
      attendanceList.forEach(attendance => {
        noOfClasses += attendance.primary.length;
      });

      return (
        <Table.Row>
          <Table.Cell colSpan="10" textAlign="right">
            <b>Total class taught</b> : {noOfClasses}
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
          {renderHeaderRow()}
          {attendanceTeachers.map(key => {
            const attendanceList = key[1];
            return [
              <Table.Body>
                {renderAttendanceRows(attendanceList)}
                {renderTotalLessonTaught(attendanceList)}
              </Table.Body>
            ];
          })}
        </Table>
      </div>
    ];

    return renderAttendanceList();
  }
}

AttendanceList.propTypes = {
  attendances: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string
};

const mapStateToProps = ({ attendanceTeachers }) => ({
  attendanceTeachers
});

export default connect(mapStateToProps, {})(AttendanceList);
