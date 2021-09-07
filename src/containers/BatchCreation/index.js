/* eslint-disable no-useless-escape */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { Result } from 'antd';
// import { message } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFileImport } from '@fortawesome/free-solid-svg-icons';
// import * as XLSX from 'xlsx';
import Select from 'react-select';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Overlay from '../../components/Overlay';
import PageLoader from '../../components/PageLoader';


// eslint-disable-next-line object-curly-newline
const BatchCreation = ({ show, setShow }) => {
  const [batch, setBatch] = useState('');
  const [year, setYear] = useState('');
  const [rowDetail, setRowDetails] = useState([]);
  const [alert, setAlert] = useState('');
  const [subsetTax, setsubsetTax] = useState('');
  const [alertStatus, setalertStatus] = useState(false);
  useEffect(() => {
    dispatch({ type: 'BATCH_CREATE_RESET' });
    dispatch({ type: 'TAXANOMYCOMPANY_RESET' });
  }, []);
  const handleClose = () => {
    setBatch('');
    setYear('');
    setsubsetTax('');
    setRowDetails([]);
    setAlert('');
    setValidBorder(false);
    setShow(false);
    setalertStatus(false);
    dispatch({ type: 'BATCH_CREATE_RESET' });
    dispatch({ type: 'TAXANOMYCOMPANY_RESET' });
  };
  const dispatch = useDispatch();
  const [validBorder, setValidBorder] = useState(false);
  const taxonomyData = useSelector((ClientTaxonomy) => ClientTaxonomy.clientTaxonomy);
  const taxonomyLoading = useSelector((ClientTaxonomy) => ClientTaxonomy.clientTaxonomy.isLoading);
  const companyTaxData = useSelector((taxcompany) => taxcompany.taxonomyCompany);
  const companyTaxLoading = useSelector((taxcompany) => taxcompany.taxonomyCompany.isLoading);
  const fullList = companyTaxData.taxonomycompany && companyTaxData.taxonomycompany.rows;

  const rowArray = fullList && fullList.map((args) => ({
    id: args.id, companydata: args.companyName,
  }));
  const modTax = taxonomyData.taxonomydata && taxonomyData.taxonomydata.rows;
  const taxOptions = modTax && modTax.map((e) => (
    { value: e._id, label: e.taxonomyName }
  ));

  const optionsForPagination = {
    sizePerPage: 10,
    // eslint-disable-next-line react/jsx-curly-brace-presence
    noDataText: (companyTaxLoading) ? <PageLoader load={'comp-loader'} /> : 'There is no data to display',
  };
  const isbatchCreated = useSelector((createbatch) => createbatch.createBatch);
  const isbatchCreatedLoading = useSelector((createbatch) => createbatch.createBatch.isLoading);

  useEffect(() => {
    if (isbatchCreated.batchpost) {
      setAlert(isbatchCreated.batchpost.message);
      setBatch('');
      setYear('');
      setsubsetTax('');
      setRowDetails([]);
      setValidBorder(false);
      dispatch({ type: 'TAXANOMYCOMPANY_RESET' });
      dispatch({ type: 'BATCH_REQUEST' });
    }
  }, [isbatchCreated.batchpost]);
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


  const currentYear = moment().year();
  const yearOptions = [
    { value: `${currentYear - 1}-${currentYear}`, label: `${currentYear - 1}-${currentYear}` },
    { value: `${currentYear - 2}-${currentYear - 1}`, label: `${currentYear - 2}-${currentYear - 1}` },
    { value: `${currentYear - 3}-${currentYear - 2}`, label: `${currentYear - 3}-${currentYear - 2}` },
    { value: `${currentYear - 4}-${currentYear - 3}`, label: `${currentYear - 4}-${currentYear - 3}` },
    { value: `${currentYear - 5}-${currentYear - 4}`, label: `${currentYear - 5}-${currentYear - 4}` },
  ];
  const onHandleYear = (selectedyear) => {
    setYear(selectedyear);
  };
  const onHandleTax = (selectedtax) => {
    setsubsetTax(selectedtax);
    setalertStatus(false);
    setAlert('');
    dispatch({ type: 'TAXANOMYCOMPANY_REQUEST', payload: selectedtax.value });
  };
  const onHandleInput = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9\s-]*$/.test(e.target.value)) {
      const uppercaseName = (e.target.value).toUpperCase();
      setBatch(uppercaseName);
    }
  };
  useEffect(() => {
    if (isbatchCreated.error || taxonomyData.error || companyTaxData.error) {
      setalertStatus(false);
      setAlert((isbatchCreated.error && isbatchCreated.error.message) || (taxonomyData.error && taxonomyData.error.message) || (companyTaxData.error && companyTaxData.error.message));
    }
  }, [isbatchCreated.error, taxonomyData.error, companyTaxData.error]);

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
      setalertStatus(true);
      dispatch({ type: 'BATCH_CREATE_REQUEST', payload: data });
    } else {
      setAlert('Fill all the required fields');
      setalertStatus(false);
    }
    // funtion to add batches and show message
  };
  const BatchBody = () => (
    <div className="modal-batch-body">
      <Row>
        <Col lg={6} sm={12} className="pad-right">
          <div className="batch-year">Select Taxonomy <span className="mandatory-color">*</span></div>
          <div className={`batch-input-width mar-tax-bot ${subsetTax.length === 0 && validBorder && 'dropdown-alert' }`}>
            <Select
              options={taxOptions}
              onChange={onHandleTax}
              value={subsetTax}
            />
          </div>
          <div className="batch-name">Batch Name <span className="mandatory-color">*</span></div>
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
        <Col lg={6} sm={12} className="pad-left">
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
    <React.Fragment>
      <div className="foo-batch">
        <div className=" batch-status-minheight">
          {alert &&
            <div className={(alertStatus) ? 'batch-success-alert' : 'batch-fill-alert'} >{alert}</div>
          }
        </div>
        <div className="batch-submit-btn">
          <div className="create-btn"><button type="button" className="btn btn-outline-primary" onClick={onCreatebBatch}>Create</button></div>
        </div>
      </div>
    </React.Fragment>

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
      isLoading={taxonomyLoading || isbatchCreatedLoading}
      footer={BatchFooter()}
    />
  );
};

export default BatchCreation;
