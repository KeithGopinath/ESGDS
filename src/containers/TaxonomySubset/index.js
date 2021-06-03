/* eslint-disable */
import React, { useRef } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const TaxonomySubset = () => {
  const sideBarRef = useRef();
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="Subsets" />
          <div className="container-main">
            <div>Subset</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaxonomySubset;
