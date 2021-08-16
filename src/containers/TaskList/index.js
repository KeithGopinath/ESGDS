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
import PageLoader from '../../components/PageLoader';

const TaskList = (props) => {
  const [show, setShow] = useState(false);
  const [rowValue, setrowValue] = useState('');
  const [analystDetail, setanalystDetail] = useState('');
  const [qaDetail, setqaDetail] = useState('');

  const getcompanyTask = useSelector((state) => state.reportsTaskList.reportsTaskList);
  const loading = useSelector((state) => state.reportsTaskList.isLoading);
  const companiesTaskList = getcompanyTask && getcompanyTask.data;

  const controveryTask = useSelector(state => state.controversyTaskList.controversyTaskList);
  const controveryLoading = useSelector((state) => state.controversyTaskList.isLoading);
  const controversyTaskList = controveryTask && controveryTask.controversyTaskList;

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
  }, []);

  const tabFlag = props.location.tabFlag && props.location.tabFlag;
  const multiCompanies = props.location.multiSelect && props.location.multiSelect;

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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_TASKLIST_REQUEST" });
  }, []);

  const isData = useSelector((tasklist) => tasklist.taskList.data);
  const isDataLoading = useSelector((state) => state.taskList.isLoading);
  const isList = isData && isData.data.rows;

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
      obj.map((e) => ({
        key: e.taskNumber,
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
          ] : [
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

  const tasklist = totalTaskList(multiCompanies ? tabFlag === 'Controversy' ? (controversyDetails ? controversyDetails : []) : (getCompanyDetails ? getCompanyDetails : []) : isList ? isList : []);

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
                <Card >
                  <CustomTable tableData={tasklist} isLoading={loading || isDataLoading || controveryLoading} />
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
