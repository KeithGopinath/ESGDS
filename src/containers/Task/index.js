/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import 'antd/dist/antd.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import TaskTable from './TaskTable';
import Overlay from '../../components/Overlay';
import { ANALYST_DC_DATA, QA_DV_DATA, COMPANY_REP_DATA } from '../../containers/DataPage/apiData';

const Task = (props) => {
  const currentRole = sessionStorage.role;

  const sideBarRef = useRef();

  const tabs = ['Standalone', 'Matrix'];

  const tabsRef = useRef(tabs.map(() => React.createRef()));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'KEYISSUES_REQUEST' });
    defaultActiveTab();
  }, []);

  const keyIssueList = useSelector((state) => ((state.keyIssues.keyIssuesList) ? (state.keyIssues.keyIssuesList.rows) : ([{ keyIssueName: 'Shareholders rights' }])));

  const getDataForTable = (data) => {
    const { taskId } = props.location.state;
    const [filteredTask] = data.filter((e) => (e.taskId === taskId));
    return filteredTask;
  };

  const defaultApiData = () => {
    if (currentRole === 'Company Representative') {
      return COMPANY_REP_DATA;
    }
    if (currentRole === 'Client Representative') {
      return QA_DV_DATA;
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

  const currentData = getDataForTable(apiDataList);

  const [tableData, setTableData] = useState({ taskId: currentData.taskId, data: currentData.dpCodesData });

  const [dpCodeType, setDpCodeType] = useState('Standalone');

  const [showPopup, setShowPopup] = useState(false);

  const currentPillar = currentData.pillar;

  const currentTaskId = currentData.taskId;

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  };

  const onChangeKeyIssue = (event) => {
    if (event) {
      const selectedKeyIssue = event.value;
      const filteredData = currentData.dpCodesData.filter((e) => (e.keyIssue === selectedKeyIssue.keyIssueName));
      setTableData({ taskId: currentData.taskId, data: filteredData });
    } else {
      setTableData({ taskId: currentData.taskId, data: currentData.dpCodesData });
    }
  };

  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('active');
    if (currentTarget.innerHTML === 'Matrix') {
      setDpCodeType('matrix');
    }
    if (currentTarget.innerHTML === 'Standalone') {
      setDpCodeType('standalone');
    }
  };

  const addNewBoardMember = () => (
    <Row>
      {/* --------------------------------------------------------------------------------------------- DPCODE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Name*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" placeholder="Enter full name" />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Status*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" placeholder="Active or Inactive" />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={3}>
            BODP001
          </Form.Label>
          <Form.Label column sm={5}>
            Board member ethnicity/culture/nationality
          </Form.Label>
          <Col sm={4}>
            <Select
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={3}>
            BODR005
          </Form.Label>
          <Form.Label column sm={5}>
            Board member's declared gender
          </Form.Label>
          <Col sm={4}>
            <Select
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={3}>
            BOSP004
          </Form.Label>
          <Form.Label column sm={5}>
            Board member name
          </Form.Label>
          <Col sm={4}>
            <Select
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={3}>
            BOSP005
          </Form.Label>
          <Form.Label column sm={5}>
            Does the board member have industry experience?
          </Form.Label>
          <Col sm={4}>
            <Select
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={3}>
            BOSP006
          </Form.Label>
          <Form.Label column sm={5}>
            Does the board member have financial expertise?
          </Form.Label>
          <Col sm={4}>
            <Select
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
    </Row>
  );

  const boardMembersList = ['Shri Mukesh Kumar Surana', 'Shri Pushp Kumar Joshi', 'Shri Vinod S Shenoy', 'Shri R Kesavan', 'Shri Sunil Kumar', 'Shri Subhash Kumar'];

  const kmpMembersList = ['Shri Mukesh Kumar Surana', 'Shri Pushp Kumar Joshi', 'Shri Vinod S Shenoy', 'Shri R Kesavan', 'Shri Sunil Kumar', 'Shri Subhash Kumar'];

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="task-main" >
          <div className="task-info-group">
            <div className="task-id-year-wrap">
              <div className="task-pillar">{currentPillar}</div>
              <div className="task-id">{`Task Id: ${currentTaskId}`}</div>
            </div>
            {currentPillar === 'Governance' &&
              <div className="task-tabs-wrap">
                {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} id={tab} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
              </div>}
            {currentRole !== 'Company Representative' &&
            <Row>
              <Col lg={6}>
                <Form.Group as={Row}>
                  <Form.Label column sm={4}>
                    Key Issues*
                  </Form.Label>
                  <Col sm={6}>
                    <Select
                      name="userRole"
                      onChange={onChangeKeyIssue}
                      options={keyIssueList.map((keyIssue) => ({ label: keyIssue.keyIssueName, value: keyIssue }))}
                      isSearchable
                      isClearable
                      maxLength={30}
                    />
                  </Col>
                </Form.Group>
              </Col>
              {currentPillar === 'Governance' && dpCodeType === 'matrix' &&
              <React.Fragment>
                <Col lg={6}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      Board Members*
                    </Form.Label>
                    <Col sm={6}>
                      <Select
                        name="userRole"
                        options={boardMembersList.map((e) => ({ value: e, label: e }))}
                        isSearchable
                        isClearable
                        maxLength={30}
                      />
                    </Col>
                    <Col sm={2}>
                      <Button onClick={() => { setShowPopup(!showPopup); }}>+</Button>
                    </Col>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={4}>
                      KMP*
                    </Form.Label>
                    <Col sm={6}>
                      <Select
                        name="userRole"
                        options={kmpMembersList.map((e) => ({ value: e, label: e }))}
                        isSearchable
                        isClearable
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </React.Fragment>
              }
            </Row>}
            <TaskTable data={tableData} />
            {(currentRole === 'QA') &&
            <Col lg={12} className="task-button-wrap">
              <Button style={{ marginRight: '1.5%' }} onClick={null} variant="danger" type="submit">Reject</Button>
              <Button variant="success" onClick={null} type="submit">Submit</Button>
            </Col>}
            {(currentRole === 'Analyst') &&
            <Col lg={12} className="task-button-wrap">
              <Button variant="success" onClick={null} type="submit">Submit To QA</Button>
            </Col>}
          </div>
          <Overlay
            className="text-center otp-modal"
            show={showPopup}
            onHide={() => setShowPopup(false)}
            backdrop="static"
            keyboard={false}
            animation
            centered
            size="xl"
            title="Add New Board Member"
            body={addNewBoardMember()}
            alert={alert}
            primary="Submit"
            onSubmitPrimary={() => setShowPopup(false)}
            footer={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
