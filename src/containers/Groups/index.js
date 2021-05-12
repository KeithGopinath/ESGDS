/* eslint-disable object-curly-newline */
import React, { useRef } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';


const Groups = () => {
  const sideBarRef = useRef();
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} title="Groups" />
          <div className="container-main">
            <div>Groups</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Groups;
