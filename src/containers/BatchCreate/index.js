/* eslint-disable import/first */
import React, { useState, useRef } from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import ImportCompanies from '../../containers/ImportCompanies';

const BatchCreation = () => {
  const [details, setDetail] = useState([]);
  const batchlist = details.map(({ batchName }) => (
    <Card className="batch-card card-view batchbox">
      <div className="batch-card-content">
        <div className="batch-card-content-name" >Batch name:</div>
        <div className="batch-card-content-value" data-toggle="tooltip" data-placement="top" title={batchName}>{batchName}</div>
      </div>
      <div className="batch-card-content" >
        <div className="batch-card-content-name">Batch ID</div >
        {/* <div className="batch-card-content-value">{Id}</div> */}
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
            <div><ImportCompanies details={details} setDetail={setDetail} /></div>
          </div>
          <Row>
            <Col lg={12} sm={12}>
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
