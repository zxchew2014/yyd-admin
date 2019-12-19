import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

UserRoute.propTypes = {
  component: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(UserRoute);
