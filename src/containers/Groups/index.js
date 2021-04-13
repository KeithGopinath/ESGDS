/* eslint-disable object-curly-newline */
import React, { useRef } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import RoleAssignment from '../../components/RoleAssign';

const Groups = () => {
  const sideBarRef = useRef();
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} />
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', padding: '10px' }}><RoleAssignment /></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Groups;
