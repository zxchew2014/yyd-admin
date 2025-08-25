import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Button } from "semantic-ui-react";
import {
  DATETME_DDMMYYYSLASH_HHMMSS,
  COLOUR_BLACK,
  RELIEF_YES,
  RELIEF_NO,
  BRANCH_PUNGGOL,
  TEACHER_ATTENDANCE_REPORT,
  YYD_EDUCATION_CENTRE,
  BATCH,
  FULL_TIMESTAMP
} from "../../../utils/common";

const moment = require("moment");
const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class AttendanceListByBranch extends React.Component {
  constructor(props) {
    super(props);
  }

  generatePDF = () => {
    const { startDate, endDate, branch, batch, level } = this.props;
    const newPDF = new jsPDF("landscape", "pt");
    let res;

    if (level === "Primary")
      res = newPDF.autoTableHtmlToJson(
        document.getElementById("attendanceTableByBranchPrimary")
      );
    else if (level === "Secondary")
      res = newPDF.autoTableHtmlToJson(
        document.getElementById("attendanceTableByBranchSecondary")
      );

    let fileName = `${YYD_EDUCATION_CENTRE} - ${level} - ${branch} `;
    if (branch === BRANCH_PUNGGOL) {
      if (batch) {
        fileName += `${BATCH} ${batch} ${TEACHER_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;
      } else {
        fileName += `${TEACHER_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;
      }
    } else {
      fileName += `${TEACHER_ATTENDANCE_REPORT} on ${startDate} to ${endDate}`;
    }

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
    if(level === "Primary"){
      newPDF.autoTable({
        columns: res.columns,
        body: res.data,
        didDrawPage: header,
        columnStyles: {
          0: { cellWidth: 110},
          1: { cellWidth: 125},
          3: { cellWidth: 140}
        },
      });
    }
    else if (level === "Secondary")
    {
      newPDF.autoTable({
        columns: res.columns,
        body: res.data,
        didDrawPage: header,
        columnStyles: {
          0: { cellWidth: 110}
        },
      });
    }

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
    const { level } = this.props;

    attendanceList.forEach(attendance => {
      let branchCode = branchCodeMapping[attendance.branch];

      if (attendance.level === "Primary" && level === "Primary") {
        if (!result.hasOwnProperty(branchCode)) {
          result[branchCode] = 0;
        }
        result[branchCode] += attendance.primary.length;
      } else if (attendance.level === "Secondary" && level === "Secondary") {
        if (!result.hasOwnProperty(branchCode)) {
          result[branchCode] = { G1: 0, "G2/G3": 0 };
        }

        const { group } = attendance;
        if (group.includes("G2") || group.includes("G3")) {
          result[branchCode]["G2/G3"]++;
        }
        if (group.includes("G1")) result[branchCode]["G1"]++;
      }
    });

    return result;
  };

  render() {
    const { attendanceTeachers, branches, level } = this.props;
    const branchCodeMapping = this.retrieveBranchCode(branches);

    const renderHeaderRow = () => (
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
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

    const renderSecondaryHeaderRow = () => (
      <Table.Header fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
          <Table.HeaderCell>Phone User</Table.HeaderCell>
          <Table.HeaderCell>Phone Number</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Subject</Table.HeaderCell>
          <Table.HeaderCell>Branch</Table.HeaderCell>
          <Table.HeaderCell>Batch</Table.HeaderCell>
          <Table.HeaderCell>Relief</Table.HeaderCell>
          <Table.HeaderCell>Secondary</Table.HeaderCell>
          <Table.HeaderCell>Group</Table.HeaderCell>
          <Table.HeaderCell>Remarks</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );

    const renderPrimaryAttendanceRows = attendanceList =>
      attendanceList.map(
        attendance =>
          attendance.level === "Primary" && (
            <Table.Row textAlign="center" key={attendance.id}>
              <Table.Cell collapsing>
                {attendance.clockOut &&
                  moment(
                    attendance.clockOut,
                    DATETME_DDMMYYYSLASH_HHMMSS
                  ).format(FULL_TIMESTAMP)}
              </Table.Cell>
              <Table.Cell>{attendance.phoneUser || ""} </Table.Cell>
              <Table.Cell>{attendance.phoneNumber || ""}</Table.Cell>
              <Table.Cell>{attendance.teacher}</Table.Cell>
              <Table.Cell>{attendance.subject}</Table.Cell>
              <Table.Cell>{attendance.branch}</Table.Cell>
              <Table.Cell>
                {attendance.batch ? `Batch ${attendance.batch}` : "-"}
              </Table.Cell>
              <Table.Cell>
                {attendance.relief ? RELIEF_YES : RELIEF_NO}
              </Table.Cell>
              <Table.Cell>P{attendance.primary.join(", P")}</Table.Cell>
              <Table.Cell>{attendance.feedback || ""}</Table.Cell>
            </Table.Row>
          )
      );

    const renderSecondaryAttendanceRows = attendanceList =>
      attendanceList.map(
        attendance =>
          attendance.level === "Secondary" && (
            <Table.Row textAlign="center" key={attendance.id}>
              <Table.Cell>
                {attendance.clockOut &&
                  moment(
                    attendance.clockOut,
                    DATETME_DDMMYYYSLASH_HHMMSS
                  ).format(FULL_TIMESTAMP)}
              </Table.Cell>
              <Table.Cell>{attendance.phoneUser || ""} </Table.Cell>
              <Table.Cell>{attendance.phoneNumber || ""}</Table.Cell>
              <Table.Cell>{attendance.teacher}</Table.Cell>
              <Table.Cell>{attendance.subject}</Table.Cell>
              <Table.Cell>{attendance.branch}</Table.Cell>
              <Table.Cell>
                {attendance.batch ? `Batch ${attendance.batch}` : "-"}
              </Table.Cell>
              <Table.Cell>
                {attendance.relief ? RELIEF_YES : RELIEF_NO}
              </Table.Cell>
              <Table.Cell>Sec {attendance.secondary}</Table.Cell>
              <Table.Cell>{attendance.group.join(", ")}</Table.Cell>
              <Table.Cell>{attendance.feedback || ""}</Table.Cell>
            </Table.Row>
          )
      );

    const renderTotalLessonTaught = (attendanceList, mBranches) => {
      let noOfClasses = 0;
      let noOfClassInMultipleBranchesLength = Object.keys(mBranches).length;
      let firstKey = Object.keys(mBranches)[0];
      let lastKey = Object.keys(mBranches)[
        noOfClassInMultipleBranchesLength - 1
      ];

      attendanceList.forEach(attendance => {
        if (attendance.level === "Primary" && level === "Primary") {
          noOfClasses += attendance.primary.length;
        }
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

      return (
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
      );
    };

    const renderSecondaryTotalLessonTaught = (attendanceList, mBranches) => {
      if (Object.entries(mBranches).length > 0) {
        let noOfClasses = 0;
        let noOfClassInMultipleBranchesLength = Object.keys(mBranches).length;
        let firstKey = Object.keys(mBranches)[0];

        let noOfClassG1 = 0;
        let noOfClassG2G3 = 0;

        attendanceList.forEach(attendance => {
          const { group } = attendance;
          if (attendance.level === "Secondary") {
            if (group.includes("G2") || group.includes("G3")) {
              noOfClassG2G3++;
              noOfClasses++;
            }
            if (group.includes("G1")) {
              noOfClasses++;
              noOfClassG1++;
            }
          }
        });

        let branchStr = "";
        if (noOfClassInMultipleBranchesLength >= 1) {
          Object.keys(mBranches).map(branchCode => {
            const branch = mBranches[branchCode];
            branchStr += branchCode + ": ";
            Object.keys(branch).map(groupId => {
              const noOfGroup = branch[groupId];
              if (noOfGroup > 0) {
                branchStr += groupId + " : " + noOfGroup + ", ";
              }
            });
            //IN FUTURE IF THERE IS MULTI-BRANCH THEN WILL REQUIRE TO NEXT LINE IT
          });
        }
        branchStr = branchStr.substring(0, branchStr.length - 2);

        return (
          <Table.Row>
            <Table.Cell colSpan="12" textAlign="right">
              <b>
                Total class taught{" "}
                {noOfClassInMultipleBranchesLength >= 1 && `at ${firstKey}`}
              </b>{" "}
              : {noOfClasses}
              {noOfClasses !== noOfClassG1 &&
                noOfClasses !== noOfClassG2G3 && [
                  <br />,
                  <div>{branchStr}</div>
                ]}
            </Table.Cell>
          </Table.Row>
        );
      }
      return null;
    };

    const renderAttendanceList = () => [
      <div key="teacher-attendance-list">
        <Button onClick={this.generatePDF}>Generate PDF</Button>
        {level === "Primary" ? (
          <Table
            unstackable
            key="all-attendance-primary"
            id="attendanceTableByBranchPrimary"
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
                  {renderPrimaryAttendanceRows(attendanceList)}
                  {renderTotalLessonTaught(
                    attendanceList,
                    noOfClassInMultipleBranches
                  )}
                </Table.Body>
              ];
            })}
          </Table>
        ) : (
          <Table
            unstackable
            key="all-attendance-secondary"
            id="attendanceTableByBranchSecondary"
          >
            {renderSecondaryHeaderRow()}
            {attendanceTeachers.map(key => {
              const attendanceList = key[1];

              const noOfClassInMultipleBranches = this.retrieveNoOfClass(
                attendanceList,
                branchCodeMapping
              );
              return [
                <Table.Body key={key[0]}>
                  {renderSecondaryAttendanceRows(attendanceList)}
                  {renderSecondaryTotalLessonTaught(
                    attendanceList,
                    noOfClassInMultipleBranches
                  )}
                </Table.Body>
              ];
            })}
          </Table>
        )}
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
  batch: PropTypes.string || "",
  level: PropTypes.string
};

const mapStateToProps = ({ attendanceTeachers, branches }) => ({
  attendanceTeachers,
  branches
});

export default connect(mapStateToProps, {})(AttendanceListByBranch);
