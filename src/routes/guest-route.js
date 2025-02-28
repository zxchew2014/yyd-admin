import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuestRoute = ({ user, component: Component, ...rest }) => (
  <Route
    key="guest-route"
    {...rest}
    render={props =>
      user === null ? (
        <Component {...props} />
      ) : (
        <Redirect
          key="redirect-from-guest-route"
          to={{ pathname: "/student", state: { from: props.location } }}
        />
      )
    }
  />
);

GuestRoute.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(GuestRoute);
