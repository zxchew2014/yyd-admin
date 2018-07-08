import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { ScaleLoader } from "react-spinners";
import _ from "lodash";
import TeacherList from "./teacher-list";
import * as branches from "../../../actions/branches";

class BranchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      branch: "",
      loading: true
    };
  }

  componentWillMount() {
    this.props.fetchBranches().then(this.setState({ loading: false }));
  }

  renderBranchDropDownList() {
    const { branches } = this.props;
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
          onChange={event => this.setState({ branch: event.target.value })}
          required
        >
          <option key="" defaultValue="" />
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return <Form>{FORM_FIELD_BRANCH()}</Form>;
  }

  render() {
    const { branch, loading } = this.state;

    return loading ? (
      <div>
        <ScaleLoader loading={loading} color={"#000000"} />
      </div>
    ) : (
      <div className="teacher-list-container">
        {this.renderBranchDropDownList()}
        <TeacherList id="teacher_list" branch={branch} />
        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ branches }) => {
  return {
    branches
  };
};

export default connect(
  mapStateToProps,
  branches
)(BranchList);
