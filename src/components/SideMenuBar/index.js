/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTONLIST } from '../../constants/SideBarConstants';
import { history } from '../../routes';
import RoleAssignment from '../../containers/RoleAssign';

const SideMenuBar = React.forwardRef((props, ref) => {
  const sideMenuBtnRefs = useRef(BUTTONLIST.map(() => React.createRef()));

  useEffect(() => {
    onRenderButtonHighter();
    console.log(show, 'state');
  },);
  const [show, setShow] = useState(false);
  // FUNCTION that Highlights the button based on url
  const onRenderButtonHighter = () => {
    sideMenuBtnRefs.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('sideMenu-btn-highlight');
    });
    BUTTONLIST.forEach((Button, index) => {
      if (show && Button.label === 'Role Assignment') {
        sideMenuBtnRefs.current[index].current.classList.add('sideMenu-btn-highlight');
      } else if (!show && (history.location.pathname).includes(`/${Button.address}`) && Button.address.length !== 0) {
        sideMenuBtnRefs.current[index].current.classList.add('sideMenu-btn-highlight');
      }
    });
  };

  // FUNCTION that Handles the button clicks
  const buttonClickHandler = (event, address, label) => {
    if (label !== 'Role Assignment') {
      history.push(`/${address}`);
      setShow(false);
    } else {
      setShow(true);
    }
    buttonHighlighter(event);
  };

  // FUNCTION that Highlights the button based on clicks
  const buttonHighlighter = (event) => {
    sideMenuBtnRefs.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('sideMenu-btn-highlight');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('sideMenu-btn-highlight');
  };

  const sideMenuBtns = BUTTONLIST.map(({
    id, label, icon, address,
  }, index) => (
    <div ref={sideMenuBtnRefs.current[index]} key={id} onClick={(event) => buttonClickHandler(event, address, label)} className="sideMenu-btn">
      <FontAwesomeIcon className="sideMenu-btn-icon" icon={icon} />
      <div className="sideMenu-btn-label">{label}</div>
    </div>
  ));
  
  return (
    <div ref={ref} className="sideMenu-main">
      <div className="sideMenu-logo">ESG</div>
      {sideMenuBtns}
      <RoleAssignment show={show} setShow={setShow} />
    </div>
  );
});

export default SideMenuBar;
