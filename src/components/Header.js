import React from 'react';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './header.scss';

const Header = () => {
  const options = ['Super Admin', 'Employee', 'Analyst', 'Client', 'QA'];
  const defaultOption = options[0];
  return (
    <div
      className="header-container"
    >
      <div className="header-content-one">
        <Dropdown controlClassName="drop-down-element" menuClassName="drop-down-menu" options={options} value={defaultOption} placeholder="Select an option" />
      </div>
      <div className="header-content-two">
        <Avatar name="Foo Bar" size="38" round />
      </div>
      <div className="header-content-three">
        <FontAwesomeIcon className="bellicon" icon={faBell} style={{ fontSize: '26px', color: '#2199c8' }} />
      </div>
      <div className="header-content-zero">
        <div className="head-link-element">Quick Links</div>
      </div>
    </div>
  );
};

export default Header;

