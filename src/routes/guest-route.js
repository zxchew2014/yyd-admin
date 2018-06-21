import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (JSON.stringify(user) === JSON.stringify({})) === true ? (
        <Component {...props} />
      ) : !user.emailVerified ? (
        <Redirect to="/teacher" />
      ) : (
        //Back to login
        <Redirect to="/teacher" />
      )
    }
  />
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(GuestRoute);
