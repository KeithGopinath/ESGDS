/* eslint-disable */
import React, { useRef, useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDownload } from '@fortawesome/free-solid-svg-icons';
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

  const companyName = props.location.state;

  // export data in excel file
  const downloadReports = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${companyName}`);
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, `${companyName}.xlsx`);
  };

  const sideBarRef = useRef();
  const handleShow = (arg) => {
    setrowValue(arg);
    setShow(true);
  };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch({type:"GETTASKLIST_REQUEST"});
  },[])
 
  const isData = useSelector((tasklist) => tasklist.taskList.data);
  const isList = isData && isData.data.rows;
  console.log(isData, 'tasklist');
  console.log(isList, 'isList');
 
  const totalTaskList = (props) => {
    const tableRowData = (obj) => companyName ?  
    obj.map((e) => ({
      taskid: e.taskNumber,
      group: e.group,
      batch: e.batch,
      pillar: e.pillar,
      analyst: e.analyst,
      analystSla: e.analystSLA,
      qa: e.qa,
      qaSla: e.qaSLA,
    }))
    : obj.map((e) => ({
      taskid: e.taskNumber,
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
      tableLabel: <span>{ companyName ? <span>{companyName}</span> : 'Tasks'}</span>,
    };
  };

  const onBackButton = () => {
    history.push('/reports');
  };

  const tasklist = totalTaskList((isList)?isList:[]);
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} />
          <div className="container-main">
            <Row>
              <Col lg={12} sm={12}>
                <Card >
                  <CustomTable tableData={tasklist} onBackButton={onBackButton} enableButton={companyName ? true : false} downloadReports={downloadReports} />
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
