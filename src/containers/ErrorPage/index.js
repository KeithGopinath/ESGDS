/* eslint-disable*/
import React from 'react';
import Logo from '../../../assets/images/logo.png';

const ErrorPage = () => (
  <div className="error-page">
    <img src={Logo} alt="logo" />
    <div>
      <p>We can't find the page you are looking for.</p>
      <p>Sorry for the inconvenience.</p>
    </div>
    <h3>
      HOME PAGE
    </h3>
  </div>
);

export default ErrorPage;