import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({ user, component: Component, ...rest }) => (
  <Route
    key="user-route"
    {...rest}
    render={props =>
      user !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          key="redirect-from-user-route"
          to={{ pathname: "/", state: { from: props.location } }}
        />
      )
    }
  />
);

UserRoute.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(UserRoute);
