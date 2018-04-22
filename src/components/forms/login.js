import React from 'react';
import firebase, { yydASAuth } from '../../firebase';
import PropTypes from 'prop-types';
import { FirebaseAuth } from 'react-firebaseui';
import dialogPolyfill from 'dialog-polyfill';

class LoginForm extends React.Component {
  uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: false
      }
    ],
    // Sets the `signedIn` state property to `true` once signed in.
    callbacks: {
      signInSuccess: () => {
        this.props.submit();
        return false; // Avoid redirects after sign-in.
      }
    }
  };

  componentDidMount() {
    window.dialogPolyfill = dialogPolyfill;
  }

  render() {
    return (
      <div>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={yydASAuth} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
