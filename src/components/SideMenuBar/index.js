/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonList, TaxonomySubMenu, ValidationSubMenu, GroupsSubMenu, UsersSubMenu } from '../../constants/SideBarConstants';
import { history } from '../../routes';
import RoleAssignment from '../../containers/RoleAssign';
import { faBars, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const SideMenuBar = React.forwardRef((props, ref) => {
  const taxonomyBtnRefs = useRef(TaxonomySubMenu.map(() => React.createRef()));
  const validationBtnRefs = useRef(ValidationSubMenu.map(() => React.createRef()));
  const groupsBtnRefs = useRef(GroupsSubMenu.map(() => React.createRef()));
  const usersBtnRefs = useRef(UsersSubMenu.map(() => React.createRef()));

  const role = useSelector((state) => state.login.login);
  const userRole = role && role.user.name || sessionStorage.role;

  // Buttonlist modified based on roles
  const modifiedButtonList = ButtonList.filter(val => (
    userRole == 'QA' || userRole == 'Analyst' ? val.id == 0 || val.id == 4 || val.id == 9 :
      userRole == 'GroupAdmin' ? val.id == 0 || val.id == 6 || val.id == 7 || val.id == 8 || val.id == 9 :
        userRole == 'CompanyRep' || userRole == 'ClientRep' ? val.id == 4 || val.id == 9 :
          val.id == val.id)).map((data) => ({
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

  useEffect(() => {
    onRenderButtonHighter();
  });

  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.pathname.includes('taxonomy')) {
      setTaxonomySubMenu(true);
    } else if (url.pathname.includes('validation')) {
      setValidationSubMenu(true);
    } else if (url.pathname.includes('group')) {
      setGroupsSubMenu(true);
    } else if (url.pathname.includes('users')) {
      setUsersSubMenu(true);
    } else {
      setTaxonomySubMenu(false);
      setValidationSubMenu(false);
      setGroupsSubMenu(false);
      setUsersSubMenu(false);
    }
    window.addEventListener('resize', sideMenuResponsive);
    const target = ref.current;
    target.classList.remove('sideMenuMini-main-responsive');
    target.classList.add('sideMenu-main-responsive');
  }, []);


  // Mapping of sideBar Menu and subMenu
  const sideMenuBtns = modifiedButtonList.map(({ id, label, icon, address, }, index) => {
    const subMenuShow = label == 'Taxonomy' ? showTaxonomySubMenu : label == 'Validation' ? showValidationSubMenu : label == 'Groups' ? showGroupsSubMenu : label == 'Users' ? showUsersSubMenu : false;
    const subMenuList = label == 'Taxonomy' ? TaxonomySubMenu : label == 'Validation' ? ValidationSubMenu : label == 'Groups' ? GroupsSubMenu : label == 'Users' ? UsersSubMenu : false;
    const subMenuRef = label == 'Taxonomy' ? taxonomyBtnRefs : label == 'Validation' ? validationBtnRefs : label == 'Groups' ? groupsBtnRefs : label == 'Users' ? usersBtnRefs : false;

    return (
      <div>
        {id == 1 || id == 2 || id == 3 || id == 6 ?
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
                    <div onClick={(event) => buttonClickHandler(event, address)} ref={subMenuRef.current[index]}
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
    } else if (address !== '') {
      history.push(`/${address}`);
    } else {
      setShow(true);
    }
  };

  // FUNCTION that Highlights the button based on url
  const onRenderButtonHighter = () => {
    const BtnRefs = showValidationSubMenu && !show ? validationBtnRefs : showTaxonomySubMenu && !show ? taxonomyBtnRefs : showGroupsSubMenu && !show ? groupsBtnRefs : showUsersSubMenu && !show ? usersBtnRefs : sideMenuBtnRefs;
    const MenuButton = showValidationSubMenu && !show ? ValidationSubMenu : showTaxonomySubMenu && !show ? TaxonomySubMenu : showGroupsSubMenu && !show ? GroupsSubMenu : showUsersSubMenu && !show ? UsersSubMenu : modifiedButtonList;
    const subMenuRefs = showTaxonomySubMenu ? taxonomyBtnRefs : showValidationSubMenu ? validationBtnRefs : showUsersSubMenu ? usersBtnRefs : showGroupsSubMenu ? groupsBtnRefs : false;

    subMenuRefs && subMenuRefs.current.forEach((element) => {
      const btn = element.current;
      btn && btn.classList.remove('sideMenu-btn-highlight');
    });

    sideMenuBtnRefs && sideMenuBtnRefs.current.forEach((element) => {
      const btn = element.current;
      btn && btn.classList.remove('sideMenu-btn-highlight');
    });

    MenuButton && MenuButton.forEach((Button, index) => {
      if (show && Button.label === 'Role Assignment') {
        BtnRefs.current[index].current.classList.add('sideMenu-btn-highlight');
      } else if (!show && (history.location.pathname) == (`/${Button.address}`) && Button.address.length !== 0) {
        BtnRefs.current[index].current.classList.add('sideMenu-btn-highlight');
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
