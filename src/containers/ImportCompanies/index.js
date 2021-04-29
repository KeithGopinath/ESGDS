/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFileCsv } from '@fortawesome/free-solid-svg-icons';
// import * as XLSX from 'xlsx';
import { DataGrid } from '@material-ui/data-grid';
import Select from 'react-select';


const ImportCompanies = ({ details, setDetail }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [batch, setBatch] = useState('');
  const [status, setStatus] = useState(0);
  const [year, setYear] = useState('');
  const [validBorder, setValidBorder] = useState(false);
  //   const handleStatus = () => {
  //     alert('imported');
  //   };
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
  const yearOptions = [
    { value: '2016 - 2017', label: '2016 - 2017' },
    { value: '2017 - 2018', label: '2017 - 2018' },
    { value: '2018 - 2019', label: '2018 - 2019' },
    { value: '2019 - 2020', label: '2019 - 2020' },
  ];
  const onHandleYear = (selectedyear) => {
    setYear(selectedyear);
  };
  const onHandleInput = (batchname) => {
    if (batchname.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setBatch(batchname.target.value);
    }
  };
  const onCreatebBatch = () => {
    // Conditions for validating input fields with red border
    if (!batch) {
      setValidBorder('border-danger');
      setStatus(2);
    } else if (!year) {
      setValidBorder(true);
      setStatus(2);
    }
    if ((batch.length && year.length) > 0) {
      const allDetails = { batchName: batch };
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

  // const getCompanyData = (e) => {
  //   const file = e.target.files[0];
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(file);
  //     fileReader.onload = (args) => {
  //       const bufferArray = args.target.result;
  //       const wb = XLSX.read(bufferArray, { type: 'buffer' });
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       const data = XLSX.utils.sheet_to_json(ws);
  //       resolve(data);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  //   promise.then((data) => {
  //     console.log(data);
  //   });
  // };
  return (
    <div>
      <Button variant="primary" className="imp-btn" onClick={handleShow}>
        <FontAwesomeIcon icon={faFileCsv}></FontAwesomeIcon>
        <div className="imp-btn-name">Import</div>
      </Button>
      <Modal show={show} onHide={handleClose} className="modal-width" backdrop="static" keyboard={false} animation >
        <Modal.Header closeButton className="import-head">
          <FontAwesomeIcon className="import-icon" icon={faFileImport} />
          <Modal.Title className="import-title">Import Companies</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-batch-body" >
          <Row>
            <Col lg={6} sm={12}>
              <div className="batch-detail">
                <div >Batch Details</div>
              </div>
              <div className="batch-name">Batch name* :</div>
              <div className="form-group batch-input-width" >
                <input type="text" className={`form-control ${batch === '' && validBorder}`} onChange={onHandleInput} autoComplete="off" value={batch} required ></input>
              </div>
              <div>
                <div className="batch-year">Select Year*</div>
                <div className={`batch-input-width mar-bottom ${year.length === 0 && validBorder && 'dropdown-alert' }`}>
                  <Select
                    isMulti
                    options={yearOptions}
                    onChange={onHandleYear}
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
                <div >Company Data</div>
              </div>
              <div style={{ height: 400, width: '90%' }}>
                <DataGrid rows={rows} columns={columns} pageSize={7} checkboxSelection onRowSelected={onHandlecheck} onSelectionModelChange={onHandlecheck} loading={false} filterModel={riceFilterModel} disableColumnSelector />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ border: 'none' }}>
          <Button variant="success" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImportCompanies;
