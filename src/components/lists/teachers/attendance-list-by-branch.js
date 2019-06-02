import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";
import {
  DATEFORMAT_DAY_MMM_DD_YYYY,
  DATETME_DDMMYYYSLASH_HHMMSS,
  TIMEFORMAT_HHMMTT,
  COLOUR_BLACK,
  RELIEF_YES,
  RELIEF_NO,
  BRANCH_PUNGGOL
} from "../../../utils/common";

const moment = require("moment");
const JSPDF = require("jspdf");
require("jspdf-autotable");

class AttendanceListByBranch extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  generatePDF = () => {
    const { startDate, endDate, branch, batch } = this.props;
    const newPDF = new JSPDF("landscape", "pt");
    const res = newPDF.autoTableHtmlToJson(
      document.getElementById("attendanceTableByBranch")
    );
    let fileName = "";
    if (branch === BRANCH_PUNGGOL) {
      fileName = `YYD Education Center - ${branch} Batch ${batch} Teacher Attendance Report on ${startDate} to ${endDate}`;
    } else {
      fileName = `YYD Education Center - ${branch} Teacher Attendance Report on ${startDate} to ${endDate}`;
    }

    const header = function(data) {
      newPDF.setFontSize(14);
      newPDF.setTextColor(COLOUR_BLACK);
      newPDF.setFontStyle("normal");
      newPDF.text(fileName, data.settings.margin.left, 30);

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
    newPDF.save(`${fileName  }.pdf`);
  };

  render() {
    const { attendanceTeachers } = this.props;

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
        </Table.Row>
      </Table.Header>
    );

    const renderAttendanceRows = attendanceList =>
      attendanceList.map(attendance => (
        <Table.Row textAlign="center" key={attendance}>
          <Table.Cell>
            {(attendance.clockIn &&
              moment(attendance.clockIn, DATETME_DDMMYYYSLASH_HHMMSS).format(
                DATEFORMAT_DAY_MMM_DD_YYYY
              )) ||
              moment(attendance.clockOut, DATETME_DDMMYYYSLASH_HHMMSS).format(
                DATEFORMAT_DAY_MMM_DD_YYYY
              )}
          </Table.Cell>
          <Table.Cell>
            {(attendance.clockIn &&
              moment(attendance.clockIn, DATETME_DDMMYYYSLASH_HHMMSS).format(
                TIMEFORMAT_HHMMTT
              )) ||
              ""}
          </Table.Cell>
          <Table.Cell>
            {(attendance.clockOut &&
              moment(attendance.clockOut, DATETME_DDMMYYYSLASH_HHMMSS).format(
                TIMEFORMAT_HHMMTT
              )) ||
              ""}
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
          id="attendanceTableByBranch"
          ref="attendanceTableByBranch"
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

AttendanceListByBranch.propTypes = {
  attendances: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  branch: PropTypes.string,
  batch: PropTypes.string || ""
};

const mapStateToProps = ({ attendanceTeachers }) => ({
  attendanceTeachers
});

export default connect(mapStateToProps, {})(AttendanceListByBranch);
