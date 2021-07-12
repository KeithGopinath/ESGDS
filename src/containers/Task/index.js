/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import Select, { components } from 'react-select';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CustomTable from '../../components/CustomTable/index';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { TASK_API_DATA } from '../../constants/PendingTasksConstants';
import AddNewBoardMember from './AddNewBoardMember';
// import AddNewKMPMember from './AddNewKMPMember';


const FieldWrapper = (props) => {
  if (props.visible) {
    return (
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            {props.label}
          </Form.Label>
          <Col sm={7}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

const TaskTable = (props) => {
  console.log(props);
  const tablePopulate = ({ taskId, dpCodesData }) => dpCodesData.map((x) => ({
    dpCode: x.dpCode,
    fiscalYear: x.fiscalYear,
    status: x.status,
    action:
  <Link
    to={{
      pathname: `/dpcode/${x.dpCode}`,
      state: { taskId, dpCode: x.dpCode },
    }}
  >Enter Data
  </Link>,
  }));

  const TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'fiscalYear', label: 'Fiscal Year', align: 'left', dataType: 'string',
      },
      {
        id: 'status', label: 'Status', align: 'center', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Tasks',
  };

  return (
    <CustomTable tableData={TASK_DATA} />
  );
};

const ControversyTaskTable = (props) => {
  console.log(props);
  const tablePopulate = ({ taskId, dpCodesData }) => dpCodesData.map((x) => ({
    dpCode: x.dpCode,
    keyIssue: x.keyIssue,
    action:
  <Link
    to={{
      pathname: `/controversydpcode/${x.dpCode}`,
      state: { taskId, dpCode: x.dpCode },
    }}
  >Enter Data
  </Link>,
  }));

  const CONTROVERSY_TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'keyIssue', label: 'Key Issue', align: 'left', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Dp Codes',
  };

  return (
    <CustomTable tableData={CONTROVERSY_TASK_DATA} />
  );
};

const Task = (props) => {
  // CURRENT ROLE
  const currentRole = sessionStorage.role;
  // CURRENT TAB
  const currentTab = sessionStorage.tab;

  // GET REQ ROLE BASED BOOLEANS
  const [isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR] = [
    currentRole === 'Analyst' && currentTab === 'Data Collection',
    currentRole === 'Analyst' && currentTab === 'Data Correction',
    currentRole === 'Analyst' && currentTab === 'Controversy Collection',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  const sideBarRef = useRef();

  const tabs = ['Standalone', 'Board Matrix', 'Kmp Matrix'];

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  };

  const getReqAPIData = () => {
    if (isClientRep_DR) { return TASK_API_DATA.COMPANY_REP_DR; }
    if (isCompanyRep_DR) { return TASK_API_DATA.COMPANY_REP_DR; }
    if (isQA_DV) { return TASK_API_DATA.QA_DV; }
    if (isAnalyst_DC) { return TASK_API_DATA.ANALYST_DC; }
    if (isAnalyst_DCR) { return TASK_API_DATA.ANALYST_DCR; }
    if (isAnalyst_CC) { return TASK_API_DATA.ANALYST_CC; }
    return [];
  };

  const extractReqTask = (data) => {
    const { taskId } = props.location.state;
    const [filteredTask] = data.filter((e) => (e.taskId === taskId));
    return filteredTask;
  };

  const [reqTaskData, setReqTaskData] = useState(extractReqTask(getReqAPIData()));
  const [dpCodeType, setDpCodeType] = useState('Standalone');
  const [reqBoardMember, setReqBoardMember] = useState(null);
  const [reqKmpMember, setReqKmpMember] = useState(null);

  const [isAddNewBoardVisible, setIsAddNewBoardVisible] = useState(false);
  const [isAddNewKMPVisible, setIsAddNewKMPVisible] = useState(false);

  useEffect(() => {
    defaultActiveTab();
    setReqTaskData(extractReqTask(getReqAPIData()));
    setDpCodeType('Standalone');
  }, []);


  const getReqDpCodesList = () => {
    if (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) {
      if (dpCodeType === 'Standalone') {
        return reqTaskList.dpCodesData;
      }
      if (dpCodeType === 'Board Matrix') {
        if (reqBoardMember) {
          return reqTaskList.dpCodesData.filter((e) => (e.boardMember && e.boardMember === reqBoardMember.value));
        }
        return reqTaskList.dpCodesData;
      }
      if (dpCodeType === 'Kmp Matrix') {
        if (reqKmpMember) {
          return reqTaskList.dpCodesData.filter((e) => (e.kmpMember && e.kmpMember === reqKmpMember.value));
        }
        return reqTaskList.dpCodesData;
      }
    }
    if (isAnalyst_CC) {
      return reqTaskList.dpCodesData;
    }
    return [];
  };

  const getReqTaskList = () => {
    if (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) {
      if (dpCodeType === 'Standalone') {
        return reqTaskData.STANDALONE;
      }
      if (dpCodeType === 'Board Matrix') {
        return reqTaskData.BOARDMATRIX;
      }
      if (dpCodeType === 'Kmp Matrix') {
        return reqTaskData.KMPMATRIX;
      }
    }
    if (isAnalyst_CC) {
      return reqTaskData;
    }
    return {};
  };

  const reqTaskList = getReqTaskList();
  const boardMembersList = dpCodeType === 'Board Matrix' ? (reqTaskData.BOARDMATRIX.boardMembersList) : [];
  const kmpMembersList = dpCodeType === 'Kmp Matrix' ? (reqTaskData.KMPMATRIX.kmpMembersList) : [];
  const reqDpCodesData = getReqDpCodesList();

  const taskToNextPage = {
    taskId: reqTaskData.taskId,
    pillar: reqTaskData.pillar,
    company: reqTaskData.company,
    dpCodesData: reqDpCodesData,
  };

  sessionStorage.filteredData = isAnalyst_CC ? JSON.stringify(reqDpCodesData) : JSON.stringify(taskToNextPage);

  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('active');
    if (currentTarget.innerHTML) {
      setDpCodeType(currentTarget.innerHTML);
    }
  };

  const onChangeReqBoardMember = (event) => {
    if (event) {
      const boardMemberName = event.value;
      setReqBoardMember(boardMembersList.filter((boardMember) => (boardMember.value === boardMemberName))[0]);
    } else {
      setReqBoardMember(null);
    }
  };

  const onChangeReqKmpMember = (event) => {
    if (event) {
      const kmpMemberName = event.value;
      setReqKmpMember(kmpMembersList.filter((kmpMember) => (kmpMember.value === kmpMemberName))[0]);
    } else {
      setReqKmpMember(null);
    }
  };

  const KMPMenuList = (e) => (
    <components.MenuList {...e}>
      <div><Button style={{ width: '100%' }} onClick={() => setIsAddNewKMPVisible(true)}>Add New Member</Button></div>
      {e.children}
    </components.MenuList>
  );

  const BoardMemMenuList = (e) => (
    <components.MenuList {...e}>
      <div><Button style={{ width: '100%' }} onClick={() => setIsAddNewBoardVisible(true)}>Add New Member</Button></div>
      {e.children}
    </components.MenuList>
  );

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="container-main" >
          <div className="task-info-group">
            <div className="task-id-year-wrap">
              {!isAnalyst_CC && <div className="task-pillar">{`${reqTaskData.company} / ${reqTaskData.pillar}`}</div>}
              {isAnalyst_CC && <div className="task-pillar">{reqTaskData.company}</div>}
              <div className="task-id">{`Task Id: ${reqTaskData.taskId}`}</div>
            </div>
            {reqTaskData.pillar === 'Governance' &&
            <div className="task-tabs-wrap">
              {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} id={tab} key={tab[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
            </div>}
            <div className="task-keyissue">
              <Row>
                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { reqTaskData.pillar === 'Governance' && dpCodeType === 'Board Matrix' && boardMembersList.length > 0 &&
                <FieldWrapper
                  label="Board Members*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={onChangeReqBoardMember}
                      options={boardMembersList.map((boardMember) => ({ label: boardMember.label, value: boardMember.value }))}
                      value={reqBoardMember && { label: reqBoardMember.label, value: reqBoardMember.value }}
                      isSearchable
                      isClearable
                      maxLength={30}
                      components={{ MenuList: BoardMemMenuList }}
                    />}
                />}
                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { reqTaskData.pillar === 'Governance' && dpCodeType === 'Kmp Matrix' && kmpMembersList.length > 0 &&
                <FieldWrapper
                  label="KMP*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={onChangeReqKmpMember}
                      options={kmpMembersList.map((KMPMember) => ({ label: KMPMember.label, value: KMPMember.value }))}
                      value={reqKmpMember && { label: reqKmpMember.label, value: reqKmpMember.value }}
                      isSearchable
                      isClearable
                      maxLength={30}
                      components={{ MenuList: KMPMenuList }}
                    />}
                />}
              </Row>
            </div>
            {(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && <TaskTable data={{ taskId: reqTaskData.taskId, dpCodesData: reqDpCodesData }} />}
            {isAnalyst_CC && <ControversyTaskTable data={{ taskId: reqTaskData.taskId, dpCodesData: reqDpCodesData }} />}
            <Modal title="Add New Board Member" width="80%" visible={isAddNewBoardVisible} footer={null} onCancel={() => setIsAddNewBoardVisible(false)}>
              {isAddNewBoardVisible && <AddNewBoardMember reqYears={reqTaskData.fiscalYear} reqMemberType="boardMatrix" onCloseAddNewMemberModal={() => setIsAddNewBoardVisible(false)} />}
            </Modal>

            <Modal title="Add New Kmp Member" width="80%" visible={isAddNewKMPVisible} footer={null} onCancel={() => setIsAddNewKMPVisible(false)}>
              {/* <AddNewKMPMember /> */}
              {isAddNewKMPVisible && <AddNewBoardMember reqYears={reqTaskData.fiscalYear} reqMemberType="kmpMatrix" onCloseAddNewMemberModal={() => setIsAddNewKMPVisible(false)} />}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
