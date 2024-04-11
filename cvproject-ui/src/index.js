import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "react-oidc-context";
import { Provider } from 'react-redux'

import store from '~/redux/store'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const oidcConfig = {
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_PROJECT_URL,
  client_secret: process.env.REACT_APP_OIDC_CLIENT_SECRET,
  onSigninCallback: () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider {...oidcConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
