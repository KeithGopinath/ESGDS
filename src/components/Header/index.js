/*eslint-disable*/
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { history } from '../../routes';
import NotificationPanel from '../../containers/NotificationPanel';
import { Button } from 'react-bootstrap';
import RoleOnboard from '../../containers/RoleOnboard';
// import Avatar from 'react-avatar';
// import Dropdown from 'react-dropdown';

const Header = ({ title, show }) => {
  const [showOnboard, setShowOnboard] = useState(false);
  // const options = ['Super Admin', 'Employee', 'Analyst', 'Client', 'QA'];
  // const defaultOption = options[0];

  const buttonClicklogout = () => {
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
      <div className="header-content-zero content-head">
        <button className="btn btn-light button-logout" onClick={buttonClicklogout}>
          <FontAwesomeIcon className="signouticon" icon={faSignOutAlt} /><div className="logout-name">Logout</div>
        </button>
      </div>
      <div className="header-content-three content-head">
        <NotificationPanel />
      </div>
      {/* <div className="header-content-one content-head">
        <Dropdown controlClassName="drop-down-element" menuClassName="drop-down-menu" options={options} value={defaultOption} placeholder="Select an option" />
      </div> */}
      {/* <div className="header-content-two content-head">
        <Avatar name="Foo Bar" size="38" round />
      </div> */}
      {/* <div className="header-content-four content-head">
        <div className="head-link-element">Quick Links</div>
      </div> */}

      <div className="header-content-four content-head">
        {show ?
          <div className="users-back-label-onboardlink-container">
            <Button className="onboardlink-btn" onClick={sendOnboard}>Send onboarding link
            </Button>
          </div>
          : null}
      </div>
      <div className="header-content-five content-head">
        <h4 className="header-title">{title}</h4>
      </div>
      <RoleOnboard showOnboardRoles={showOnboard} handleClose={handleClose} />
    </div>
  );
};

export default Header;
