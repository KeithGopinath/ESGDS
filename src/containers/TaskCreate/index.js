/* eslint-disable*/
import React, { useState, useRef } from 'react';
import { Col, Row, Container, Card, Button, Accordion } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Chip } from '@material-ui/core';
import {
  ExceptionOutlined
} from '@ant-design/icons';
import { DatePicker, Radio, message, notification, Tag, Divider, Tabs} from 'antd';
import moment from 'moment';
import ListItemText from '@material-ui/core/ListItemText';
import CustomTable from '../../components/CustomTable';
import TextField from '@material-ui/core/TextField';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const TaskCreate = () => {
  const [taskFlow, settaskFlow] = useState(0);
  
  const [companyInfo, setcompanyInfo] = useState([]);
  const [batchInfo, setbatchInfo] = useState([]);
  const [companyinfo, setcompanyinfo] = useState([]);
  const [pillar, setPillar] = useState('');
  const [rowDetail, setRowDetails] = useState([]);
  const [analystSla,setanalystSla] = useState('');
  const [isDisabledQA, setisDisabledQA] = useState(true);
  const [statusRole, setstatusRole] = useState(true);
  const [qacheckdate, setqacheckdate] = useState('');
  const [selectedAnalyst, setselectedAnalyst] = useState('');
  const [selectedQa, setselectedQa] = useState('');
  const [qaSla, setqaSla] = useState('');
  const [radioEle, setRadioEle] = useState('');
  const [radioEleqa, setRadioEleqa] = useState('');
  const optionsForPagination = {
    sizePerPage: 10,
  };
  const { TabPane } = Tabs;
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
    if (isSelected) {
      const dummy = [...rowDetail];
      rowDetail.splice(0, rowDetail.length);
      const finalAll = companyinfo.map((args) => {
        const rowDetails = { id: args.id, selectedCompany: args.companyName };
        dummy.push(rowDetails);
        return dummy;
      });
      console.log(finalAll[0], 'finalAll');
      setRowDetails(finalAll[0]);
      console.log(rowDetail, 'last');
      return companyinfo.map((e) => e.id);
    }
    if (!isSelected) {
      setRowDetails([]);
    }
  };
  const pillarOptions = [
    { value: "sfg4", label: "Environment" },
    { value: "sg3d", label: "social" },
    { value: "v4", label: "governance" },
    { value: "sfgs4", label: "pillarX" },
    { value: "sfdfg4", label: "pillarY" },
  ];
  const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    bgColor: '#3f51b514',
    onSelect: onSelectRow,
    onSelectAll: onSelectAllRow,
  };
  const groupDetails = [
    {
      groupName: 'Group1',
      groupID: 'GRP001',
      groupAdmin: 'Vj',
      assignedQa: [{ QAname: 'praveen' }, { QAname: 'balaji' }],
      assignedAnalyst: [{ Analyst: 'rajesh' }, { Analyst: 'sam' }],
      assignedBatches: [
        {
          batchName: 'batch1',
          batchID: 'ID001',
          taxonomy:{value:'08796858979', label:'Acute110'},
          batchSLA:"2021-06-24",
          batchYear: [{ year: '2015-2016' }, { year: '2016-2017' }],
          companies: [
            { id: 0, companyName: 'oil and gas' },
            { id: 1, companyName: 'bank of baroda' },
            { id: 2, companyName: 'Hindustan' },
            { id: 3, companyName: 'CUB' },
            { id: 4, companyName: 'Ambuja' },
          ],
        },
        {
          batchName: 'batch2',
          batchID: 'ID002',
          taxonomy:{value:'08796858979', label:'Acute111'},
          batchSLA:"2021-06-24",
          batchYear: [{ year: '2015-2016' }, { year: '2016-2017' }],
          companies: [
            { id: 0, companyName: 'ABFRL' },
            { id: 1, companyName: 'Relaince' },
            { id: 2, companyName: 'TATA' },
            { id: 3, companyName: 'Axis' },
            { id: 4, companyName: 'Indian cements' },
          ],
        },
        {
          batchName: 'batch3',
          batchID: 'ID003',
          batchYear: [{ year: '2017-2018' }, { year: '2018-2019' }],
          companies: [
            { id: 0, companyName: 'UCO Bank' },
            { id: 1, companyName: 'Yes Bank of India' },
            { id: 2, companyName: 'Bajaj Finance' },
            { id: 3, companyName: 'REC Limited' },
            { id: 4, companyName: 'State Bank of India' },
          ],
        },
      ],
    },
    {
      groupName: 'Group2',
      groupID: 'GRP002',
      groupAdmin: 'Gopi',
      assignedQa: [{ QAname: 'Rohit' }, { QAname: 'Virat' }],
      assignedAnalyst: [{ Analyst: 'Dhoni' }, { Analyst: 'Sachin' }],
      assignedBatches: [
        {
          batchName: 'batch4',
          batchID: 'ID004',
          taxonomy:{value:'08796858979', label:'Acute1'},
          batchSLA:"2021-06-24",
          batchYear: [{ year: '2019-2020' }, { year: '2020-2021' }],
          companies: [
            { id: 0, companyName: 'NTPC Limited' },
            { id: 1, companyName: 'bank of baroda' },
            { id: 2, companyName: 'Punjab National Bank' },
            { id: 3, companyName: 'CUB' },
            { id: 4, companyName: 'Ambuja' },
          ],
        },
        {
          batchName: 'batch5',
          batchID: 'ID005',
          taxonomy:{value:'087968534523', label:'Acute2'},
          batchSLA:"2021-06-25",
          batchYear: [{ year: '2015-2016' }, { year: '2016-2017' }],
          companies: [
            { id: 0, companyName: 'ABFRL' },
            { id: 1, companyName: 'Relaince' },
            { id: 2, companyName: 'TATA' },
            { id: 3, companyName: 'Axis' },
            { id: 4, companyName: 'Indian cements' },
          ],
        },
        {
          batchName: 'batch6',
          batchID: 'ID006',
          taxonomy:{value:'087getg58979', label:'Acute3'},
          batchSLA:"2021-06-28",
          batchYear: [{ year: '2017-2018' }, { year: '2018-2019' }],
          companies: [
            { id: 0, companyName: 'UCO Bank' },
            { id: 1, companyName: 'Yes Bank of India' },
            { id: 2, companyName: 'Bajaj Finance' },
            { id: 3, companyName: 'REC Limited' },
            { id: 4, companyName: 'State Bank of India' },
          ],
        },
        {
          batchName: 'batch7',
          batchID: 'ID007',
          taxonomy:{value:'345h35j6', label:'Acute4'},
          batchSLA:"2021-06-27",
          batchYear: [{ year: '2017-2018' }, { year: '2018-2019' }],
          companies: [
            { id: 0, companyName: 'UCO Bank' },
            { id: 1, companyName: 'Yes Bank of India' },
            { id: 2, companyName: 'Bajaj Finance' },
            { id: 3, companyName: 'REC Limited' },
            { id: 4, companyName: 'State Bank of India' },
          ],
        },
        {
          batchName: 'batch8',
          batchID: 'ID008',
          taxonomy:{value:'kjh796', label:'Acute5'},
          batchSLA:"2021-06-17",
          batchYear: [{ year: '2017-2018' }, { year: '2018-2019' }],
          companies: [
            { id: 0, companyName: 'UCO Bank' },
            { id: 1, companyName: 'Yes Bank of India' },
            { id: 2, companyName: 'Bajaj Finance' },
            { id: 3, companyName: 'REC Limited' },
            { id: 4, companyName: 'State Bank of India' },
          ],
        },
        {
          batchName: 'batch9',
          batchID: 'ID009',
          taxonomy:{value:'08796858979', label:'Acute6'},
          batchSLA:"2021-06-27",
          batchYear: [{ year: '2017-2018' }, { year: '2018-2019' }],
          companies: [
            { id: 0, companyName: 'UCO Bank' },
            { id: 1, companyName: 'Yes Bank of India' },
            { id: 2, companyName: 'Bajaj Finance' },
            { id: 3, companyName: 'REC Limited' },
            { id: 4, companyName: 'State Bank of India' },
          ],
        },
        {
          batchName: 'batch10',
          batchID: 'ID010',
          taxonomy:{value:'777dgh7', label:'Acute7'},
          batchSLA:"2021-06-30",
          batchYear: [{ year: '2017-2018' }, { year: '2018-2019' }],
          companies: [
            { id: 0, companyName: 'UCO Bank' },
            { id: 1, companyName: 'Yes Bank of India' },
            { id: 2, companyName: 'Bajaj Finance' },
            { id: 3, companyName: 'REC Limited' },
            { id: 4, companyName: 'State Bank of India' },
          ],
        },
        {
          batchName: 'batch11',
          batchID: 'ID011',
          taxonomy:{value:'08796858979', label:'Acute8'},
          batchSLA:"2021-06-20",
          batchYear: [{ year: '2017-2018' }, { year: '2018-2019' }],
          companies: [
            { id: 0, companyName: 'UCO Bank' },
            { id: 1, companyName: 'Yes Bank of India' },
            { id: 2, companyName: 'Bajaj Finance' },
            { id: 3, companyName: 'REC Limited' },
            { id: 4, companyName: 'State Bank of India' },
          ],
        },

      ],
    },
  ];
  
 
  const getFormatDate=(arg)=>{
    const date = moment(arg, 'YYY-MM-DD').format('YYYY-MM-DD');
    return date
  }
  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Detail',
      description:
        'name : Rajesh, Pillar : Enviroment, Role: Analyst',
        duration:0
    });
  };
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
    groupDetails.map((args) => {
      if (args.groupID === matchgrp) {
        console.log(args, 'args');
        const modifiedQA = args.assignedQa.map((qa) => {
          const qaArray = { value: qa.QAname, label: qa.QAname };
          return qaArray;
        });
        const modifiedAnalyst = args.assignedAnalyst.map((analyst) => {
          const analystArray = { value: analyst.Analyst, label: analyst.Analyst };
          return analystArray;
        });
        const currentGrpinfo = {
          grpAdmin: args.groupAdmin, grpName: args.groupName, grpId: args.groupID, analyst: modifiedAnalyst, Qa: modifiedQA, batches: args.assignedBatches,
        };
        console.log(currentGrpinfo, 'currentGrpinfo');
        console.log(modifiedQA, 'modifiedQA');
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
          const yearArray = { name: args.year, label: args.year };
          return yearArray;
        });
        const currentBatchinfo = {
          Batchname: batchdetails.batchName, Batchid: batchdetails.batchID, Batchyear: modifiedYear, companies: batchdetails.companies,
        };
        setbatchInfo(currentBatchinfo);
        setcompanyinfo(batchdetails.companies);
        settaskFlow(2);
      }
      return [];
    });
  };
  const handleChangePillar = (checkedValues) => {
    const val = checkedValues.target.value;
    const selectedPillar = [];
    pillarOptions.map((e)=>{
      if(e.value === val){
        selectedPillar.push(e);
      }
    });
    setPillar(selectedPillar[0]);
    console.log(selectedPillar, 'selectedPillar');
  };
  const pillaRadio = pillarOptions.map((e)=>(
    <Radio key={e.label} value={e.value}>{e.label}</Radio>
    
  ));
  const grpDetail = groupDetails.map((element) => (
    <Col lg={3} md={6} sm={12} key={element.groupID}>
      <Card className="card-view groupbox" onClick={() => onselectGroup(element.groupID)} >
        <ListItemText primary={element.groupName} secondary={element.groupID} />
      </Card>
    </Col>
  ));
  const analystEndData=(e) => {
    //console.log(e._d, 'analyst end date');
    if(e !== null){
      const date = getFormatDate(e._d);
      setanalystSla(date);
      setisDisabledQA(false);
      
    console.log(date, 'analystDate');
    } else {
      setqaSla('');
      setqacheckdate('');
      setisDisabledQA(true);
    }
    
  };

  const qaEndData = (e) => {
    if(e !== null){
      const date = getFormatDate(e._d);
      setqaSla(date);
      setqacheckdate(e);
    }
  };

  const onhandleAnalyst = (arg) => {
    console.log(arg, 'analyst');
    if(arg){
    setselectedAnalyst(arg);
    setRadioEle(arg.key);
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
    setRadioEleqa(arg.key);
  };

  const onCreateTask = () => {
    if(pillar && selectedAnalyst && selectedQa){
        if((rowDetail.length && pillar.value.length  && selectedAnalyst.name.length &&  selectedQa.name.length &&  analystSla.length && qaSla.length) > 0)
          {
          const taskPayload =  {
            
              bachid: batchInfo.Batchid,
              year: batchInfo.Batchyear,
              pillar: pillar,
              company: rowDetail,
              analyst: selectedAnalyst,
              qa: selectedQa,
              analystSla: analystSla,
              qaSla: qaSla
        
            };
            

          
          console.log(taskPayload, 'taskPayload');

          message.success("group created successfully");
      }
        else {
          message.error("fill all the required fields");
        }
      }
      else{
        message.error("fill all the required fields");
      }    
  };

  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      pillar: 'Environment',
      role: 'Analyst',
      assignedTask:'2'
    },
    {
      key: '2',
      name: 'Jim Green',
      pillar: 'social',
      role: 'Qa',
      assignedTask:'5'
    },
    {
      key: '3',
      name: 'Joe Black',
      pillar: 'governance',
      role: 'Analyst',
      assignedTask:'8'
    },
    {
      key: '4',
      name: 'Tom',
      pillar: 'social',
      role: 'Qa',
      assignedTask:'0'
    },
  ]; // rowSelection object indicates the need for row selection
  
  const analystTableData = (props) => {
    const tableRowData = (data) => data.map((obj) => ({
      select:<div><Radio value={obj.key} onChange={()=>onhandleAnalyst(obj)} checked={(obj.key ===radioEle)?true:false}></Radio></div>,
      name:obj.name,
      pillar:{value:(obj.pillar === pillar.label)? "Primary" : "Secondary" , content:<Tag color={(obj.pillar === pillar.label)? "blue" : "cyan"}>{(obj.pillar === pillar.label)? "Primary" : "Secondary"}</Tag>},
      role:{ value:(obj.role === "Analyst")? "Primary" : "Secondary" , content:<Tag color={(obj.role === "Analyst")? "blue" : "cyan"}>{(obj.role === "Analyst")? "Primary" : "Secondary"}</Tag>},
      assignedTask:obj.assignedTask
      
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
    const tableRowData = (data) => data.filter((i)=> selectedAnalyst.key !== i.key).map((e) => ({
      select:<div><Radio value={e.key} onChange={()=>onhandleQa(e)} checked={(e.key ===radioEleqa)?true:false} disabled={statusRole}></Radio></div>,
      name:e.name,
      pillar:{value:(e.pillar === pillar.label)? "Primary" : "secondary" ,content:<Tag color={(e.pillar === pillar.label)? "blue" : "cyan"}>{(e.pillar === pillar.label)? "Primary" : "secondary"}</Tag>},
      role:{value : (e.role === "Qa")? "Primary" : "secondary" ,content:<Tag color={(e.role === "Qa")? "blue" : "cyan"}>{(e.role === "Qa")? "Primary" : "secondary"}</Tag>},
      assignedTask:e.assignedTask,
      
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
        label: 'Pillar',
        dataType: 'stringSearchSortElement',
      },
      {
        id: 'role',
        align: 'center',
        label: 'Role',
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
 
 
  const tableDataanalyst = analystTableData(data);
  const tableDataqa = qaTableData(data);

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
              {batchInfo.Batchyear.map(({ label }, index) => (
                <Chip key={label[index]} label={label} className="chip-space-bwt" />
              ))}
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
            <Radio.Group  onChange={handleChangePillar}  value={pillar.value}>
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
                <BootstrapTable data={batchInfo.companies} hover pagination selectRow={selectRowProp} options={optionsForPagination} bootstrap4>
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
  const onhandleBack = () => {
    settaskFlow(taskFlow - 1);
  };
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
          {companyInfo && companyInfo.batches.map(({ batchName, batchID }) =>
            (
              <Col lg={3} md={6} sm={12} key={batchID}>
                <Card className="card-view groupbox" onClick={() => onselectBatch(batchID)} >
                  <ListItemText primary={batchName} secondary={batchID} />
                </Card>
              </Col>
            ))
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
