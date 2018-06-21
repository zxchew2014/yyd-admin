import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../../utils/inline-error';

class RetrieveTeacherAttendanceForm extends React.Component {
  state = {
    data: {
      branch: '',
      startDate: ''
    },
    loading: false,
    errors: []
  };

  onChangeBranch = e => {
    this.setState({
      data: {
        branch: e.target.value,
        batch: e.target.value === 'Punggol' ? '1' : null
      }
    });
  };

  render() {
    const { branches } = this.props;
    const { data, errors, loading } = this.state;

    const BRANCH_OPTIONS = branches
      ? branches.map(branch => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))
      : null;

    const FORM_FIELD_BRANCH = () => (
      <Form.Field error={!!errors.branch}>
        <label htmlFor="branch">Branch</label>
        <select
          ref="branch"
          name="branch"
          id="branch"
          onChange={this.onChangeBranch}
          required
        >
          {data.branch ? (
            <option key={data.branch} value={data.branch} selected>
              {data.branch}
            </option>
          ) : (
            <option key="" value="" disabled selected>
              Select branch
            </option>
          )}
          {BRANCH_OPTIONS}
        </select>
        {errors.branch && <InlineError text={errors.branch} />}
      </Form.Field>
    );

    const FORM_FIELD_START_DATE = () => (
      <Form.Field error={!!errors.startDate}>
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          ref="start-date"
          name="start-date"
          type="date"
          min={'2018-04-01'}
          required
        />
        {errors.startDate && <InlineError text={errors.startDate} />}
      </Form.Field>
    );

    const FORM_FIELD_END_DATE = () => (
      <Form.Field error={!!errors.endDate}>
        <label htmlFor="start-date">End Date</label>
        <input
          id="end-date"
          ref="end-date"
          name="end-date"
          type="date"
          min={'2018-04-01'}
          required
        />
        {errors.endDate && <InlineError text={errors.endDate} />}
      </Form.Field>
    );

    return [
      <Form onSubmit={this.onSubmit} loading={loading} size="huge" key="huge">
        {FORM_FIELD_BRANCH()}
        {FORM_FIELD_START_DATE()}
        {FORM_FIELD_END_DATE()}
        <Button primary>Submit</Button>
      </Form>
    ];
  }
}

RetrieveTeacherAttendanceForm.propTypes = {
  branches: PropTypes.array.isRequired
};

export default RetrieveTeacherAttendanceForm;
