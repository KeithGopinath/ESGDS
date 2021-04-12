/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTONLIST } from '../../constants/SideBarConstants';
import { history } from '../../routes';

const SideMenuBar = React.forwardRef((props, ref) => {
  const sideMenuBtnRefs = useRef(BUTTONLIST.map(() => React.createRef()));
  useEffect(() => {
    onRenderButtonHighter();
  });

  // FUNCTION that Highlights the button based on url
  const onRenderButtonHighter = () => {
    sideMenuBtnRefs.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('sideMenu-btn-highlight');
    });
    BUTTONLIST.forEach((Button, index) => {
      if (history.location.pathname === `/${Button.address}`) {
        sideMenuBtnRefs.current[index].current.classList.add('sideMenu-btn-highlight');
      }
    });
  };

  // FUNCTION that Handles the button clicks
  const buttonClickHandler = (event, address) => {
    history.push(`/${address}`);
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
    <div ref={sideMenuBtnRefs.current[index]} key={id} onClick={(event) => buttonClickHandler(event, address)} className="sideMenu-btn">
      <FontAwesomeIcon className="sideMenu-btn-icon" icon={icon} />
      <div className="sideMenu-btn-label">{label}</div>
    </div>
  ));
  return (
    <div ref={ref} className="sideMenu-main">
      <div className="sideMenu-logo">ESG</div>
      {sideMenuBtns}
    </div>
  );
});

export default SideMenuBar;
