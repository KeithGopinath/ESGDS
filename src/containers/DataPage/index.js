/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
import { Col, Card, Accordion } from 'react-bootstrap';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'antd/dist/antd.css';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import DataSheet from './DataSheet';


const DataPage = (props) => {
  const sideBarRef = useRef();
  const [historyToggleArrow, setHistoryToggleArrow] = useState(false);
  const [currentToggleArrow, setCurrentToggleArrow] = useState(true);
  // const { Panel } = Collapse;

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

  const getDataForTable = (data) => {
    const { taskId, dpcode } = props.match.params;
    console.log(taskId, dpcode, data);
    const [currentTask] = data.filter((task) => (task.taskId === taskId));
    const max = currentTask.data.length - 1;
    const min = 0;
    return (currentTask.data.map((dpData, index) => {
      if (dpData.dpCode === dpcode) {
        return ({
          maxIndex: max, minIndex: min, currentIndex: index, currentDpCode: dpData, currentTask,
        });
      }
      return null;
    })).filter((e) => (e !== null));
  };

  const [{
    maxIndex, minIndex, currentIndex, currentDpCode, currentTask,
  }] = getDataForTable(apiData);
  console.log(getDataForTable(apiData));


  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <div className="datapage-main" >
          <div className="datapage-info-group">
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <Accordion>
                <Card>
                  <Card.Header style={{ backgroundColor: '#2199c8', display: 'flex', justifyContent: 'space-between' }}>
                    <Accordion.Toggle
                      style={{
                        border: 'none', background: 'none', fontWeight: 500, color: '#fff', fontSize: 'larger',
                      }}
                      eventKey="0"
                      onClick={(e) => { setHistoryToggleArrow(!historyToggleArrow); }}
                    >History
                    </Accordion.Toggle>
                    <Accordion.Toggle
                      style={{
                        border: 'none', background: 'none', fontWeight: 500, color: '#fff', fontSize: 'larger',
                      }}
                      eventKey="0"
                      onClick={(e) => { setHistoryToggleArrow(!historyToggleArrow); }}
                    ><FontAwesomeIcon icon={historyToggleArrow ? faAngleDown : faAngleUp} />
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <DataSheet historyDpCodeData currentDpCode={currentDpCode} location={props.location} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header style={{ backgroundColor: '#2199c8', display: 'flex', justifyContent: 'space-between' }}>
                    <Accordion.Toggle
                      style={{
                        border: 'none', background: 'none', fontWeight: 500, color: '#fff', fontSize: 'larger',
                      }}
                      eventKey="0"
                      onClick={(e) => { setCurrentToggleArrow(!currentToggleArrow); }}
                    >Current
                    </Accordion.Toggle>
                    <Accordion.Toggle
                      style={{
                        border: 'none', background: 'none', fontWeight: 500, color: '#fff', fontSize: 'larger',
                      }}
                      eventKey="0"
                      onClick={(e) => { setCurrentToggleArrow(!currentToggleArrow); }}
                    ><FontAwesomeIcon icon={currentToggleArrow ? faAngleDown : faAngleUp} />
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <DataSheet maxIndex={maxIndex} minIndex={minIndex} currentIndex={currentIndex} currentDpCode={currentDpCode} currentTask={currentTask} location={props.location} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
            {/* <Collapse accordion>
              <Panel header="This is panel header 1" key="1">
                <DataX maxIndex={maxIndex} minIndex={minIndex} currentIndex={currentIndex} currentDpCode={currentDpCode} currentTask={currentTask} location={props.location} />
              </Panel>
            </Collapse> */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default DataPage;
