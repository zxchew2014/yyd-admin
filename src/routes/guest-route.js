import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user === null ? (
        [<Component {...props} />]
      ) :  <Redirect
          to={{ pathname: "/student", state: { from: props.location } }}
      />
          /*
          user.emailVerified ? (
        <Redirect
          to={{ pathname: "/student", state: { from: props.location } }}
        />
      ) : (
        <Redirect
          to={{ pathname: "/verify_email", state: { from: props.location } }}
        />
      )
           */
    }
  />
);

GuestRoute.propTypes = {
  //component: PropTypes.object.isRequired,
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(GuestRoute);
