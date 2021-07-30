/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { message } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileImport } from '@fortawesome/free-solid-svg-icons';
// import * as XLSX from 'xlsx';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Overlay from '../../components/Overlay';


// eslint-disable-next-line object-curly-newline
const BatchCreation = ({ show, setShow }) => {
  const [batch, setBatch] = useState('');
  const [year, setYear] = useState('');
  const [rowDetail, setRowDetails] = useState([]);
  const [alert, setAlert] = useState(0);
  const [subsetTax, setsubsetTax] = useState('');
  const handleClose = () => {
    setBatch('');
    setYear('');
    setsubsetTax('');
    setRowDetails([]);
    setAlert(0);
    setValidBorder(false);
    setShow(false);
  };
  const dispatch = useDispatch();
  const [validBorder, setValidBorder] = useState(false);
  const taxonomyData = useSelector((ClientTaxonomy) => ClientTaxonomy.clientTaxonomy.taxonomydata);
  const companyTaxData = useSelector((taxcompany) => taxcompany.taxonomyCompany.taxonomycompany);
  const fullList = companyTaxData && companyTaxData.rows;

  const rowArray = fullList && fullList.map((args) => ({
    id: args.id, companydata: args.companyName,
  }));
  const modTax = taxonomyData && taxonomyData.rows;
  const taxOptions = modTax && modTax.map((e) => (
    { value: e._id, label: e.taxonomyName }
  ));

  const optionsForPagination = {
    sizePerPage: 10,
  };
  const isbatchCreated = useSelector((createbatch) => createbatch.createBatch.batchpost);
  useEffect(() => {
    if (isbatchCreated) {
      setAlert(1);
      setTimeout(() => {
        setAlert(0);
      }, 3000);
      setBatch('');
      setYear('');
      setsubsetTax('');
      setRowDetails([]);
      setValidBorder(false);
      dispatch({ type: 'TAXANOMYCOMPANY_RESET' });
      dispatch({ type: 'BATCH_REQUEST' });
    }
  }, [isbatchCreated]);
  const onRowSelect = (row, isSelected) => {
    if (isSelected === true && rowDetail.length === 0) {
      const rowDetails = { value: row.id, selectedCompany: row.companydata };
      const selectedRow = [rowDetails, ...rowDetail];
      setRowDetails(selectedRow);
    } else if (isSelected === true && rowDetail.length > 0) {
      rowDetail.map((array) => {
        if (array.id !== row.id) {
          const rowDetails = { value: row.id, selectedCompany: row.companydata };
          const selectedRow = [rowDetails, ...rowDetail];
          setRowDetails(selectedRow);
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
    }
  };
  // eslint-disable-next-line consistent-return
  const onRowSelectAll = (isSelected) => {
    if (isSelected) {
      const dummy = [...rowDetail];
      rowDetail.splice(0, rowDetail.length);
      const finalAll = rowArray.map((args) => {
        const rowDetails = { value: args.id, selectedCompany: args.companydata };
        dummy.push(rowDetails);
        return dummy;
      });
      setRowDetails(finalAll[0]);
      return rowArray.map((e) => e.id);
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
  const onHandleTax = (selectedtax) => {
    setsubsetTax(selectedtax);
    dispatch({ type: 'TAXANOMYCOMPANY_REQUEST', payload: selectedtax.value });
  };
  const onHandleInput = (batchname) => {
    // if (batchname.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
    setBatch(batchname.target.value);
    // }
  };

  const onCreatebBatch = () => {
    // Conditions for validating input fields with red border
    if (!batch) {
      setValidBorder('border-danger');
    } else if (!year || !subsetTax) {
      setValidBorder(true);
    }
    if ((batch.length && year.length && rowDetail.length && subsetTax.value.length) > 0) {
      const data = {
        taxonomy: subsetTax, batchName: batch, years: year, companies: rowDetail,
      };
      dispatch({ type: 'BATCH_CREATE_REQUEST', payload: data });
    } else {
      setAlert(2);
    }
    // funtion to add batches and show message
  };
  const BatchBody = () => (
    <div className="modal-batch-body">
      <Row>
        <Col lg={6} sm={12} style={{ paddingRight: '0px' }}>
          <div className="batch-year">Select Taxonomy <span className="mandatory-color">*</span></div>
          <div className={`batch-input-width mar-tax-bot ${subsetTax.length === 0 && validBorder && 'dropdown-alert' }`}>
            <Select
              options={taxOptions}
              onChange={onHandleTax}
              value={subsetTax}
            />
          </div>
          <div className="batch-name">Batch name <span className="mandatory-color">*</span></div>
          <div className="form-group batch-input-width " >
            <input type="text" className={`form-control ${batch === '' && validBorder}`} onChange={onHandleInput} autoComplete="off" value={batch} required ></input>
          </div>
          <div className="batch-year">Select Year <span className="mandatory-color">*</span></div>
          <div className={`batch-input-width dp-min-height ${year.length === 0 && validBorder && 'dropdown-alert' }`}>
            <Select
              isMulti
              options={yearOptions}
              onChange={onHandleYear}
              value={year}
            />
          </div>
        </Col>
        <Col lg={6} sm={12} style={{ paddingLeft: '0px' }}>
          <div className="batch-create-companies">
            <BootstrapTable data={!rowArray ? [] : rowArray} hover pagination selectRow={selectRowProp} options={optionsForPagination} bootstrap4>
              <TableHeaderColumn isKey dataField="id" hidden> id </TableHeaderColumn>
              <TableHeaderColumn dataField="companydata" filter={{ type: 'TextFilter', delay: 100, placeholder: 'Search' }} className="table-header-name" dataSort>Companies</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </Col>
      </Row>
    </div>
  );


  const BatchFooter = () => (
    <div className="foo-batch">
      <div className=" batch-status-minheight">
        {alert === 1 &&
        <div className="alert alert-success" role="alert" >Batch Created successfully !!</div>
        }
        {alert === 2 &&
          <div className="fill-alert" >Fill all the required fields !</div>
        }
      </div>
      <div className="batch-submit-btn">
        <div className="create-btn"><button type="button" className="btn btn-outline-primary" onClick={onCreatebBatch}>Create batch</button></div>
      </div>
    </div>

  );

  // *** import companies from excel ***
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
    <Overlay
      className="Batch-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation
      centered
      size="lg"
      title="Batch Creation"
      body={BatchBody()}
      onSubmitPrimary={onCreatebBatch}
      footer={BatchFooter()}
    />
  );
};

export default BatchCreation;
