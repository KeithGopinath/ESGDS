/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const UserProfile = () => {
  const sideBarRef = useRef();

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="User Profile" />
          <div className="container-main">
            <div>
                {/* content */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
