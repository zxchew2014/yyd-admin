import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as admin_actions from "../../../actions/admins";
import { Button, Form, Input } from "semantic-ui-react";

class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      emailAddress: "",
      isSuperAdmin: false,
      role: "Admin"
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { addAdmin, admins } = this.props;
    const { emailAddress } = this.state;

    let checkExisted = false;
    event.preventDefault();

    if (admins) {
      Object.keys(admins).forEach(key => {
        const currentAdmin = admins[key];
        const emailAddressUpper = currentAdmin.emailAddress.toUpperCase();

        if (emailAddressUpper === emailAddress.toUpperCase()) {
          checkExisted = true;
        }
      });
    }

    if (!checkExisted) {
      addAdmin(this.state);
    }

    this.props.onNext();
  };

  renderAddForm = () => {
    const { name, emailAddress } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field
          id="form-input-control-name"
          control={Input}
          value={name || ""}
          label="Name"
          placeholder="Name"
          name="name"
          onChange={this.handleInputChange}
          required
        />
        <Form.Field
          id="form-input-control-emailAddress"
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
          Add Admin
        </Button>
      </Form>
    );
  };

  render() {
    return <div className="add-admin-form">{this.renderAddForm()}</div>;
  }
}

AddAdmin.propTypes = {
  onNext: PropTypes.func.isRequired
};

const mapStateToProps = ({ admins }) => ({
  admins
});

export default connect(mapStateToProps, admin_actions)(AddAdmin);
