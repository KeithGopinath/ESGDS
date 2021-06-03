/* eslint-disable */
import React, { useRef } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const ValidationList = () => {
  const sideBarRef = useRef();
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="Validation List" />
          <div className="container-main">
            <div>Validation List</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ValidationList;
