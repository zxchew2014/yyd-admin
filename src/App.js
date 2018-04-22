import React from 'react';
import PropTypes from 'prop-types';
import LoginPage from './components/pages/login';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Route
          location={this.props.location}
          path="/"
          exact
          component={LoginPage}
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
