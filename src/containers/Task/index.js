/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
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


const Task = (props) => {
  const apiData = [
    {
      taskId: '0001',
      pillar: 'Environmental',
      company: 'Reliance Ltd',
      year: '2018-2019',
      status: 'Yet to start',
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Completed',
          description: 'Does the board member hold a seat in the audit committee ?',
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'text',
          keyIssue: 'Shareholders rights',
          historyDpData: [
            {
              dpCode: 'AUDP001',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Yes',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'AUDP001',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'No',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOCR013',
          fiscalYear: '2018-2019',
          status: 'Completed',
          description: "Board member's fixed cash based compensation",
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'number',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOCR013',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: '21321',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOCR013',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: '213123',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOIR017',
          fiscalYear: '2018-2019',
          status: 'Yet to start',
          description: 'Board member date of appointment',
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'date',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOIR017',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
      ],
    },
    {
      taskId: '0002',
      pillar: 'Social',
      company: 'Reliance Ltd',
      year: '2018-2019',
      status: 'In progress',
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Completed',
          description: 'Does the board member hold a seat in the audit committee ?',
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'text',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'AUDP001',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Yes',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'AUDP001',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'No',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOCR013',
          fiscalYear: '2018-2019',
          status: 'Completed',
          description: "Board member's fixed cash based compensation",
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'number',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOCR013',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: '21321',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOCR013',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: '213123',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOIR017',
          fiscalYear: '2018-2019',
          status: 'Yet to start',
          description: 'Board member date of appointment',
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'date',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOIR017',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
      ],
    },
    {
      taskId: '0003',
      pillar: 'Governance',
      company: 'Reliance Ltd',
      year: '2018-2019',
      status: 'Submitted',
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Completed',
          description: 'Does the board member hold a seat in the audit committee ?',
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'text',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'AUDP001',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Yes',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'AUDP001',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
              dataType: 'text',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'No',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOCR013',
          fiscalYear: '2018-2019',
          status: 'Completed',
          description: "Board member's fixed cash based compensation",
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'number',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOCR013',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: '21321',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOCR013',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: "Board member's fixed cash based compensation",
              dataType: 'number',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: '213123',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
        {
          dpCode: 'BOIR017',
          fiscalYear: '2018-2019',
          status: 'Yet to start',
          description: 'Board member date of appointment',
          isStandAloneOrMatrix: 'Standalone',
          dataType: 'date',
          keyIssue: 'Audit committee functioning',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '58',
              filePath: '',
              publicationDate: 'Tue May 11 2017',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet One',
              url: 'www.ac.com',
            },
            {
              dpCode: 'BOIR017',
              fiscalYear: '2016-2017',
              status: 'Completed',
              description: 'Board member date of appointment',
              dataType: 'date',
              pageNo: '42',
              filePath: '',
              publicationDate: 'Tue May 01 2016',
              response: 'Tue May 01 2016',
              screen: 'Na',
              source: { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: 'Tue May 04 2021' },
              textSnippet: 'Snippet Two',
              url: 'www.ab.com',
            },
          ],
        },
      ],
    },
  ];
  const sideBarRef = useRef();
  const tabs = ['Standalone', 'Matrix'];
  const tabsRef = useRef(tabs.map(() => React.createRef()));
  // ---------------------------------------------
  // ---------------------------------------------
  const [show, setShow] = useState(false);
  const [dpCodeType, setdpCodeType] = useState('standalone');
  // =============================================
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'KEYISSUES_REQUEST' });
  }, []);
  useEffect(() => {
    defaultActiveTab();
  }, []);
  const keyIssueList = useSelector((state) => ((state.keyIssues.keyIssuesList) ? (state.keyIssues.keyIssuesList.rows) : ([])));

  const getDataForTable = (data) => {
    const { taskId } = props.location.state;
    const [filteredTask] = data.filter((e) => (e.taskId === taskId));
    return filteredTask;
  };
  const currentData = getDataForTable(apiData);
  const [tableData, setTableData] = useState({ taskId: currentData.taskId, data: currentData.data });
  const currentRole = 'Analyst';
  const currentPillar = currentData.pillar;
  const currentTaskId = currentData.taskId;
  const onChangeKeyIssue = (event) => {
    if (event) {
      const selectedKeyIssue = event.value;
      const filteredData = currentData.data.filter((e) => (e.keyIssue === selectedKeyIssue.keyIssueName));
      setTableData({ taskId: currentData.taskId, data: filteredData });
    } else {
      setTableData({ taskId: currentData.taskId, data: currentData.data });
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

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
      if (defaultTab.id === 'Standalone') {
        console.log('Standalone');
      } else if (defaultTab.id === 'Matrix') {
        console.log('Matrix');
      }
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
      setdpCodeType('matrix');
    }
    if (currentTarget.innerHTML === 'Standalone') {
      setdpCodeType('standalone');
    }
  };

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
              {/* <div className="task-year">
                <Select
                  name="userRole"
                  placeholder="Year"
                  // value={""}
                  // onChange={}
                  // options={}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                />
              </div> */}
            </div>
            <Row>
              <React.Fragment>
                {currentPillar === 'Governance' ?
                  <Col xs={12}>
                    <div className="task-tabs-wrap">
                      {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} id={tab} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
                    </div>
                  </Col> : null }
                <Col lg={6}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                      Key Issues*
                    </Form.Label>
                    <Col sm={6}>
                      <Select
                        name="userRole"
                        // value={""}
                        onChange={onChangeKeyIssue}
                        options={keyIssueList.map((keyIssue) => ({ label: keyIssue.keyIssueName, value: keyIssue }))}
                        isSearchable
                        isClearable
                        // className={}
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                {currentPillar === 'Governance' && dpCodeType === 'matrix' ?
                  <Col lg={6}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Form.Label column sm={4}>
                        Board Members*
                      </Form.Label>
                      <Col sm={6}>
                        <Select
                          name="userRole"
                          // value={""}
                          // onChange={}
                          options={[
                            { value: 'Shri Mukesh Kumar Surana', label: 'Shri Mukesh Kumar Surana' },
                            { value: 'Shri Pushp Kumar Joshi', label: 'Shri Pushp Kumar Joshi' },
                            { value: 'Shri Vinod S Shenoy', label: 'Shri Vinod S Shenoy' },
                            { value: 'Shri R Kesavan', label: 'Shri R Kesavan' },
                            { value: 'Shri Sunil Kumar', label: 'Shri Sunil Kumar' },
                            { value: 'Shri Subhash Kumar', label: 'Shri Subhash Kumar' },
                          ]}
                          isSearchable
                          isClearable
                          // className={}
                          maxLength={30}
                        />
                      </Col>
                      <Col sm={2}>
                        <Button onClick={() => { setShow(!show); }}>+</Button>
                      </Col>
                    </Form.Group>
                  </Col> : null}
                {currentPillar === 'Governance' && dpCodeType === 'matrix' ?
                  <Col lg={6}>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                      <Form.Label column sm={4}>
                        KMP*
                      </Form.Label>
                      <Col sm={6}>
                        <Select
                          name="userRole"
                          // value={""}
                          // onChange={}
                          options={[
                            { value: 'Shri Mukesh Kumar Surana', label: 'Shri Mukesh Kumar Surana' },
                            { value: 'Shri Pushp Kumar Joshi', label: 'Shri Pushp Kumar Joshi' },
                            { value: 'Shri Vinod S Shenoy', label: 'Shri Vinod S Shenoy' },
                            { value: 'Shri R Kesavan', label: 'Shri R Kesavan' },
                            { value: 'Shri Sunil Kumar', label: 'Shri Sunil Kumar' },
                            { value: 'Shri Subhash Kumar', label: 'Shri Subhash Kumar' },
                          ]}
                          isSearchable
                          isClearable
                          // className={}
                          maxLength={30}
                        />
                      </Col>
                      {/* <Col sm={2}>
                        <Button onClick={() => { setShow(!show); }}>+</Button>
                      </Col> */}
                    </Form.Group>
                  </Col> : null}
                <Col className="task-table-col" sm={12}>
                  <TaskTable data={tableData} />
                </Col>
                {(currentRole === 'QA') ?
                  <React.Fragment>
                    <Col lg={12} className="task-button-wrap">
                      <Button style={{ marginRight: '1.5%' }} onClick={null} variant="danger" type="submit">Reject</Button>
                      <Button variant="success" onClick={null} type="submit">Submit</Button>
                    </Col>
                  </React.Fragment> :
                  (
                    <Col lg={12} className="task-button-wrap">
                      <Button variant="success" onClick={null} type="submit">Submit To QA</Button>
                    </Col>
                  )}
              </React.Fragment>
            </Row>
          </div>
          <Overlay
            className="text-center otp-modal"
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            animation
            centered
            size="xl"
            title="Add New Board Member"
            body={addNewBoardMember()}
            alert={alert}
            primary="Submit"
            onSubmitPrimary={() => setShow(false)}
            footer={null}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
