import React, { useRef } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const ManageUsers = () => {
  const sideBarRef = useRef();
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} />
          <div>ManageUsers</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageUsers;
