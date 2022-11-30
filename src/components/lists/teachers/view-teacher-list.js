import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TeacherList from "./teacher-list";
import * as BRANCHES from "../../../actions/branches";
import { DDL_BRANCH_OPTIONS } from "../../utils/dropdownlist";
import {EDUCATION_LEVEL} from "../../../utils/common";

class ViewTeacherList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "",
      level: "Primary"
    };
  }

  UNSAFE_componentWillMount() {
    const { fetchBranchList } = this.props;
    const { level } = this.state;
    fetchBranchList(level);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "level") {
      const { fetchBranchList } = this.props;
      fetchBranchList(value);
      this.setState({ branch: "",  });
    }
    this.setState({ [name]: value });
  };


  renderLevelRadioboxList() {
    const { level } = this.state;
    const FORM_FIELD_LEVEL = () => (
        <Form.Field>
          <label htmlFor="Level">Teaching Level</label>
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

    return FORM_FIELD_LEVEL();
  }

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { branch , level} = this.state;

    const BRANCH_OPTIONS = DDL_BRANCH_OPTIONS(branches,level);

    const FORM_FIELD_BRANCH = () => (
      <Form.Field required>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="branch"
          id="branch"
          onChange={this.handleInputChange}
          value={branch || ""}
          required
        >
          <option key="" defaultValue="" />
          {BRANCH_OPTIONS}
          <option key="Relief" value="Relief">
            Relief Teacher - That is not belong to any branch
          </option>
        </select>
      </Form.Field>
    );

    return FORM_FIELD_BRANCH();
  }

  render() {
    const { branch, level } = this.state;

    return (
      <div className="teacher-list-container">
        <Form>
          {this.renderLevelRadioboxList()}
          {this.renderBranchDropDownList()}
        </Form>

        <TeacherList
          key="teacher-list"
          id="teacher_list"
          level={level}
          branch={branch}
          onEdit={this.props.onEdit}
          onDelete={this.props.onDelete}
          onCreate={this.props.onCreate}
        />
      </div>
    );
  }
}

ViewTeacherList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
};

const mapStateToProps = ({ branches }) => ({
  branches
});

export default connect(mapStateToProps, BRANCHES)(ViewTeacherList);
