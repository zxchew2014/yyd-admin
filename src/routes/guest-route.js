import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const GuestRoute = ({user, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            user === null ? [
                    <Component {...props} />
                ]
                : user.emailVerified ? (
                    <Redirect
                        to={{
                            pathname: "/teacher",
                            state: {from: props.location}
                        }}
                    />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/verify_email",
                            state: {from: props.location}
                        }}
                    />
                )
        }
    />
);

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    user: PropTypes.object
};

const mapStateToProps = ({user}) => ({
    user
});

export default connect(mapStateToProps)(GuestRoute);
