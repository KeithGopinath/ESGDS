/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTONLIST } from '../../constants/SideBarConstants';
import { history } from '../../routes';

// import './sideMenuBar.css';

const SideMenuBar = () => {
  const sideMenuBtns = BUTTONLIST.map(({ id, label, icon }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div key={id} onClick={(event) => buttonClickHandler(event, label)} className="sideMenu-btn">
      {/* <img className="sideMenu-btn-icon" src={icon} alt="NF"></img> */}
      <FontAwesomeIcon className="sideMenu-btn-icon" icon={icon} />
      <div className="sideMenu-btn-label">{label}</div>
    </div>
  ));
  return (
    <div className="sideMenu-main">
      <div className="sideMenu-logo">ESG</div>
      {sideMenuBtns}
    </div>
  );
};

const buttonHighlighter = (event) => {
  const btnElements = document.querySelectorAll('.sideMenu-btn');
  btnElements.forEach((element) => {
    const btn = element;
    btn.classList.remove('sideMenu-btn-highlight');
  });
  const { currentTarget } = event;
  currentTarget.classList.add('sideMenu-btn-highlight');
};

const buttonClickHandler = (event, label) => {
  history.push(`/${label}`);
  buttonHighlighter(event);
};

export default SideMenuBar;
