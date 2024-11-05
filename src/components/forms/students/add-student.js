import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";
import _ from "lodash";
import * as students from "../../../actions/students";
import {
  ALL_PRIMARY_LEVEL,
  ALL_BATCH,
  FOUNDATION_SUBJECT,
  EDUCATION_LEVEL,
  ALL_SECONDARY_LEVEL,
  SECONDARY_SUBJECT
} from "../../../utils/common";
import PropTypes from "prop-types";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";

class AddStudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Branch: "",
      level: "Primary",
      Primary: "",
      errors: {}
    };
  }

  onSubmit = event => {
    const { addStudent } = this.props;
    event.preventDefault();
    const {
      Batch,
      Foundation,
      level,
      english,
      math,
      science,
      errors
    } = this.state;
    if (Batch === "") {
      delete this.state.Batch;
    }
    if (Foundation === "") {
      delete this.state.Foundation;
    }

    if (this.state.errors) delete this.state.errors;
    if (level === "Secondary") {
      if (english || math || science) {
        addStudent(this.state);
        this.props.onNext();
      } else {
        // No Subject is selected
        errors.subject = "At least 1 subject need to be select";
        this.setState({ errors });
      }
    } else {
      addStudent(this.state);
      this.props.onNext();
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "level") {
      const { fetchBranchList } = this.props;
      fetchBranchList(value);

      if (value === "Primary") {
        delete this.state.Secondary;
        delete this.state.english;
        delete this.state.math;
        delete this.state.science;
        this.setState({ Primary: "" });
      } else {
        this.setState({
          Secondary: "",
          english: false,
          math: false,
          science: false
        });
        delete this.state.Primary;
        delete this.state.Foundation;
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  renderBatchDropDownList() {
    const { Batch } = this.state;

    const BATCH_OPTIONS = _.map(ALL_BATCH, value => (
      <option key={value} value={value}>
        BATCH {value}
      </option>
    ));

    const FORM_FIELD_BATCH = () => (
      <Form.Field>
        <label htmlFor="batch">Batch (Optional)</label>
        <select
          ref="batch"
          name="Batch"
          id="batch"
          onChange={this.handleInputChange}
          value={Batch || ""}
        >
          <option key={""} value={""} />
          {BATCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BATCH();
  }

  renderPrimaryDropDownList() {
    const primaryLevel = ALL_PRIMARY_LEVEL;
    const { Primary } = this.state;

    const PRIMARY_OPTIONS = _.map(primaryLevel, (value, key) => (
      <option key={key} value={value}>
        Primary {value}
      </option>
    ));

    const FORM_FIELD_PRIMARY = () => (
      <Form.Field required>
        <label htmlFor="primary">Primary</label>
        <select
          ref="primary"
          name="Primary"
          id="primary"
          onChange={this.handleInputChange}
          value={Primary || ""}
          required
        >
          <option key={Primary || ""} defaultValue={Primary || ""} />
          {PRIMARY_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_PRIMARY();
  }

  renderSecondaryDropDownList() {
    const secondaryLevel = ALL_SECONDARY_LEVEL;
    const { Secondary } = this.state;

    const SECONDARY_OPTIONS = _.map(secondaryLevel, (value, key) => (
      <option key={key} value={value}>
        Secondary {value}
      </option>
    ));

    const FORM_FIELD_SECONDARY = () => (
      <Form.Field required>
        <label htmlFor="secondary">Secondary</label>
        <select
          ref="secondary"
          name="Secondary"
          id="secondary"
          onChange={this.handleInputChange}
          value={Secondary || ""}
          required
        >
          <option key={Secondary || ""} defaultValue={Secondary || ""} />
          {SECONDARY_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_SECONDARY();
  }

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { Branch, level } = this.state;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches, level);

    const FORM_FIELD_BRANCH = () => (
      <Form.Field required>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="Branch"
          id="branch"
          onChange={this.handleInputChange}
          value={Branch || ""}
          required
        >
          <option key={Branch || ""} defaultValue={Branch || ""} />
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BRANCH();
  }

  renderFoundationDropDownList() {
    const foundationSubject = FOUNDATION_SUBJECT;
    const { Foundation } = this.state;

    const FOUNDATION_OPTIONS = _.map(foundationSubject, (value, key) => (
      <option key={key} value={value}>
        {value}
      </option>
    ));

    const FORM_FIELD_FOUNDATION = () => (
      <Form.Field>
        <label htmlFor="foundation">Foundation (Optional)</label>
        <select
          ref="foundation"
          name="Foundation"
          id="foundation"
          onChange={this.handleInputChange}
          value={Foundation || ""}
        >
          <option key={Foundation || ""} defaultValue={Foundation || ""} />
          {FOUNDATION_OPTIONS}
        </select>
      </Form.Field>
    );

    return FORM_FIELD_FOUNDATION();
  }

  getSubjectChecked = subject => {
    const { english, math, science } = this.state;
    if (subject === "English") return english;
    if (subject === "Math") return math;
    if (subject === "Science") return science;
  };

  handleCheckboxChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      if (value === "English") this.setState({ english: true });
      if (value === "Math") this.setState({ math: true });
      if (value === "Science") this.setState({ science: true });
    } else {
      if (value === "English") this.setState({ english: false });
      if (value === "Math") this.setState({ math: false });
      if (value === "Science") this.setState({ science: false });
    }
  };

  renderAddForm = () => {
    const { Name, level, errors } = this.state;
    const FORM_FIELD_LEVEL = () => (
      <Form.Field required>
        <label htmlFor="Level">Level</label>
        <Form.Group>{LEVEL_RADIOBOX_FIELDS}</Form.Group>
      </Form.Field>
    );

    const LEVEL_RADIOBOX_FIELDS = EDUCATION_LEVEL.map(l => (
      <Form.Field
        key={l}
        label={l}
        control="input"
        type="radio"
        name="level"
        value={l}
        checked={level === l}
        onChange={this.handleInputChange}
      />
    ));

    const FORM_FIELD_SUBJECT = () => (
      <Form.Field error={!!errors.subject} required>
        <label htmlFor="Subjects">Subjects</label>
        <Form.Group>{SECONDARY_SUBJECT_CHECKBOX_FIELDS}</Form.Group>
      </Form.Field>
    );

    const SECONDARY_SUBJECT_CHECKBOX_FIELDS = SECONDARY_SUBJECT.map(subject => (
      <Form.Field
        key={subject}
        label={subject}
        control="input"
        type="checkbox"
        name={subject}
        value={subject}
        checked={this.getSubjectChecked(subject)}
        onChange={this.handleCheckboxChange}
      />
    ));

    return (
      <Form onSubmit={this.onSubmit}>
        <Button
          secondary
          fluid
          icon="left arrow"
          labelPosition="left"
          content="Back"
          onClick={() => this.props.onNext()}
        />
        <br />

        <Form.Field
          id="form-input-control-name"
          control={Input}
          value={Name || ""}
          label="Full Name"
          placeholder="Full Name"
          name="Name"
          onChange={this.handleInputChange}
          required
        />
        {FORM_FIELD_LEVEL()}
        {this.renderBranchDropDownList()}
        {this.renderBatchDropDownList()}
        {level === "Primary" && [
          this.renderPrimaryDropDownList(),
          this.renderFoundationDropDownList()
        ]}

        {level === "Secondary" && [
          this.renderSecondaryDropDownList(),
          FORM_FIELD_SUBJECT()
        ]}

        <Button
          type="submit"
          primary
          fluid
          icon="right arrow"
          labelPosition="right"
          content={[
            level === "Primary" && "Add Student",
            level === "Secondary" && "Add Alumni (Secondary)"
          ]}
        />
      </Form>
    );
  };

  render() {
    return [<div className="add-student-form">{this.renderAddForm()}</div>];
  }
}

AddStudentForm.propTypes = {
  onNext: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({ branches });

export default connect(mapStateToProps, students)(AddStudentForm);
