/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { history } from '../../routes';

const Reports = (props) => {
  const sideBarRef = useRef();
  const [tabFlag, setTabFlag] = useState();

  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.filterUsers.filterUsers);
  // const loading = useSelector((state) => state.filterUsers.isLoading);
  // const filteredUsers = userData && userData.data;

  useEffect(() => {
    if (tabsRefs.current[0]) {
      tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
      setTabFlag('Completed Companies');
    } else {
      tabsRefs.current[1].current.classList.add('tabs-label-count-wrap-active');
      setTabFlag('Pending Companies');
    }
  }, []);

  // completed company table
  const CompletedCompanyTableData = (props) => {
    const tableRowData = (data) => data.map((data, id) => ({
      companyName: data.companyName,
      completedDate: new Date().toDateString(),
      clientRep: data.clientRrepresentative,
      companyRep: data.companyRepresentative,
      viewTask: <FontAwesomeIcon className="view-icon" size="lg" key={id} icon={faEye} onClick={() => onView(data.companyName,id)} />
    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'center',
          label: 'Company Name',
          dataType: 'string',
        },
        {
          id: 'completedDate',
          align: 'center',
          label: 'Completed Date',
          dataType: 'date',
        },
        {
          id: 'clientRep',
          align: 'center',
          label: 'Client Representative',
          dataType: 'string',
        },
        {
          id: 'companyRep',
          align: 'center',
          label: 'Company Representative',
          dataType: 'string',
        },
        {
          id: 'viewTask',
          align: 'center',
          label: 'View Task',
          dataType: 'string',
        }
      ],
      tableLabel: <span>Completed Companies </span>,
    };
  };

  // pending company table
  const PendingCompanyTableData = (props) => {
    const tableRowData = (data) => data.map((data, id) => ({
      companyName: data.companyName,
      startedDate: data.completedDate,
      clientRep: data.clientRrepresentative,
      companyRep: data.companyRepresentative,
      viewTask: <FontAwesomeIcon className="view-icon" size="lg" key={id} icon={faEye} onClick={() => onView(data.companyName,id)} />

    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'center',
          label: 'Company Name',
          dataType: 'string',
        },
        {
          id: 'startedDate',
          align: 'center',
          label: 'Started Date',
          dataType: 'date',
        },
        {
          id: 'clientRep',
          align: 'center',
          label: 'Client Representative',
          dataType: 'string',
        },
        {
          id: 'companyRep',
          align: 'center',
          label: 'Company Representative',
          dataType: 'string',
        },
        {
          id: 'viewTask',
          align: 'center',
          label: 'View Task',
          dataType: 'string',
        }
      ],
      tableLabel: <span>Pending Companies</span>,
    };
  };

  const tabLabelSets = [
    { label: 'Completed Companies' },
    { label: 'Pending Companies' },
  ];

  const tabsRefs = useRef(tabLabelSets.map(() => React.createRef()));

  const tabsClickHandler = (event, label) => {
    tabsRefs.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const target = event.currentTarget;
    target.classList.add('tabs-label-count-wrap-active');
    setTabFlag(label)
  };

  const userData = [
    {
      pillar: 'Social',
      companyName: 'Reliance ltd.',
      completedDate: '10-07-2021',
      status: 'Completed',
      analyst: 'Rajesh',
      QA: 'Gopi',
      companyRepresentative: 'Praveen',
      clientRrepresentative: 'Balaji'
    },
    {
      pillar: 'Governance',
      companyName: 'Reliance Oils',
      completedDate: '10-07-2021',
      status: 'Completed',
      analyst: 'Jerin',
      QA: 'Gopi',
      companyRepresentative: 'Balaji',
      clientRrepresentative: 'Praveen'
    },
    {
      pillar: 'Environment',
      companyName: 'Indian Oils',
      completedDate: '10-07-2021',
      status: 'Completed',
      analyst: 'Balaji',
      QA: 'Rajesh',
      companyRepresentative: 'Praveen',
      clientRrepresentative: 'Jerin'
    },
    {
      pillar: 'Social',
      companyName: 'Indian Gas',
      completedDate: '10-07-2021',
      status: 'Pending',
      analyst: 'Jerin',
      QA: 'Balaji',
      companyRepresentative: 'Praveen',
      clientRrepresentative: 'Gopi',
    },
    {
      pillar: 'Governance',
      companyName: 'Hindustan Oils',
      completedDate: '10-07-2021',
      status: 'Pending',
      analyst: 'Balaji',
      QA: 'Rajesh',
      companyRepresentative: 'Gopi',
      clientRrepresentative: 'Praveen',
    },
  ];

  const pendingCompanyStatus = userData.filter((data) => (data.status === 'Pending'));
  const completedCompanyStatus = userData.filter((data) => (data.status === 'Completed'));

  const selecteTab = tabFlag === 'Pending Companies' ? PendingCompanyTableData(pendingCompanyStatus) : CompletedCompanyTableData(completedCompanyStatus);

  // View the pendong reports
  const onView = (companyName,id) => {
    history.push({ pathname:'/tasklist', state:companyName });
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Reports" />
        <div className="container-main">
          <div className="reports-tabs-stack">
            {tabLabelSets.map(({ label }, index) => (
              <div key={label} ref={tabsRefs.current[index]} onClick={(event) => (tabsClickHandler(event, label))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div>
            <CustomTable tableData={selecteTab} showDatePicker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
