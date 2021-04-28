/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';


const ImportCompanies = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   const handleStatus = () => {
  //     alert('imported');
  //   };
  const getCompanyData = (e) => {
    const file = e.target.files[0];
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (args) => {
        const bufferArray = args.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => {
      console.log(data);
    });
  };
  return (
    <div>
      <Button variant="primary" className="imp-btn" onClick={handleShow}>
        <FontAwesomeIcon icon={faFileCsv}></FontAwesomeIcon>
        <div className="imp-btn-name">Import</div>
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation centered>
        <Modal.Header closeButton className="import-head">
          <FontAwesomeIcon className="import-icon" icon={faFileImport} />
          <Modal.Title className="import-title">Import Companies</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0.5rem 1.5rem' }}>
          <Row>
            <Col className="imp-popup-content" >
              <div className="import-file">
                <div><input type="file" id="input" onChange={getCompanyData} /></div>
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
