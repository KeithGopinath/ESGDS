/* eslint-disable import/first */
import React, { useState, useRef } from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import ImportCompanies from '../../containers/ImportCompanies';
import { DataGrid } from '@material-ui/data-grid';


const BatchCreation = () => {
  const [batch, setBatch] = useState('');
  // const [company, setCompany] = useState('');
  const [details, setDetail] = useState([]);
  const [status, setStatus] = useState(0);
  const [year, setYear] = useState('');
  const [group, setGroup] = useState('');
  const [id, setId] = useState('');
  const [validBorder, setValidBorder] = useState(false);

  const columns = [
    {
      field: 'companydata', headerName: 'Company', width: 130,
    },
  ];
  const rows = [
    { id: 0, companydata: 'Oil' },
    { id: 1, companydata: 'hindustan' },
    { id: 2, companydata: 'pertol' },
    { id: 3, companydata: 'Bharat' },
    { id: 4, companydata: 'Tatamotors' },
    { id: 5, companydata: 'ICICI' },
    { id: 6, companydata: 'HDFC' },
    { id: 7, companydata: 'Mangalore' },
    { id: 8, companydata: 'Relaince' },
    { id: 9, companydata: 'Ambuja' },
    { id: 10, companydata: 'ABFRL' },
    { id: 11, companydata: 'CUB' },
    { id: 12, companydata: 'RELCAPITAL' },
    { id: 13, companydata: 'Trends' },
    { id: 14, companydata: 'INDBank' },
    { id: 15, companydata: 'MRF' },
  ];

  const riceFilterModel = {
    items: [{ columnField: 'companydata', operatorValue: 'contains', value: 'a' }],
  };

  // const companyOptions = [
  //   { value: 'Indian oil', label: 'Indian oil' },
  //   { value: 'hindustan', label: 'hindustan' },
  //   { value: 'pertol', label: 'pertol' },
  //   { value: 'Bharat', label: 'Bharat' },
  //   { value: 'Tatamotors', label: 'Tatamotors' },
  //   { value: 'Bank of baroda', label: 'Bank of baroda' },
  //   { value: 'ICICI', label: 'ICICI' },
  //   { value: 'HDFC', label: 'HDFC' },
  //   { value: 'Axis', label: 'Axis' },
  //   { value: 'Mangalore', label: 'Mangalore' },
  //   { value: 'Relaince', label: 'Relaince' },
  // ];

  const yearOptions = [
    { value: '2016 - 2017', label: '2016 - 2017' },
    { value: '2017 - 2018', label: '2017 - 2018' },
    { value: '2018 - 2019', label: '2018 - 2019' },
    { value: '2019 - 2020', label: '2019 - 2020' },
  ];

  const groupOptions = [
    { value: 'Group1', label: 'Group1' },
    { value: 'Group2', label: 'Group2' },
    { value: 'Group3', label: 'Group3' },
    { value: 'Group4', label: 'Group4' },
  ];

  // const onHandleBatch = (companylist) => {
  //   setCompany(companylist);
  // };

  const onHandleInput = (batchname) => {
    if (batchname.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setBatch(batchname.target.value);
    }
  };

  const onHandleYear = (selectedyear) => {
    setYear(selectedyear);
  };

  const onHandleInputid = (batchid) => {
    if (batchid.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setId(batchid.target.value);
    }
  };
  const onHandleGroup = (groupname) => {
    setGroup(groupname);
  };
  const onCreatebBatch = () => {
    // Conditions for validating input fields with red border
    if (!batch || !id) {
      setValidBorder('border-danger');
      setStatus(2);
    } else if (!year || !group) {
      setValidBorder(true);
      setStatus(2);
    }
    if ((batch.length && id.length && year.length && group.length) > 0) {
      const allDetails = { batchName: batch, Id: id };
      const updatedDetails = [allDetails, ...details];
      setDetail(updatedDetails);
      setTimeout(() => {
        setStatus(0);
      }, 3000);
      setStatus(1);
    } else {
      setStatus(2);
    }
    // funtion to add batches and show message
  };
  const onHandlecheck = (e) => {
    console.log(e, '?');
  };
  const batchlist = details.map(({ batchName, Id }) => (
    <Card className="batch-card card-view batchbox">
      <div className="batch-card-content">
        <div className="batch-card-content-name" >Batch name:</div>
        <div className="batch-card-content-value" data-toggle="tooltip" data-placement="top" title={batchName}>{batchName}</div>
      </div>
      <div className="batch-card-content" >
        <div className="batch-card-content-name">Batch ID</div >
        <div className="batch-card-content-value">{Id}</div>
      </div>
    </Card>
  ));
  const sideBarRef = useRef();
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <Container className="wrapper">
          <div className="batch-heading-wrapper">
            <div></div>
            <div className="batch-heading-name">Batch Creation</div>
            <div><ImportCompanies /></div>
          </div>
          <Row>
            <Col lg={4} sm={12}>
              <div className="batch-detail">
                <div >Batch Details</div>
              </div>
              <div className="batch-name">Batch name* :</div>
              <div className="form-group batch-input-width" >
                <input type="text" className={`form-control ${batch === '' && validBorder}`} onChange={onHandleInput} autoComplete="off" value={batch} required ></input>
              </div>
              <div className="batch-id">Batch ID* :</div>
              <div className="form-group batch-input-width" >
                <input type="text" className={`form-control ${id === '' && validBorder}`} onChange={onHandleInputid} autoComplete="off" value={id} required></input>
              </div>
              <div>
                {/* <div className="batch-name">Select Companies*</div>
                <div className={`batch-input-width mar-bottom ${company.length === 0 && validBorder && 'dropdown-alert' }`}>
                  <Select
                    isMulti
                    className={company === '' && validBorder}
                    options={companyOptions}
                    onChange={onHandleBatch}
                  />
                </div> */}
                <div className="batch-year">Select Year*</div>
                <div className={`batch-input-width mar-bottom ${year.length === 0 && validBorder && 'dropdown-alert' }`}>
                  <Select
                    isMulti
                    options={yearOptions}
                    onChange={onHandleYear}
                  />
                </div>
                <div className="batch-group">Select Group*</div>
                <div className={`batch-input-width mar-bottom ${group.length === 0 && validBorder && 'dropdown-alert' }`}>
                  <Select
                    isMulti
                    options={groupOptions}
                    onChange={onHandleGroup}
                  />
                </div>
                <div className="batch-input-width batch-status-minheight">
                  {status === 1 &&
                  <div className="batch-status-creation">
                    <div className="alert alert-success" role="alert" >Batch Created successfully !!</div>
                  </div>
                  }
                  {status === 2 &&
                    <div className="batch-status-creation">
                      <div className="fill-alert" >Fill all the required fields !</div>
                    </div>
                  }
                </div>
                <div className="batch-submit-btn">
                  <button type="button" className="btn btn-outline-primary" onClick={onCreatebBatch}>Create batch</button>
                </div>
              </div>
            </Col>
            <Col lg={4} sm={12}>
              <div className="batch-detail">
                <div >Company Data</div>
              </div>
              <div style={{ height: 500, width: '90%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={7} checkboxSelection onRowSelected={onHandlecheck} onSelectionModelChange={onHandlecheck} loading={false} filterModel={riceFilterModel} disableColumnSelector />
              </div>
            </Col>
            <Col lg={4} sm={12}>
              <div className="batch-detail">
                <div>Batch List</div>
              </div>
              <Row className="batch-display-outer ">
                <div className="batch-display-inner" >
                  {batchlist}
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};


export default BatchCreation;
