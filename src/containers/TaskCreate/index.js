/* eslint-disable*/
import React, { useState, useRef } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Chip } from '@material-ui/core';
import { DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import ListItemText from '@material-ui/core/ListItemText';
import Select from 'react-select';
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
  const optionsForPagination = {
    sizePerPage: 10,
  };
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
  const pillarOptions = ['Environment', 'Social', 'Governance'];
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

  const onCreateTask = () => {
    alert('Task Created Successfully');
  };
  function disabledDate(current) {
    const yourDate = new Date();
    const date= getFormatDate(yourDate);
    const customDate = date;
    return current && current < moment(customDate, 'YYYY-MM-DD');
  }

  const taskTitle = ['Groups', 'Batches', 'Assign Task'];

  const onselectGroup = (matchgrp) => {
    groupDetails.map((args) => {
      if (args.groupID === matchgrp) {
        console.log(args, 'args');
        const modifiedQA = args.assignedQa.map((qa) => {
          const qaArray = { name: qa.QAname, label: qa.QAname };
          return qaArray;
        });
        const modifiedAnalyst = args.assignedAnalyst.map((analyst) => {
          const analystArray = { name: analyst.Analyst, label: analyst.Analyst };
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
    setPillar(checkedValues);
    console.log(pillar, 'pillar');
  };
  const grpDetail = groupDetails.map((element) => (
    <Col lg={3} md={6} sm={12}>
      <Card className="card-view groupbox" key={element.groupID} onClick={() => onselectGroup(element.groupID)} >
        <ListItemText primary={element.groupName} secondary={element.groupID} />
      </Card>
    </Col>
  ));
  const analystEndData=(e)=>{
    //console.log(e._d, 'analyst end date');
    if(e !== null){
      const date = getFormatDate(e._d);
    console.log(date, 'analystDate');
    }
    
  }

  const batchInfoTab = () => (
    <Container>
      <Row>
        <Col lg={12} sm={12}>
          <div className="batch-view-header">
            <div className="mar-right">
              <TextField
                disabled
                id="outlined-disabled"
                label="Batch Name"
                defaultValue={batchInfo.Batchname}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="align-chip">
              <div className="batch-year-head">Year :</div>
              {batchInfo.Batchyear.map(({ label }) => (
                <Chip label={label} className="chip-space-bwt" />
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="row-pad">
        <Col lg={6} sm={12}>
          <BootstrapTable data={batchInfo.companies} hover pagination selectRow={selectRowProp} options={optionsForPagination} bootstrap4>
            <TableHeaderColumn isKey dataField="id" hidden> id </TableHeaderColumn>
            <TableHeaderColumn dataField="companyName" filter={{ type: 'TextFilter', delay: 100, placeholder: 'Search' }} className="table-header-name" dataSort>Companies</TableHeaderColumn>
          </BootstrapTable>
        </Col>
        <Col lg={6} sm={12}>
          <div className="radio-select">
            <div className="task-role">Assigned To</div>
            <Checkbox.Group options={pillarOptions} onChange={handleChangePillar} />
          </div>
          <div className="date-picker-outer">
            <div className="date-picker-inner">
              <div className="task-role">Assigned Analyst</div>
              <div>
                <Select
                  options={companyInfo.analyst}
                />
              </div>
            </div>
            <div className="date-picker-inner">
              <div className="task-role" >Analyst End Date</div>
              <div >
                <DatePicker
                  className="date-picker"
                  size="middle"
                  format="YYYY-MM-DD"
                  onChange={analystEndData}
                  disabledDate={disabledDate}
                />
              </div>
            </div>
          </div>
          <div className="date-picker-outer">
            <div className="date-picker-inner">
              <div className="task-role">Assigned QA</div>
              <div>
                <Select
                  options={companyInfo.Qa}
                />
              </div>
            </div>
            <div className="date-picker-inner">
              <div className="task-role" >QA End Date</div>
              <div>
                <DatePicker
                  className="date-picker"
                  size="middle"
                  format="YYYY-MM-DD"
                  disabledDate={disabledDate}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ padding: '5%' }}>
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
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Group Name"
                  defaultValue={companyInfo.grpName}
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {companyInfo && companyInfo.batches.map(({ batchName, batchID }) =>
            (
              <Col lg={3} md={6} sm={12}>
                <Card className="card-view groupbox" key={batchID} onClick={() => onselectBatch(batchID)} >
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
                <Card style={{ minHeight: '30rem' }}>
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
