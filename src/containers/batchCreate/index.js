import React, { useState, useRef } from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';


const BatchCreation = () => {
  const [batch, setBatch] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetail] = useState([]);
  const [status, setStatus] = useState(0);
  const [year, setYear] = useState('');
  const [id, setId] = useState('');
  const [validBorder, setValidBorder] = useState(false);

  const companyOptions = [
    { value: 'Indian oil', label: 'Indian oil' },
    { value: 'hindustan', label: 'hindustan' },
    { value: 'pertol', label: 'pertol' },
    { value: 'Bharat', label: 'Bharat' },
    { value: 'Tatamotors', label: 'Tatamotors' },
    { value: 'Bank of baroda', label: 'Bank of baroda' },
    { value: 'ICICI', label: 'ICICI' },
    { value: 'HDFC', label: 'HDFC' },
    { value: 'Axis', label: 'Axis' },
    { value: 'Mangalore', label: 'Mangalore' },
    { value: 'Relaince', label: 'Relaince' },
  ];
  const yearOptions = [
    { value: '2016 - 2017', label: '2016 - 2017' },
    { value: '2017 - 2018', label: '2017 - 2018' },
    { value: '2018 - 2019', label: '2018 - 2019' },
    { value: '2019 - 2020', label: '2019 - 2020' },
  ];

  const onHandleBatch = (companylist) => {
    setCompany(companylist);
  };

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

  const onCreatebBatch = () => {
    // Conditions for validating input fields with red border
    if (!batch) {
      setValidBorder('border-danger');
      setStatus(2);
    } else if (!id) {
      setValidBorder('border-danger');
      setStatus(2);
    } else if (!company) {
      setValidBorder(true);
      setStatus(2);
    } else if (!year) {
      setValidBorder(true);
      setStatus(2);
    } else {
      const companyCount = company.length;
      const allDetails = { batchName: batch, company_list: company, Count: companyCount };
      const updatedDetails = [allDetails, ...details];
      setDetail(updatedDetails);
      setTimeout(() => {
        setStatus(0);
      }, 3000);
      setStatus(1);
    }
    // funtion to add batches and show message
  };
  const batchlist = details.map(({ batchName, Count }) => (
    <Card className="batch-card card-view batchbox">
      <div className="batch-card-content">
        <div className="batch-card-content-name" >Batch name:</div>
        <div className="batch-card-content-value" data-toggle="tooltip" data-placement="top" title={batchName}>{batchName}</div>
      </div>
      <div className="batch-card-content" >
        <div className="batch-card-content-name">No of Companies:</div >
        <div className="batch-card-content-value">{Count}</div>
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
          <div className="batch-heading-wrapper"><div className="batch-heading-name">Batch Creation</div></div>
          <Row>
            <Col lg={6} sm={12}>
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
                <div className="batch-name">Select Companies*</div>
                <div className={`batch-input-width mar-bottom ${company === '' && validBorder && 'dropdown-alert' }`}>
                  <Select
                    isMulti
                    className={company === '' && validBorder}
                    options={companyOptions}
                    onChange={onHandleBatch}
                  />
                </div>
                <div className="batch-year">Select Year*</div>
                <div className={`batch-input-width mar-bottom ${year === '' && validBorder && 'dropdown-alert' }`}>
                  <Select
                    isMulti
                    options={yearOptions}
                    onChange={onHandleYear}
                    className={year === '' && validBorder}
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
            <Col lg={6} sm={12}>
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
