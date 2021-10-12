/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import CustomTable from '../../components/CustomTable/index';
import SLAExtentions from './extentionSLA';


const PendingTaskTable = (props) => {
  const getFormatDate = (arg) => moment(arg, 'YYYY-MM-DD').format('YYYY-MM-DD');

  const onExtendSLA = (arg) => {
    props.setdetail(arg);
    props.setShow(true);
    if (props.isAnalyst) { props.setrejectslaDate(getFormatDate(arg.analystSLADate)); }
    if (props.isQA) { props.setrejectslaDate(getFormatDate(arg.qaSLADate)); }
  };

  // TABLE DATA
  const tablePopulate = (data) => data.map((ePendingTask) => {
    let populatableData = {
      taskNumber: ePendingTask.taskNumber,
      pillar: ePendingTask.pillar,
      company: ePendingTask.company,
      fiscalYear: ePendingTask.fiscalYear,
      status: ePendingTask.status || ePendingTask.taskStatus,
      action:
  <Link
    href
    to={{
      pathname: `/task/${ePendingTask.taskNumber}`,
      state: {
        taskDetails: ePendingTask, // passing Whole task data
      },
    }}
  >Enter
  </Link>,
    };
    if (props.isAnalyst) {
      populatableData = {
        ...populatableData,
        qaName: ePendingTask.qa,
        endDate: {
          value: moment(ePendingTask.analystSLADate).format('DD-MM-YYYY'),
          content: (ePendingTask.analystSLADate) ?
            <Tag className="tag-btn" onClick={() => { onExtendSLA(ePendingTask); }}>{ moment(ePendingTask.analystSLADate).format('DD/MM/YYYY')}</Tag>
            : '-',
        },
      };
    }
    if (props.isQA) {
      populatableData = {
        ...populatableData,
        analystName: ePendingTask.analyst,
        endDate: {
          value: moment(ePendingTask.qaSLADate).format('DD/MM/YYYY'),
          content: (ePendingTask.qaSLADate) ?
            <Tag className="tag-btn" onClick={() => { onExtendSLA(ePendingTask); }}>{ moment(ePendingTask.qaSLADate).format('DD/MM/YYYY') }</Tag>
            : '-',
        },
      };
    }

    return populatableData;
  });

  const splitColumnsHeadDataOne = [
    {
      id: 'taskNumber', label: 'Task No', align: 'left', dataType: 'string',
    },
    {
      id: 'pillar', label: 'Pillar', align: 'left', dataType: 'string',
    },
    {
      id: 'company', label: 'Company', align: 'left', dataType: 'string',
    },
  ];
  const splitColumnsHeadDataTwo = [
    {
      id: 'fiscalYear', label: 'Fiscal Year', align: 'left', dataType: 'string',
    },
    {
      id: 'status', label: 'Status', align: 'left', dataType: 'string',
    },
    {
      id: 'action', label: 'Action', align: 'right', dataType: 'element',
    },
  ];

  const PENDING_TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: (props.isAnalyst || props.isQA) ? [
      ...splitColumnsHeadDataOne,
      {
        id: 'endDate', label: 'SLA Date', align: 'center', dataType: 'stringSearchSortElement',
      },
      {
        id: props.isAnalyst ? 'qaName' : 'analystName', label: props.isAnalyst ? 'QA' : 'Analyst', align: 'left', dataType: 'string',
      },
      ...splitColumnsHeadDataTwo,
    ] : [
      ...splitColumnsHeadDataOne,
      ...splitColumnsHeadDataTwo,
    ],
    tableLabel: 'Pending Tasks',
  };

  return (
    <CustomTable tableData={PENDING_TASK_DATA} isLoading={props.isLoading} />
  );
};

const ControversyPendingTaskTable = (props) => {
  // TABLE DATA
  const tablePopulate = (data) => data.map((ePendingTask) => ({
    taskNumber: ePendingTask.taskNumber,
    company: ePendingTask.company,
    reviewDate: ePendingTask.reviewDate ? moment(ePendingTask.reviewDate).format('DD/MM/YYYY') || new Date(ePendingTask.reviewDate).toDateString() : '-',
    updatedDate: ePendingTask.lastModifiedDate ? (moment(ePendingTask.lastModifiedDate).format('DD/MM/YYYY') || new Date(ePendingTask.lastModifiedDate).toDateString()) : '-',
    totalNoOfControversies: ePendingTask.totalNoOfControversy,
    action: <Link href to={{ pathname: `/task/${ePendingTask.taskNumber}`, state: { taskDetails: ePendingTask } }}>Enter</Link>,
  }));

  const CONTROVERSY_PENDING_TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'taskNumber', label: 'Task No', align: 'left', dataType: 'string',
      },
      {
        id: 'company', label: 'Company', align: 'left', dataType: 'string',
      },
      {
        id: 'totalNoOfControversies', label: 'Contoversies Collected', align: 'center', dataType: 'string',
      },
      {
        id: 'reviewDate', label: 'Review Date', align: 'center', dataType: 'string',
      },
      {
        id: 'updatedDate', label: 'Last Updated On', align: 'center', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Task',
  };

  return (
    <CustomTable tableData={CONTROVERSY_PENDING_TASK_DATA} isLoading={props.isLoading} />
  );
};

const PendingTasks = () => {
  const [show, setShow] = useState(false);
  const [rejectSlaDate, setrejectslaDate] = useState('');
  const [detail, setdetail] = useState('');
  // DISPATCH
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'PENDING_TASKS_GET_REQUEST' });
  }, []);

  const pendingTasksAPIData = useSelector((state) => state.pendingTasks);

  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // GET REQ ROLE BASED BOOLEANS
  const [isAnalyst, isQA, isCompanyRep, isClientRep] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  const getReqTabs = (e) => {
    if (isAnalyst) {
      return [
        { label: 'Data Collection', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.analystCollectionTaskList },
        { label: 'Data Correction', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.analystCorrectionTaskList },
        { label: 'Controversy Collection', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.controversyTaskList },
      ];
    }
    if (isQA) { return [{ label: 'Data Verification', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.qaTaskList }]; }
    if (isCompanyRep) { return [{ label: 'Data Review', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.companyRepTaskList }]; }
    if (isClientRep) { return [{ label: 'Data Review', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.clientRepTaskList }]; }
    return [{
      label: '', data: [],
    }];
  };

  const tabs = getReqTabs(pendingTasksAPIData);

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const sideBarRef = useRef();

  const [reqAPIData, setReqAPIData] = useState(tabs[0]);


  const setDefaultTab = () => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('tabs-label-count-wrap-active');
    });
    const defaultTab = tabsRef.current[0] && tabsRef.current[0].current;
    if (defaultTab) { defaultTab.classList.add('tabs-label-count-wrap-active'); }
    setReqAPIData(tabs[0]);
    sessionStorage.tab = tabs[0].label;
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
  }, [pendingTasksAPIData]);

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Pending Tasks" />
        <div className="pendingtasks-main" >
          <div className="pendingtasks-tabs-stack">
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
            <SLAExtentions setShow={setShow} show={show} detail={detail} setdetail={setdetail} setrejectslaDate={setrejectslaDate} rejectSlaDate={rejectSlaDate} />
          </div>
          {reqAPIData.label !== 'Controversy Collection' ? <PendingTaskTable setdetail={setdetail} setShow={setShow} setrejectslaDate={setrejectslaDate} isAnalyst={isAnalyst} isQA={isQA} data={reqAPIData.data} isLoading={pendingTasksAPIData.isLoading} /> : <ControversyPendingTaskTable data={reqAPIData.data} isLoading={pendingTasksAPIData.isLoading} />}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
