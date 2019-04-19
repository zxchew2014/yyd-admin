import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Table} from "semantic-ui-react";
import {
    ABSENT,
    BRANCH_PUNGGOL,
    DATEFORMAT_DAY_MMM_DD_YYYY,
    DATETME_DDMMYYYSLASH_HHMMSS,
    LATE, MC, PRESENT
} from "../../../utils/common";

const moment = require("moment");
const JSPDF = require("jspdf");
require("jspdf-autotable");

class GenerateStudentAttendanceList extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    generatePDF = () => {
        const {startDate, endDate, branch, batch} = this.props;
        const newPDF = new JSPDF("landscape", "pt");
        const res = newPDF.autoTableHtmlToJson(
            document.getElementById("attendanceTable")
        );
        let fileName = "";
        if (branch === BRANCH_PUNGGOL) {
            fileName = `YYD Education Center - ${branch} Batch ${batch} Student Attendance Report on ${startDate} to ${endDate}`;
        } else {
            fileName = `YYD Education Center - ${branch} Student Attendance Report on ${startDate} to ${endDate}`;
        }

        const header = function (data) {
            newPDF.setFontSize(14);
            newPDF.setTextColor("#000000");
            newPDF.setFontStyle("normal");
            newPDF.text(fileName, data.settings.margin.left, 30);

            let str = `Page ${data.pageCount}`;
            newPDF.setFontSize(10);
            newPDF.text(str, data.settings.margin.left, 585);
        };

        const options = {
            beforePageContent: header
        };

        newPDF.autoTable(res.columns, res.data, options);
        newPDF.save(`${fileName}.pdf`);
    };

    render() {
        const {attendanceStudents} = this.props;

        const renderHeaderRow = () => (
            <Table.Header fullWidth>
                <Table.Row textAlign="center">
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Subject</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Primary</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        );

        const renderAttendanceRows = attendanceList =>
            attendanceList.map(attendance => (
                <Table.Row textAlign="center" key={attendance.id}>
                    <Table.Cell>
                        {attendance.timestamp &&
                        moment(attendance.timestamp, DATETME_DDMMYYYSLASH_HHMMSS).format(
                            DATEFORMAT_DAY_MMM_DD_YYYY
                        )}
                    </Table.Cell>
                    <Table.Cell>{attendance.subject}</Table.Cell>
                    <Table.Cell>{attendance.studentName}</Table.Cell>
                    <Table.Cell>P{attendance.primary}</Table.Cell>
                    {(attendance.status === PRESENT ||
                        attendance.status === LATE) && (
                        <Table.Cell positive>{attendance.status}</Table.Cell>
                    )}

                    {attendance.status === ABSENT && (
                        <Table.Cell negative>{attendance.status}</Table.Cell>
                    )}

                    {attendance.status === MC && (
                        <Table.Cell warning>{attendance.status}</Table.Cell>
                    )}
                </Table.Row>
            ));

        const renderCalculateAttendancePercentage = attendanceList => {
            let noOfAbsent = 0.0;
            let studentName = "";
            attendanceList.forEach(attendance => {
                studentName = attendance.studentName;
                if (attendance.status === ABSENT) {
                    noOfAbsent += 1.0;
                }
            });

            const absentPercentage = parseFloat(
                (noOfAbsent / attendanceList.length) * 100.0
            ).toFixed(2);
            const actualPercentage = parseFloat(100.0 - absentPercentage).toFixed(2);

            return (
                <Table.Row>
                    <Table.Cell colSpan="5" textAlign="right">
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
                    {renderHeaderRow()}
                    {attendanceStudents.map(key => {
                        const attendanceList = key[1];
                        return [
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

const mapStateToProps = ({attendanceStudents}) => ({
    attendanceStudents
});

export default connect(mapStateToProps, {})(GenerateStudentAttendanceList);
