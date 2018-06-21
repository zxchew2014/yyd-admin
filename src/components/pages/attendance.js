import React from 'react';
import PropTypes from 'prop-types';
import RetrieveTeacherAttendanceForm from '../forms/attendance/retrieve';
import { connect } from 'react-redux';
import { yydASDb } from '../../configs/firebase';

class AttendancePage extends React.Component {
  state = {
    branchList: null
  };

  componentDidMount() {
    this.retrieveBranchList();
  }

  retrieveBranchList = () => {
    const list = [];
    const BranchesRef = yydASDb.ref('Branches');
    BranchesRef.on('value', data => {
      const branches = [].concat(...Object.values(data.val()));
      branches.forEach(branch => {
        list.push(branch.Branch_Name);
      });
      list.sort();
      this.setState({ branchList: list });
    });
  };

  render() {
    return (
      <div>
        <h1>Select Teacher Attendance</h1>
        <RetrieveTeacherAttendanceForm
          currentUser={this.props.user}
          branches={this.state.branchList}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

AttendancePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {})(AttendancePage);
