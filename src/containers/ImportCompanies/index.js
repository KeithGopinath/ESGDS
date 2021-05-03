/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import Overlay from '../../components/Overlay';


const ImportCompanies = ({ show, setShow }) => {
  const [batch, setBatch] = useState('');
  const [year, setYear] = useState('');
  const [details, setDetail] = useState([]);
  const [rowDetail, setRowDetails] = useState([]);
  const [alert, setAlert] = useState(0);
  const handleClose = () => {
    setBatch('');
    setYear('');
    setRowDetails([]);
    setAlert(0);
    setValidBorder(false);
    setShow(false);
  };
  const [validBorder, setValidBorder] = useState(false);


  const optionsForPagination = {
    sizePerPage: 11,
  };
  // eslint-disable-next-line consistent-return
  const onRowSelect = (row, isSelected) => {
    if (isSelected === true && rowDetail.length === 0) {
      const rowDetails = { id: row.id, selectedCompany: row.companydata };
      const selectedRow = [rowDetails, ...rowDetail];
      setRowDetails(selectedRow);
    } else if (isSelected === true && rowDetail.length > 0) {
      // console.log('non empty arry');
      rowDetail.map((array) => {
        if (array.id !== row.id) {
          const rowDetails = { id: row.id, selectedCompany: row.companydata };
          const selectedRow = [rowDetails, ...rowDetail];
          setRowDetails(selectedRow);
          console.log(rowDetail, 'add');
        }
        return [];
      });
    }
    // removing rows from an array
    if (isSelected === false) {
      rowDetail.map((arr, index) => {
        let arrayDel = [...rowDetail];
        if (arr.id === row.id && index !== -1) {
          arrayDel.splice(index, 1);
          setRowDetails(arrayDel);
        }
        return [];
      });
      console.log(rowDetail, 'remove');
    }
  };
  // eslint-disable-next-line consistent-return
  const onRowSelectAll = (isSelected) => {
    if (isSelected) {
      const dummy = [...rowDetail];
      rowDetail.splice(0, rowDetail.length);
      const finalAll = rows.map((args) => {
        const rowDetails = { id: args.id, selectedCompany: args.companydata };
        dummy.push(rowDetails);
        return dummy;
      });
      console.log(finalAll[0], 'finalAll');
      setRowDetails(finalAll[0]);
      console.log(rowDetail, 'last');
      return rows.map((e) => e.id);
    }
    if (!isSelected) {
      setRowDetails([]);
    }
  };
  const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    bgColor: '#3f51b514',
    onSelect: onRowSelect,
    onSelectAll: onRowSelectAll,
    showOnlySelected: true,
  };

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
  // const handleSelect = (e) => {
  //   console.log(e, '***');
  // };
  const onCreatebBatch = () => {
    // Conditions for validating input fields with red border
    if (!batch) {
      setValidBorder('border-danger');
    } else if (!year) {
      setValidBorder(true);
    }
    if ((batch.length && year.length && rowDetail.length) > 0) {
      setAlert(1);
      const allDetails = { batchName: batch };
      const updatedDetails = [allDetails, ...details];
      setDetail(updatedDetails);
      console.log(details, 'batchdetails updates');
    } else {
      setAlert(2);
    }
    // funtion to add batches and show message
  };
  // const BatchBody = () => (
  //   <div className="modal-batch-body">
  //     <Row>
  //       <Col lg={6} sm={12}>
  //         <div className="batch-detail">
  //           <div >Batch Details</div>
  //         </div>
  //         <div className="batch-name">Batch name* :</div>
  //         <div className="form-group batch-input-width" >
  //           <input type="text" className={`form-control ${batch === '' && validBorder}`} onChange={onHandleInput} autoComplete="off" required ></input>
  //         </div>
  //         <div>
  //           <div className="batch-year">Select Year*</div>
  //           <div className={`batch-input-width  ${year.length === 0 && validBorder && 'dropdown-alert' }`}>
  //             <Select
  //               isMulti
  //               options={yearOptions}
  //               onChange={onHandleYear}
  //             />
  //           </div>
  //         </div>
  //       </Col>
  //       <Col lg={6} sm={12}>
  //         <BootstrapTable data={rows} version="4" hover pagination selectRow={selectRowProp} options={optionsForPagination}>
  //           <TableHeaderColumn isKey dataField="id" hidden> id </TableHeaderColumn>
  //           <TableHeaderColumn dataField="companydata" dataSort filter={{ type: 'TextFilter', delay: 100, placeholder: 'Search companies' }} className="table-header-name"></TableHeaderColumn>
  //         </BootstrapTable>
  //       </Col>
  //     </Row>
  //   </div>
  // );

  // const BatchFooter = () => (
  //   <div className="batch-submit-btn">
  //     <div><button type="button" className="btn btn-outline-primary" onClick={onCreatebBatch}>Create batch</button></div>
  //     <div className="imp-btn-company">
  //       <input type="file" id="actual-btn" hidden onChange={getCompanyData} />
  //       <FontAwesomeIcon className="import-icon" icon={faFileImport} />
  //       <label htmlFor="actual-btn" className="label-imp" >Import Companies</label>
  //     </div>
  //   </div>
  // );

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
  // <Overlay
  //   className="Batch-modal"
  //   show={show}
  //   onHide={handleClose}
  //   backdrop="static"
  //   keyboard={false}
  //   animation
  //   centered
  //   size="lg"
  //   title="Batch"
  //   body={<BatchBody />}
  //   alert={alert}
  //   onSubmitPrimary={onCreatebBatch}
  //   footer={<BatchFooter />}
  // />


    <Modal show={show} onHide={handleClose} className="modal-width" backdrop="static" keyboard={false} animation >
      <Modal.Header closeButton className="import-head">
        <Modal.Title className="import-title">Batch Creation</Modal.Title>
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
                {alert === 1 &&
                <div className="batch-status-creation">
                  <div className="alert alert-success" role="alert" >Batch Created successfully !!</div>
                </div>
                }
                {alert === 2 &&
                  <div className="batch-status-creation">
                    <div className="fill-alert" >Fill all the required fields !</div>
                  </div>
                }
              </div>
              <div className="batch-submit-btn">
                <div><button type="button" className="btn btn-outline-primary" onClick={onCreatebBatch}>Create batch</button></div>
                <div className="imp-btn-company">
                  <input type="file" id="actual-btn" hidden onChange={getCompanyData} />
                  <FontAwesomeIcon className="import-icon" icon={faFileImport} />
                  <label htmlFor="actual-btn" className="label-imp" >Import Companies</label>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={12}>
            <BootstrapTable data={rows} version="4" hover pagination selectRow={selectRowProp} options={optionsForPagination}>
              <TableHeaderColumn isKey dataField="id" hidden> id </TableHeaderColumn>
              <TableHeaderColumn dataField="companydata" dataSort filter={{ type: 'TextFilter', delay: 100, placeholder: 'Search companies' }} className="table-header-name"></TableHeaderColumn>
            </BootstrapTable>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{ border: 'none' }}>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportCompanies;
