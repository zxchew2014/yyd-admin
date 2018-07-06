import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import InlineError from '../../utils/inline-error';
import { connect } from 'react-redux';

class RetrieveTeacherAttendanceForm extends React.Component {
  state = {
    data: {
      startDate: '',
      endDate: ''
    },
    loading: false,
    errors: {}
  };

  onChangeDate = event => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: new Date(event.target.value).toDateString()
      }
    });
  };

  validateDate = data => {
    const { startDate, endDate } = data;
    const errors = {};

    if (new Date(endDate) < new Date(startDate)) {
      errors.endDate = 'End Date is smaller than Start Date';
    }
    if (new Date(startDate) > new Date(endDate)) {
      errors.startDate = 'Start Date is greater than End Date';
    }

    return errors;
  };

  onSubmit = event => {
    const { submit } = this.props;
    const { data } = this.state;
    const errors = this.validateDate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      event.preventDefault();
      submit(data);
    } else {
      window.scrollTo(0, 0);
    }
  };

  render() {
    const { errors, loading } = this.state;

    const FORM_FIELD_START_DATE = () => (
      <Form.Field error={!!errors.startDate}>
        <label htmlFor="start-date">Start Date</label>
        <input
          id="start-date"
          ref="start-date"
          name="startDate"
          type="date"
          onChange={this.onChangeDate}
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
          name="endDate"
          type="date"
          onChange={this.onChangeDate}
          min={'2018-04-01'}
          required
        />
        {errors.endDate && <InlineError text={errors.endDate} />}
      </Form.Field>
    );

    return [
      <Form onSubmit={this.onSubmit} loading={loading}>
        {FORM_FIELD_START_DATE()}
        {FORM_FIELD_END_DATE()}
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
    ];
  }
}

RetrieveTeacherAttendanceForm.propTypes = {
  submit: PropTypes.func
};

const mapStateToProps = ({ branches }) => {
  return {
    branches
  };
};

export default connect(mapStateToProps, {})(RetrieveTeacherAttendanceForm);
