import React from 'react';
import {connect} from 'react-redux';
import {Table, Icon} from 'semantic-ui-react';
import {ScaleLoader} from 'react-spinners';
import _ from 'lodash';
import PropTypes from 'prop-types';
import * as TEACHERS from '../../../actions/teachers';


class TeacherList extends React.Component {
    constructor(props) {
        super(props);
        const {branch} = this.props;
        this.state = {
            branch: branch || "",
            loading: true
        };
    }

    componentDidMount() {
        const {branch, fetchAllTeachers, fetchTeachersByBranch} = this.props;

        if (branch.trim() === "")
            fetchAllTeachers().then(this.setState({loading: false}));
        else
            fetchTeachersByBranch(branch).then(
                this.setState({loading: false})
            );
    }

    componentDidUpdate(prevProps, prevState) {
        const {branch, fetchTeachersByBranch} = this.props;
        if (prevProps.branch !== branch) {
            fetchTeachersByBranch(branch).then(this.setState({loading: false}));
        }
    }

    removeTeacher = (teacher, branchName) => {
        const {removeTeacher} = this.props;
        removeTeacher(teacher, branchName);
        this.setState({
            branch: ''
        });
    };

    render() {
        const {branch} = this.props;
        const {loading} = this.state;
        let counter = 1;

        const renderHeaderRow = () => (
            <Table.Row>
                <Table.HeaderCell>S/N</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Branch</Table.HeaderCell>
                {branch !== '' ? (
                    <Table.HeaderCell colSpan="2" textAlign="center">
                        Actions
                    </Table.HeaderCell>
                ) : null}
            </Table.Row>
        );

        const renderTeacherRows = (branch, branchKey) =>
            Object.keys(branch).map(teacherKey => {
                const teacher = branch[teacherKey];
                return (
                    <Table.Row key={`${branchKey}-${teacherKey}`}>
                        <Table.Cell>{counter++}.</Table.Cell>
                        <Table.Cell>{teacher.Name}</Table.Cell>
                        <Table.Cell>{branchKey}</Table.Cell>
                        {this.props.branch !== ''
                            ? [
                                <Table.Cell selectable textAlign="center">
                                    <Icon name="edit" size="large" aria-label="Edit"/>
                                </Table.Cell>,
                                <Table.Cell
                                    selectable
                                    textAlign="center"
                                    onClick={() => this.removeTeacher(teacherKey, branchKey)}
                                >
                                    <Icon name="user delete" size="large" aria-label="Remove"/>
                                </Table.Cell>
                            ]
                            : null}
                    </Table.Row>
                );
            });

        const renderAllTeacherList = () => {
            const {teachers} = this.props;

            return (
                <Table unstackable key="all-teacher">
                    {Object.keys(teachers).map(branchKey => {
                        const branch = teachers[branchKey];
                        counter = 1;
                        return [
                            <Table.Header key={branchKey} fullWidth>
                                <Table.Row key={branchKey}>
                                    <Table.HeaderCell colSpan="3">
                                        {branchKey} - {_.size(branch)} teachers
                                    </Table.HeaderCell>
                                </Table.Row>
                                {renderHeaderRow()}
                            </Table.Header>,
                            <Table.Body>{renderTeacherRows(branch, branchKey)}</Table.Body>
                        ];
                    })}
                </Table>
            );
        };

        const renderTeachersByBranch = branch => {
            const {teachers} = this.props;
            return (
                <Table unstackable key="teacher-by-branch">
                    <Table.Header fullWidth>{renderHeaderRow()}</Table.Header>
                    <Table.Body>{renderTeacherRows(teachers, branch)}</Table.Body>
                </Table>
            );
        };

        return loading ? (
            <div>
                <ScaleLoader loading={loading} color='#000000'/>
            </div>
        ) : branch === '' ? (
            renderAllTeacherList()
        ) : (
            renderTeachersByBranch(branch)
        );
    }
}

TeacherList.propTypes = {
    branch: PropTypes.string
};

const mapStateToProps = ({teachers}) => ({
        teachers
    });

export default connect(mapStateToProps, TEACHERS)(TeacherList);
