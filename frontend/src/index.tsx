import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from './store/session';

const store = configureStore({});

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  let w = window as any;
  w.csrfFetch = csrfFetch;
  w.store = store;
  w.sessionActions = sessionActions;
}

function Root() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
