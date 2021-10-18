/*eslint-disable*/
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import PersonalDetails from '../../containers/Onboard/PersonalDetails';
import PageLoader from '../../components/PageLoader';

const UserView = (props) => {
  const sideBarRef = useRef();
  const userData = useSelector((state) => state.getUserById.userById);
  const loading = useSelector((state) => state.getUserById.isLoading);
  const userType = userData && userData.user.userType;
  const role = userType == 'Client Representative' ? 'client' : userType == 'Employee' ? 'employee' : 'company';
  const userDetails = userData && userData.user;
  const userTypes = props.location.userTypes && props.location.userTypes;

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="User View" />
          <div className="container-main">
            {loading ?
              <PageLoader /> :
              <PersonalDetails userId={userData} role={role} flag={true} userDetails={userDetails} userTypes={userTypes} />
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserView;


