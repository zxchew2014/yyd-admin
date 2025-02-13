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
  BRANCH_PUNGGOL,
  TEACHER_ATTENDANCE_REPORT,
  YYD_EDUCATION_CENTRE,
  BATCH
} from "../../../utils/common";

const moment = require("moment");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class AttendanceListByBranch extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  generatePDF = () => {
    const { startDate, endDate, branch, batch } = this.props;
    const newPDF = new jsPDF("landscape", "pt");
    const res = newPDF.autoTableHtmlToJson(
      document.getElementById("attendanceTableByBranch")
    );
    let fileName = "";
    if (branch === BRANCH_PUNGGOL) {
      if (batch) {
        fileName = `${YYD_EDUCATION_CENTRE} - ${branch} ${BATCH} ${batch} ${TEACHER_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;
      } else {
        fileName = `${YYD_EDUCATION_CENTRE} - ${branch} ${TEACHER_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;
      }
    } else {
      fileName = `${YYD_EDUCATION_CENTRE} - ${branch} ${TEACHER_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;
    }

    const header = function(data) {
      newPDF.setFontSize(14);
      newPDF.setTextColor(COLOUR_BLACK);
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

  retrieveBranchCode = branches => {
    const branchCodeMap = {};
    branches.forEach(branch => {
      let branchCode = branch.branch_code
        ? branch.branch_code
        : branch.Branch_Name;
      branchCodeMap[branch.Branch_Name] = branchCode.trim();
    });
    return branchCodeMap;
  };

  retrieveNoOfClass = (attendanceList, branchCodeMapping) => {
    const result = {};

    attendanceList.forEach(attendance => {
      let branchCode = branchCodeMapping[attendance.branch];
      if (!result.hasOwnProperty(branchCode)) {
        result[branchCode] = 0;
      }
      result[branchCode] += attendance.primary.length;
    });

    return result;
  };

  render() {
    const { attendanceTeachers, branches } = this.props;
    const branchCodeMapping = this.retrieveBranchCode(branches);

    const renderHeaderRow = () => (
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Clock Out</Table.HeaderCell>
          <Table.HeaderCell>Phone User</Table.HeaderCell>
          <Table.HeaderCell>Phone Number</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Subject</Table.HeaderCell>
          <Table.HeaderCell>Branch</Table.HeaderCell>
          <Table.HeaderCell>Batch</Table.HeaderCell>
          <Table.HeaderCell>Relief</Table.HeaderCell>
          <Table.HeaderCell>Primary</Table.HeaderCell>
          <Table.HeaderCell>Remarks</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    const renderAttendanceRows = attendanceList =>
      attendanceList.map(attendance => (
        <Table.Row textAlign="center" key={attendance.id}>
          <Table.Cell>
            {attendance.clockOut &&
              moment(attendance.clockOut, DATETME_DDMMYYYSLASH_HHMMSS).format(
                DATEFORMAT_DAY_MMM_DD_YYYY
              )}
          </Table.Cell>
          <Table.Cell>
            {(attendance.clockOut &&
              moment(attendance.clockOut, DATETME_DDMMYYYSLASH_HHMMSS).format(
                TIMEFORMAT_HHMMTT
              )) ||
              ""}
          </Table.Cell>
          <Table.Cell>{attendance.phoneUser || ""} </Table.Cell>
          <Table.Cell>{attendance.phoneNumber || ""}</Table.Cell>
          <Table.Cell>{attendance.teacher}</Table.Cell>
          <Table.Cell>{attendance.subject}</Table.Cell>
          <Table.Cell>{attendance.branch}</Table.Cell>
          <Table.Cell>
            {attendance.batch ? `Batch ${attendance.batch}` : "-"}
          </Table.Cell>
          <Table.Cell>{attendance.relief ? RELIEF_YES : RELIEF_NO}</Table.Cell>
          <Table.Cell>P{attendance.primary.join(", P")}</Table.Cell>
          <Table.Cell>{attendance.feedback || ""}</Table.Cell>
        </Table.Row>
      ));

    const renderTotalLessonTaught = (attendanceList, mBranches) => {
      let noOfClasses = 0;
      let noOfClassInMultipleBranchesLength = Object.keys(mBranches).length;
      let firstKey = Object.keys(mBranches)[0];
      let lastKey = Object.keys(mBranches)[
        noOfClassInMultipleBranchesLength - 1
      ];

      attendanceList.forEach(attendance => {
        noOfClasses += attendance.primary.length;
      });

      let branchStr = "";
      if (noOfClassInMultipleBranchesLength > 1) {
        Object.entries(mBranches).map(entry => {
          branchStr += entry[0] + " : " + entry[1];
          if (lastKey !== entry[0]) {
            branchStr += ", ";
          }
        });
      }

      return [
        <Table.Row>
          <Table.Cell colSpan="11" textAlign="right">
            <b>
              Total class taught{" "}
              {noOfClassInMultipleBranchesLength === 1 && `at ${firstKey}`}
            </b>{" "}
            : {noOfClasses}
            {noOfClassInMultipleBranchesLength > 1 && [
              <br />,
              <div>{branchStr}</div>
            ]}
          </Table.Cell>
        </Table.Row>
      ];
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
            const noOfClassInMultipleBranches = this.retrieveNoOfClass(
              attendanceList,
              branchCodeMapping
            );

            return [
              <Table.Body key={key[0]}>
                {renderAttendanceRows(attendanceList)}
                {renderTotalLessonTaught(
                  attendanceList,
                  noOfClassInMultipleBranches
                )}
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

const mapStateToProps = ({ attendanceTeachers, branches }) => ({
  attendanceTeachers,
  branches
});

export default connect(mapStateToProps, {})(AttendanceListByBranch);
