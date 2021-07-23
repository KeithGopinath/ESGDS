/* eslint-disable */
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDownload, faBackward } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';
import EditTask from './TaskEdit';
import XLSX from "xlsx";
import { history } from './../../routes';

const TaskList = (props) => {
  const [show, setShow] = useState(false);
  const [rowValue, setrowValue] = useState('');

  const companiesTaskList = [
    {
      taxonomy: 'Rel Acute',
      companyName: 'Reliance ltd.',
      listofCompanyTask: [
        {
          taskid: 'task002',
          group: 'first group',
          batch: 'Batch2',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          status: 'Completed',
        },
        {
          taskid: 'task003',
          group: 'second group',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Gopi',
          analystSla: '13-07-2021',
          qa: 'Tom',
          qaSla: '15-07-2021',
          status: 'Completed',
        },
      ]
    },
    {
      taxonomy: 'Rel Acute1',
      companyName: 'Reliance ltd.',
      listofCompanyTask: [
        {
          taskid: 'task002',
          group: 'first group',
          batch: 'Batch2',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          status: 'Completed',
        },
        {
          taskid: 'task003',
          group: 'first group',
          batch: 'Batch1',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          status: 'Completed',
        },
        {
          taskid: 'task004',
          group: 'second group',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Gopi',
          analystSla: '13-07-2021',
          qa: 'Tom',
          qaSla: '15-07-2021',
          status: 'Completed',
        },
      ]
    },
    {
      taxonomy: 'Acute2',
      companyName: 'Reliance ltd.',
      listofCompanyTask: [
        {
          taskid: 'task002',
          group: 'first group',
          batch: 'Batch2',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          status: 'Completed',
        },
        {
          taskid: 'task003',
          group: 'second group',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Gopi',
          analystSla: '13-07-2021',
          qa: 'Balaji',
          qaSla: '15-07-2021',
          status: 'Completed',
        },
        {
          taskid: 'task005',
          group: 'first group',
          batch: 'Batch2',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Ravi',
          qaSla: '20-07-2021',
          status: 'Completed',
        },
      ]
    },
    {
      taxonomy: 'HPCL Acute',
      companyName: 'HPCL',
      listofCompanyTask: [
        {
          taskid: 'task001',
          group: 'first group',
          batch: 'Batch2',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          stage: 'Completed',
        },
        {
          taskid: 'task002',
          group: 'first group',
          batch: 'Batch1',
          pillar: 'Environment',
          analyst: 'Balaji',
          analystSla: '10-07-2021',
          qa: 'Praveen',
          qaSla: '12-07-2021',
          stage: 'Completed',
        },
        {
          taskid: 'task003',
          group: 'second group',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Gopi',
          analystSla: '13-07-2021',
          qa: 'Tom',
          qaSla: '15-07-2021',
          stage: 'Completed',
        },
      ]
    },
    {
      taxonomy: 'IDEA Acute',
      companyName: 'IDEA Ltd.',
      listofCompanyTask: [
        {
          taskid: 'task002',
          group: 'first group',
          batch: 'Batch2',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          stage: 'Yet To Start',
          status:'OnTrack',
        },
        {
          taskid: 'task003',
          group: 'second group',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Gopi',
          analystSla: '13-07-2021',
          qa: 'Tom',
          qaSla: '15-07-2021',
          stage: 'Yet To Start',
          status:'OnTrack',
        },
        {
          taskid: 'task004',
          group: 'gorup3',
          batch: 'Batch4',
          pillar: 'Environment',
          analyst: 'Rajesh',
          analystSla: '13-07-2021',
          qa: 'Jerin',
          qaSla: '15-07-2021',
          stage: 'Yet To Start',
          status:'OnTrack',
        },
      ]
    },
    {
      taxonomy: 'ONGC Acute',
      companyName: 'ONGC',
      listofCompanyTask: [
        {
          taskid: 'task002',
          group: 'first group',
          batch: 'Batch2',
          pillar: 'Environment',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          stage: 'Yet To Start',
          status:'OnTrack',
        },
        {
          taskid: 'task003',
          group: 'second group',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Gopi',
          analystSla: '13-07-2021',
          qa: 'Tom',
          qaSla: '15-07-2021',
          stage: 'Yet To Start',
          status:'OnTrack',
        },
      ]
    },
    {
      taxonomy: 'Indian Acute',
      companyName: 'Indian Gas',
      listofCompanyTask: [
        {
          taskid: 'task002',
          group: 'Group1',
          batch: 'Batch2',
          pillar: 'Social',
          analyst: 'Jerin',
          analystSla: '15-07-2021',
          qa: 'Rajesh',
          qaSla: '20-07-2021',
          stage: 'Yet To Start',
          status:'Breached',
        },
        {
          taskid: 'task003',
          group: 'Group2',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Jerin',
          analystSla: '13-07-2021',
          qa: 'Gopi',
          qaSla: '15-07-2021',
          stage: 'Yet To Start',
          status:'Breached',
        },
        {
          taskid: 'task004',
          group: 'Group 3',
          batch: 'Batch3',
          pillar: 'Governance',
          analyst: 'Balaji',
          analystSla: '13-07-2021',
          qa: 'Jerin',
          qaSla: '15-07-2021',
          stage: 'Yet To Start',
          status:'OnTrack',
        },
      ]
    },
  ];

  const companyName = props.location.state && props.location.state.companyName;
  const taxonomyName = props.location.state && props.location.state.taxonomy;

  const getCompanyDetails = companiesTaskList.filter((data) => (data.companyName === companyName && data.taxonomy === taxonomyName)).map(data => data.listofCompanyTask);
  const companyDetails = getCompanyDetails[0];

  // export data in excel file
  const downloadReports = () => {
    const workSheet = XLSX.utils.json_to_sheet(companyDetails);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${companyName}`);
    // XLSX.utils.book_append_sheet(workBook, workSheet, `${taxonomyName} ${companyName}`);
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, `${companyName}.xlsx`);
  };

  const sideBarRef = useRef();
  const handleShow = (arg) => {
    setrowValue(arg);
    setShow(true);
  };
  const data = [
    {
      taskid: 'task001',
      group: 'first group',
      batch: 'Batch1',
      company: 'Ambuja',
      pillar: 'Environment',
      analyst: 'Balaji',
      analystSla: '10-07-2021',
      qa: 'Praveen',
      qaSla: '12-07-2021',
    },
    {
      taskid: 'task002',
      group: 'first group',
      batch: 'Batch2',
      company: 'Oil and Gas',
      pillar: 'Social',
      analyst: 'Jerin',
      analystSla: '15-07-2021',
      qa: 'Rajesh',
      qaSla: '20-07-2021',
    },
    {
      taskid: 'task003',
      group: 'second group',
      batch: 'Batch3',
      company: 'Bank of baroda',
      pillar: 'Governance',
      analyst: 'Gopi',
      analystSla: '13-07-2021',
      qa: 'Tom',
      qaSla: '15-07-2021',
    },
    {
      taskid: 'task004',
      group: 'third group',
      batch: 'batch1',
      company: 'Ambuja',
      pillar: 'Social',
      analyst: 'Sam',
      analystSla: '16-07-2021',
      qa: 'George',
      qaSla: '22-07-2021',
    },
  ];
  const totalTaskList = (props) => {
    const tableRowData = (obj) => companyName ?
      obj.map((e) => ({
        taskid: e.taskid,
        group: e.group,
        batch: e.batch,
        pillar: e.pillar,
        analyst: e.status==='Breached'? <td className="text-danger text-center">{e.analyst}</td> : <td className="text-success text-center">{e.analyst}</td>,
        analystStatus: e.analystSla,
        qa: e.status==='Breached'? <td className="text-danger text-center">{e.qa}</td> : <td className="text-success text-center">{e.qa}</td>,
        qaStatus: e.qaSla,
        stage:e.stage,
        status: e.status==='Breached'? <td className="text-danger text-center">{e.status}</td> : <td className="text-success text-center">{e.status}</td>,
      }))
      :
      obj.map((e) => ({
        taskid: e.taskid,
        group: e.group,
        batch: e.batch,
        company: e.company,
        pillar: e.pillar,
        analyst: e.analyst,
        analystSla: e.analystSla,
        qa: e.qa,
        qaSla: e.qaSla,
        action: <FontAwesomeIcon className="tasklist-edit-icon" icon={faEdit} onClick={() => { handleShow(e); }}>Edit</FontAwesomeIcon>,
      }));

    return {
      rowsData: tableRowData(props),
      columnsHeadData: companyName ? [
        {
          id: 'taskid',
          align: 'center',
          label: 'Task id',
          dataType: 'string',
        },
        {
          id: 'group',
          align: 'center',
          label: 'Group',
          dataType: 'string',
        },
        {
          id: 'batch',
          align: 'center',
          label: 'Batch',
          dataType: 'string',
        },
        {
          id: 'pillar',
          align: 'center',
          label: 'Pillar',
          dataType: 'string',
        },
        {
          id: 'analyst',
          align: 'center',
          label: 'Analyst',
          dataType: 'string',
        },
        {
          id: 'analystSla',
          align: 'center',
          label: 'Sla Date',
          dataType: 'string',
        },
        {
          id: 'qa',
          align: 'center',
          label: 'QA',
          dataType: 'string',
        },
        {
          id: 'qaSla',
          align: 'center',
          label: 'Sla Date',
          dataType: 'string',
        },
        {
          id: 'stage',
          align: 'center',
          label: 'Stage',
          dataType: 'string',
        },
        {
          id: 'Status',
          align: 'center',
          label: 'Status',
          dataType: 'string',
        },
      ] : [
          {
            id: 'taskid',
            align: 'center',
            label: 'Task Id',
            dataType: 'string',
          },
          {
            id: 'group',
            align: 'center',
            label: 'Group',
            dataType: 'string',
          },
          {
            id: 'batch',
            align: 'center',
            label: 'Batch',
            dataType: 'string',
          },
          {
            id: 'company',
            align: 'center',
            label: 'Company',
            dataType: 'string',
          },
          {
            id: 'pillar',
            align: 'center',
            label: 'Pillar',
            dataType: 'string',
          },
          {
            id: 'analyst',
            align: 'center',
            label: 'Analyst',
            dataType: 'string',
          },
          {
            id: 'analystSla',
            align: 'center',
            label: 'Sla Date',
            dataType: 'string',
          },
          {
            id: 'qa',
            align: 'center',
            label: 'QA',
            dataType: 'string',
          },
          {
            id: 'qaSla',
            align: 'center',
            label: 'Sla Date',
            dataType: 'string',
          },
          {
            id: 'action',
            align: 'center',
            label: 'Action',
            dataType: 'element',
          },
        ],
      tableLabel: <span>{taxonomyName && companyName ? <span>{taxonomyName} 
      <FontAwesomeIcon className="reports-download-icon ml-2" size="md" icon={faDownload} onClick={downloadReports} />
       </span> : 'Tasks'}</span>,
    };
  };

  const onBackButton = () => {
    history.push('/reports');
  };

  const tasklist = totalTaskList(companyName ? companyDetails : data);
  console.log("tasklist :", tasklist);

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} title= {companyName?'Company Task List': ''}/>
          <div className="container-main">
            <Row>
              <Col lg={12} sm={12}>
              {companyName &&
                <FontAwesomeIcon className="backword-icon" size="lg" icon={faBackward} onClick={onBackButton} /> }
                <Card >
                    <CustomTable tableData={tasklist} enableButton={companyName ? true : false} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <EditTask setShow={setShow} show={show} rowValue={rowValue} setrowValue={setrowValue} />
    </React.Fragment>
  );
};
export default TaskList;
