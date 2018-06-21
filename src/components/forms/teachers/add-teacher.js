import React from 'react';
import { connect } from 'react-redux';
import * as teachers from '../../../actions/teacher';
import { Form, Input, Button, Icon } from 'semantic-ui-react';
import _ from 'lodash';

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacherName: '',
      branch: '',
      addFormVisible: false
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    const { teacherName, branch, addFormVisible } = this.state;
    const { addTeacher } = this.props;
    e.preventDefault();
    addTeacher({ Name: _.startCase(teacherName) }, branch);
    this.setState({
      teacherName: '',
      branch: '',
      addFormVisible: !addFormVisible
    });
  };

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { loading, branch } = this.state;

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
    const { addFormVisible, teacherName } = this.state;
    if (addFormVisible) {
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

          {JSON.stringify(this.state)}
          {this.renderBranchDropDownList()}
          <Button type="submit" primary>
            Add Teacher
          </Button>
        </Form>
      );
    }
    return null;
  };

  render() {
    const { addFormVisible } = this.state;
    return [
      <div>
        <Button
          onClick={() => this.setState({ addFormVisible: !addFormVisible })}
          basic
        >
          {addFormVisible ? (
            <i className="large material-icons">
              <Icon name="close" size="large" /> Close
            </i>
          ) : (
            <i className="large material-icons">
              <Icon name="add user" size="large" /> Add Teacher
            </i>
          )}
        </Button>
      </div>,
      this.renderAddForm()
    ];
  }
}

const mapStateToProps = ({ branches }) => {
  return {
    branches
  };
};

export default connect(mapStateToProps, teachers)(AddTeacher);
