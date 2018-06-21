import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { yydASAuth } from './configs/firebase';
import registerServiceWorker from './registerServiceWorker';
import { userLoggedIn } from './actions/auth';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

import App from './App';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
if (localStorage.user) {
  yydASAuth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch(userLoggedIn(user));
    }
  });
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
