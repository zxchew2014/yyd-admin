import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as branches from "../../../actions/branches";
import { Button, Form, Input } from "semantic-ui-react";

class AddBranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Branch_Name: "",
      Active: true
    };
  }

  onSubmit = event => {
    const { addBranch, updateBranch, branches } = this.props;
    const { Branch_Name } = this.state;

    let existingBranch = null;
    let checkExisted = false;

    event.preventDefault();

    Object.keys(branches).forEach(key => {
      const currentBranch = branches[key];
      const currentBranchNameUpper = currentBranch.Branch_Name.toUpperCase();

      if (currentBranchNameUpper === Branch_Name.toUpperCase()) {
        existingBranch = currentBranch;
        const active = currentBranch.Active;
        if (!active) {
          checkExisted = true;
        }
      }
    });

    if (checkExisted) {
      existingBranch.Active = true;
      updateBranch(existingBranch);
    } else {
      if (existingBranch === null) {
        addBranch(this.state);
      }
    }

    this.props.navToBranchPage();
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderAddForm = () => {
    const { Branch_Name } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          id="form-input-control-branch-name"
          control={Input}
          value={Branch_Name || ""}
          label="Branch Name"
          placeholder="Branch Name"
          name="Branch_Name"
          onChange={this.handleInputChange}
          required
        />

        <Button type="submit" primary>
          Add Branch
        </Button>
      </Form>
    );
  };

  render() {
    return <div className="add-branch-form">{this.renderAddForm()}</div>;
  }
}

AddBranch.propTypes = {
  navToBranchPage: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, branches)(AddBranch);
