import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index.js'
import { restoreCSRF } from './store/csrf'
import csrfFetch from './store/csrf'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
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

const renderApplication = () => { 
  ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('root')

);
}

const token = sessionStorage.getItem('X-CSRF-Token')
if (token === null) {
  restoreCSRF()
    .then(renderApplication)
} else {
    renderApplication();
}
