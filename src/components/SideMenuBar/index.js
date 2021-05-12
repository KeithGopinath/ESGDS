/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTONLIST } from '../../constants/SideBarConstants';
import { history } from '../../routes';
import RoleAssignment from '../../containers/RoleAssign';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const SideMenuBar = React.forwardRef((props, ref) => {
  const sideMenuBtnRefs = useRef(BUTTONLIST.map(() => React.createRef()));
  const [handler, setHandler] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    onRenderButtonHighter();
  });
  
// Buttonlist mapping
  const sideMenuBtns = BUTTONLIST.map(({
    id, label, icon, address,
  }, index) => (
    <div ref={sideMenuBtnRefs.current[index]} key={id} onClick={(event) => buttonClickHandler(event, address)}
      className={handler ? 'sideMenu-btn' : 'sideMenuMini-btn'}>
      <FontAwesomeIcon className={handler ? 'sideMenu-btn-icon' : 'sideMenuMini-btn-icon'} icon={icon} />
      {handler && <div className="sideMenu-btn-label">{label}</div>}
    </div>
  ));

  const buttonClickHandler = (event, address) => {
    if (address !== '') {
      history.push(`/${address}`);
      setShow(false);
    } else {
      setShow(true);
    }
    buttonHighlighter(event);
  };

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

  // FUNCTION that Highlights the button based on clicks
  const buttonHighlighter = (event) => {
    sideMenuBtnRefs.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('sideMenu-btn-highlight');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('sideMenu-btn-highlight');
  };

  useEffect(() => {
    window.addEventListener('resize', sideMenuResponsive);
    const target = ref.current;
    target.classList.remove('sideMenuMini-main-responsive');
    target.classList.add('sideMenu-main-responsive');
  }, []);


  // Function that replace class if width <= 768px
  const sideMenuResponsive = () => {
    const target = ref.current;
    if (window.innerWidth <= 768) {
      target.classList.remove('sideMenu-main-responsive');
      target.classList.add('sideMenuMini-main-responsive');
      setHandler(false);
    }
    else {
      target.classList.remove('sideMenuMini-main-responsive');
      target.classList.add('sideMenu-main-responsive');
      setHandler(true);
    }
  };

  const sideBarMenuHandler = () => {
    const target = ref.current;
    handler && target.classList.add('sideMenu-main-responsive');
    if (target.classList.contains('sideMenu-main-responsive')) {
      target.classList.remove('sideMenu-main-responsive');
      target.classList.add('sideMenuMini-main-responsive');
      setHandler(false)
    } else {
      target.classList.remove('sideMenuMini-main-responsive');
      target.classList.add('sideMenu-main-responsive');
      setHandler(true)
    }
  };

  return (
    <div ref={ref} className="sideMenu-main">
      <div className="hamburger-start">
        <div className="hamburger-bars-icon" onClick={sideBarMenuHandler} >
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      <div className="sideMenu-logo">ESG</div>
      {sideMenuBtns}
      <RoleAssignment show={show} setShow={setShow} />
    </div>
  );
});

export default SideMenuBar;
