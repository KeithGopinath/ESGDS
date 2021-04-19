/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import { history } from '../../routes';

const Header = ({ sideBarRef }) => {
  const options = ['Super Admin', 'Employee', 'Analyst', 'Client', 'QA'];
  const defaultOption = options[0];
  const [sideBarMenuIcon, setSideBarMenuIcon] = useState(faBars);

  const buttonClicklogout = () => {
    alert("logout");
    history.push('/');
    sessionStorage.clear();
  };

  useEffect(() => {
    window.addEventListener('resize', sideMenuResponsive);

    // Clean-up Function
    return () => {
      window.removeEventListener('resize', sideMenuResponsive);
    };
  });

  // Function that remove class & change hamburger icon if width >= 541px
  const sideMenuResponsive = () => {
    if (window.innerWidth >= 768) {
      sideBarRef.current.classList.remove('sideMenu-main-responsive');
      setSideBarMenuIcon(faBars);
    }
  };

  // Function that handles Clicks from SideBarMenuIcon
  const sideBarMenuIconClickHandler = () => {
    const target = sideBarRef.current;
    if (target.classList.contains('sideMenu-main-responsive')) {
      target.classList.remove('sideMenu-main-responsive');
      setSideBarMenuIcon(faBars);
    } else {
      target.classList.add('sideMenu-main-responsive');
      setSideBarMenuIcon(faTimes);
    }
  };
  return (
    <div
      className="header-container"
    >
      <div className="header-content-zero content-head">
        <button className="btn btn-light button-logout" onClick={buttonClicklogout}>
          <FontAwesomeIcon className="signouticon" icon={faSignOutAlt} /><div className="logout-name">Logout</div>
        </button>
      </div>
      <div className="header-content-one content-head">
        <Dropdown controlClassName="drop-down-element" menuClassName="drop-down-menu" options={options} value={defaultOption} placeholder="Select an option" />
      </div>
      <div className="header-content-two content-head">
        <Avatar name="Foo Bar" size="38" round />
      </div>
      <div className="header-content-three content-head">
        <FontAwesomeIcon className="bellicon" icon={faBell} />
      </div>
      <div className="header-content-four content-head">
        <div className="head-link-element">Quick Links</div>
      </div>
      <div className="hamburger-start">
        <div className="hamburger-bars-icon" onClick={sideBarMenuIconClickHandler} >
          <FontAwesomeIcon icon={sideBarMenuIcon} />
        </div>
      </div>
    </div>
  );
};

export default Header;

