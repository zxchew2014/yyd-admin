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
  SECONDARY_GROUP
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
      chinese
    } = this.state;
    if (Batch === "") {
        delete this.state.Batch;
    }
    if (Foundation === "") {
        delete this.state.Foundation;
    }

    if (chinese === "") {
        delete this.state.chinese;
    }

    if (this.state.errors) delete this.state.errors;
    addStudent(this.state);
    this.props.onNext();
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
        delete this.state.chinese;
        this.setState({ Primary: "" });
      } else {
        this.setState({
          Secondary: "1",
          english: "G1",
          math: "G1",
          chinese: ""
        });
        delete this.state.Primary;
        delete this.state.Foundation;
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  handleInputSecondarySubjectChange = event => {
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

  renderSubjectGroupDropDownList() {
    const subjectGroup = SECONDARY_GROUP;
    const { english, math, chinese } = this.state;

    const GROUP_OPTIONS = _.map(subjectGroup, (value, key) => (
        <option key={key} value={value}>
            {value}
        </option>
    ));

    const FORM_FIELD_ENGLISH = () => (
        <Form.Field required>
          <label htmlFor="english">English</label>
          <select
              ref="english"
              name="english"
              id="english"
              onChange={this.handleInputSecondarySubjectChange}
              value={english || ""}
              required
          >
            <option key={english || ""} defaultValue={english || ""} />
            {GROUP_OPTIONS}
          </select>
        </Form.Field>
    );

    const FORM_FIELD_MATH = () => (
        <Form.Field required>
          <label htmlFor="math">Math</label>
          <select
              ref="math"
              name="math"
              id="math"
              onChange={this.handleInputSecondarySubjectChange}
              value={math || ""}
              required
          >
            <option key={math || ""} defaultValue={math || ""} />
            {GROUP_OPTIONS}
          </select>
        </Form.Field>
    );

    const FORM_FIELD_CHINESE = () => (
        <Form.Field>
          <label htmlFor="chinese">Chinese</label>
          <select
              ref="chinese"
              name="chinese"
              id="chinese"
              onChange={this.handleInputSecondarySubjectChange}
              value={chinese || ""}
          >
            <option key={chinese || ""} defaultValue={chinese || ""} />
            {GROUP_OPTIONS}
          </select>
        </Form.Field>
    );

    return [
      FORM_FIELD_ENGLISH(),
      FORM_FIELD_MATH(),
      FORM_FIELD_CHINESE(),
    ];
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


  renderAddForm = () => {
    const { Name, level } = this.state;
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
          {FORM_FIELD_LEVEL()}
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
        {this.renderBranchDropDownList()}
        {this.renderBatchDropDownList()}
        {level === "Primary" && [
          this.renderPrimaryDropDownList(),
          this.renderFoundationDropDownList()
        ]}

        {level === "Secondary" && [
          this.renderSecondaryDropDownList(),
          this.renderSubjectGroupDropDownList()
        ]}

        <Button
          type="submit"
          primary
          fluid
          icon="right arrow"
          labelPosition="right"
          content="Add Student"
        />
      </Form>
    );
  };

  render() {
    return (<div className="add-student-form">{this.renderAddForm()}</div>)
  }
}

AddStudentForm.propTypes = {
    onNext: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({ branches });

export default connect(mapStateToProps, students)(AddStudentForm);
