import React from 'react';
import PropTypes from 'prop-types';
import LoginPage from './components/pages/login';
import AttendancePage from './components/pages/attendance';
import TeacherPage from './components/pages/teacher';
import Header from './components/utils/header';
import UserRoute from './routes/user-route';
import GuestRoute from './routes/guest-route';
import Menu from './components/menus/index';

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Header />
        <Menu />

        <GuestRoute
          location={this.props.location}
          path="/"
          exact
          component={LoginPage}
        />

        <UserRoute
          location={this.props.location}
          path="/attendance"
          exact
          component={AttendancePage}
        />

        <UserRoute
          location={this.props.location}
          path="/teacher"
          exact
          component={TeacherPage}
        />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
