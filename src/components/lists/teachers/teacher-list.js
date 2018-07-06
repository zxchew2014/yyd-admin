import React from 'react';
import { connect } from 'react-redux';
import * as teachers from '../../../actions/teachers';
import { Table, Icon } from 'semantic-ui-react';
import { ScaleLoader } from 'react-spinners';
import _ from 'lodash';
import PropTypes from 'prop-types';

class TeacherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: this.props.branch || '',
      loading: true
    };
  }

  componentDidMount() {
    const { fetchAllTeachers, fetchTeachersByBranch } = this.props;
    console.log(this.props.branch);
    if (this.props.branch === '')
      fetchAllTeachers().then(this.setState({ loading: false }));
    else
      fetchTeachersByBranch(this.props.branch).then(
        this.setState({ loading: false })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    const { branch, fetchTeachersByBranch } = this.props;
    if (prevProps.branch !== branch) {
      fetchTeachersByBranch(branch).then(this.setState({ loading: false }));
    }
  }

  removeTeacher = (teacher, branch_name) => {
    const { removeTeacher } = this.props;
    removeTeacher(teacher, branch_name);
    this.setState({
      branch: ''
    });
  };

  render() {
    const { branch } = this.props;
    const { loading } = this.state;
    var counter = 1;

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

    const renderTeacherRows = (branch, branch_key) =>
      Object.keys(branch).map(teacher_key => {
        const teacher = branch[teacher_key];
        return (
          <Table.Row key={`${branch_key}-${teacher_key}`}>
            <Table.Cell>{counter++}.</Table.Cell>
            <Table.Cell>{teacher.Name}</Table.Cell>
            <Table.Cell>{branch_key}</Table.Cell>
            {this.props.branch !== ''
              ? [
                  <Table.Cell selectable textAlign="center">
                    <Icon name="edit" size="large" aria-label="Edit" />
                  </Table.Cell>,
                  <Table.Cell
                    selectable
                    textAlign="center"
                    onClick={() => this.removeTeacher(teacher_key, branch_key)}
                  >
                    <Icon name="user delete" size="large" aria-label="Remove" />
                  </Table.Cell>
                ]
              : null}
          </Table.Row>
        );
      });

    const renderAllTeacherList = () => {
      const { teachers } = this.props;

      return (
        <Table unstackable key="all-teacher">
          {Object.keys(teachers).map(branch_key => {
            const branch = teachers[branch_key];
            counter = 1;
            return [
              <Table.Header key={branch_key} fullWidth>
                <Table.Row key={branch_key}>
                  <Table.HeaderCell colSpan="3">
                    {branch_key} - {_.size(branch)} teachers
                  </Table.HeaderCell>
                </Table.Row>
                {renderHeaderRow()}
              </Table.Header>,
              <Table.Body>{renderTeacherRows(branch, branch_key)}</Table.Body>
            ];
          })}
        </Table>
      );
    };

    const renderTeachersByBranch = branch => {
      const { teachers } = this.props;
      return (
        <Table unstackable key="teacher-by-branch">
          <Table.Header fullWidth>{renderHeaderRow()}</Table.Header>
          <Table.Body>{renderTeacherRows(teachers, branch)}</Table.Body>
        </Table>
      );
    };

    return loading ? (
      <div>
        <ScaleLoader loading={loading} color={'#000000'} />
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

const mapStateToProps = ({ teachers }) => {
  return {
    teachers
  };
};

export default connect(mapStateToProps, teachers)(TeacherList);
