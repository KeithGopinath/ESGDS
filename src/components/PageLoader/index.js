/* eslint-disable object-curly-newline */

import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './styles.scss';


const PageLoader = () => (

  <div className="Dot-loader ">
    <Loader
      type="ThreeDots"
      color="#00BFFF"
      secondaryColor="#00BFFF"
      // eslint-disable-next-line react/jsx-boolean-value
      visible={true}
    >
    </Loader>
  </div>

);
export default PageLoader;
