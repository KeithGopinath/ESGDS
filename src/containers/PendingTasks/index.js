/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/first */

import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import UsersTable from '../../components/UsersTable/index';

// FUNCTION THAT RETURNS THE PENDING TASK TABLE
const PendingTaskTable = () => {
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

  // TABLE DATA

  const tablePopulate = (data) => data.map(({
    taskId, pillar, company, year, status,
  }) => ({
    taskId, pillar, company, year, status, action: <Link to={`/pendingtasks/${taskId}`}>Enter</Link>,
  }));

  const PENDING_TASK_DATA = {
    rowsData: tablePopulate(apiData),
    columnsHeadData: [
      {
        id: 'taskId', label: 'Task Id', align: 'left', dataType: 'string',
      },
      {
        id: 'pillar', label: 'Pillar', align: 'left', dataType: 'string',
      },
      {
        id: 'company', label: 'Company', align: 'left', dataType: 'string',
      },
      {
        id: 'year', label: 'Year', align: 'left', dataType: 'string',
      },
      {
        id: 'status', label: 'Status', align: 'left', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Tasks',
  };

  return (
    <UsersTable tableData={PENDING_TASK_DATA} />
  );
};

// FUNCTION THAT RETURNS THE PENDING TASK PAGE
const PendingTasks = () => {
  const sideBarRef = useRef();
  const currentRole = sessionStorage.role;
  const tabs = (currentRole === 'QA') ? ['Data Verification', 'Data Correction'] : ['Data Collection', 'Data Correction'];
  const tabsRef = useRef(tabs.map(() => React.createRef()));

  useEffect(() => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('pendingtasks-tab-active');
    }
  }, []);

  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('pendingtasks-tab-active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('pendingtasks-tab-active');
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Pending Tasks" />
        <div className="container-main" >
          <div className="pendingtasks-tabs-wrap">
            {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} onClick={onClickTabChanger} className="pendingtasks-tabs">{tab}</div>))}
          </div>
          <PendingTaskTable />
        </div>
      </div>
    </div>
  );
};


export default PendingTasks;
