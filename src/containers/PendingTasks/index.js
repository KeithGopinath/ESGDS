/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import CustomTable from '../../components/CustomTable/index';

import { PENDING_TASK } from '../../constants/PendingTasksConstants';


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

const ControversyPendingTaskTable = (props) => {
  // TABLE DATA
  console.log(props);
  const tablePopulate = (data) => data.map(({
    dpCode, company, fiscalYear, status,
  }) => ({
    dpCode,
    company,
    fiscalYear,
    status,
    action:
  <Link
    href
    // to={{
    //   pathname: `/task/${taskId}`,
    //   state: { taskId },
    // }}
  >Enter
  </Link>,
  }));

  const CONTROVERSY_PENDING_TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'Dp Code', align: 'left', dataType: 'string',
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
    tableLabel: 'Pending Controveries',
  };

  return (
    <CustomTable tableData={CONTROVERSY_PENDING_TASK_DATA} />
  );
};

const PendingTasks = () => {
  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // GET REQ ROLE BASED BOOLEANS
  const [isAnalyst, isQA, isCompanyRep, isClientRep] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  const getReqTabs = () => {
    if (isAnalyst) {
      return [{ label: 'Data Collection', data: PENDING_TASK.ANALYST_DC }, { label: 'Data Correction', data: PENDING_TASK.ANALYST_DCR },
        { label: 'Controversy Collection', data: PENDING_TASK.ANALYST_CC }];
    }
    if (isQA) { return [{ label: 'Data Verification', data: PENDING_TASK.QA_DV }]; }
    if (isCompanyRep) { return [{ label: 'Data Review', data: PENDING_TASK.COMPANY_REP_DR }]; }
    if (isClientRep) { return [{ label: 'Data Review', data: PENDING_TASK.COMPANY_REP_DR }]; }
    return [];
  };

  const tabs = getReqTabs();

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const sideBarRef = useRef();

  const [reqAPIData, setReqAPIData] = useState(tabs[0]);


  const setDefaultTab = () => {
    const defaultTab = tabsRef.current[0] && tabsRef.current[0].current;
    if (defaultTab) { defaultTab.classList.add('tabs-label-count-wrap-active'); }
    setReqAPIData(tabs[0]);
    sessionStorage.tab = tabs[0].label;
    console.log(`GET REQUEST FOR ${currentRole} ${defaultTab.getAttribute('data-id')}`);
  };

  const onClickChangeTab = (event, data) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('tabs-label-count-wrap-active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('tabs-label-count-wrap-active');
    setReqAPIData(data);
    sessionStorage.tab = data.label;
  };

  useEffect(() => {
    setDefaultTab();
  }, []);

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Pending Tasks" />
        <div className="container-main" >
          <div className="users-tabs-stack">
            {tabs.map((tab, index) => (
              <div key={tab.label} ref={tabsRef.current[index]} data-id={tab.label} onClick={(event) => onClickChangeTab(event, tab)} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {tab.label}
                </div>
                <div title={tab.label} className="tabs-count-wrap">
                  <div className="tabs-count">{tab.data.length}
                  </div>
                </div>
              </div>))}
          </div>
          {reqAPIData.label !== 'Controversy Collection' ? <PendingTaskTable data={reqAPIData.data} /> : <ControversyPendingTaskTable data={reqAPIData.data} />}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
