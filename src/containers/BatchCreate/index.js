/* eslint-disable import/first */
import React, { useState, useRef } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import ImportCompanies from '../../containers/ImportCompanies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const BatchCreation = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => (setShow(true));
  // const batchlist = details.map(({ batchName }) => (
  //   <Card className="batch-card card-view batchbox">
  //     <div className="batch-card-content">
  //       <div className="batch-card-content-name" >Batch name:</div>
  //       <div className="batch-card-content-value" data-toggle="tooltip" data-placement="top" title={batchName}>{batchName}</div>
  //     </div>
  //     <div className="batch-card-content" >
  //       <div className="batch-card-content-name">Batch ID</div >
  //       {/* <div className="batch-card-content-value">{Id}</div> */}
  //     </div>
  //   </Card>
  // ));
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
            <div>
              <Button variant="primary" className="imp-btn" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                <div className="imp-btn-name">Batch</div>
              </Button>
            </div>
          </div>
          <Row>
            <Col lg={12} sm={12}>
              <div className="batch-detail">
                <div>Batch List</div>
              </div>
              <Row className="batch-display-outer ">
                <div className="batch-display-inner" >
                  {/* {batchlist} */}
                </div>
              </Row>
            </Col>
          </Row>
          <ImportCompanies show={show} setShow={setShow} />
        </Container>
      </div>
    </div>
  );
};


export default BatchCreation;
