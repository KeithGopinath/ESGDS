/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Select, { components } from 'react-select';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CustomTable from '../../components/CustomTable/index';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { ANALYST_DC_DATA, QA_DV_DATA, COMPANY_REP_DATA } from '../../containers/DataPage/apiData';
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
  const currentRole = sessionStorage.role;

  const tabLabel = sessionStorage.tab;

  // GET REQ ROLE BASED BOOLEANS
  const [isAnalyst, isQA, isCompanyRep, isClientRep] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  const sideBarRef = useRef();

  const getReqAPIData = () => {
    console.log(tabLabel === 'Data Correction', tabLabel === 'Data Collection');
    if (isClientRep) { return COMPANY_REP_DATA; }
    if (isCompanyRep) { return COMPANY_REP_DATA; }
    if (isQA) { return QA_DV_DATA; }
    if (isAnalyst && tabLabel === 'Data Collection') { return ANALYST_DC_DATA; }
    if (isAnalyst && tabLabel === 'Data Correction') { return QA_DV_DATA; }
    return [];
  };

  const extractReqTask = (data) => {
    const { taskId } = props.location.state;
    const [filteredTask] = data.filter((e) => (e.taskId === taskId));
    return filteredTask;
  };


  const [reqAPIData, setReqAPIData] = useState(extractReqTask(getReqAPIData()));

  const [dpCodeType, setDpCodeType] = useState('Standalone');

  const [reqKeyIssue, setReqKeyIssue] = useState('');

  const [isAddNewBoardVisible, setIsAddNewBoardVisible] = useState(false);

  const [isAddNewKMPVisible, setIsAddNewKMPVisible] = useState(false);


  useEffect(() => {
    setReqAPIData(extractReqTask(getReqAPIData()));
    setDpCodeType('Standalone');
  }, []);

  useState(() => {
    setReqKeyIssue('');
  }, [dpCodeType]);

  const getReqTableData2 = (reqData) => {
    if (dpCodeType) {
      if (reqKeyIssue) {
        return {
          ...reqData,
          dpCodesData: reqData.dpCodesData.filter((e) => ((e.isStandAloneOrMatrix === dpCodeType) && (e.keyIssue === reqKeyIssue.name))),
        };
      }
      return {
        ...reqData,
        dpCodesData: reqData.dpCodesData.filter((e) => (e.isStandAloneOrMatrix === dpCodeType)),
      };
    }
    return {
      ...reqData,
      dpCodesData: reqData.dpCodesData.filter((e) => (e.isStandAloneOrMatrix === dpCodeType)),
    };
  };

  console.log(reqAPIData);

  const reqTableData2 = getReqTableData2(reqAPIData);


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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'KEYISSUES_REQUEST' });
    defaultActiveTab();
  }, []);

  // useSelector((state) => ((state.keyIssues.keyIssuesList) ? (state.keyIssues.keyIssuesList.rows) :
  const reqKeyIssuesAPIData = ([
    {
      id: 0, name: 'Biodiversity impact', type: 'Standalone', subType: null,
    },
    {
      id: 1, name: 'Shareholders rights', type: 'Matrix', subType: 'Board Member',
    },
    {
      id: 3, name: 'Management structure', type: 'Matrix', subType: 'KMP',
    },
  ]);


  const reqBoardMemAPIData = ['Shri Mukesh Kumar Surana', 'Shri Pushp Kumar Joshi'];

  const reqKMPAPIData = ['Shri R Kesavan', 'Shri Sunil Kumar'];

  const onChangeKeyIssue = (event) => {
    if (event) {
      setReqKeyIssue(event.value);
    } else {
      setReqKeyIssue(event);
    }
  };

  const tabs = ['Standalone', 'Matrix'];

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  };

  useEffect(() => {
    defaultActiveTab();
  }, []);

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

  sessionStorage.filteredData = JSON.stringify(reqTableData2);


  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="container-main" >
          <div className="task-info-group">
            <div className="task-id-year-wrap">
              <div className="task-pillar">{`${reqAPIData.company} / ${reqAPIData.pillar}`}</div>
              <div className="task-id">{`Task Id: ${reqAPIData.taskId}`}</div>
            </div>
            {reqAPIData.pillar === 'Governance' &&
              <div className="task-tabs-wrap">
                {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} id={tab} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
              </div>}
            <div className="task-keyissue">
              <Row>
                <FieldWrapper
                  label="Key Issues*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={onChangeKeyIssue}
                      options={(reqKeyIssuesAPIData.filter((e) => (e.type === dpCodeType))).map((keyIssue) => ({ label: keyIssue.name, value: keyIssue }))}
                      isSearchable
                      isClearable
                      maxLength={30}
                    />}
                />
                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { reqAPIData.pillar === 'Governance' && (reqKeyIssue && reqKeyIssue.subType === 'Board Member') &&
                <FieldWrapper
                  label="Board Members*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={null}
                      options={reqBoardMemAPIData.map((boardMember) => ({ label: boardMember, value: boardMember }))}
                      isSearchable
                      isClearable
                      maxLength={30}
                      components={{ MenuList: BoardMemMenuList }}
                    />}
                />}
                {/* ONLY FOR GOVERNANCE > MATRIX */}
                { reqAPIData.pillar === 'Governance' && (reqKeyIssue && reqKeyIssue.subType === 'KMP') &&
                <FieldWrapper
                  label="KMP*"
                  visible
                  body={
                    <Select
                      name="userRole"
                      onChange={null}
                      options={reqKMPAPIData.map((KMPMember) => ({ label: KMPMember, value: KMPMember }))}
                      isSearchable
                      isClearable
                      maxLength={30}
                      components={{ MenuList: KMPMenuList }}
                    />}
                />}
              </Row>
            </div>
            <TaskTable data={reqTableData2} />
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
