import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import _ from "lodash";
import {Form, Input, Button} from "semantic-ui-react";
import * as teachers from "../../../actions/teachers";

class TeacherForm extends React.Component {

}

const mapStateToProps = ({branches}) => ({
    branches
});

export default connect(mapStateToProps,teachers)(TeacherForm);