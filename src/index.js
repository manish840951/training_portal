import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Auth0Provider
  domain="dev-hi7wk41r2ps3p86c.us.auth0.com"
  clientId="itlXmyskZMuv2VNIViBG7MThAzsFvtie"
  authorizationParams={{
    redirect_uri: window.location.origin + '/callback',
  }}
  useRefreshTokens={true}
  cacheLocation="localstorage"
  onRedirectCallback={appState => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || window.location.pathname
    );
  }}
>
  <App />
</Auth0Provider>

);