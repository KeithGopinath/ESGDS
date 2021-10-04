/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Select, { components } from 'react-select';
import { Modal, Tooltip, message } from 'antd';

import { CloseCircleFilled, UserOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';

import { faUserPlus, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';

import AddNewKMPMember from './AddNewKMPMember';

import { history } from '../../routes';
import ValidationComments from './ValidationComments';

const FieldWrapper = (props) => {
  // PROPS ARE {VISIBLE}, {LABEL}, {BODY}, {SIZE} !
  if (props.visible) {
    return (
      <Col lg={props.size[0]}>
        <Form.Group as={Row} >
          <Form.Label column sm={props.size[1]}>
            {props.label}
          </Form.Label>
          <Col sm={props.size[2]}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

FieldWrapper.propTypes = {
  visible: PropTypes.bool.isRequired,
  size: PropTypes.array.isRequired,
  label: PropTypes.string,
  body: PropTypes.element,
};

const TaskTable = (props) => {
  const tablePopulate = ({ taskDetails, dpCodesData }) => dpCodesData.map((x) => ({
    key: `${x.dpCodeId}${x.memberName}${x.dpCode}${x.fiscalYear}`,
    dpCode: x.dpCode,
    fiscalYear: x.fiscalYear,
    status: x.status,
    action: (props.isAnalyst_DC && x.priority && x.priority.isDpcodeValidForCollection) || !props.isAnalyst_DC ?
      <Link
        to={{
          pathname: `/dpcode/${x.dpCode}`,
          state: { taskDetails, dpCodeDetails: x },
        }}
      >Enter Data
      </Link> :
      <Tooltip
        placement="left"
        title={
          <div>{(x.priority && x.priority.message) || 'Please Check'}</div>
        }
      ><span style={{ cursor: 'pointer' }}><ExclamationCircleTwoTone style={{ fontSize: 'medium' }} twoToneColor="#f18618" /></span>
      </Tooltip>,
  }));

  const TASK_DATA = {
    rowsData: tablePopulate(props),
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
    tableLabel: 'Pending DpCodes',
  };

  return (
    <CustomTable tableData={TASK_DATA} footerBesidePagination={props.footerBesidePagination} isLoading={props.isLoading} defaultNoOfRows={10} message={props.message} icon={props.icon} />
  );
};

TaskTable.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  icon: PropTypes.element,
  footerBesidePagination: PropTypes.element,
  isAnalyst_DC: PropTypes.bool,
};

const ControversyTaskTable = (props) => {
  const tablePopulate = ({ taskDetails, dpCodesData }) => dpCodesData.map((x) => ({
    key: x.dpCodeId,
    dpCode: x.dpCode,
    keyIssue: x.keyIssue || x.keyIssueName,
    reassessmentDate: x.reassessmentDate ? new Date(x.reassessmentDate).toDateString() : '-',
    reviewDate: x.reviewDate ? new Date(x.reviewDate).toDateString() : '-',
    controversyFiscalYearEndDate: x.controversyFiscalYearEndDate ? new Date(x.controversyFiscalYearEndDate).toDateString() : '-',
    action:
  <Link
    to={{
      pathname: `/controversydpcode/${x.dpCode}`,
      state: { taskDetails, dpCodeDetails: x },
    }}
  >Enter Data
  </Link>,
  }));

  const CONTROVERSY_TASK_DATA = {
    rowsData: tablePopulate(props),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'keyIssue', label: 'Key Issue', align: 'left', dataType: 'string',
      },
      {
        id: 'reassessmentDate', label: 'Reassessment Date', align: 'center', dataType: 'string',
      },
      {
        id: 'reviewDate', label: 'Review Date', align: 'center', dataType: 'string',
      },
      {
        id: 'controversyFiscalYearEndDate', label: 'Fiscal Year End Date', align: 'center', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Dp Codes',
  };

  return (
    <CustomTable tableData={CONTROVERSY_TASK_DATA} footerBesidePagination={props.footerBesidePagination} defaultNoOfRows={10} isLoading={props.isLoading} icon={props.icon} message={props.message} />
  );
};

ControversyTaskTable.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  icon: PropTypes.element,
  footerBesidePagination: PropTypes.element,
};

const ValidationTable = (props) => {
  const getDescription = (description) => {
    if (description.length > 0) {
      return (
        <Tooltip
          placement="top"
          color="#fff"
          overlayInnerStyle={{ width: 300 }}
          title={
            <div style={{ padding: '10px', color: '#444c59' }}>
              {description.map((e, i) => <div style={{ padding: '1%', borderTop: i > 0 ? '1px solid rgba(224, 224, 224, 1)' : 'none' }}>{e}</div>)}
            </div>
          }
        ><span style={{ cursor: 'pointer' }}>View</span>
        </Tooltip>);
    }
    return <div>-</div>;
  };
  const tablePopulate = ({ taskDetails, dpCodesData }) => dpCodesData.map((x) => ({
    key: `${x.dpCode}-${x.fiscalYear}-${x.memberId}`,
    dpCode: x.dpCode,
    fiscalYear: x.fiscalYear,
    description: getDescription(x.description),
    validationstatus: x.isValidResponse && x.description.length === 0 ?
      <div style={{ color: '#28a745' }}>Success</div> :
      <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <div style={{ color: '#e40e22' }}>Failed</div>
        <ValidationComments />
      </div>,
    action:
  <Link
    to={{
      pathname: `/dpcode/${x.dpCode}`,
      state: { taskDetails, dpCodeDetails: x },
    }}
  >Enter Data
  </Link>,
  }));

  const VALIDATION_DATA = {
    rowsData: tablePopulate(props),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'fiscalYear', label: 'Fiscal Year', align: 'left', dataType: 'string',
      },
      {
        id: 'description', label: 'Description', align: 'center', dataType: 'element',
      },
      {
        id: 'validationstatus', label: 'Status', align: 'center', dataType: 'element',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Validation Status',
  };

  return (
    <React.Fragment>
      <CustomTable tableData={VALIDATION_DATA} footerBesidePagination={props.footerBesidePagination} defaultNoOfRows={10} isLoading={props.isLoading} message={props.message} icon={props.icon} />
    </React.Fragment>
  );
};

ValidationTable.propTypes = {
  isLoading: PropTypes.bool,
  icon: PropTypes.element,
  message: PropTypes.string,
  footerBesidePagination: PropTypes.element,
};


const Task = (props) => {
  // SIDERBAR REF
  const sideBarRef = useRef();

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

  // DECLARING DISPATCH
  const dispatch = useDispatch();

  // USESELECTOR TO GET reqTASK From Store
  const reqTASK = useSelector((state) => state.task);
  const taskSubmitFromStore = useSelector((state) => state.taskSubmit);
  const derivedCalculationFromStore = useSelector((state) => state.derivedDataCalculation);
  const dpCodeValidationFromStore = useSelector((state) => state.dpCodeValidation);

  // STATES
  const [dpCodeType, setDpCodeType] = useState('Standalone');
  const [reqKeyIssue, setReqKeyIssue] = useState('');
  const [reqBoardMember, setReqBoardMember] = useState(null);
  const [reqKmpMember, setReqKmpMember] = useState(null);
  const [isAddNewBoardVisible, setIsAddNewBoardVisible] = useState(false);
  const [isAddNewKMPVisible, setIsAddNewKMPVisible] = useState(false);
  const [isTerminateBoardVisible, setIsTerminateBoardVisible] = useState(false);
  const [isTerminateKmpVisible, setIsTerminateKmpVisible] = useState(false);
  const [isPercentileCalculated, setIsPercentileCalculated] = useState(false);
  const [statusAlert, setStatusAlert] = useState(false);

  // TEMP VALIDATION VARIABLE
  const { isValidationCalled } = props.location.state;

  // VALUES FROM PENDING TASKS PAGE THROUGH PROPS.LOCATION.STATE
  let taskDetails = { ...props.location.state.taskDetails, memberType: dpCodeType, isValidationCalled };

  // IS TASKPAGE BUTTON DISABLED
  const isTaskButtonDisabled = reqTASK.isLoading || taskSubmitFromStore.isLoading || derivedCalculationFromStore.isLoading || dpCodeValidationFromStore.isLoading;

  const extractReqTask = () => {
    let returnableTask;
    if (isAnalyst_DC || isQA_DV || isAnalyst_DCR || isClientRep_DR || isCompanyRep_DR) {
      [returnableTask] = (reqTASK && reqTASK.task) ? [reqTASK.task] : [];
    }
    if (isAnalyst_CC) {
      // KEY NAMES CHANGES REQ FROM SHIVA !
      [returnableTask] = (reqTASK && reqTASK.task && reqTASK.task.data) ? [{ controversy: { ...reqTASK.task.data, dpCodesData: reqTASK.task.data.dpCodesList } }] : [];
    }
    if (isValidationCalled) {
      [returnableTask] = (dpCodeValidationFromStore && dpCodeValidationFromStore.validation) ? [dpCodeValidationFromStore.validation] : [];
    }
    return { ...returnableTask, ...taskDetails };
  };

  const getReqTaskList = () => {
    if (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) {
      if (dpCodeType === 'Standalone' && reqTaskData.standalone) {
        return reqTaskData.standalone;
      }
      if (dpCodeType === 'Board Matrix' && reqTaskData.boardMatrix) {
        return reqTaskData.boardMatrix;
      }
      if (dpCodeType === 'Kmp Matrix' && reqTaskData.kmpMatrix) {
        return reqTaskData.kmpMatrix;
      }
    }
    if (isAnalyst_CC && reqTaskData.controversy) {
      return reqTaskData.controversy;
    }
    return { dpCodesData: [] };
  };

  const reqTaskData = extractReqTask();
  const reqKeyIssuesList = dpCodeType === 'Standalone' && reqTaskData.keyIssuesList ? reqTaskData.keyIssuesList : [];
  const boardMembersList = dpCodeType === 'Board Matrix' && reqTaskData.boardMatrix ? (reqTaskData.boardMatrix.boardMemberList) : [];
  const kmpMembersList = dpCodeType === 'Kmp Matrix' && reqTaskData.kmpMatrix ? (reqTaskData.kmpMatrix.kmpMemberList) : [];
  const reqTaskList = getReqTaskList();

  const getReqDpCodesList = () => {
    if (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) {
      if (dpCodeType === 'Standalone') {
        if (reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.keyIssueId && e.keyIssueId === reqKeyIssue.value));
        }
        return reqTaskList.dpCodesData;
      }
      if (dpCodeType === 'Board Matrix') {
        if (reqBoardMember && reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqBoardMember.value && (e.keyIssueId && e.keyIssueId === reqKeyIssue.value)));
        }
        if (reqBoardMember && !reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqBoardMember.value));
        }
        return [];
      }
      if (dpCodeType === 'Kmp Matrix') {
        if (reqKmpMember && reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqKmpMember.value && (e.keyIssueId && e.keyIssueId === reqKeyIssue.value)));
        }
        if (reqKmpMember && !reqKeyIssue) {
          return reqTaskList.dpCodesData.filter((e) => (e.memberId && e.memberId === reqKmpMember.value));
        }
        return [];
      }
    }
    if (isAnalyst_CC) {
      return reqTaskList.dpCodesData;
    }
    return [];
  };

  const reqDpCodesData = getReqDpCodesList();

  // const taskToNextPage = {
  //   taskId: reqTaskData.taskId,
  //   pillar: reqTaskData.pillar,
  //   company: reqTaskData.company,
  //   companyId: reqTaskData.companyId,
  //   taskNumber: reqTaskData.taskNumber,
  //   memberType: reqTaskData.memberType,
  //   dpCodesData: reqDpCodesData,
  // };

  // sessionStorage.filteredData = isAnalyst_CC ? JSON.stringify(reqDpCodesData) : JSON.stringify(taskToNextPage);

  // Change Session storage to props.location.state
  const priorityCheckedList = isAnalyst_DC && !isValidationCalled ? [...reqDpCodesData].filter((e) => e.priority && e.priority.isDpcodeValidForCollection) : [...reqDpCodesData];
  taskDetails = { ...taskDetails, filteredData: priorityCheckedList };

  const tabs = ['Standalone', 'Board Matrix', 'Kmp Matrix'];
  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  };

  const getInCompleteDpCodes = () => {
    let allDpCodes = [];
    if (reqTaskData.standalone && reqTaskData.standalone.dpCodesData && reqTaskData.standalone.dpCodesData.length > 0) {
      allDpCodes = [...allDpCodes, ...reqTaskData.standalone.dpCodesData];
    }
    if (reqTaskData.boardMatrix && reqTaskData.boardMatrix.dpCodesData && reqTaskData.boardMatrix.dpCodesData.length > 0) {
      allDpCodes = [...allDpCodes, ...reqTaskData.boardMatrix.dpCodesData];
    }
    if (reqTaskData.kmpMatrix && reqTaskData.kmpMatrix.dpCodesData && reqTaskData.kmpMatrix.dpCodesData.length > 0) {
      allDpCodes = [...allDpCodes, ...reqTaskData.kmpMatrix.dpCodesData];
    }

    return isValidationCalled ? allDpCodes.filter((e) => e.isValidResponse === false || e.description.length > 0) : allDpCodes.filter((e) => e.status !== 'Completed');
  };

  // ONCLICK FUNCS
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

  const onSubmitTask = () => {
    const postableData = {
      companyId: taskDetails.companyId,
      year: taskDetails.fiscalYear,
      clientTaxonomyId: taskDetails.clientTaxonomyId,
      role: sessionStorage.role,
      taskId: taskDetails.taskId,
    };

    const inCompleteDpCodes = getInCompleteDpCodes();
    if (inCompleteDpCodes.length === 0) {
      dispatch({ type: 'TASK_SUBMIT_POST_REQUEST', payload: postableData });
      setStatusAlert(true);
    } else {
      message.error(`${inCompleteDpCodes[0].dpCode} of ${inCompleteDpCodes[0].memberName ? `Member: "${inCompleteDpCodes[0].memberName}"` : `KeyIssue: "${inCompleteDpCodes[0].keyIssue}"`} ${inCompleteDpCodes.length > 1 ? (inCompleteDpCodes.length <= 2 ? `& other ${inCompleteDpCodes.length - 1} dpCode is` : `& other ${inCompleteDpCodes.length - 1} dpCodes are`) : 'is'}  not completed !`);
    }
  };


  const onClickCalculateDerivedData = () => {
    const inCompleteDpCodes = getInCompleteDpCodes();
    if (inCompleteDpCodes.length === 0) {
      dispatch({ type: 'DERIVED_CALCULATION_POST_REQUEST', payload: { taskId: taskDetails.taskId } });
      setStatusAlert(true);
    } else {
      message.error(`${inCompleteDpCodes[0].dpCode} of ${inCompleteDpCodes[0].memberName ? `Member: "${inCompleteDpCodes[0].memberName}"` : `KeyIssue: "${inCompleteDpCodes[0].keyIssue}"`} ${inCompleteDpCodes.length > 1 ? (inCompleteDpCodes.length <= 2 ? `& other ${inCompleteDpCodes.length - 1} dpCode is` : `& other ${inCompleteDpCodes.length - 1} dpCodes are`) : 'is'}  not completed !`);
    }
  };

  const onClickValidate = () => {
    history.push({
      pathName: `/task/${props.location.state.taskId}`,
      state: {
        taskId: props.location.state.taskId,
        taskDetails,
        isValidationCalled: true,
      },
    });
  };

  const onClickBack = () => {
    setIsPercentileCalculated(false);
    history.push({
      pathName: `/task/${props.location.state.taskId}`,
      state: {
        taskId: props.location.state.taskId,
        taskDetails,
      },
    });
  };

  // ONCHANGE FUNCS
  const onChangeKeyIssue = (event) => {
    setReqKeyIssue(event);
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
      {(isAnalyst_DC || isQA_DV) &&
      <div>
        <Button style={{ width: '50%' }} variant="light" title="Add New Member" onClick={() => setIsAddNewKMPVisible(true)}><FontAwesomeIcon color="dodgerblue" icon={faUserPlus} /></Button>
        <Button style={{ width: '50%' }} variant="light" title="Terminate Member" onClick={() => setIsTerminateKmpVisible(true)}><FontAwesomeIcon color="red" icon={faUserTimes} /></Button>
      </div>}
      {e.children}
    </components.MenuList>
  );

  const BoardMemMenuList = (e) => (
    <components.MenuList {...e}>
      {(isAnalyst_DC || isQA_DV) &&
      <div>
        <Button style={{ width: '50%' }} variant="light" title="Add New Member" onClick={() => setIsAddNewBoardVisible(true)}><FontAwesomeIcon color="dodgerblue" icon={faUserPlus} /></Button>
        <Button style={{ width: '50%' }} variant="light" title="Terminate Member" onClick={() => setIsTerminateBoardVisible(true)}><FontAwesomeIcon color="red" icon={faUserTimes} /></Button>
      </div>}
      {e.children}
    </components.MenuList>
  );

  useEffect(() => {
    defaultActiveTab();
    setDpCodeType('Standalone');
  }, []);

  useEffect(() => {
    if (!isAnalyst_CC && !isValidationCalled) {
      dispatch({ type: 'TASK_GET_REQUEST', taskId: taskDetails.taskId });
    }
    if (isAnalyst_CC && !isValidationCalled) {
      dispatch({ type: 'CONTROVERSY_TASK_GET_REQUEST', taskId: taskDetails.taskId });
    }
    if (isValidationCalled) {
      dispatch({ type: 'DPCODE_VALIDATION_GET_REQUEST', taskId: taskDetails.taskId, previousYear: '2016-2017' });
    }
  }, [isValidationCalled]);

  useEffect(() => {
    setReqKeyIssue('');
  }, [dpCodeType]);

  useEffect(() => {
    if (taskSubmitFromStore.task && taskSubmitFromStore.task && statusAlert) {
      message.success(taskSubmitFromStore.task.message);
      history.push('/pendingtasks');
      setStatusAlert(false);
    }

    if (taskSubmitFromStore.error && statusAlert) {
      message.error(taskSubmitFromStore.error.message);
      setStatusAlert(false);
    }
  }, [taskSubmitFromStore]);

  useEffect(() => {
    if (derivedCalculationFromStore.calculation && statusAlert) {
      message.success(derivedCalculationFromStore.calculation.message);
      setIsPercentileCalculated(true);
      setStatusAlert(false);
    }

    if (derivedCalculationFromStore.error && statusAlert) {
      message.error(derivedCalculationFromStore.error.message || 'Something Went Wrong !');
      setIsPercentileCalculated(true);
      setStatusAlert(false);
    }
  }, [derivedCalculationFromStore]);

  const getFooterBesidePagination = () => (
    null
  );


  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="task-main" >
          <div className="task-info-group">
            <div className="task-id-year-wrap">
              {(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && <div className="task-pillar">{`${reqTaskData.company} / ${reqTaskData.pillar}`}</div>}
              {isAnalyst_CC && <div className="task-pillar">{reqTaskData.company}</div>}
              <div className="task-id">{`Task No: ${reqTaskData.taskNumber}`}</div>
            </div>
            {(reqTaskData.pillar === 'Governance' || reqTaskData.pillar === 'Corporate Governance') &&
              <div className="task-tabs-wrap">
                {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} id={tab} key={tab[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
              </div>}
            <div className="task-keyissue">
              <Row>
                {/* ONLY FOR STANDALONE */}
                {(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && dpCodeType === 'Standalone' &&
                  <FieldWrapper
                    label="Key Issues"
                    size={[6, 5, 7]}
                    visible
                    body={
                      <Select
                        name="userRole"
                        onChange={onChangeKeyIssue}
                        options={reqKeyIssuesList}
                        value={reqKeyIssue}
                        isSearchable
                        isClearable
                        maxLength={30}
                      />}
                  />}

                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { (reqTaskData.pillar === 'Governance' || reqTaskData.pillar === 'Corporate Governance') && dpCodeType === 'Board Matrix' &&
                  <FieldWrapper
                    label="Board Members"
                    visible
                    size={[6, 5, 7]}
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
                { (reqTaskData.pillar === 'Governance' || reqTaskData.pillar === 'Corporate Governance') && dpCodeType === 'Kmp Matrix' &&
                  <FieldWrapper
                    label="KMP Members"
                    visible
                    size={[6, 5, 7]}
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
            {(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isValidationCalled &&
              <TaskTable
                taskDetails={taskDetails}
                dpCodesData={(derivedCalculationFromStore.isLoading || taskSubmitFromStore.isLoading) ? [] : reqDpCodesData}
                isLoading={(isAddNewBoardVisible || isAddNewKMPVisible || isTerminateBoardVisible || isTerminateKmpVisible) ? false : (derivedCalculationFromStore.isLoading || reqTASK.isLoading || taskSubmitFromStore.isLoading)}
                message={(reqTASK.error) ? (reqTASK.error.message || 'Something went wrong !') : (dpCodeType === 'Board Matrix' || dpCodeType === 'Kmp Matrix') && (reqDpCodesData.length === 0) ? 'Please select member!' : null}
                icon={(reqTASK && reqTASK.error) ? <CloseCircleFilled /> : (dpCodeType === 'Board Matrix' || dpCodeType === 'Kmp Matrix') && (reqDpCodesData.length === 0) ? <UserOutlined /> : null}
                footerBesidePagination={getFooterBesidePagination()}
                isAnalyst_DC={isAnalyst_DC}
              />}

            {isAnalyst_CC &&
              <ControversyTaskTable
                taskDetails={taskDetails}
                dpCodesData={reqDpCodesData}
                isLoading={reqTASK.isLoading}
                message={(reqTASK.error) ? (reqTASK.error.message || 'Something went wrong !') : null}
                icon={(reqTASK && reqTASK.error) ? <CloseCircleFilled /> : null}
                footerBesidePagination={getFooterBesidePagination()}
              />}

            {(isAnalyst_DC || isAnalyst_DCR) && isValidationCalled &&
              <ValidationTable
                taskDetails={taskDetails}
                dpCodesData={(dpCodeValidationFromStore.isLoading || taskSubmitFromStore.isLoading) ? [] : reqDpCodesData}
                isLoading={(isAddNewBoardVisible || isAddNewKMPVisible || isTerminateBoardVisible || isTerminateKmpVisible) ? false : (derivedCalculationFromStore.isLoading || dpCodeValidationFromStore.isLoading || taskSubmitFromStore.isLoading)}
                message={(dpCodeValidationFromStore.error) ? (dpCodeValidationFromStore.error.message || 'Something went wrong !') : (dpCodeType === 'Board Matrix' || dpCodeType === 'Kmp Matrix') && (reqDpCodesData.length === 0) ? 'Please select member!' : null}
                icon={(dpCodeValidationFromStore && dpCodeValidationFromStore.error) ? <CloseCircleFilled /> : (dpCodeType === 'Board Matrix' || dpCodeType === 'Kmp Matrix') && (reqDpCodesData.length === 0) ? <UserOutlined /> : null}
                footerBesidePagination={getFooterBesidePagination()}
              />}
            {!isTaskButtonDisabled &&
            <Col lg={12} className="datapage-button-wrap" style={{ marginBottom: '3%' }}>
              {/* Button */}
              { (((isAnalyst_DC || isAnalyst_DCR) && (isPercentileCalculated && (isValidationCalled || !taskDetails.isValidationRequired))) || isQA_DV || isCompanyRep_DR || isClientRep_DR) &&
              <Button className="datapage-button" variant="success" disable={isTaskButtonDisabled} onClick={onSubmitTask}>Submit</Button>}

              {/* { (isQA_DV || isClientRep_DR || isCompanyRep_DR) &&
                <Button className="datapage-button" variant="info" onClick={onSubmitTask2}>ReAssign</Button>} */}

              { (isAnalyst_DC || isAnalyst_DCR) && !isValidationCalled && !isPercentileCalculated &&
              <Button className="datapage-button" variant="success" disable={isTaskButtonDisabled} onClick={onClickCalculateDerivedData} >Calculate Derived Data</Button>}

              { (isAnalyst_DC || isAnalyst_DCR) && isPercentileCalculated && !isValidationCalled && taskDetails.isValidationRequired &&
              <Button className="datapage-button" variant="info" disable={isTaskButtonDisabled} onClick={onClickValidate}>Validate</Button>}
              { (isAnalyst_DC || isAnalyst_DCR) && isPercentileCalculated &&
              <Button className="datapage-button" variant="danger" disable={isTaskButtonDisabled} onClick={onClickBack}>Back</Button>}

            </Col>}

            {isAddNewBoardVisible &&
              <Modal title="Add New Board Member" className="task-modal" maskClosable={false} width="80%" visible={isAddNewBoardVisible} footer={null} onCancel={() => setIsAddNewBoardVisible(false)}>
                {isAddNewBoardVisible && <AddNewKMPMember modalType="AddNewBoardType" taskDetails={taskDetails} closeModal={() => setIsAddNewBoardVisible(false)} />}
              </Modal>}

            {isAddNewKMPVisible &&
              <Modal title="Add New Kmp Member" className="task-modal" maskClosable={false} width="80%" visible={isAddNewKMPVisible} footer={null} onCancel={() => setIsAddNewKMPVisible(false)}>
                {isAddNewKMPVisible && <AddNewKMPMember modalType="AddNewKmpType" taskDetails={taskDetails} closeModal={() => setIsAddNewKMPVisible(false)} />}
                {/* {isAddNewKMPVisible && <AddNewBoardMember reqYears={reqTaskData.fiscalYear} reqMemberType="kmpMatrix" onCloseAddNewMemberModal={() => setIsAddNewKMPVisible(false)} />} */}
              </Modal>}

            {isTerminateBoardVisible &&
              <Modal title="Terminate Board Member" className="task-modal" maskClosable={false} width="80%" style={{ maxWidth: '700px' }} visible={isTerminateBoardVisible} footer={null} onCancel={() => setIsTerminateBoardVisible(false)}>
                {isTerminateBoardVisible && <AddNewKMPMember modalType="TerminateBoardType" taskDetails={taskDetails} closeModal={() => setIsTerminateBoardVisible(false)} />}
              </Modal>}

            {isTerminateKmpVisible &&
              <Modal title="Terminate Kmp Member" className="task-modal" maskClosable={false} width="80%" style={{ maxWidth: '700px' }} visible={isTerminateKmpVisible} footer={null} onCancel={() => setIsTerminateKmpVisible(false)}>
                {isTerminateKmpVisible && <AddNewKMPMember modalType="TerminateKmpType" taskDetails={taskDetails} closeModal={() => setIsTerminateKmpVisible(false)} />}
              </Modal>}
          </div>
        </div>
      </div>
    </div>
  );
};

Task.propTypes = {
  location: PropTypes.object,
};

export default Task;

