/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routes';
import NotificationPanel from '../../containers/NotificationPanel';
import { Button } from 'react-bootstrap';
import RoleOnboard from '../../containers/RoleOnboard';
import Select from 'react-select';
import EsgdsLogo from '../../../assets/images/Logo-JPEG.jpg';
// import Avatar from 'react-avatar';

const Header = ({ title }) => {
  const [showOnboard, setShowOnboard] = useState(false);
  const [userRole, setUserRole] = useState({ value: '', label: '' });
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.login.login);
  const otpDetails = useSelector((state) => state.otp.otp);
  const roleChange = useSelector((state) => state.roleChange.roleChange);

  useEffect(() => {
    if (roleChange) {
      setUserRole(roleChange)
    }
    else if (otpDetails) {
      setUserRole(otpDetails.user.roleDetails.primaryRole)
    }
    else if (userDetails) {
      setUserRole(userDetails.user.roleDetails.primaryRole)
    }
    else {
      setUserRole({ value: 1, label: sessionStorage.role })
    }
  }, [roleChange, userDetails, otpDetails]);

  const onroleChange = (role) => {
    setUserRole(role);
    dispatch({ type: 'ROLE_CHANGE', role });
    sessionStorage.role = role.label;
    history.push('/dashboard');
  }

  const roleData = otpDetails ? otpDetails.user.roleDetails.role : userDetails && userDetails.user.roleDetails.role;
  const roleOptions = roleData && roleData.filter(val => val.value !== userRole.value);

  const buttonClicklogout = () => {
    dispatch({ type: 'RESET' });
    sessionStorage.clear();
    history.push('/');
  };

  const sendOnboard = () => {
    setShowOnboard(true);
  };

  const handleClose = () => {
    setShowOnboard(false);
  };

  return (
    <div className="header-container">
      <div className="d-flex flex-row-reverse">
        <div className="header-content-zero content-head">
          <FontAwesomeIcon className="bellicon" icon={faSignOutAlt} onClick={buttonClicklogout} />
        </div>
        <div className="header-content-three content-head">
          <NotificationPanel />
        </div>
        {(userRole.label == "Admin" || userRole.label == "GroupAdmin" || userRole.label == "QA" || userRole.label == "Analyst") &&
          <div className="header-content-one content-head">
            <Select options={roleOptions} onChange={onroleChange} value={userRole} />
          </div>
        }
        {(userRole.label == "SuperAdmin" || userRole.label == "Admin") &&
          <div className="header-content-four content-head">
            <div className="users-back-label-onboardlink-container">
              <Button className="onboardlink-btn" onClick={sendOnboard}>Send onboarding link
              </Button>
            </div>
          </div>
        }
      </div>
      {/* <div className="header-content-two content-head">
        <Avatar name="Foo Bar" size="38" round />
      </div> */}
      {/* <div className="header-content-four content-head">
        <div className="head-link-element">Quick Links</div>
      </div> */}
      <img className="esgds-logo" title="Environmental, Social, Governance Data & Solutions" alt="esgds logo" src={EsgdsLogo} />

      <div className="header-content-five content-head">
        <h4 className="header-title">{title}</h4>
      </div>
      <RoleOnboard showOnboardRoles={showOnboard} handleClose={handleClose} />
    </div>
  );
};

export default Header;
