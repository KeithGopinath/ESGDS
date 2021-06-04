/* eslint-disable*/
import React, { useRef, useState, useEffect } from 'react';
import CustomTable from '../../components/CustomTable';
import { PENDING_USERS_DATA, APPROVED_USERS_DATA, SUPER_ADMIN_APPROVAL_DATA, PERSONAL_DETAILS_UPDATE_DATA } from '../../../src/constants/TableConstants';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const Users = () => {
  const sideBarRef = useRef();

  const tabLabelSets = [
    { label: 'Pending Users', value: PENDING_USERS_DATA.rowsData.length, data: PENDING_USERS_DATA },
    { label: 'Approved Users', value: APPROVED_USERS_DATA.rowsData.length, data: APPROVED_USERS_DATA },
    { label: 'Super Admin Approval', value: SUPER_ADMIN_APPROVAL_DATA.rowsData.length, data: SUPER_ADMIN_APPROVAL_DATA },
    { label: 'Personal details update', value: PERSONAL_DETAILS_UPDATE_DATA.rowsData.length, data: PERSONAL_DETAILS_UPDATE_DATA },
  ];

  const [tableData, setTableData] = useState(PENDING_USERS_DATA);

  useEffect(() => {
    defaultTab();
  }, []);

  const tabsRefs = useRef(tabLabelSets.map(() => React.createRef()));

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

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Users" show={true} />
        <div className="container-main">
          <div className="users-tabs-stack">
            {tabLabelSets.map(({ label, value, data }, index) => (
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
            <CustomTable tableData={tableData} showDatePicker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
