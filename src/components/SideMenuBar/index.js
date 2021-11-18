/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonList, TaxonomySubMenu, ValidationSubMenu, GroupsSubMenu, UsersSubMenu, TaskSubMenu, CalculationSubMenu, JsonGenerationSubMenu } from '../../constants/SideBarConstants';
import { history } from '../../routes';
import RoleAssignment from '../../containers/RoleAssign';
import { faBars, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { Scrollbars } from 'react-custom-scrollbars';

const SideMenuBar = React.forwardRef((props, ref) => {
  // checking user type and role
  const userDetails = useSelector((state) => state.login.login);
  const otpDetails = useSelector((state) => state.otp.otp);
  const roleChange = useSelector((state) => state.roleChange.roleChange);

  const role = (otpDetails && otpDetails.user.roleDetails.primaryRole.label) || (userDetails && userDetails.user && userDetails.user.roleDetails.primaryRole.label)
  const userRole = roleChange && roleChange.label || role || sessionStorage.role;

  const conditionedJsonGenerationSubMenu = userRole == 'Client Representative' ? JsonGenerationSubMenu : JsonGenerationSubMenu;
  const taxonomyBtnRefs = useRef(TaxonomySubMenu.map(() => React.createRef()));
  const validationBtnRefs = useRef(ValidationSubMenu.map(() => React.createRef()));
  const groupsBtnRefs = useRef(GroupsSubMenu.map(() => React.createRef()));
  const usersBtnRefs = useRef(UsersSubMenu.map(() => React.createRef()));
  const taskBtnRefs = useRef(TaskSubMenu.map(() => React.createRef()));
  const calculationBtnRefs = useRef(CalculationSubMenu.map(() => React.createRef()));
  const jsonBtnRefs = useRef(conditionedJsonGenerationSubMenu.map(() => React.createRef()));

  // Buttonlist modified based on roles
  const modifiedButtonList = ButtonList.filter(val => (
    userRole == 'QA' || userRole == 'Analyst' ? val.id == 0 || val.id == 4 || val.id == 8 :
      userRole == 'GroupAdmin' ? val.id == 0 || val.id == 4 || val.id == 7 || val.id == 10 || val.id == 11 :
        userRole == 'Company Representative' ? val.id == 4 || val.id == 8 :
        userRole == 'Client Representative' ? val.id == 4 || val.id == 8 || val.id == 10 :
          userRole == 'SuperAdmin' || userRole == 'Admin' ? val.id !== 4 && val.id !== 8 :
            val.id == 0 || val.id == 4))
    .map((data) => ({
      id: data.id,
      label: data.label,
      icon: data.icon,
      address: data.address,
    }))

  const sideMenuBtnRefs = useRef(modifiedButtonList.map(() => React.createRef()));

  const [handler, setHandler] = useState(true);
  const [show, setShow] = useState(false);
  const [showTaxonomySubMenu, setTaxonomySubMenu] = useState(false);
  const [showValidationSubMenu, setValidationSubMenu] = useState(false);
  const [showGroupsSubMenu, setGroupsSubMenu] = useState(false);
  const [showUsersSubMenu, setUsersSubMenu] = useState(false);
  const [showTaskSubMenu, setTaskSubMenu] = useState(false);
  const [showCalculationSubMenu, setCalculationSubMenu] = useState(false);
  const [showJsonSubMenu, setJsonSubMenu] = useState(false);

  useEffect(() => {
    onRenderButtonHighter();
  });

  useEffect(() => {
    const url = new URL(window.location.href)
    if (show) {
      setUsersSubMenu(true);
    } else if (url.pathname.includes('taxonomy')) {
      setTaxonomySubMenu(true);
    } else if (url.pathname.includes('validation')) {
      setValidationSubMenu(true);
    } else if (url.pathname.includes('group') || url.pathname.includes('pillar')) {
      setGroupsSubMenu(true);
    } else if (url.pathname.includes('users')) {
      setUsersSubMenu(true);
    } else if (url.pathname.includes('createtask') || url.pathname.includes('tasklist') || url.pathname.includes('create-controversy-task')) {
      setTaskSubMenu(true);
    } else if (url.pathname.includes('calculate')) {
      setCalculationSubMenu(true);
    } else if (url.pathname.includes('json')) {
      setJsonSubMenu(true);
    } else {
      setTaxonomySubMenu(false);
      setValidationSubMenu(false);
      setGroupsSubMenu(false);
      setUsersSubMenu(false);
      setTaskSubMenu(false);
      setCalculationSubMenu(false);
      setJsonSubMenu(false);
    }
    window.addEventListener('resize', sideMenuResponsive);
    const target = ref.current;
    target.classList.remove('sideMenuMini-main-responsive');
    target.classList.add('sideMenu-main-responsive');

  }, [show]);

  // Mapping of sideBar Menu and subMenu
  const sideMenuBtns = modifiedButtonList.map(({ id, label, icon, address, }, index) => {
    const subMenuShow = label == 'Taxonomy' ? showTaxonomySubMenu : label == 'Validation' ? showValidationSubMenu : label == 'Groups' ? showGroupsSubMenu : label == 'Users' ? showUsersSubMenu : label == 'Task' ? showTaskSubMenu : label == 'Calculations' ? showCalculationSubMenu : label == 'JSON Generation' ? showJsonSubMenu : false;
    const subMenuList = label == 'Taxonomy' ? TaxonomySubMenu : label == 'Validation' ? ValidationSubMenu : label == 'Groups' ? GroupsSubMenu : label == 'Users' ? UsersSubMenu : label == 'Task' ? TaskSubMenu : label == 'Calculations' ? CalculationSubMenu : label == 'JSON Generation' ? conditionedJsonGenerationSubMenu : false;
    const subMenuRef = label == 'Taxonomy' ? taxonomyBtnRefs : label == 'Validation' ? validationBtnRefs : label == 'Groups' ? groupsBtnRefs : label == 'Users' ? usersBtnRefs : label == 'Task' ? taskBtnRefs : label == 'Calculations' ? calculationBtnRefs : label == 'JSON Generation' ? jsonBtnRefs : false;

    return (
      <div>
        {id == 1 || id == 2 || id == 3 || id == 6 || id == 7 || id == 9 || id == 10 ?
          <div ref={sideMenuBtnRefs.current[index]} className={handler ? (subMenuShow ? 'submenu' : 'submenu-button') : (subMenuShow ? 'submenu-mini-button' : 'sideMenuMini-btn')}
            key={id} onClick={(event) => buttonClickHandler(event, address)}>
            <div className={handler ? 'sideMenu-btn' : 'sideMenuMini-btn'}>
              <FontAwesomeIcon className={handler ? 'sideMenu-btn-icon' : 'sideMenuMini-btn-icon'} icon={icon} />
              {handler && <div className="sideMenu-btn-label">{label}</div>}
              <FontAwesomeIcon className={handler ? 'sideMenu-btn-icon' : 'sideMenuMini-btn-icon'} icon={subMenuShow ? faCaretUp : faCaretDown} />
            </div>
            {subMenuShow ?
              <div>
                {subMenuShow && subMenuList.map(({ label, icon, address }, index) => {
                  return (
                    <div key={label} onClick={(event) => buttonClickHandler(event, address)} ref={subMenuRef.current[index]}
                      className={handler ? 'sideMenu-btn' : 'sideMenuMini-btn'}>
                      <FontAwesomeIcon className={handler ? 'sideMenu-btn-icon' : 'sideMenuMini-btn-icon'} icon={icon} />
                      {handler && <div className="sideMenu-btn-label">{label}</div>}
                    </div>
                  )
                })}
              </div>
              : null}
          </div>
          :
          <div ref={sideMenuBtnRefs.current[index]} key={id} onClick={(event) => buttonClickHandler(event, address)}
            className={handler ? 'sideMenu-btn' : 'sideMenuMini-btn'}>
            <FontAwesomeIcon className={handler ? 'sideMenu-btn-icon' : 'sideMenuMini-btn-icon'} icon={icon} />
            {handler && <div className="sideMenu-btn-label">{label}</div>}
          </div>
        }
      </div>
    )
  });

  const buttonClickHandler = (event, address) => {
    if (address == 'taxonomyhead') {
      setTaxonomySubMenu(!showTaxonomySubMenu);
    } else if (address == 'validationhead') {
      setValidationSubMenu(!showValidationSubMenu);
    } else if (address == 'groupshead') {
      setGroupsSubMenu(!showGroupsSubMenu);
    } else if (address == 'usershead') {
      setUsersSubMenu(!showUsersSubMenu)
    } else if (address == 'taskhead') {
      setTaskSubMenu(!showTaskSubMenu)
    } else if (address == 'calculationhead') {
      setCalculationSubMenu(!showCalculationSubMenu)
    } else if (address == 'jsonhead') {
      setJsonSubMenu(!showJsonSubMenu)
    } else if (address !== '') {
      history.push(`/${address}`);
    } else {
      setShow(true);
    }
  };

  // FUNCTION that Highlights the button based on url
  const onRenderButtonHighter = () => {
    const BtnRefs = showUsersSubMenu && show ? usersBtnRefs : showValidationSubMenu ? validationBtnRefs : showTaxonomySubMenu ? taxonomyBtnRefs : showUsersSubMenu ? usersBtnRefs : showGroupsSubMenu ? groupsBtnRefs : showTaskSubMenu ? taskBtnRefs : showCalculationSubMenu ? calculationBtnRefs : showJsonSubMenu ? jsonBtnRefs : sideMenuBtnRefs;
    const MenuButton = showUsersSubMenu && show ? UsersSubMenu : showValidationSubMenu ? ValidationSubMenu : showTaxonomySubMenu ? TaxonomySubMenu : showUsersSubMenu ? UsersSubMenu : showGroupsSubMenu ? GroupsSubMenu : showTaskSubMenu ? TaskSubMenu : showCalculationSubMenu ? CalculationSubMenu : showJsonSubMenu ? conditionedJsonGenerationSubMenu : modifiedButtonList;

    usersBtnRefs && usersBtnRefs.current.forEach((element) => {
      const btn = element.current;
      btn && btn.classList.remove('sideMenu-btn-highlight');
    });

    BtnRefs && BtnRefs.current.forEach((element) => {
      const btn = element.current;
      btn && btn.classList.remove('sideMenu-btn-highlight');
    });

    MenuButton && MenuButton.forEach((Button, index) => {
      if (show && Button.label === 'Role Assignment') {
        BtnRefs && BtnRefs.current[index].current.classList.add('sideMenu-btn-highlight');
      } else if (!show && (history.location.pathname) == (`/${Button.address}`) && Button.address.length !== 0) {
        BtnRefs && BtnRefs.current[index].current.classList.add('sideMenu-btn-highlight');
      }
    });
  };

  // Function that replace class if width <= 768px
  const sideMenuResponsive = () => {
    const target = ref.current;
    if (window.innerWidth <= 768) {
      target.classList.remove('sideMenu-main-responsive');
      target.classList.add('sideMenuMini-main-responsive');
      setHandler(false);
    }
    else {
      target && target.classList.remove('sideMenuMini-main-responsive');
      target && target.classList.add('sideMenu-main-responsive');
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

  const userName = (sessionStorage.userName).split(" ")[0];

  return (
    <div ref={ref} className="sideMenu-main">
      <div className="sidemenu-scroll-area">
        <div className="hamburger-start">
          <div className="hamburger-bars-icon">
            <FontAwesomeIcon className="hamburger-pointer" icon={faBars} onClick={sideBarMenuHandler} />
            <div className={handler ? "sideMenu-logo ml-2" : "sidemenu-logo-hide"}>Hi, {userName}</div>
          </div>
        </div>
        <Scrollbars thumbSize={500} style={{ height: '95vh' }}>
          {sideMenuBtns}
        </Scrollbars>
        <RoleAssignment show={show} setShow={setShow} />
      </div>
    </div>
  );
});

export default SideMenuBar;
