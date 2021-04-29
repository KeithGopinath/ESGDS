/* eslint-disable import/first */
import React, { useState, useRef } from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import ImportCompanies from '../../containers/ImportCompanies';
import { DataGrid } from '@material-ui/data-grid';

const BatchCreation = () => {
  const [details, setDetail] = useState([]);
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
            <Col lg={6} sm={12}>
              <div className="batch-detail">
                <div >Company Data</div>
              </div>
              <div style={{ height: 400, width: '90%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={7} checkboxSelection loading={false} filterModel={riceFilterModel} disableColumnSelector />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};


export default BatchCreation;
