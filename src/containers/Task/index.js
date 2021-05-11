/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import 'antd/dist/antd.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
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
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'text',
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
          status: 'Uncompleted',
          description: "Board member's fixed cash based compensation",
          dataType: 'number',
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
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'date',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
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
              description: 'Does the board member hold a seat in the audit committee ?',
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
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'text',
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
          status: 'Uncompleted',
          description: "Board member's fixed cash based compensation",
          dataType: 'number',
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
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'date',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
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
              description: 'Does the board member hold a seat in the audit committee ?',
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
      data: [
        {
          dpCode: 'AUDP001',
          fiscalYear: '2018-2019',
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'text',
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
          status: 'Uncompleted',
          description: "Board member's fixed cash based compensation",
          dataType: 'number',
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
          status: 'Uncompleted',
          description: 'Does the board member hold a seat in the audit committee ?',
          dataType: 'date',
          historyDpData: [
            {
              dpCode: 'BOIR017',
              fiscalYear: '2017-2018',
              status: 'Completed',
              description: 'Does the board member hold a seat in the audit committee ?',
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
              description: 'Does the board member hold a seat in the audit committee ?',
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
  useEffect(() => {
    defaultActiveTab();
  }, []);

  const getDataForTable = (data) => {
    const { taskId } = props.match.params;
    console.log(taskId, 'kkk', data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].taskId === taskId) {
        return data[i];
      }
    }
    return null;
  };
  const currentData = getDataForTable(apiData);
  const tableData = { taskId: currentData.taskId, data: currentData.data };
  const currentRole = sessionStorage.role;
  const currentPillar = currentData.pillar;
  const currentTaskId = currentData.taskId;

  const addNewBoardMember = () => (
    <Row>
      {/* --------------------------------------------------------------------------------------------- DPCODE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Company Id*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" placeholder="Enter company id" />
          </Col>
        </Form.Group>
      </Col>
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
    </Row>
  );

  const defaultActiveTab = () => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
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
        <Header sideBarRef={sideBarRef} />
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
                      {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
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
                        // onChange={}
                        options={[
                          { value: 'Audit committee functioning', label: 'Audit committee functioning' },
                          { value: 'Board compensation', label: 'Board compensation' },
                          { value: 'Board diversity', label: 'Board diversity' },
                          { value: 'Board independence', label: 'Board independence' },
                          { value: 'Board structure and functioning', label: 'Board structure and functioning' },
                          { value: 'Committee Functioning', label: 'Committee Functioning' },
                        ]}
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
            size="lg"
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
