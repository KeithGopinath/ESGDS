import React, { useState, useRef } from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';


const BatchCreation = () => {
  const [batch, setbatch] = useState('');
  const [company, setcompany] = useState('');
  const [details, setdetail] = useState([]);

  const Options = [
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
  const onHandlebatch = (companylist) => {
    setcompany(companylist);
  };

  const onHandleInput = (batchname) => {
    setbatch(batchname.target.value);
  };

  const onCreatebatch = () => {
    const companyCount = company.length;
    if (batch.length && companyCount > 0) {
      alert('batch created successfully');
      const allDetails = { batchName: batch, company_list: company, Count: companyCount };
      const updatedDetails = [allDetails, ...details];
      setdetail(updatedDetails);
      console.log(details, 'batchdetails');
    } else {
      alert('Fill all fields');
    }
  };
  const batchlist = details.map(({ batchName, Count }) => (
    <Card className="batch-card card-view">
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
              <div className="form-group batch-input-width" ><input type="text" className="form-control" onChange={onHandleInput} autoComplete="off" required></input></div>
              <div className="batch-input-width">
                <div className="batch-name">Select Companies*</div>
                <div>
                  <Select
                    isMulti
                    options={Options}
                    onChange={onHandlebatch}
                    name="name"
                  />
                </div>
                <div className="batch-submit-btn">
                  <button type="button" className="btn btn-outline-primary" onClick={onCreatebatch}>Create batch</button>
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
