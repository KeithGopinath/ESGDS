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
  const onHandleBatch = (companylist) => {
    setCompany(companylist);
  };

  const onHandleInput = (batchname) => {
    setBatch(batchname.target.value);
  };

  const onCreatebBatch = () => {
    const companyCount = company.length;
    if (batch.length && companyCount > 0) {
      const allDetails = { batchName: batch, company_list: company, Count: companyCount };
      const updatedDetails = [allDetails, ...details];
      setDetail(updatedDetails);
      setTimeout(() => {
        setStatus(0);
      }, 3000);
      setStatus(1);
    } else {
      setTimeout(() => {
        setStatus(0);
      }, 3000);
      setStatus(2);
    }
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
              <div className="form-group batch-input-width" ><input type="text" className="form-control" onChange={onHandleInput} autoComplete="off" required></input></div>
              <div className="batch-input-width">
                <div className="batch-name">Select Companies*</div>
                <div>
                  <Select
                    isMulti
                    options={companyOptions}
                    onChange={onHandleBatch}
                    name="name"
                  />
                </div>
                <div className="batch-status-minheight">
                  {status === 1 &&
                  <div className="batch-status-creation">
                    <div className="alert alert-success" role="alert" >Assigned successfully !!</div>
                  </div>
                  }
                  {status === 2 &&
                    <div className="batch-status-creation">
                      <div className="alert alert-danger" role="alert" >Fill all the required fields !</div>
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
