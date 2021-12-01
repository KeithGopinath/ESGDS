/* eslint-disable  */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import CustomTableServer from '../../components/CustomTableServer';
import SLAExtentions from './Extention';

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
            <Tag className="tag-btn" onClick={() => { onExtendSLA(ePendingTask); }}>{moment(ePendingTask.analystSLADate).format('DD/MM/YYYY')}</Tag>
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
            <Tag className="tag-btn" onClick={() => { onExtendSLA(ePendingTask); }}>{moment(ePendingTask.qaSLADate).format('DD/MM/YYYY')}</Tag>
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
      id: 'action', label: 'Action', align: 'right', dataType: 'element',
    },
  ];

  const splitColumnsHeadDataThree = (props.isClientRep || props.isCompanyRep) ? [
    ...splitColumnsHeadDataTwo,
  ] : [
    splitColumnsHeadDataTwo[0],
    {
      id: 'status', label: 'Status', align: 'left', dataType: 'string',
    },
    splitColumnsHeadDataTwo[1],
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
      ...splitColumnsHeadDataThree,
    ] : [
      ...splitColumnsHeadDataOne,
      ...splitColumnsHeadDataThree,
    ],
    tableLabel: 'Pending Tasks',
  };

  return (
    // <CustomTable tableData={PENDING_TASK_DATA} isLoading={props.isLoading} />
    <CustomTableServer newpage={props.onNewPage} newRowsPerPage={props.onNewRowPerPage} count={props.count} tableData={PENDING_TASK_DATA} defaultNoOfRows={10} />
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
        id: 'reviewDate', label: 'Review Date', align: 'left', dataType: 'string',
      },
      {
        id: 'updatedDate', label: 'Last Updated On', align: 'left', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Task',
  };

  return (
    // <CustomTable tableData={CONTROVERSY_PENDING_TASK_DATA} isLoading={props.isLoading} />
    <CustomTableServer newpage={props.onNewPage} newRowsPerPage={props.onNewRowPerPage} count={props.count} tableData={CONTROVERSY_PENDING_TASK_DATA} defaultNoOfRows={10} />
  );
};

