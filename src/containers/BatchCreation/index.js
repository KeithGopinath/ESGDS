/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';
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
  // const [batchsla, Setbatchsla] = useState('');
  // const [companies, setCompanies] = useState([]);
  const handleClose = () => {
    setBatch('');
    setYear('');
    setsubsetTax('');
    // Setbatchsla('');
    setRowDetails([]);
    setAlert(0);
    setValidBorder(false);
    setShow(false);
  };
  const dispatch = useDispatch();
  const [validBorder, setValidBorder] = useState(false);
  const taxonomyData = useSelector((ClientTaxonomy) => ClientTaxonomy.clientTaxonomy.taxonomydata);
  console.log(taxonomyData, 'taxonomyData');
  const companyData = useSelector((companylist) => companylist.companylist.companydata);
  const fullList = companyData && companyData.rows;

  const rowArray = fullList && fullList.map((args) => ({
    id: args.id, companydata: args.companyName,
  }));
  const modTax = taxonomyData && taxonomyData.rows;
  console.log(modTax, 'modTax');
  const taxOptions = modTax && modTax.map((e) => (
    { value: e._id, label: e.taxonomyName }
  ));

  const optionsForPagination = {
    sizePerPage: 10,
  };
  const isbatchCreated = useSelector((createbatch) => createbatch.createBatch.batchpost);
  console.log(isbatchCreated, 'isbatchCreated');
  useEffect(() => {
    if (isbatchCreated) {
      setTimeout(() => {
        setAlert(0);
      }, 2000);
      dispatch({ type: 'BATCH_REQUEST' });
    } else {
      console.log('fail');
    }
  }, [isbatchCreated]);
  const onRowSelect = (row, isSelected) => {
    console.log(row, 'row');
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
      console.log(rowDetail, 'onSelectRow');
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
      console.log(finalAll[0], 'finalAll');
      setRowDetails(finalAll[0]);
      console.log(rowDetail, 'last');
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
  // const taxOptions = [
  //   { value: 'TAX001', label: 'TAX001' },
  //   { value: 'TAX002', label: 'TAX002' },
  //   { value: 'TAX03', label: 'TAX03' },
  // ];
  const onHandleYear = (selectedyear) => {
    console.log(selectedyear, 'selectedyear');
    setYear(selectedyear);
  };
  const onHandleTax = (selectedtax) => {
    console.log(selectedtax, 'selectedtax');
    setsubsetTax(selectedtax);
    console.log(subsetTax, 'subsetTax');
  };
  const onHandleInput = (batchname) => {
    if (batchname.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setBatch(batchname.target.value);
    }
  };
  // const getFormatDate = (arg) => {
  //   const date = moment(arg, 'YYY-MM-DD').format('YYYY-MM-DD');
  //   return date;
  // };
  // const batchEndData = (e) => {
  //   console.log(e, 'batch end date');
  //   if (e !== null) {
  //     const date = getFormatDate(e._d);
  //     console.log(date, 'analystDate');
  //     Setbatchsla(date);
  //   } else {
  //     Setbatchsla('');
  //   }
  // };
  const onCreatebBatch = () => {
    console.log(validBorder, 'validBorder');
    console.log(subsetTax, 'subsetTax');
    // Conditions for validating input fields with red border
    if (!batch) {
      setValidBorder('border-danger');
    } else if (!year || !subsetTax) {
      setValidBorder(true);
    }
    // else if (!batchSLA) {
    //   setValidBorder('sla');
    // }
    if ((batch.length && year.length && rowDetail.length && subsetTax.value.length) > 0) {
      const data = {
        taxonomy: subsetTax, batchName: batch, years: year, companies: rowDetail,
      };
      dispatch({ type: 'BATCH_CREATE_REQUEST', payload: data });
      setTimeout(() => {
        setAlert(0);
      }, 2000);
      setAlert(1);
    } else {
      setAlert(2);
    }
    // funtion to add batches and show message
  };
  const BatchBody = () => (
    <div className="modal-batch-body">
      <Row>
        <Col lg={6} sm={12}>
          {/* <div className="batch-detail">
            <div >Batch Details</div>
          </div> */}
          <div className="batch-year">Select Taxonomy*</div>
          <div className={`batch-input-width mar-tax-bot ${subsetTax.length === 0 && validBorder && 'dropdown-alert' }`}>
            <Select
              options={taxOptions}
              onChange={onHandleTax}
            />
          </div>
          <div className="batch-name">Batch name*</div>
          <div className="form-group batch-input-width " >
            <input type="text" className={`form-control ${batch === '' && validBorder}`} onChange={onHandleInput} autoComplete="off" value={batch} required ></input>
          </div>
          <div className="batch-year">Select Year*</div>
          <div className={`batch-input-width dp-min-height ${year.length === 0 && validBorder && 'dropdown-alert' }`}>
            <Select
              isMulti
              options={yearOptions}
              onChange={onHandleYear}
            />
          </div>
          {/* <div className="batch-sla">Batch SLA*</div>
          <div className={`batch-input-width ${batchsla === '' && validBorder && 'dropdown-alert-sla' }`}>
            <DatePicker
              className="date-picker"
              size="middle"
              format="YYYY-MM-DD"
              onChange={batchEndData}
            />
          </div> */}
        </Col>
        <Col lg={6} sm={12}>
          <BootstrapTable data={rowArray} hover pagination selectRow={selectRowProp} options={optionsForPagination} bootstrap4>
            <TableHeaderColumn isKey dataField="id" hidden> id </TableHeaderColumn>
            <TableHeaderColumn dataField="companydata" filter={{ type: 'TextFilter', delay: 100, placeholder: 'Search' }} className="table-header-name" dataSort>Companies</TableHeaderColumn>
          </BootstrapTable>
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
        <div className="imp-btn-company">
          <input type="file" id="actual-btn" hidden onChange={getCompanyData} />
          <FontAwesomeIcon className="import-icon" icon={faFileImport} />
          <label htmlFor="actual-btn" className="label-imp" >Import Companies</label>
        </div>
      </div>
    </div>

  );


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
