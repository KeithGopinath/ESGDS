/* eslint-disable*/
import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const PageLoader = ({ load }) => (

  <Loader
    className={(load) || 'Dot-loader'}
    type="ThreeDots"
    color="#00BFFF"
    secondaryColor="#00BFFF"
    visible
  >
  </Loader>
);

export default PageLoader;
