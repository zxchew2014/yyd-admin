import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as branches from '../../actions/branch';
import { ScaleLoader } from 'react-spinners';
import _ from 'lodash';

class BranchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  onChangeBranch = e => {
    this.props.getBranch(e.target.value);
  };

  componentWillMount() {
    this.props.fetchBranches().then(this.setState({ loading: false }));
  }

  renderBranchDropDownList() {
    const { branches } = this.props;
    const { loading } = this.state;

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
          onChange={this.onChangeBranch}
          required
        >
          <option key="" defaultValue="" />
          {BRANCH_OPTIONS}
        </select>
      </Form.Field>
    );

    return loading ? (
      <div>
        <ScaleLoader loading={loading} color={'#000000'} />
      </div>
    ) : (
      <Form>{FORM_FIELD_BRANCH()}</Form>
    );
  }

  render() {
    return [this.renderBranchDropDownList()];
  }
}

const mapStateToProps = ({ branches }) => {
  return {
    branches
  };
};

export default connect(mapStateToProps, branches)(BranchList);
