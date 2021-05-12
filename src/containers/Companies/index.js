import React, { useRef } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const Companies = () => {
  const sideBarRef = useRef();
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} title="Companies" />
          <div className="container-main">
            <div>Companies</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Companies;