const PendingTasks = () => {
  const [show, setShow] = useState(false);
  const [rejectSlaDate, setrejectslaDate] = useState('');
  const [detail, setdetail] = useState('');
  const [newPage, setNewPage] = useState(0);
  const [newRowPerPage, setNewRowPerPage] = useState(10);
  const [tasktabFlag, settaskTabFlag] = useState('');

  // DISPATCH
  const dispatch = useDispatch();

  const onNewPage = (page) => {
    setNewPage(page);
  };

  const onNewRowPerPage = (row) => {
    setNewRowPerPage(row);
  };

  useEffect(() => {
    dispatch({
      type: 'PENDING_TASKS_GET_REQUEST', newPage, newRowPerPage, currentRole, currentTab,
    });
  }, [newPage, newRowPerPage, currentRole, tasktabFlag]);

  const pendingTasksAPIData = useSelector((state) => state.pendingTasks);
  const count = pendingTasksAPIData.pendingTasksList && pendingTasksAPIData.pendingTasksList.count

  // CURRENT ROLE
  const currentRole = sessionStorage.role;
  const currentTab = sessionStorage.tab;

  // GET REQ ROLE BASED BOOLEANS
  const [isAnalyst, isQA, isCompanyRep, isClientRep] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];


  const getReqTabs = (e) => {
    console.log('eeee', e);
    console.log('isAnalyst', isAnalyst);
    if (isAnalyst) {
      if (tasktabFlag === 'Data Collection') {
        return [
          { label: 'Data Collection', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.rows },
          { label: 'Data Correction', data: [] },
          { label: 'Controversy Collection', data: [] },
          // { label: 'Data Correction', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.analystCorrectionTaskList },
          // { label: 'Controversy Collection', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.controversyTaskList },
        ];
      } else if (tasktabFlag === 'Data Correction') {
        return [
          { label: 'Data Collection', data: [] },
          { label: 'Data Correction', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.rows },
          { label: 'Controversy Collection', data: [] },
        ];
      }
      return [
        { label: 'Data Collection', data: [] },
        { label: 'Data Correction', data: [] },
        { label: 'Controversy Collection', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.rows },
      ];
    }
    if (isQA) {
      return [
        { label: 'Data Verification', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.rows }
      ];
    }
    if (isCompanyRep) {
      return [
        { label: 'Data Review', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.rows },
        { label: 'Controversy Review', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.rows },
        // CONTROVERSY REVIEW ECS - 408
      ];
    }
    if (isClientRep) {
      return [
        { label: 'Data Review', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.rows },
        { label: 'Controversy Review', data: (!e.pendingTasksList) ? [] : e.pendingTasksList.data.rows },
        // CONTROVERSY REVIEW ECS - 408
      ];
    }
    return [{
      label: '', data: [],
    }];
  };

  const tabs = getReqTabs(pendingTasksAPIData);
  console.log('tabs', tabs);

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const sideBarRef = useRef();

  const [reqAPIData, setReqAPIData] = useState(tabs[0]);
  // const [reqAPIData, setReqAPIData] = useState();
  // const [tasktabFlag, settaskTabFlag] = useState(tabs[0].label);

  console.log('reqAPIData', reqAPIData);
  console.log('tasktabFlag', tasktabFlag);


  const setDefaultTab = () => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('tabs-label-count-wrap-active');
    });
    const defaultTab = tabsRef.current[0] && tabsRef.current[0].current;
    if (defaultTab) { defaultTab.classList.add('tabs-label-count-wrap-active'); }
    setReqAPIData(tabs[0]);
    settaskTabFlag(tabs[0].label);
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
    settaskTabFlag(data.label);
    sessionStorage.tab = data.label;
  };

  useEffect(() => {
    if (tasktabFlag === 'Data Collection') {
      // setDefaultTab();
      setReqAPIData(tabs[0]);
    } else if (tasktabFlag === 'Data Correction') {
      setReqAPIData(tabs[1]);
    } else if (tasktabFlag === 'Controversy Collection') {
      setReqAPIData(tabs[2]);
    } else if (tasktabFlag === 'Data Verification') {
      setReqAPIData(tabs[0]);
    } else if (tasktabFlag === 'Data Review') {
      setReqAPIData(tabs[0]);
    } else if (tasktabFlag === 'Controversy Review') {
      setReqAPIData(tabs[1]);
    } else {
      setDefaultTab();
    }
  }, [pendingTasksAPIData]);

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Pending Tasks" />
        <div className="container-main" >
          <div className="pendingtasks-tabs-stack">
            {tabs.map((tab, index) => (
              <div key={tab.label} ref={tabsRef.current[index]} data-id={tab.label} onClick={(event) => onClickChangeTab(event, tab)} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {tab.label}
                </div>
                {/* <div title={tab.label} className="tabs-count-wrap">
                  <div className="tabs-count">{tab.data.length}
                  </div>
                </div> */}
              </div>))}
            <SLAExtentions setShow={setShow} show={show} detail={detail} setdetail={setdetail} setrejectslaDate={setrejectslaDate} rejectSlaDate={rejectSlaDate} />
          </div>
          {reqAPIData.label !== 'Controversy Collection' || reqAPIData.label !== 'Controversy Review' ? <PendingTaskTable setdetail={setdetail} setShow={setShow} count={count} setrejectslaDate={setrejectslaDate} isAnalyst={isAnalyst} isQA={isQA} isClientRep={isClientRep} isCompanyRep={isCompanyRep} data={reqAPIData.data} isLoading={pendingTasksAPIData.isLoading} /> : <ControversyPendingTaskTable data={reqAPIData.data} count={count} isLoading={pendingTasksAPIData.isLoading} />}
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
