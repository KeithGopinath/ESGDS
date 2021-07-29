/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDownload, faBackward } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';
import EditTask from './TaskEdit';
import XLSX from "xlsx";
import { history } from './../../routes';
import moment from 'moment';
const TaskList = (props) => {
  const [show, setShow] = useState(false);
  const [rowValue, setrowValue] = useState('');
  const [analystDetail, setanalystDetail] = useState('');
  const [qaDetail, setqaDetail] = useState('');

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
          status: 'Completed',
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
          status: 'OnTrack',
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
          status: 'OnTrack',
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
          status: 'OnTrack',
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
          status: 'OnTrack',
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
          status: 'OnTrack',
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
          status: 'Breached',
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
          status: 'Breached',
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
          status: 'OnTrack',
        },
      ]
    },
  ];

  const companyName = props.location.state && props.location.state.companyName;
  const taxonomyName = props.location.state && props.location.state.taxonomy;
  const tabFlag = props.location.tabFlag && props.location.tabFlag;

  const getCompanyDetails = companiesTaskList.filter((data) => (data.companyName === companyName && data.taxonomy === taxonomyName)).map(data => data.listofCompanyTask);
  const companyDetails = getCompanyDetails[0];
  const [analystsla, setanalystsla] = useState(null);
  const [qasla, setqasla] = useState(null);
  const companyName = props.location.state;

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
  const getFormatDate=(arg)=>{
    const date = moment(arg, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return date
  }
  const handleShow = (arg) => {
console.log(arg);
    const editDetails = { groupId: arg.groupId, batchId: arg.batchId }; 
    dispatch({type:"TASKEDITDETAILS_REQUEST", payload: editDetails });
    setanalystDetail({value:arg.analystId, label: arg.analyst});
    setqaDetail({value:arg.qaId, label: arg.qa});
    setanalystsla(getFormatDate(arg.analystSLA));
    setqasla(getFormatDate(arg.qaSLA));

    setrowValue(arg);
    setShow(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_TASKLIST_REQUEST" });
  }, [])

  const isData = useSelector((tasklist) => tasklist.taskList.data);
  const isList = isData && isData.data.rows;
  console.log(isData, 'tasklist');
  console.log(isList, 'isList');

  const totalTaskList = (props) => {
    const tableRowData = (obj) => companyName ? tabFlag==='Completed Companies' ?  obj.map((e) => ({
      taskid: e.taskid,
      group: e.group,
      batch: e.batch,
      pillar: e.pillar,
      analyst: e.analyst,
      analystSla: e.analystSla,
      qa: e.qa,
      qaSla: e.qaSla,
      status: e.status,
    })) :
      obj.map((e) => ({
        taskid: e.taskid,
        group: e.group,
        batch: e.batch,
        pillar: e.pillar,
        analyst: e.status==='Breached'? <p className="text-danger w-100 m-auto">{e.analyst}</p> : <p className="text-success w-100 m-auto">{e.analyst}</p>,
        analystSla: e.analystSla,
        qa: e.status==='Breached'? <p className="text-danger w-100 m-auto">{e.qa}</p> : <p className="text-success w-100 m-auto">{e.qa}</p>,
        qaSla: e.qaSla,
        stage:e.stage,
        status: e.status==='Breached'? <p className="text-danger w-100 m-auto">{e.status}</p> : <p className="text-success w-100 m-auto">{e.status}</p>,
      }))
      :
      obj.map((e) => ({
        taskid: e.taskid,
        group: e.group,
        batch: e.batch,
        company: e.company,
        pillar: e.pillar,
        analyst: e.analyst,
        analystSla: moment(e.analystSLA).format('DD-MM-YYYY'),
        qa: e.qa,
        qaSla: moment(e.qaSLA).format('DD-MM-YYYY'),
        action: <FontAwesomeIcon className="tasklist-edit-icon" icon={faEdit} onClick={() => { handleShow(e); }}>Edit</FontAwesomeIcon>,
      }));

    return {
      rowsData: tableRowData(props),
      columnsHeadData: companyName ? tabFlag==='Completed Companies' ? 
      [
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
          id: 'status',
          align: 'center',
          label: 'Status',
          dataType: 'string',
        },
      ]
      : [
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
          id: 'status',
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

  const tasklist = totalTaskList(companyName ? companyDetails : (isList) ? isList : []);

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} title={companyName ? 'Company Task List' : ''} />
          <div className="container-main">
            <Row>
              <Col lg={12} sm={12}>
                {companyName &&
                  <FontAwesomeIcon className="backword-icon" size="lg" icon={faBackward} onClick={onBackButton} />}
                <Card >
                  <CustomTable tableData={tasklist} enableButton={companyName ? true : false} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <EditTask setShow={setShow} show={show} rowValue={rowValue} qasla={qasla} setqasla={setqasla} analystsla={analystsla} analystDetail={analystDetail} setanalystDetail={setanalystDetail} qaDetail={qaDetail} setqaDetail={setqaDetail} setanalystsla={setanalystsla} setqaDetailsetrowValue={setrowValue} />
    </React.Fragment>
  );
};
export default TaskList;
