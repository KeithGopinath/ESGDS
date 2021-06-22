/* eslint-disable*/
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable/index';
import { ANALYST_DC_DATA, QA_DV_DATA, COMPANY_REP_DATA } from '../../containers/DataPage/apiData';


const PendingTaskTable = (props) => {
  // TABLE DATA

  const tablePopulate = (data) => data.map(({
    taskId, pillar, company, fiscalYear, status,
  }) => ({
    taskId,
    pillar,
    company,
    fiscalYear,
    status,
    action:
  <Link
    href
    to={{
      pathname: `/task/${taskId}`,
      state: { taskId },
    }}
  >Enter
  </Link>,
  }));

  const PENDING_TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'taskId', label: 'Task Id', align: 'left', dataType: 'string',
      },
      {
        id: 'pillar', label: 'Pillar', align: 'left', dataType: 'string',
      },
      {
        id: 'company', label: 'Company', align: 'left', dataType: 'string',
      },
      {
        id: 'fiscalYear', label: 'Fiscal Year', align: 'left', dataType: 'string',
      },
      {
        id: 'status', label: 'Status', align: 'left', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Tasks',
  };

  return (
    <CustomTable tableData={PENDING_TASK_DATA} />
  );
};

const PendingTasks = () => {
  const currentRole = sessionStorage.role;

  const sideBarRef = useRef();

  const getTabs = () => {
    let tabsList = [];
    if (currentRole === 'Analyst') {
      tabsList = ['Data Collection', 'Data Correction'];
    }
    if (currentRole === 'QA') {
      tabsList = ['Data Verification'];
    }
    if (currentRole === 'Company Representative') {
      tabsList = ['Data Review'];
    }
    if (currentRole === 'Client Representative') {
      tabsList = ['Data Review'];
    }
    return tabsList;
  };

  const tabs = getTabs();

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const defaultApiData = () => {
    if (currentRole === 'Company Representative') {
      return COMPANY_REP_DATA;
    }
    if (currentRole === 'Client Representative') {
      return COMPANY_REP_DATA;
    }
    if (currentRole === 'QA') {
      return QA_DV_DATA;
    }
    if (currentRole === 'Analyst') {
      return ANALYST_DC_DATA;
    }
    return [];
  };

  const apiDataList = defaultApiData();

  const onClickTabChanger = (event, data) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('tabs-label-count-wrap-active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('tabs-label-count-wrap-active');
  };

  useEffect(() => {
    const defaultTab = tabsRef.current[0] && tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('tabs-label-count-wrap-active');
  // useEffect(() => {
  //   const defaultTab = tabsRef.current[0].current;
  //   if (defaultTab) {
  //     defaultTab.classList.add('pendingtasks-tab-active');
    }
  }, []);


  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Pending Tasks" />
        <div className="container-main" >
          <div className="users-tabs-stack">
            {tabs.map((tab, index) =>
              <div key={tab} ref={tabsRef.current[index]} onClick={(event) => (onClickTabChanger(event))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {tab}
                </div>
                <div title={tab} className="tabs-count-wrap">
                  <div className="tabs-count">3
                  </div>
                </div>
              </div>
            )}
          </div>
          <PendingTaskTable data={apiDataList} />
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;