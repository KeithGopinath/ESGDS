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
import AddNewKMPMember from './AddNewKMPMember';


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

const Task = (props) => {
  // CURRENT ROLE
  const currentRole = sessionStorage.role;
  // CURRENT TAB
  const tabLabel = sessionStorage.tab;

  // GET REQ ROLE BASED BOOLEANS
  const [isAnalyst, isQA, isCompanyRep, isClientRep] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  const sideBarRef = useRef();

  const tabs = ['Standalone', 'Matrix'];

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  };

  const getReqAPIData = () => {
    console.log(tabLabel === 'Data Correction', tabLabel === 'Data Collection');
    if (isClientRep) { return TASK_API_DATA.COMPANY_REP_DR; }
    if (isCompanyRep) { return TASK_API_DATA.COMPANY_REP_DR; }
    if (isQA) { return TASK_API_DATA.QA_DV; }
    if (isAnalyst && tabLabel === 'Data Collection') { return TASK_API_DATA.ANALYST_DC; }
    if (isAnalyst && tabLabel === 'Data Correction') { return TASK_API_DATA.ANALYST_DCR; }
    return [];
  };

  const extractReqTask = (data) => {
    const { taskId } = props.location.state;
    const [filteredTask] = data.filter((e) => (e.taskId === taskId));
    return filteredTask;
  };

  const [reqTaskData, setReqTaskData] = useState(extractReqTask(getReqAPIData()));
  const [dpCodeType, setDpCodeType] = useState('Standalone');
  const [reqKeyIssue, setReqKeyIssue] = useState(null);
  const [reqBoardMember, setReqBoardMember] = useState(null);
  const [reqKmpMember, setReqKmpMember] = useState(null);

  const [isAddNewBoardVisible, setIsAddNewBoardVisible] = useState(false);
  const [isAddNewKMPVisible, setIsAddNewKMPVisible] = useState(false);

  useEffect(() => {
    defaultActiveTab();
    setReqTaskData(extractReqTask(getReqAPIData()));
    setDpCodeType('Standalone');
  }, []);

  useEffect(() => {
    setReqKeyIssue(null);
  }, [dpCodeType]);

  const getReqDpCodesList = () => {
    if (dpCodeType === 'Standalone') {
      if (reqKeyIssue) {
        return reqTaskList.dpCodesData.filter((e) => (e.keyIssueId === reqKeyIssue.id));
      }
      return reqTaskList.dpCodesData;
    }
    if (dpCodeType === 'Matrix') {
      if (reqKeyIssue && reqBoardMember) {
        return reqTaskList.dpCodesData.filter((e) => (e.keyIssueId === reqKeyIssue.id && e.boardMember && e.boardMember === reqBoardMember.value));
      }
      if (reqKeyIssue && reqKmpMember) {
        return reqTaskList.dpCodesData.filter((e) => (e.keyIssueId === reqKeyIssue.id && e.kmpMember && e.kmpMember === reqKmpMember.value));
      }
      if (reqKeyIssue) {
        return reqTaskList.dpCodesData.filter((e) => (e.keyIssueId === reqKeyIssue.id));
      }
      return reqTaskList.dpCodesData;
    }
    return [];
  };

  const reqTaskList = dpCodeType === 'Standalone' ? reqTaskData.STANDALONE : reqTaskData.MATRIX;
  const reqKeyIssueList = reqTaskList.keyIssuesList;
  const boardMembersList = dpCodeType === 'Matrix' ? (reqKeyIssue && reqKeyIssue.boardMembers ? reqKeyIssue.boardMembers : []) : [];
  const kmpMembersList = dpCodeType === 'Matrix' ? (reqKeyIssue && reqKeyIssue.kmpMembers ? reqKeyIssue.kmpMembers : []) : [];
  const reqDpCodesData = getReqDpCodesList();

  const taskToNextPage = {
    taskId: reqTaskData.taskId,
    pillar: reqTaskData.pillar,
    company: reqTaskData.company,
    dpCodesData: reqDpCodesData,
  };

  sessionStorage.filteredData = JSON.stringify(taskToNextPage);

  console.log('///////', reqKeyIssue, '////', boardMembersList, kmpMembersList);
  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('active');
    if (currentTarget.innerHTML === 'Matrix') {
      setDpCodeType('Matrix');
    }
    if (currentTarget.innerHTML === 'Standalone') {
      setDpCodeType('Standalone');
    }
  };

  const onChangeReqKeyIssue = (event) => {
    if (event) {
      const keyIssueId = event.value;
      setReqKeyIssue(reqKeyIssueList.filter((keyIssue) => (keyIssue.id === keyIssueId))[0]);
    } else {
      setReqKeyIssue(null);
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
              <div className="task-pillar">{`${reqTaskData.company} / ${reqTaskData.pillar}`}</div>
              <div className="task-id">{`Task Id: ${reqTaskData.taskId}`}</div>
            </div>
            {reqTaskData.pillar === 'Governance' &&
            <div className="task-tabs-wrap">
              {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} id={tab} key={tab[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
            </div>}
            <div className="task-keyissue">
              <Row>
                <FieldWrapper
                  label="Key Issues*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={onChangeReqKeyIssue}
                      options={reqKeyIssueList.map((keyIssue) => ({ label: keyIssue.label, value: keyIssue.id }))}
                      value={reqKeyIssue && { label: reqKeyIssue.label, value: reqKeyIssue.id }}
                      isSearchable
                      isClearable
                      maxLength={30}
                    />}
                />
                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { reqTaskData.pillar === 'Governance' && boardMembersList.length > 0 &&
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
                { reqTaskData.pillar === 'Governance' && kmpMembersList.length > 0 &&
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
            <TaskTable data={{ taskId: reqTaskData.taskId, dpCodesData: reqDpCodesData }} />
            <Modal title="Add New Board Member" width="80%" visible={isAddNewBoardVisible} footer={null} onCancel={() => setIsAddNewBoardVisible(false)}>
              <AddNewBoardMember />
            </Modal>

            <Modal title="Add New Kmp Member" width="80%" visible={isAddNewKMPVisible} footer={null} onCancel={() => setIsAddNewKMPVisible(false)}>
              <AddNewKMPMember />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
