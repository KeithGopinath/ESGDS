/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';
import XLSX from "xlsx";
import FileSaver from "file-saver";
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

  // download the table data into excel


  // const onDownload = (id) => {
  //   const workSheet = XLSX.utils.json_to_sheet(tabFlag === 'Completed Companies' ? completedCompanyStatus : pendingCompanyStatus);
  //   const workBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workBook, workSheet, (tabFlag === 'Completed Companies' ? 'Completed Companies List' : 'Pending Companies List'));
  //   let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  //   XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  //   XLSX.writeFile(workBook, (tabFlag === 'Completed Companies' ? 'Completed Companies List.xlsx' : 'Pending Companies List.xlsx'));
  // };

  const onDownloadCompanyReport = (id) => {
    const workSheet = XLSX.utils.json_to_sheet(viewCompanyData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${companyName}`);
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, `${companyName}.xlsx`);
  };

  // completed company table
  const CompletedCompanyTableData = (props) => {
    const tableRowData = (data) => data.map((data, id) => ({
      companyName: data.companyName,
      completedDate: new Date().toDateString(),
      download: <FontAwesomeIcon className="download-icon" size="lg" key={id} icon={faDownload} onClick={() => onDownload(id)} />
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
          id: 'download',
          align: 'center',
          label: 'Download',
          dataType: 'date',
        }
      ],
      tableLabel: <span>Completed Companies </span>,
    };
  };

  // pending company table
  const PendingCompanyTableData = (props) => {
    const tableRowData = (data) => data.map((data, id) => ({
      companyName: data.companyName,
      // completedDate: data.completedDate,
      download: <FontAwesomeIcon className="download-icon" size="lg" key={id} icon={faDownload} onClick={() => onDownload(id)} />,
      viewStatus: <FontAwesomeIcon className="view-icon" size="lg" key={id} icon={faEye} onClick={() => onView(data.companyName,id)} />

    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'companyName',
          align: 'left',
          label: 'Company Name',
          dataType: 'string',
        },
        // {
        //   id: 'completedDate',
        //   align: 'center',
        //   label: 'Completed Date',
        //   dataType: 'date',
        // },
        {
          id: 'download',
          align: 'center',
          label: 'Download',
          dataType: 'date',
        },
        {
          id: 'viewStatus',
          align: 'center',
          label: 'View Status',
          dataType: 'date',
        }
      ],
      tableLabel: <span>Pending Companies
        {/* <FontAwesomeIcon className="download-icon" icon={faDownload} onClick={onDownload} /> */}
      </span>,
    };
  };

  const onViewTaskList = (id) => {
    history.push({ pathname:'/tasklist', state:companyName });
  };
  
  // Reports View
  const reportTaskTableData = (props) => {
    console.log("props data :", props);
    const tableRowData = (data) => {
    console.log("props data :", data);
    }
    // const tableRowData = (data) => data.map((data,id) => ({
    //   // companyName: data.companyName,
    //   pillar:data.pillar,
    //   completedDate: data.completedDate,
    //   QA:data.QA,
    //   analyst:data.analyst,
    //   viewStatus: <FontAwesomeIcon className="view-icon text-success" size="lg" key={id} icon={faEye} onClick={() => onViewTaskList(data.companyName,id)} />
    // }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        // {
        //   id: 'companyName',
        //   align: 'left',
        //   label: 'Company Name',
        //   dataType: 'string',
        // },
        {
          id: 'pillar',
          align: 'left',
          label: 'Pillar',
          dataType: 'string',
        },
        {
          id: 'completedDate',
          align: 'center',
          label: 'Completed Date',
          dataType: 'date',
        },
        {
          id: 'QA',
          align: 'center',
          label: 'QA',
          dataType: 'string',
        },
        {
          id: 'analyst',
          align: 'center',
          label: 'Analyst',
          dataType: 'string',
        },
        {
          id: 'viewStatus',
          align: 'center',
          label: 'View Status',
          dataType: 'date',
        }
      ],
      tableLabel: <span>{companyName} 
      {/* <FontAwesomeIcon className="download-icon" size="lg" icon={faDownload} onClick={onDownloadCompanyReport} />  */}
      </span>,
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
      pillars:[
        { 
          completedDate: '10-07-2021',
          pillar: 'Social',
          analyst: 'Rajesh',
          QA: 'Balaji',
          companyRepresentative: 'Praveen',
          clientRrepresentative: 'Gopi',
        },
        { 
          completedDate: '10-07-2021',
          pillar: 'Environment',
          analyst: 'Jerin',
          QA: 'Gopi',
          companyRepresentative: 'Rajesh',
          clientRrepresentative: 'Praveen',
        },
        { 
          completedDate: '10-07-2021',
          pillar: 'Governance',
          analyst: 'Balaji',
          QA: 'Praveen',
          companyRepresentative: 'Gopi',
          clientRrepresentative: 'Jerin',
        }
      ]
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
      pillars:[
        { 
          completedDate: '10-07-2021',
          pillar: 'Governance',
          analyst: 'Rajesh',
          QA: 'Balaji',
          companyRepresentative: 'Praveen',
          clientRrepresentative: 'Gopi',
        },
        { 
          completedDate: '10-07-2021',
          pillar: 'Social',
          analyst: 'Jerin',
          QA: 'Gopi',
          companyRepresentative: 'Rajesh',
          clientRrepresentative: 'Praveen',
        },
        { 
          completedDate: '10-07-2021',
          pillar: 'Environment',
          analyst: 'Balaji',
          QA: 'Praveen',
          companyRepresentative: 'Gopi',
          clientRrepresentative: 'Jerin',
        }
      ]
    },
  ];

  const pendingCompanyStatus = userData.filter((data) => (data.status === 'Pending'));
  const completedCompanyStatus = userData.filter((data) => (data.status === 'Completed'));

  const selecteTab = tabFlag === 'Pending Companies' ? PendingCompanyTableData(pendingCompanyStatus) : CompletedCompanyTableData(completedCompanyStatus);


  const ReportsTitle = ['Reports', 'Task Reports'];
  const [reportsFlow, setReportsFlow] = useState(0);
  const [viewCompanyData, setViewCompanyData] = useState({});
  const [companyName, setCompanyName] = useState('');
// report task table
const reportTaskTab = reportTaskTableData(viewCompanyData);
  // View the pendong reports
  const onView = (companyName,id) => {
    setReportsFlow(1);
    setCompanyName(companyName);
    const viewCompany = pendingCompanyStatus && pendingCompanyStatus.filter(data=> data.companyName == companyName);
    setViewCompanyData(viewCompany);
    // console.log("pendingCompanyStatus :",pendingCompanyStatus);
    // console.log("view company status :",viewCompany);
  };
  // console.log("view company data :",viewCompanyData);

  // back button
  const onBackButton = () => {
    setReportsFlow(0);
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        {/* <Header title="Reports" /> */}
        <Header sideBarRef={sideBarRef} title={ReportsTitle[reportsFlow]} />
        <div className="container-main">
          { reportsFlow===0 && 
          <React.Fragment>
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
          </React.Fragment>
          }
          {reportsFlow === 1 && 
            <CustomTable tableData={reportTaskTab} onBackButton={onBackButton} enableButton={true}  />
            }
        </div>
      </div>
    </div>
  );
};

export default Reports;
