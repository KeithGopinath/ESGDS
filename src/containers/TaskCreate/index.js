/* eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Chip } from '@material-ui/core';
import {
  ExceptionOutlined
} from '@ant-design/icons';
import { DatePicker, Radio, message, notification, Tag, Divider, Tabs} from 'antd';
import moment from 'moment';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../components/CustomTable';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const TaskCreate = () => {
  const [taskFlow, settaskFlow] = useState(0);
  
  const [companyInfo, setcompanyInfo] = useState([]);
  const [batchInfo, setbatchInfo] = useState([]);
  const [pillar, setPillar] = useState('');
  const [rowDetail, setRowDetails] = useState([]);
  const [analystSla,setanalystSla] = useState('');
  const [isDisabledQA, setisDisabledQA] = useState(true);
  const [statusRole, setstatusRole] = useState(true);
  const [qacheckdate, setqacheckdate] = useState('');
  const [analystcheckdate, setanalystcheckdate] = useState('');
  const [selectedAnalyst, setselectedAnalyst] = useState('');
  const [selectedQa, setselectedQa] = useState('');
  const [qaSla, setqaSla] = useState('');
  const [radioEle, setRadioEle] = useState('');
  const [radioEleqa, setRadioEleqa] = useState('');
  const optionsForPagination = {
    sizePerPage: 10,
  };
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  useEffect(() => {
    dispatch({ type: 'TASKDETAILS_REQUEST'});
  },[]);
 
  
  
  const apidata = useSelector((tasklist)=>tasklist.taskDetail.taskdata);
  const groupData = apidata && apidata.groups;
  console.log(groupData, 'groupData');
  const onpillarclick = useSelector((pillar)=>pillar.taskpillar.pillarTask);
  const ispillarData = onpillarclick && onpillarclick.data;
  console.log(ispillarData, 'onpillarclick');

  const aftertaskcreated = useSelector((taskresponse)=>taskresponse.createTask.taskpost);
  // console.log(aftertaskcreated,'aftertaskcreated');
  useEffect(()=>{
    if(aftertaskcreated){
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

  },[aftertaskcreated]);
  // message.success("Task created successfully");
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
      console.log(rowDetail, 'onSelectRow');
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
    console.log(isSelected, 'isSelected');
    if (isSelected) {
      const dummy = [...rowDetail];
      rowDetail.splice(0, rowDetail.length);
      const finalAll = ispillarData && ispillarData.companies.map((args) => {
        const rowDetails = { id: args.id, selectedCompany: args.companyName };
        dummy.push(rowDetails);
        return dummy;
      });
      console.log(finalAll[0], 'finalAll');
      setRowDetails(finalAll[0]);
      console.log(rowDetail, 'last');
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
    selected: rowDetail.map((e)=> e.id),
    onSelect: onSelectRow,
    onSelectAll: onSelectAllRow,
  };

  
 
  const getFormatDate=(arg)=>{
    const date = moment(arg, 'YYY-MM-DD').format('YYYY-MM-DD');
    return date
  }
  const analystdisabledDate = (current) => {
    const yourDate = new Date();
    const date= getFormatDate(yourDate);
    const customDate = date;
    return current && current < moment(customDate, 'YYYY-MM-DD');
  }
  const qadisabledDate = (current) =>{
    const analystEnddate = analystSla;
    // console.log(typeof(analystEnddate), 'analystEnddate');
    if(analystEnddate){
      return current && current < moment(analystEnddate, 'YYYY-MM-DD').add(1, 'days');
    }
  }
  const taskTitle = ['Groups', 'Batches', 'Assign Task'];

  const onselectGroup = (matchgrp) => {
    groupData && groupData.map((args) => {
      if (args.groupID === matchgrp) {
        console.log(args, 'args');
        const currentGrpinfo = {
          grpAdmin: args.groupAdmin, grpName: args.groupName, grpId: args.groupID, batches: args.assignedBatches,
        };
        console.log(currentGrpinfo, 'currentGrpinfo');
        // console.log(modifiedQA, 'modifiedQA');
        setcompanyInfo(currentGrpinfo);
        settaskFlow(1);
      }
      return [];
    });
  };
  const onselectBatch = (batchid) => {
    const batchList = companyInfo.batches;
    batchList.map((batchdetails) => {
      if (batchdetails.batchID === batchid) {
        console.log(batchdetails, 'batchList');
        const modifiedYear = batchdetails.batchYear.map((args) => {
          console.log(args, 'check')
          const yearArray = { value: args, label: args };
          return yearArray;
        });
        console.log(batchdetails.pillars, 'batchdetails.pillars')
        const currentBatchinfo = {
          Batchname: batchdetails.batchName, Batchid: batchdetails.batchID, Batchyear: modifiedYear, Pillars:batchdetails.pillars,
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
    batchInfo.Pillars && batchInfo.Pillars.map((e)=>{
      if(e.value === val){
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
    console.log(selectedPillar, 'selectedPillar');
    const getData = { batchId:batchInfo.Batchid ,groupId: companyInfo.grpId , categoryId: selectedPillar[0].value };
    console.log(getData, 'payload for pillar click');
    dispatch({ type: 'ONSELECTPILLAR_REQUEST' , payload: getData });
  };
  
  const grpDetail = groupData && groupData.map((element) => (
    <Col lg={3} md={6} sm={12} key={element.groupID}>
      <Card className="card-view groupbox" onClick={() => onselectGroup(element.groupID)} >
        <ListItemText primary={element.groupName} />
      </Card>
    </Col>
  ));
  const analystEndData=(e) => {

    if(e !== null){
      const date = getFormatDate(e._d);
      setanalystSla(date);
      setisDisabledQA(false);
      setanalystcheckdate(e);
      setqaSla('');
      setqacheckdate('');
    console.log(date, 'analystDate');
    } else {
      setanalystSla('');
      setqaSla('');
      setqacheckdate('');
      setanalystcheckdate(e);
      setisDisabledQA(true);
    }
    
  };

  const qaEndData = (e) => {
    if(e !== null){
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
    console.log(arg, 'analyst');
    if(arg){
    setselectedAnalyst(arg);
    setRadioEle(arg.id);
    setstatusRole(false);
    setselectedQa('');
    }
    else{
      setstatusRole(true);
    }

  };

  

  const onhandleQa = (arg) => {
    console.log(arg, 'qa');
    setselectedQa(arg);
    setRadioEleqa(arg.id);
  };

  const onCreateTask = () => {
    if(pillar && selectedAnalyst && selectedQa){
        if((rowDetail.length && pillar.value.length  && selectedAnalyst.name.length &&  selectedQa.name.length &&  analystSla.length && qaSla.length) > 0)
          {
          const taskPayload =  {
              groupId: companyInfo.grpId,
              batchId: batchInfo.Batchid,
              year: batchInfo.Batchyear,
              pillar: pillar,
              company: rowDetail,
              analyst: { value:selectedAnalyst.id, label:selectedAnalyst.name },
              qa: { value:selectedQa.id, label:selectedQa.name },
              analystSla: analystSla,
              qaSla: qaSla
        
            };
            

          
          console.log(taskPayload, 'taskPayload');
          dispatch({ type: 'CREATE_TASK_REQUEST', payload: taskPayload });
         
      }
        else {
          message.error("fill all the required fields");
        }
      }
      else{
        message.error("fill all the required fields");
      }    
  };

// rowSelection object indicates the need for row selection
  
  const analystTableData = (props) => {
    const tableRowData = (data) => data.map((obj) => ({
      select:<div><Radio value={obj.id} onChange={()=>onhandleAnalyst(obj)} checked={(obj.id ===radioEle)?true:false}></Radio></div>,
      name:obj.name,
      pillar:{value:(obj.primaryPillar)? "Primary" : "Secondary" , content:<Tag color={(obj.primaryPillar)? "blue" : "cyan"}>{(obj.primaryPillar)? "Primary" : "Secondary"}</Tag>},
      role:{ value:(obj.primaryRole)? "Primary" : "Secondary" , content:<Tag color={(obj.primaryRole)? "blue" : "cyan"}>{(obj.primaryRole)? "Primary" : "Secondary"}</Tag>},
      assignedTask:obj.activeTaskCount,
      
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
  const qaTableData = (props) => {
    const tableRowData = (data) => data.filter((i)=> selectedAnalyst.id !== i.id).map((e) => ({
      select:<div><Radio value={e.id} onChange={()=>onhandleQa(e)} checked={(e.id ===radioEleqa)?true:false} disabled={statusRole}></Radio></div>,
      name:e.name,
      pillar:{value:(e.primaryPillar)? "Primary" : "secondary" ,content:<Tag color={(e.primaryPillar)? "blue" : "cyan"}>{(e.primaryPillar)? "Primary" : "secondary"}</Tag>},
      role:{value : (e.primaryRole)? "Primary" : "secondary" ,content:<Tag color={(e.primaryRole)? "blue" : "cyan"}>{(e.primaryRole)? "Primary" : "secondary"}</Tag>},
      assignedTask:e.activeTaskCount,
      
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
 
  const tableDataanalyst = analystTableData((ispillarData)? ispillarData.analystData : []);
  const tableDataqa = qaTableData((ispillarData)? ispillarData.qaData : []);
  const pillaRadio =batchInfo.Pillars && batchInfo.Pillars.map((e)=>{
    console.log(pillar.value, e.value, 'pillar.value ,e.value')
    return(
    <Radio  value={e.value} >{e.labelF}</Radio>
    
  )
  });
  const batchInfoTab = () => (
    <Container>
      <Row className="task-row">
        <Col lg={12} sm={12}>
          <div className="batch-view-header">
            <div className="mar-right">
              <Tag className="grp-batch-name">{batchInfo.Batchname}</Tag>
            </div>
            <div className="align-chip">
              <div className="batch-year-head">Year :</div>
              {batchInfo.Batchyear.map((e) => {
                console.log(e, 'Tag');
                return (
                <Tag>{e.label}</Tag>
                )
                })}
            </div>
          </div>
        </Col>
        
      </Row>
      <Divider style={{borderTop:'3px solid rgba(0, 0, 0, 0.06)'}}></Divider>
      <Row className="row-pad task-row">
        <Col lg={12} sm={12} style={{marginBottom:'2rem'}}>
        <div className="radio-select">
            <div className="task-role">Select pillar for task <span className="mandatory-color">*</span></div>
            <div className="task-pillar-select">
            <Radio.Group value={pillar.value} onChange={handleChangePillar} >
                {pillaRadio}
            </Radio.Group>
            </div>
          </div>
          
        </Col>
        <Col lg={12} sm={12} style={{marginBottom:'2rem'}}>
          <div className="detail-task-tab"> 
        <Tabs defaultActiveKey="1" className="tab-select" size="medium" tabPosition="top" >
  
          <TabPane tab={<span style={{ color: '#3690ffd4'}}  >Choose company</span>} key="1">
          {(pillar)?
                <div className="companylist-task">
                <BootstrapTable data={(ispillarData)?ispillarData.companies : []} hover pagination selectRow={selectRowProp} options={optionsForPagination} bootstrap4>
                  <TableHeaderColumn isKey dataField="id" hidden> id </TableHeaderColumn>
                  <TableHeaderColumn dataField="companyName" filter={{ type: 'TextFilter', delay: 100, placeholder: 'Search' }} className="table-header-name" dataSort>Companies</TableHeaderColumn>
                </BootstrapTable>
                </div>
         : <div className= "not-batch-assign-screen">
         <div className = "not-batch-assign-screen-inner">
           <div className="info-icon-batch"><ExceptionOutlined /></div>
           <div className="info-text-batch">Pillar not assigned!</div>
         </div>
         
       </div> }
            
          </TabPane>
    <TabPane tab={<span style={{ color:'#3690ffd4'}}  >Assign Analyst </span>} key="2" >
    
      {(pillar) ?
      <div>
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
          <div className="task-role-analyst">Select Analyst for task <span className="mandatory-color">*</span></div>  
          <div className="analystQa-table">
          <CustomTable tableData={tableDataanalyst} />
        </div>
        </div>
   : <div className= "not-batch-assign-screen">
   <div className = "not-batch-assign-screen-inner">
     <div className="info-icon-batch"><ExceptionOutlined /></div>
     <div className="info-text-batch">Pillar not assigned!</div>
   </div>
   
 </div> }
        
    </TabPane>
    <TabPane tab={<span style={{ color:'#3690ffd4'}}  >Assign Quality analyst</span>} key="3">
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
          <CustomTable tableData={tableDataqa} />
        </div>
        </div>
      : <div className= "not-batch-assign-screen">
      <div className = "not-batch-assign-screen-inner">
        <div className="info-icon-batch"><ExceptionOutlined /></div>
        <div className="info-text-batch">Pillar not assigned!</div>
      </div>
      
    </div>}
    </TabPane>
  </Tabs>
  </div>
  </Col>
       
        
        
        
       
      </Row>
      <Divider style={{borderTop:'3px solid rgba(0, 0, 0, 0.06)'}}></Divider>
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
    <Row className="grp-mar-top">
      {grpDetail}
    </Row>
  );

  const selectBatchTab = () =>
    (
      <Container>
        <Row>
          <Col lg={12} sm={12}>
            <div className="view-header">
              <div className="mar-right">
              <Tag className="grp-batch-name">{companyInfo.grpName}</Tag>
              </div>
              <div>
              </div>
            </div>
          </Col>
        </Row>
        <Divider style={{borderTop:'3px solid rgba(0, 0, 0, 0.06)'}}></Divider>
        <Row>
          { ( companyInfo && companyInfo.batches.length > 0) ? companyInfo.batches.map(({ batchName, batchID }) =>
            (
              <Col lg={3} md={6} sm={12} key={batchID}>
                <Card className="card-view groupbox" onClick={() => onselectBatch(batchID)} >
                  <ListItemText primary={batchName} />
                </Card>
              </Col>
            )) :
            <Col>
             <div className= "not-batch-assign-screen">
            <div className = "not-batch-assign-screen-inner">
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
                <Card style={{ minHeight: '30rem', margin:'0px auto', width:'80%' }}>
                  <div className="card-head">
                    {taskFlow > 0 &&
                      <div>
                        <Button variant="primary" className="imp-btn" onClick={onhandleBack}>
                          <div>Back</div>
                        </Button>
                      </div>
                    }
                    {taskFlow === 0 &&
                    <div>
                    </div>
                    }
                    <div></div>
                    <div></div>
                  </div>
                  {taskFlow === 0 && groupSelectTab()}
                  {taskFlow === 1 && selectBatchTab()}
                  {taskFlow === 2 && batchInfoTab()}
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
