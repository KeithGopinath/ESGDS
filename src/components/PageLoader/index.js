import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const PageLoader = () => (
  <div className="Dot-loader ">
    <Loader
      type="ThreeDots"
      color="#00BFFF"
      secondaryColor="#00BFFF"
      visible
    >
    </Loader>
  </div>
);

export default PageLoader;
