import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as admins from "../../../actions/admins";
import {Button, Form, Input} from "semantic-ui-react";

class EditAdmin extends React.Component {
  constructor(props) {
    super(props);
    const {editAdmin} = this.props;
    this.state = {
      ...editAdmin
    };
  }

  onSubmit = event => {
    const {updateAdmin} = this.props;
    event.preventDefault();
    updateAdmin(this.state);
    this.props.onBack();
  };

  handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  renderEditForm = () => {
    const {name, emailAddress} = this.state;
    return (
        <Form onSubmit={this.onSubmit}>
          <Form.Field
              id="form-input-control-name"
              control={Input}
              value={name || ""}
              label="Full Name"
              placeholder="Full Name"
              name="name"
              onChange={this.handleInputChange}
              required
          />

          <Form.Field
              id="form-input-control-email"
              control={Input}
              value={emailAddress || ""}
              label="Email Address"
              placeholder="Email Address"
              name="emailAddress"
              onChange={this.handleInputChange}
              type="email"
              required
          />

          <Button type="submit" primary>
            Update Admin
          </Button>
        </Form>
    );
  };

  render() {
    return [<div className="edit-admin-form">{this.renderEditForm()}</div>];
  }
}

EditAdmin.propTypes = {
  onBack: PropTypes.func.isRequired
};

const mapStateToProps = ({editAdmin}) => ({editAdmin});

export default connect(mapStateToProps, admins)(EditAdmin);
