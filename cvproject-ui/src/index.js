import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "react-oidc-context";
import { properties } from './configs/properties';

const oidcConfig = {
  // authority: "http://localhost:8080/realms/cvproject",
  // client_id: "react-auth",
  // redirect_uri: "http://localhost:3000",
  // client_secret: "oLTNsGCxnKA6mPxcmnQuEuHApBi5x9Jo",
  authority: properties.oidc.authority,
  client_id: properties.oidc.clientId,
  redirect_uri: properties.project.url,
  client_secret: properties.oidc.clientSecret,
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
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
