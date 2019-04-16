import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";
import _ from "lodash";
import * as students from "../../../actions/students";

class StudentForm extends React.Component {

}

const mapStateToProps = ({ branches }) => ({ branches });

export default connect( mapStateToProps, students)(StudentForm);