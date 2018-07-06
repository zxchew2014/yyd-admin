import React from 'react';
import { connect } from 'react-redux';
import * as teachers from '../../../actions/teachers';
import { Form, Input, Button } from 'semantic-ui-react';
import _ from 'lodash';

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherName: '',
      branch: ''
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { teacherName, branch } = this.state;
    const { addTeacher } = this.props;
    event.preventDefault();
    addTeacher({ Name: _.startCase(teacherName) }, branch);
    this.setState({
      teacherName: '',
      branch: ''
    });
  };

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { branch } = this.state;

    const BRANCH_OPTIONS = _.map(branches, (value, key) => (
      <option key={key} defaultValue={value}>
        {value}
      </option>
    ));

    const FORM_FIELD_BRANCH = () => (
      <Form.Field>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="branch"
          id="branch"
          onChange={this.handleInputChange}
          value={branch}
          required
        >
          <option key={branch} defaultValue={branch} />
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BRANCH();
  }

  renderAddForm = () => {
    const { teacherName } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          id="form-input-control-first-name"
          control={Input}
          value={teacherName}
          label="Full Name (Same as NRIC)"
          placeholder="Full Name"
          name="teacherName"
          onChange={this.handleInputChange}
          required
        />
        {this.renderBranchDropDownList()}
        <Button type="submit" primary>
          Add Teacher
        </Button>
      </Form>
    );
  };

  render() {
    return [<div className="add-teacher-form">{this.renderAddForm()}</div>];
  }
}

const mapStateToProps = ({ branches }) => {
  return {
    branches
  };
};

export default connect(mapStateToProps, teachers)(AddTeacher);
