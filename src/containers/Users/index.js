/* eslint-disable*/
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import UsersTable from '../../components/UsersTable';
import { PENDING_USERS_DATA, APPROVED_USERS_DATA, SUPER_ADMIN_APPROVAL_DATA, PERSONAL_DETAILS_UPDATE_DATA } from '../../../src/constants/TableConstants';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Button } from 'react-bootstrap';
import { history } from './../../routes';

const Users = () => {
  const sideBarRef = useRef();
  const LABEL_SETS = [
    { label: 'Pending Users', value: PENDING_USERS_DATA.rowsData.length, data: PENDING_USERS_DATA },
    { label: 'Approved Users', value: APPROVED_USERS_DATA.rowsData.length, data: APPROVED_USERS_DATA },
    { label: 'Super Admin Approval', value: SUPER_ADMIN_APPROVAL_DATA.rowsData.length, data: SUPER_ADMIN_APPROVAL_DATA },
    { label: 'Personal details update', value: PERSONAL_DETAILS_UPDATE_DATA.rowsData.length, data: PERSONAL_DETAILS_UPDATE_DATA },
  ];
  const [tableData, setTableData] = useState(PENDING_USERS_DATA);

  useEffect(() => {
    defaultTab();
  }, []);

  const tabsRefs = useRef(LABEL_SETS.map(() => React.createRef()));
  const defaultTab = () => {
    setTableData(PENDING_USERS_DATA);
    tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
  };
  const tabsClickHandler = (event, data) => {
    tabsRefs.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const target = event.currentTarget;
    target.classList.add('tabs-label-count-wrap-active');
    setTableData(data);
  };

  const sendOnboard = () => {
    history.push('/onboard');
  };
  
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <div className="users-main">

          <div className="users-back-label-onboardlink-container">
            <div className="back-label-wrap">
              <div className="back-lefticon-wrap" >
                <FontAwesomeIcon className="lefticon" icon={faAngleLeft} />
                Back
              </div>
              <div className="users-label">Manage Users</div>
            </div>
            <Button className="onboardlink-btn" onClick= {sendOnboard}>Send onboarding link
            </Button>
          </div>
          <div className="users-tabs-stack">
            {LABEL_SETS.map(({ label, value, data }, index) => (
              <div key={label} ref={tabsRefs.current[index]} onClick={(event) => (tabsClickHandler(event, data))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {label}
                </div>
                <div title={value} className="tabs-count-wrap">
                  <div className="tabs-count">{value}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <UsersTable tableData={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
