/*eslint-disable*/
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const UploadData = () => {
    const sideBarRef = useRef();
    return (
        <React.Fragment>
            <div className="main">
                <SideMenuBar ref={sideBarRef} />
                <div className="rightsidepane">
                    <Header title="Upload Data" />
                    <div className="container-main">
                        {/* content */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UploadData;


