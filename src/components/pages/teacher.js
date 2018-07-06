import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TeacherList from '../lists/teachers/view-teacher-list';

class TeacherPage extends React.Component {
  render() {
    return (
      <div className="retrieve-teacher">
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
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {})(TeacherPage);
