/* eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { ExceptionOutlined } from '@ant-design/icons';
import { DatePicker, Radio, message, Tag, Divider, Tabs } from 'antd';
import { faSearch, faBackward } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';
import CustomTable from '../../components/CustomTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import PageLoader from '../../components/PageLoader';

const TaskCreate = ({ flag }) => {
  const [taskFlow, settaskFlow] = useState(flag ? 2 : 0);
  const [companyInfo, setcompanyInfo] = useState([]);
  const [batchInfo, setbatchInfo] = useState([]);
  const [pillar, setPillar] = useState('');
  const [rowDetail, setRowDetails] = useState([]);
  const [analystSla, setanalystSla] = useState('');
  const [roleType, setRole ] = useState('');
  const [isDisabledQA, setisDisabledQA] = useState(true);
  const [statusRole, setstatusRole] = useState(true);
  const [qacheckdate, setqacheckdate] = useState('');
  const [analystcheckdate, setanalystcheckdate] = useState('');
  const [selectedAnalyst, setselectedAnalyst] = useState('');
  const [selectedQa, setselectedQa] = useState('');
  const [qaSla, setqaSla] = useState('');
  const [radioEle, setRadioEle] = useState('');
  const [radioEleqa, setRadioEleqa] = useState('');
  const [taxonomy, setTaxonomy] = useState();
  const [errorAlert, setErrorAlert] = useState('');
  const [submitFlag, setSubmitFlag] = useState(false);

  const dispatch = useDispatch();
  const { TabPane } = Tabs;


  const apidata = useSelector((tasklist) => tasklist.taskDetail.taskdata);
  const apidataLoading = useSelector((tasklist) => tasklist.taskDetail);
  const onpillarclick = useSelector((pillar) => pillar.taskpillar.pillarTask);
  const onpillarclickLoading = useSelector((pillar) => pillar.taskpillar);
  const taxonomyData = useSelector((state) => state.clientTaxonomy.taxonomydata);
  const controversyTaskData = useSelector((state) => state.controversyTaskData.controversyTaskData);
  const createControversyTask = useSelector((state) => state.createControversyTask.createControversyTask);
  const createControversyTaskError = useSelector((state) => state.createControversyTask.error);
  const aftertaskcreated = useSelector((taskresponse) => taskresponse.createTask.taskpost);
  const aftertaskcreatedLoading = useSelector((taskresponse) => taskresponse.createTask);
  const optionsForPagination = {
    sizePerPage: 10,
    noDataText: (onpillarclickLoading.isLoading)?<PageLoader load={"comp-loader"} />  :"There is no data to display",
  };
  useEffect(() => {
    if (flag) {
      dispatch({ type: 'ClientTaxonomy_REQUEST' });
    } else {
      dispatch({ type: 'TASKDETAILS_REQUEST' });
      
    }
    dispatch({type:'ONSELECTPILLAR_RESET'});
    setRole(sessionStorage.role);
  }, []);

  useEffect(() => {
    if (taxonomy) {
      const payload = taxonomy.value;
      dispatch({ type: 'CONTROVERSY_TASK_DATA_REQUEST', payload });
    }
  }, [taxonomy]);

  useEffect(() => {
    if (createControversyTask && submitFlag && flag) {
      message.success(createControversyTask.message)
    }
    else if (createControversyTaskError && submitFlag && flag) {
      message.error(createControversyTaskError.message)
    }
  }, [createControversyTask, createControversyTaskError]);

  useEffect(() => {
    if (aftertaskcreated && submitFlag) {
    setanalystSla('');
    setqaSla('');
    setPillar('');
    setRadioEle('');
    setRadioEleqa('');
    setqacheckdate('');
    setstatusRole(true);
    setisDisabledQA(true);
    onSelectAllRow(false);
    message.success(aftertaskcreated.message);
    }
    }, [aftertaskcreated]);
  useEffect(()=>{
    if((apidataLoading.error || onpillarclickLoading.error || aftertaskcreatedLoading.error) && !flag){
      message.error((apidataLoading.error && apidataLoading.error.message) || (onpillarclickLoading.error && onpillarclickLoading.error.message) || (aftertaskcreatedLoading.error && aftertaskcreatedLoading.error.message ));
    }
  },[apidataLoading.error, onpillarclickLoading.error, aftertaskcreatedLoading.error])


  const getApiData = apidata && apidata.data;
  const groupData = (roleType === 'SuperAdmin' || roleType === 'Admin' ) ? getApiData && getApiData.adminList : getApiData && getApiData.groupAdminList;
  const ispillarData = onpillarclick && onpillarclick.data;

  const taxonomyOptions = taxonomyData && taxonomyData.rows.map((data) => ({
    value: data._id,
    label: data.taxonomyName
  }))

  const onTaxonomyChange = (taxonomy) => {
    setTaxonomy(taxonomy)
  }

  const onSelectRow = (row, isSelected) => {
    if (isSelected === true && rowDetail.length === 0) {
      const rowDetails = { id: row.id, selectedCompany: row.companyName };
      const selectedRow = [rowDetails, ...rowDetail];
      setRowDetails(selectedRow);
    } else if (isSelected === true && rowDetail.length > 0) {
      rowDetail.map((array) => {
        if (array.id !== row.id) {
          const rowDetails = { id: row.id, selectedCompany: row.companyName };
          const selectedRow = [rowDetails, ...rowDetail];
          setRowDetails(selectedRow);
        }
        return [];
      });
    }
    // removing rows from an array
    if (isSelected === false) {
      rowDetail.map((arr, index) => {
        const arrayDel = [...rowDetail];
        if (arr.id === row.id && index !== -1) {
          arrayDel.splice(index, 1);
          setRowDetails(arrayDel);
        }
        return [];
      });
    }
  };

  // eslint-disable-next-line consistent-return
  const onSelectAllRow = (isSelected) => {
    if (isSelected) {
      const dummy = [...rowDetail];
      rowDetail.splice(0, rowDetail.length);
      const finalAll = ispillarData && ispillarData.companies.map((args) => {
        const rowDetails = { id: args.id, selectedCompany: args.companyName };
        dummy.push(rowDetails);
        return dummy;
      });
      setRowDetails(finalAll[0]);
      return ispillarData.companies.map((e) => e.id);
    }
    if (!isSelected) {
      setRowDetails([]);
    }
  };

  const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    bgColor: '#3f51b514',
    selected: rowDetail && rowDetail.map((e) => e.id),
    onSelect: onSelectRow,
    onSelectAll: onSelectAllRow,
  };

  const getFormatDate = (arg) => {
    const date = moment(arg, 'YYY-MM-DD').format('YYYY-MM-DD');
    return date
  }

  const analystdisabledDate = (current) => {
    const yourDate = new Date();
    const date = getFormatDate(yourDate);
    const customDate = date;
    return current && current < moment(customDate, 'YYYY-MM-DD');
  }

  const qadisabledDate = (current) => {
    const analystEnddate = analystSla;
    if(analystEnddate){
      return current && current < moment(analystEnddate, 'YYYY-MM-DD');
    }
  }

  const taskTitle = ['Groups', 'Batches', 'Assign Task'];

  const onselectGroup = (matchgrp) => {
    groupData && groupData.map((args) => {
      if (args.groupID === matchgrp.groupID) {
        const currentGrpinfo = {
          grpAdmin: args.groupAdmin, grpName: args.groupName, grpId: args.groupID, batches: args.assignedBatches,
        };
        setcompanyInfo(currentGrpinfo);
        settaskFlow(1);
      }
      return [];
    });
  };

  const onselectBatch = (batchid) => {
    const batchList = companyInfo.batches;
    batchList.map((batchdetails) => {
      if (batchdetails.batchID === batchid.batchID) {
        const modifiedYear = batchdetails.batchYear.map((args) => {

          const yearArray = { value: args, label: args };
          return yearArray;
        });

        const currentBatchinfo = {
          Batchname: batchdetails.batchName, Batchid: batchdetails.batchID, Batchyear: modifiedYear, Pillars: batchdetails.pillars,
        };
        setbatchInfo(currentBatchinfo);
        settaskFlow(2);
      }
      return [];
    });
  };

  const handleChangePillar = (checkedValues) => {

    const val = checkedValues.target.value;
    const selectedPillar = [];
    batchInfo.Pillars && batchInfo.Pillars.map((e) => {
      if (e.value === val) {
        selectedPillar.push(e);
      }
    });
    setPillar(selectedPillar[0]);
    setRadioEle('');
    setRadioEleqa('');
    setanalystSla('');
    setqaSla('');
    setqacheckdate('');
    setanalystcheckdate('');
    setstatusRole(true);
    setisDisabledQA(true);
    onSelectAllRow(false);
    const getData = { batchId:batchInfo.Batchid ,groupId: companyInfo.grpId , categoryId: selectedPillar[0].value };
    dispatch({ type: 'ONSELECTPILLAR_REQUEST' , payload: getData });
  };

  const analystEndData = (e) => {
    if (e !== null) {
      const date = getFormatDate(e._d);
      setanalystSla(date);
      setisDisabledQA(false);
      setanalystcheckdate(e);
      setqaSla('');
      setqacheckdate('');
    } else {
      setanalystSla('');
      setqaSla('');
      setqacheckdate('');
      setanalystcheckdate(e);
      setisDisabledQA(true);
    }
  };

  const qaEndData = (e) => {
    if (e !== null) {
      const date = getFormatDate(e._d);
      setqaSla(date);
      setqacheckdate(e);
    }
    else {
      setqaSla('');
      setqacheckdate(e);
    }
  };

  const onhandleAnalyst = (arg) => {
    if(arg){
    setselectedAnalyst(arg);
    setRadioEle(arg.id);
    setstatusRole(false);
    setselectedQa('');
    }
    else {
      setstatusRole(true);
    }
  };

  const onhandleQa = (arg) => {
    setselectedQa(arg);
    setRadioEleqa(arg.id);
  };

  const onCreateTask = () => {
    if(!flag){
    if(!pillar){
      message.error("Choose Pillar");
    } else if(rowDetail.length === 0){
      message.error("Choose Company");
    } else if(!selectedAnalyst || !analystSla.length){
      message.error("Choose Analyst Details");
    } else if(!selectedQa || !qaSla.length){
      message.error("Choose QA Details");
    } else {
      const taskPayload = {
        groupId: companyInfo.grpId,
        batchId: batchInfo.Batchid,
        year: batchInfo.Batchyear,
        pillar: pillar,
        company: rowDetail,
        analyst: { value: selectedAnalyst.id, label: selectedAnalyst.name },
        qa: { value: selectedQa.id, label: selectedQa.name },
        analystSla: analystSla,
        qaSla: qaSla
      };
      dispatch({ type: 'CREATE_TASK_REQUEST', payload: taskPayload });
      setSubmitFlag(true);
    }
  } else if (flag){
    if(!taxonomy){
      message.error("Choose Taxonomy");
    } else if(rowDetail.length === 0){
      message.error("Choose Company");
    } else if (!selectedAnalyst){
      message.error("Choose Analyst Details");
    } else {
        const controversyTaskPayload = {
          company: rowDetail,
          analyst: { value: selectedAnalyst.id, label: selectedAnalyst.name },
        }
        dispatch({ type: 'CREATE_CONTROVERSY_TASK_REQUEST', payload: controversyTaskPayload });
        setTaxonomy(null);
        setSubmitFlag(true);
        setRowDetails([]);
        setErrorAlert('');
      }
    }
  };

  // rowSelection object indicates the need for row selection
  const analystTableData = (props) => {
    const tableRowData = (data) => flag ? data.map((obj) => ({
      key:obj.id,
      select: <div><Radio value={obj.id} onChange={() => onhandleAnalyst(obj)} checked={(obj.id === radioEle) ? true : false}></Radio></div>,
      name: obj.name,
      role: { value: (obj.primaryRole) ? "Primary" : "Secondary", content: <Tag color={(obj.primaryRole) ? "blue" : "cyan"}>{(obj.primaryRole) ? "Primary" : "Secondary"}</Tag> },
      assignedTask: `${obj.activeTaskCount}`,
    })) :
      data.map((obj) => ({
        key:obj.id,
        select: <div><Radio value={obj.id} onChange={() => onhandleAnalyst(obj)} checked={(obj.id === radioEle) ? true : false}></Radio></div>,
        name: obj.name,
        pillar: { value: (obj.primaryPillar) ? "Primary" : "Secondary", content: <Tag color={(obj.primaryPillar) ? "blue" : "cyan"}>{(obj.primaryPillar) ? "Primary" : "Secondary"}</Tag> },
        role: { value: (obj.primaryRole) ? "Primary" : "Secondary", content: <Tag color={(obj.primaryRole) ? "blue" : "cyan"}>{(obj.primaryRole) ? "Primary" : "Secondary"}</Tag> },
        assignedTask: `${obj.activeTaskCount}`,
      }));

    return {
      rowsData: tableRowData(props),
      columnsHeadData: flag ? [
        {
          id: 'select',
          align: 'center',
          label: 'Select',
          dataType: 'element',
        },
        {
          id: 'name',
          align: 'center',
          label: 'Name',
          dataType: 'string',
        },
        {
          id: 'role',
          align: 'center',
          label: 'Role type',
          dataType: 'stringSearchSortElement',
        },
        {
          id: 'assignedTask',
          align: 'center',
          label: 'Task',
          dataType: 'string',
        },
      ]
        :
        [
          {
            id: 'select',
            align: 'center',
            label: 'Select',
            dataType: 'element',
          },
          {
            id: 'name',
            align: 'center',
            label: 'Name',
            dataType: 'string',
          },
          {
            id: 'pillar',
            align: 'center',
            label: 'Pillar type',
            dataType: 'stringSearchSortElement',
          },
          {
            id: 'role',
            align: 'center',
            label: 'Role type',
            dataType: 'stringSearchSortElement',
          },
          {
            id: 'assignedTask',
            align: 'center',
            label: 'Task',
            dataType: 'string',
          },
        ],
      tableLabel: 'List',
    };
  };

  const qaTableData = (props) => {
    const tableRowData = (data) => data.filter((i) => selectedAnalyst.id !== i.id).map((e) => ({
      key:e.id,
      select: <div><Radio value={e.id} onChange={() => onhandleQa(e)} checked={(e.id === radioEleqa) ? true : false} disabled={statusRole}></Radio></div>,
      name: e.name,
      pillar: { value: (e.primaryPillar) ? "Primary" : "Secondary", content: <Tag color={(e.primaryPillar) ? "blue" : "cyan"}>{(e.primaryPillar) ? "Primary" : "Secondary"}</Tag> },
      role: { value: (e.primaryRole) ? "Primary" : "Secondary", content: <Tag color={(e.primaryRole) ? "blue" : "cyan"}>{(e.primaryRole) ? "Primary" : "Secondary"}</Tag> },
      assignedTask: `${e.activeTaskCount}`,
    }));

    return {
      rowsData: tableRowData(props),
      columnsHeadData: [
        {
          id: 'select',
          align: 'center',
          label: 'Select',
          dataType: 'element',
        },
        {
          id: 'name',
          align: 'center',
          label: 'Name',
          dataType: 'string',
        },
        {
          id: 'pillar',
          align: 'center',
          label: 'Pillar type',
          dataType: 'stringSearchSortElement',
        },
        {
          id: 'role',
          align: 'center',
          label: 'Role type',
          dataType: 'stringSearchSortElement',
        },
        {
          id: 'assignedTask',
          align: 'center',
          label: 'Task',
          dataType: 'string',
        },

      ],
      tableLabel: 'List',
    };
  };

  const onhandleBack = () => {
    setanalystSla('');
    setqaSla('');
    setPillar('');
    setRadioEle('');
    setRadioEleqa('');
    setqacheckdate('');
    setstatusRole(true);
    setisDisabledQA(true);
    onSelectAllRow(false);
    settaskFlow(taskFlow - 1);
  };

  const tableDataanalyst = analystTableData(flag ? (taxonomy && controversyTaskData && controversyTaskData.analystData || []) : (ispillarData && ispillarData.analystData || []));
  const tableDataqa = qaTableData((ispillarData) ? ispillarData.qaData : []);
  const pillaRadio = batchInfo.Pillars && batchInfo.Pillars.map((e) => (
    <Radio key={e.value} value={e.value}>{e.label}</Radio>
  ));


 // *** groups with search starts here ***
 groupData
 const [searchQuery, setSearchQuery] = useState('');
 const [min, setmin] = useState(0);
 const [max, setmax] = useState(20);
 
 const searchtheme = createMuiTheme({
   palette: {
     primary: {
       light: '#66cafb',
       main: '#2199c8',
       dark: '#006b97',
     },
   },
 });

 const groupCount = groupData && groupData.length;

 const cardPerPage = 20;
 const onhandlePage = (e, page) => {
   const minValue = (page - 1) * cardPerPage;
   const maxValue = page * cardPerPage;
   setmin(minValue);
   setmax(maxValue);
 };
 const onSearchGroup = (data) => {
   const searchData = data.target.value;
   setSearchQuery(searchData);

 };
 const searchfilter = (search, card) => {
   const filteredData = card.filter((e) => {
     if ((e.groupName.toLowerCase()).includes(search.toLowerCase())) {
       return true;
     }
     return false;
   });
   return filteredData;
 };
 const calculateCount = groupData && (searchQuery ? searchfilter(searchQuery, groupData).length : groupCount) / cardPerPage;
 const totalCount = Math.ceil(calculateCount);
 const grouplist = groupData && (searchQuery ? searchfilter(searchQuery, groupData) : groupData).slice(min, max).map(({ groupName, groupID }) => (
   <Col lg={3} md={6} key={groupID}>
     <Card className="batch-card batchbox" onClick={() => onselectGroup({groupID})}>
       <ListItemText primary={groupName} />
     </Card>
   </Col>
 ));
 // *** groups with search ends here ***

  // *** batches with search starts here ***
  groupData
  const [searchQuerybatch, setSearchQuerybatch] = useState('');
  const [minbatch, setminbatch] = useState(0);
  const [maxbatch, setmaxbatch] = useState(20);
  
  const searchthemebatch = createMuiTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });
  const onhandlePagebatch = (e, page) => {
    const minValue = (page - 1) * cardPerPageBatch;
    const maxValue = page * cardPerPageBatch;
    setminbatch(minValue);
    setmaxbatch(maxValue);
  };
  const onSearchBatch = (data) => {
    const searchData = data.target.value;
    setSearchQuerybatch(searchData);
    
  };
  const searchfilterbatch = (search, card) => {
    const filteredData = card.filter((e) => {
      if ((e.batchName.toLowerCase()).includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredData;
  };
  const cardPerPageBatch = 20;
  const batchCardvalues = companyInfo && companyInfo.batches;
  const batchCount = batchCardvalues && batchCardvalues.length;
  const calculateCountbatch = batchCardvalues && (searchQuerybatch ? searchfilterbatch(searchQuerybatch, batchCardvalues).length : batchCount) / cardPerPageBatch;
  const totalCountbatch = Math.ceil(calculateCountbatch);
  
  

  const batchCardList = batchCardvalues && (searchQuerybatch ? searchfilterbatch(searchQuerybatch, batchCardvalues) : batchCardvalues).slice(minbatch, maxbatch).map(({ batchName, batchID  }) => (
    <Col lg={3} md={6} key={batchID}>
      <Card className="batch-card batchbox" onClick={() => onselectBatch({batchID})}>
        <ListItemText primary={batchName} />
      </Card>
    </Col>
  ));
 
  
 

  // *** batches with search ends here ***



  const batchInfoTab = () => (
    <Container>
      <Row className="task-row">
        {!flag &&
          <Col lg={12} sm={12}>
            <div className="batch-view-header">
              <div className="align-chip">
              <div className="batch-year-head">{batchInfo.Batchname}</div>
              </div>
              <div className="align-chip">
                <div className="batch-year-head">Year :</div>
                {batchInfo.Batchyear.map((e) => {
                  return (
                    <Tag>{e.label}</Tag>
                  )
                })}
              </div>
            </div>
          </Col>
        }
      </Row>
      <Row className="row-pad task-row">
        <Col lg={12} sm={12} style={{ marginBottom: '2rem' }}>
          {flag ?
            <div className="select-taxonomy">
              <div className="task-role-analystsla" > Select Taxonomy <span className="mandatory-color">*</span></div>
              <div >
                <Select
                  options={taxonomyOptions}
                  name="taxonomy"
                  value={taxonomy}
                  onChange={onTaxonomyChange}
                  className={!taxonomy && errorAlert}
                />
              </div>
            </div>
            :
            <div className="radio-select">
              <div className="task-role">Select pillar for task <span className="mandatory-color">*</span></div>
              <div className="task-pillar-select">
                <Radio.Group value={pillar.value} onChange={handleChangePillar} >
                  {pillaRadio}
                </Radio.Group>
              </div>
            </div>
          }
        </Col>
        <Col lg={12} sm={12} style={{ marginBottom: '2rem' }}>
          <div className="detail-task-tab">
            <Tabs defaultActiveKey="1" className="tab-select" size="medium" tabPosition="top" >
              <TabPane tab={<span style={{ color: '#3690ffd4' }}  >Choose Company</span>} key="1">
                {(pillar || flag) ?
                  <div className="companylist-task">
                    <BootstrapTable data={flag ? (taxonomy && controversyTaskData && controversyTaskData.companies || []) : (ispillarData && ispillarData.companies || [])} hover pagination selectRow={selectRowProp} options={optionsForPagination} bootstrap4>
                      <TableHeaderColumn isKey dataField="id" hidden> id </TableHeaderColumn>
                      <TableHeaderColumn dataField="companyName" filter={{ type: 'TextFilter', delay: 100, placeholder: 'Search' }} className="table-header-name" dataSort >Companies</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  : <div className="not-batch-assign-screen">
                    <div className="not-batch-assign-screen-inner">
                      <div className="info-icon-batch"><ExceptionOutlined /></div>
                      <div className="info-text-batch">Pillar not assigned!</div>
                    </div>
                  </div>}
              </TabPane>
              <TabPane tab={<span style={{ color: '#3690ffd4' }}>Assign Analyst </span>} key="2" >
                {(pillar || flag) ?
                  <div>
                    {!flag &&
                      <div className="date-picker-analyst">
                        <div className="task-role-analystsla" > SLA Date <span className="mandatory-color">*</span></div>
                        <div >
                          <DatePicker
                            className="date-picker"
                            size="middle"
                            format="YYYY-MM-DD"
                            onChange={analystEndData}
                            disabledDate={analystdisabledDate}
                            value={analystcheckdate}
                          />
                        </div>
                      </div>
                    }
                    <div className="task-role-analyst">Select Analyst for task <span className="mandatory-color">*</span></div>
                    <div className="analystQa-table">
                      <CustomTable tableData={tableDataanalyst} isLoading={onpillarclickLoading.isLoading} defaultNoOfRows={5}/>
                    </div>
                  </div>
                  : <div className="not-batch-assign-screen">
                    <div className="not-batch-assign-screen-inner">
                      <div className="info-icon-batch"><ExceptionOutlined /></div>
                      <div className="info-text-batch">Pillar not assigned!</div>
                    </div>
                  </div>}
              </TabPane>
              {!flag &&
                <TabPane tab={<span style={{ color: '#3690ffd4' }}>Assign Quality Analyst</span>} key="3">
                  {(pillar) ?
                    <div>
                      <div className="date-picker-analyst">
                        <div className="task-role-analystsla" > SLA Date <span className="mandatory-color">*</span></div>
                        <div >
                          <DatePicker
                            className="date-picker"
                            size="middle"
                            format="YYYY-MM-DD"
                            onChange={qaEndData}
                            disabledDate={qadisabledDate}
                            value={qacheckdate}
                            disabled={isDisabledQA}
                          />
                        </div>
                      </div>
                      <div className="task-role-analyst">Select Qa for task <span className="mandatory-color">*</span></div>
                      <div className="analystQa-table">
                        <CustomTable tableData={tableDataqa} isLoading={onpillarclickLoading.isLoading} defaultNoOfRows={5}/>
                      </div>
                    </div>
                    : <div className="not-batch-assign-screen">
                      <div className="not-batch-assign-screen-inner">
                        <div className="info-icon-batch"><ExceptionOutlined /></div>
                        <div className="info-text-batch">Pillar not assigned!</div>
                      </div>
                    </div>}
                </TabPane>
              }
            </Tabs>
          </div>
        </Col>
      </Row>
      <Divider className="task-divider"></Divider>
      <Row style={{ padding: '5%' }} className="task-row">
        <Col>
          <div className="task-foo">
            <Button variant="success" onClick={onCreateTask}>
              Create Task
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );

  const groupSelectTab = () => (

    <Container className="wrapper">
         <div className="head-tab-task">
              <div>
                <ThemeProvider theme={searchtheme}>
                  <TextField
                    placeholder="Search"
                    style={{ padding: '9px' }}
                    autoComplete="off"
                    onChange={onSearchGroup}
                    value={searchQuery}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faSearch} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </ThemeProvider>
              </div>
            </div>
            <div className="view-min-height">
              <Row >
                {grouplist}
              </Row>
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="batch-footer">
                  <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                </div>
              </Col>
            </Row>
          </Container>
   
  );
  const selectBatchTab = () =>
  (
    <Container>
      <Row>
        <Col lg={12} sm={12}>
          <div className="view-header">
            <div className="align-chip">
              <div className="batch-year-head">{companyInfo.grpName}</div>
              </div>
            <div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {(companyInfo && companyInfo.batches.length > 0) ? 
        
          <Col>
          <Container className="wrapper">
         <div className="head-tab-task">
              <div>
                <ThemeProvider theme={searchthemebatch}>
                  <TextField
                    placeholder="Search"
                    style={{ padding: '9px' }}
                    autoComplete="off"
                    onChange={onSearchBatch}
                    value={searchQuerybatch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faSearch} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </ThemeProvider>
              </div>
            </div>
            <div className="view-min-height">
              <Row >
                {batchCardList}
              </Row>
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="batch-footer">
                  <Pagination count={totalCountbatch} defaultPage={1} showFirstButton showLastButton onChange={onhandlePagebatch} />
                </div>
              </Col>
            </Row>
          </Container>
          </Col>
        :
          <Col>
            <div className="not-batch-assign-screen">
              <div className="not-batch-assign-screen-inner">
                <div className="info-icon-batch"><ExceptionOutlined /></div>
                <div className="info-text-batch">Batches not assigned!</div>
              </div>
            </div>
          </Col>
        }
      </Row>
    </Container>
  );
  const sideBarRef = useRef();

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} title={taskTitle[taskFlow]} />
          <div className="container-main">
            <Row>
              <Col lg={12} sm={12}>
              {taskFlow > 0 && !flag && <FontAwesomeIcon className="backword-icon" size="lg" icon={faBackward} onClick={onhandleBack} />}
                <Card className="task-page-card">
                {(aftertaskcreatedLoading.isLoading || apidataLoading.isLoading )?<PageLoader />:
                <React.Fragment>
                    {taskFlow === 0 &&  groupSelectTab()}
                    {taskFlow === 1 && selectBatchTab()}
                    {taskFlow === 2 && batchInfoTab()}
                    </React.Fragment>
                  }
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TaskCreate;