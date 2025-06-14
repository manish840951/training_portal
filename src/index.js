import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
// import axios from 'axios';


// const axios = require('axios');

// const getData = async () => {
//   const response = await Axios.get("http://localhost:5000/getData");
//   setData(response.data);
// }

// fetch('http://localhost:8000/api/')
//   .then(response => response.json())
//   .then(data => console.log('Backend response:', data))
//   .catch(error => console.error('Connection error:', error));

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