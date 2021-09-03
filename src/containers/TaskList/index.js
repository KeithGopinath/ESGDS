/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faDownload, faBackward } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { useLocation } from "react-router-dom";
import CustomTable from '../../components/CustomTable';
import EditTask from './TaskEdit';
import ControversyEdit from './ControversyTaskEdit';
import XLSX from "xlsx";
import { history } from './../../routes';
import moment from 'moment';


const TaskList = (props) => {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [controversyShow, setcontroversyShow ] = useState(false);
  const [rowValue, setrowValue] = useState('');
  const [controversyValue, setcontroversyValue ] = useState('');
  const [analystDetail, setanalystDetail] = useState('');
  const [controversyAnalyst,setcontroversyAnalyst] = useState('');
  const [tasktabFlag, settaskTabFlag] = useState();
  const [qaDetail, setqaDetail] = useState('');
  const [roleType, setRole] = useState('');
  const isTasknumber = useSelector((notification) => notification.notification.notificationType);
  const getcompanyTask = useSelector((state) => state.reportsTaskList.reportsTaskList);
  const loading = useSelector((state) => state.reportsTaskList.isLoading);
  const companiesTaskList = getcompanyTask && getcompanyTask.data;
  
  const controveryTask = useSelector(state => state.controversyTaskList.controversyTaskList);
  const controveryLoading = useSelector((state) => state.controversyTaskList.isLoading);
  const controversyTaskList = controveryTask && controveryTask.controversyTaskList;

const tasklisttabLabelSets = [
  { label: 'Pending Task' },
  { label: 'Completed Task' },
  { label: 'Controversy' },
];
const groupAdminLabelSets = [
  { label: 'Pending Task' },
  { label: 'Completed Task' },
];
const tasktabsRefs = useRef(tasklisttabLabelSets.map(() => React.createRef()));
const grpAdminRefs = useRef(groupAdminLabelSets.map(() => React.createRef()));
const defaultRefs = (roleType === 'GroupAdmin') ? grpAdminRefs : tasktabsRefs;
const defaultLabels = (roleType === 'GroupAdmin') ? groupAdminLabelSets : tasklisttabLabelSets;

const tasklisttabsClickHandler = (event, label) => {
  defaultRefs.current.forEach((element) => {
    const target = element.current;
    target.classList.remove('tabs-label-count-wrap-active');
  });
  const target = event.currentTarget;
  target.classList.add('tabs-label-count-wrap-active');
  settaskTabFlag(label);
};

const tabFlag = props.location.tabFlag && props.location.tabFlag;
const multiCompanies = props.location.multiSelect && props.location.multiSelect;
  useEffect(() => {
    if (props.location.multiSelect) {
      const propsData = props.location.state;
      const tabLabel = props.location.tabFlag && props.location.tabFlag;
      if (tabLabel === 'Controversy') {
        const controversyId = propsData.map((data) => {
          return data.id;
        });
        dispatch({ type: "CONTROVERSY_TASK_LIST_REQUEST", controversyTaskReports: controversyId });
      } else {
        const companiesId = propsData.map((data) => {
          return data.companyId;
        });
        dispatch({ type: "GET_REPORTS_TASKLIST_REQUEST", companyTaskReports: companiesId });
      }
    }
    setRole(sessionStorage.role);

  }, []);
  useEffect(()=>{
if(!multiCompanies){
    
      if (defaultRefs.current[0]) {
        defaultRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
      settaskTabFlag('Pending Task');
    }
    } else if (defaultRefs.current[1]) {
      defaultRefs.current[1].current.classList.add('tabs-label-count-wrap-active');
      settaskTabFlag('Completed Task');
    } else if (defaultRefs.current[2]) {
      defaultRefs.current[2].current.classList.add('tabs-label-count-wrap-active');
      settaskTabFlag('Controversy');
}
  },[multiCompanies])



  // filter companies taskList
  const getCompanyDetails = companiesTaskList && companiesTaskList;
  const controversyDetails = controversyTaskList && controversyTaskList;
  const [analystsla, setanalystsla] = useState(null);
  const [qasla, setqasla] = useState(null);

  // export data in excel file
  const downloadReports = () => {
    const workSheet = XLSX.utils.json_to_sheet(tabFlag === 'Controversy' ? controversyDetails && controversyDetails : getCompanyDetails && getCompanyDetails);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");
    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, tabFlag === 'Controversy' ? 'Controversy Tasklist.xlsx' : 'Reports Tasklist.xlsx');
  };

  const sideBarRef = useRef();

  const getFormatDate = (arg) => {
    const date = moment(arg, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return date
  };

  const handleShow = (arg) => {
    const editDetails = { groupId: arg.groupId, batchId: arg.batchId };
    dispatch({ type: "TASKEDITDETAILS_REQUEST", payload: editDetails });
    setanalystDetail({ value: arg.analystId, label: arg.analyst });
    setqaDetail({ value: arg.qaId, label: arg.qa });
    setanalystsla(getFormatDate(arg.analystSLA));
    setqasla(getFormatDate(arg.qaSLA));
    setrowValue(arg);
    setShow(true);
  };

  const handleControversyShow = (arg) => {
    const payload = { 
      filters: [
        { filterWith: "isUserApproved", value: true },
        { filterWith: "isAssignedToGroup", value: true },
        { filterWith: "isRoleAssigned", value: true },
        { filterWith: "isUserActive", value: true },
        { filterWith: "userType", value: "Employee" },
        { filterWith :"role" , value: "Analyst" }
        
      ] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    setcontroversyValue(arg);
    setcontroversyAnalyst({value:arg.analystId ,label:arg.analyst });
    setcontroversyShow(true);
  }
  const dispatch = useDispatch();
const isData = useSelector((tasklist) => tasklist.taskList.data);
const isDataLoading = useSelector((state) => state.taskList.isLoading);
const isList = isData && isData.data;
  useEffect(() => {
    if(isList){
    dispatch({type:"GET_TASKLIST_RESET"});
    }
    dispatch({ type: "GET_TASKLIST_REQUEST" }); 
     // if history doesn't have state then reset notification reducer
     if(location && !location.state){
     dispatch({type:"NOTIFICATION_RESET"});
   }
   
  }, []);



  const totalTaskList = (props) => {
    const tableRowData = (obj) => multiCompanies ?
      ((tabFlag === 'Completed Companies') ?
        obj.map((e) => ({
          key: e.taskid,
          company: e.companyName ? e.companyName : '--',
          taskid: e.taskid ? e.taskid : '--',
          group: e.group ? e.group : '--',
          batch: e.batch ? e.batch : '--',
          pillar: e.pillar ? e.pillar : '--',
          analyst: e.analyst ? e.analyst : '--',
          analystSla: e.analystSla ? moment(e.analystSla).format('DD-MM-YYYY') : '--',
          qa: e.qa ? e.qa : '-',
          qaSla: e.qaSla ? moment(e.qaSla).format('DD-MM-YYYY') : '--',
          status: e.status ? e.status : '--',
        })) :
        (tabFlag === 'Pending Companies') ? obj.map((e) => ({
          key: e.taskid,
          company: e.companyName ? e.companyName : '--',
          taskid: e.taskid ? e.taskid : '--',
          group: e.group ? e.group : '--',
          batch: e.batch ? e.batch : '--',
          pillar: e.pillar ? e.pillar : '--',
          analyst: e.analystStatus === 'Breached' ? { value: e.analyst, content: <p className="text-danger w-100 m-auto">{e.analyst}</p> } : { value: e.analyst, content: <p className="text-success w-100 m-auto">{e.analyst}</p> },
          analystSla: e.analystSla ? moment(e.analystSla).format('DD-MM-YYYY') : '--',
          qa: e.qaStatus === 'Breached' ? { value: e.qa, content: <p className="text-danger w-100 m-auto">{e.qa}</p> } : { value: e.qa, content: <p className="text-success w-100 m-auto">{e.qa}</p> },
          qaSla: e.qaSla ? moment(e.qaSla).format('DD-MM-YYYY') : '--',
          stage: e.stage ? e.stage : '--',
          status: e.status === 'Breached' ? { value: e.status, content: <p className="text-danger w-100 m-auto">{e.status}</p> } : { value: e.status, content: <p className="text-success w-100 m-auto">{e.status}</p> },
        })) :
          obj.map((e) => ({
            key: e.taskid,
            company: e.companyName ? e.companyName : '--',
            controversyId: e.controversyId ? e.controversyId : '--',
            analyst: e.analyst ? e.analyst : '--',
            createdDate: e.createdDate ? moment(e.createdDate).format('DD-MM-YYYY') : '--',
          }))
      )
      :
      (tasktabFlag === 'Pending Task') ?
      obj.map((e) => ({
        key: e.taskNumber,
        taskid: e.taskNumber ? e.taskNumber : '--',
        group: e.group ? e.group : '--',
        batch: e.batch ? e.batch : '--',
        company: e.company ? e.company : '--',
        pillar: e.pillar ? e.pillar : '--',
        analyst: e.analyst ? e.analyst : '--',
        analystSla:e.analystSLA ? moment(e.analystSLA).format('DD-MM-YYYY') : '--',
        qa: e.qa ? e.qa : '--',
        qaSla:e.qaSLA ? moment(e.qaSLA).format('DD-MM-YYYY') : '--',
        action: <FontAwesomeIcon className="tasklist-edit-icon" icon={faEdit} onClick={() => { handleShow(e); }}></FontAwesomeIcon>,
      }))
      :
      (tasktabFlag === 'Completed Task') ?
      obj.map((e) => ({
        key: e.taskNumber,
        taskid: e.taskNumber ? e.taskNumber : '--',
        group: e.group ? e.group : '--',
        batch: e.batch ? e.batch : '--',
        company: e.company ? e.company : '--',
        pillar: e.pillar ? e.pillar : '--',
        analyst: e.analyst ? e.analyst : '--',
        analystSla:e.analystSLA ? moment(e.analystSLA).format('DD-MM-YYYY') : '--',
        qa: e.qa ? e.qa : '--',
        qaSla:e.qaSLA ? moment(e.qaSLA).format('DD-MM-YYYY') : '--',
      }))
      :
      obj.map((e) => ({
        key: e.taskNumber,
        taskid: e.taskNumber ? e.taskNumber : '--',
        company: e.company ? e.company : '--',
        analyst: e.analyst ? e.analyst : '--',
        action: <FontAwesomeIcon className="tasklist-edit-icon" icon={faEdit} onClick={() => { handleControversyShow(e); }}></FontAwesomeIcon>,
      }))

    return {
      rowsData: tableRowData(props),
      columnsHeadData: multiCompanies ? (tabFlag === 'Completed Companies') ?
        [
          {
            id: 'company',
            align: 'center',
            label: 'Company',
            dataType: 'string',
          },
          {
            id: 'taskid',
            align: 'center',
            label: 'Task ID',
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
            label: 'SLA Date',
            dataType: 'string',
          },
          {
            id: 'qa',
            align: 'center',
            label: 'QA',
            dataType: 'stringSearchSortElement',
          },
          {
            id: 'qaSla',
            align: 'center',
            label: 'SLA Date',
            dataType: 'string',
          },
          {
            id: 'status',
            align: 'center',
            label: 'Status',
            dataType: 'string',
          },
        ]
        : (tabFlag === 'Pending Companies') ?
          [
            {
              id: 'company',
              align: 'center',
              label: 'Company',
              dataType: 'string',
            },
            {
              id: 'taskid',
              align: 'center',
              label: 'Task ID',
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
              dataType: 'stringSearchSortElement',
            },
            {
              id: 'analystSla',
              align: 'center',
              label: 'SLA Date',
              dataType: 'string',
            },
            {
              id: 'qa',
              align: 'center',
              label: 'QA',
              dataType: 'stringSearchSortElement',
            },
            {
              id: 'qaSla',
              align: 'center',
              label: 'SLA Date',
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
              dataType: 'stringSearchSortElement',
            },
          ] : [
            {
              id: 'company',
              align: 'left',
              label: 'Company',
              dataType: 'string',
            },
            {
              id: 'controversyId',
              align: 'center',
              label: 'Controversy ID',
              dataType: 'string',
            },
            {
              id: 'analyst',
              align: 'center',
              label: 'Analyst',
              dataType: 'string',
            },
            {
              id: 'createdDate',
              align: 'center',
              label: 'Created Date',
              dataType: 'string',
            },
          ] : 
          (tasktabFlag === 'Pending Task')?

          [
        {
          id: 'taskid',
          align: 'center',
          label: 'Task ID',
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
          label: 'SLA Date',
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
          label: 'SLA Date',
          dataType: 'string',
        },
        {
          id: 'action',
          align: 'center',
          label: 'Action',
          dataType: 'element',
        },
      
      
      
      ]
      :
      (tasktabFlag === 'Completed Task') ?
      [
        {
          id: 'taskid',
          align: 'center',
          label: 'Task ID',
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
          label: 'SLA Date',
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
          label: 'SLA Date',
          dataType: 'string',
        },  
      ]
      :
      [
        {
          id: 'taskid',
          align: 'center',
          label: 'Task ID',
          dataType: 'string',
        },
        {
          id: 'company',
          align: 'center',
          label: 'Company',
          dataType: 'string',
        },
        {
          id: 'analyst',
          align: 'center',
          label: 'Analyst',
          dataType: 'string',
        },
        {
          id: 'action',
          align: 'center',
          label: 'Action',
          dataType: 'element',
        },
      ],
    
      tableLabel: <span>{multiCompanies ?
        <span>{tabFlag === 'Controversy' ? 'Controversy List' : 'Task List'}
          <FontAwesomeIcon className="reports-download-icon ml-2" size="sm" icon={faDownload} onClick={downloadReports} />
        </span> : 'Tasks'}</span>,
    };

  };

  const onBackButton = () => {
    history.push({ pathname: '/reports', tabFlag: tabFlag });
  };

  const tasklist = 
  totalTaskList(multiCompanies ? 
    tabFlag === 'Controversy' ?
     (controversyDetails ? controversyDetails : []) :
      (getCompanyDetails ? getCompanyDetails : []) : 
      ((roleType === 'SuperAdmin' || roleType === 'Admin') && tasktabFlag === 'Pending Task' ) ?
       (isList ?  isList.adminTaskList.pendingList : []):
       ((roleType === 'SuperAdmin' || roleType === 'Admin') && tasktabFlag === 'Completed Task' ) ?
        (isList ? isList.adminTaskList.completedList : []) :
        ((roleType === 'SuperAdmin' || roleType ==='Admin') && tasktabFlag === 'Controversy' ) ?
        (isList ? isList.adminTaskList.controversyList : []) :
        (roleType === 'GroupAdmin' && tasktabFlag === 'Pending Task' ) ?
        (isList ?  isList.groupAdminTaskList.pendingList.filter((e)=>isTasknumber ? isTasknumber === e.taskNumber : e) : []):
        (roleType === 'GroupAdmin' && tasktabFlag === 'Completed Task' ) ?
        (isList ? isList.groupAdminTaskList.completedList : []) :
        (roleType === 'GroupAdmin' && tasktabFlag === 'Controversy' ) ?
        (isList ? isList.groupAdminTaskList.controversyList : []):
        []
       );
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} title={multiCompanies ? 'Company Task List' : ''} />
          <div className="container-main">
            <Row>
              <Col lg={12} sm={12}>
                {multiCompanies &&
                  <FontAwesomeIcon className="backword-icon" size="lg" icon={faBackward} onClick={onBackButton} />}
                
                {multiCompanies ? <div className="reports-tabs-stack" style={{display:'none'}}>
            {defaultLabels.map(({ label }, index) => (
              <div key={label} ref={defaultRefs.current[index]} onClick={(event) => (tasklisttabsClickHandler(event, label))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {label}
                </div>
              </div>
            ))}
          </div>  : <div className="reports-tabs-stack">
            {defaultLabels.map(({ label }, index) => (
              <div key={label} ref={defaultRefs.current[index]} onClick={(event) => (tasklisttabsClickHandler(event, label))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {label}
                </div>
              </div>
            ))}
          </div>
          }
                  
          <Card >
                <CustomTable tableData={tasklist} isLoading={loading || isDataLoading || controveryLoading} defaultNoOfRows={10} />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <EditTask setShow={setShow} show={show} rowValue={rowValue} qasla={qasla} setqasla={setqasla} analystsla={analystsla} analystDetail={analystDetail} setanalystDetail={setanalystDetail} qaDetail={qaDetail} setqaDetail={setqaDetail} setanalystsla={setanalystsla} setrowValue={setrowValue} />
      <ControversyEdit setcontroversyShow={setcontroversyShow} controversyShow={controversyShow} controversyValue={controversyValue} setcontroversyValue={setcontroversyValue}  controversyAnalyst={controversyAnalyst} setcontroversyAnalyst={setcontroversyAnalyst} />
    </React.Fragment>
  );
};

export default TaskList;
