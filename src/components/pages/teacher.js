import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BranchList from '../../components/forms/branch';
import TeacherList from '../forms/teachers/teacher-list';
import AddTeacher from '../forms/teachers/add-teacher';

class TeacherPage extends React.Component {
  render() {
    return (
      <div>
        <AddTeacher />
        <hr />
        <BranchList />
        <TeacherList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

TeacherPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {})(TeacherPage);
