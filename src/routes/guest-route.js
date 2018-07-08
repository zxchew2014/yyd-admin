import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        (JSON.stringify(user) === JSON.stringify({})) === true ? (
          <Component {...props} />
        ) : !user.emailVerified ? (
          <Redirect
            to={{
              pathname: "/attendance",
              state: { from: props.location }
            }}
          />
        ) : (
          // Back to login
          <Redirect
            to={{
              pathname: "/attendance",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.object
};

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps)(GuestRoute);
