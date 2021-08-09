/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Row, Col, Container, Button, } from 'react-bootstrap';
import { message } from 'antd';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { faSearch, faEdit, faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';
import NewTaxonomySubset from '../../containers/NewTaxonomySubset';
import PageLoader from '../../components/PageLoader';
import Overlay from '../../components/Overlay';
import Select from 'react-select';

const Taxonomy = ({ subsetList, showList, handleListClose }) => {
  const sideBarRef = useRef();
  const [showSubset, setShowSubset] = useState(false);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(20);
  const [taxonomyData, setTaxonomyData] = useState()
  const [subsetData, setSubsetData] = useState([])
  const [label, setLabel] = useState('');
  const [applicable, setApplicable] = useState('');
  const [labelType, setLabelType] = useState('');
  const [labelValues, setLabelValues] = useState('');
  const [display, setDisplay] = useState('');
  const [header, setHeader] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [alertMsg, setAlertMsg] = useState('');

  const dispatch = useDispatch();
  const taxonomy = useSelector((state) => state.masterTaxonomy.masterTaxonomy);
  const taxonomyHeader = useSelector((state) => state.masterTaxonomyHeader.masterTaxonomyHeader);
  const loading = useSelector((state) => state.masterTaxonomy.isLoading);
  const masterTaxonomy = taxonomy && taxonomy.rows;

  useEffect(() => {
    if (showList) {
      setTaxonomyData(subsetList)
    } else {
      setTaxonomyData(masterTaxonomy)
    }
  }, [taxonomy]);

  useEffect(() => {
    if (taxonomyHeader && taxonomyHeader.status === '200') {
      dispatch({ type: 'MASTER_TAXONOMY_REQUEST' });
      setShow(false)
      message.success(`${taxonomyHeader.message}`)
    }
  }, [taxonomyHeader]);

  useEffect(() => {
    setAlertMsg('')
    !showList &&
      dispatch({ type: 'MASTER_TAXONOMY_REQUEST' });
  }, []);

  useEffect(() => {
    if (header.name) {
      setLabel(header.name);
      setApplicable({ value: header.applicableFor, label: header.applicableFor });
      setLabelType({ value: header.inputType, label: header.inputType });
      setLabelValues(header.inputValues);
      setDisplay({ value: header.toDisplay, label: header.toDisplay ? 'Yes' : 'No' });
    } else {
      setLabel('');
      setApplicable('');
      setLabelType('');
      setLabelValues('');
      setDisplay('');
    }
  }, [header, show])

  const onhidePopUp = () => {
    setErrorAlert('')
    setAlertMsg('')
    setShow(false);
  }

  const applicableOptions = [
    { value: 'Only Collection', label: 'Only Collection' },
    { value: 'Only Controversy', label: 'Only Controversy' },
    { value: 'Both', label: 'Both' }
  ]

  const labelTypeOptions = [
    { value: 'Static', label: 'Static' },
    { value: 'Text input', label: 'Text input' },
    { value: 'Text area', label: 'Text area' },
    { value: 'Select', label: 'Select' }
  ]

  const displayOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ]

  const onLabelChange = (e, i) => {
    setLabel(e.target.value)
  }

  const onApplicableChange = (applicable) => {
    setApplicable(applicable)
  }

  const onLabelTypeChange = (labelType) => {
    setLabelType(labelType)
  }

  const onLabelValuesChange = (e) => {
    setLabelValues(e.target.value)
  }

  const onDisplayChange = (display) => {
    setDisplay(display)
  }

  const editTaxonomy = (item) => {
    // const temp = [...taxonomyData];
    // const index1 = temp.indexOf(item)
    // var result = temp.map((el, index) => {
    //   if (index1 == index) {
    //     var o = Object.assign({}, el);
    //     o.isActive = true;
    //     return o;
    //   }
    //   else {
    //     return el
    //   }
    // })
    // setTaxonomyData(result)
    setErrorAlert('')
    setAlertMsg('')
    console.log('item', item)
    setHeader(item)
    setShow(true);
  };

  const onSubmitHeader = () => {
    console.log('header', header)
    if (!label || !applicable.label || !labelType.label || (!labelValues && !labelValueDisabled) || !display.label) {
      setErrorAlert('error-alert')
      setAlertMsg('Please enter all the fields')
    }
    else {
      // console.log('header', header)
      // const edit = header.name
      const column = {
        name: label,
        fieldName: edit.fieldName || label.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
        applicableFor: applicable.value,
        inputType: labelType.value,
        inputValues: labelValues,
        toDisplay: display.value
      }
      console.log('column', column)
      dispatch({ type: 'MASTER_TAXONOMY_HEADER_REQUEST', column, header });
    }
  }

  // disabled conditions 
  const labelValueDisabled = !labelType.value || labelType && labelType.value.includes('Text') ? true : false;
  const headerValueDisabled = header.isRequired ? true : false;


  const onTaxonomyChange = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
      setFieldName(e.target.value)
    }
  }

  const addNewTaxonomy = () => {
    const temp = [...taxonomyData];
    temp.push({ name: '' })
    setTaxonomyData(temp)
  }

  const updateTaxonomy = (item) => {
    const updated = [...taxonomyData];
    const index = updated.indexOf(item)
    const updatedObj = { ...updated[index], name: label, isActive: false };
    const temp = [
      ...updated.slice(0, index),
      updatedObj,
      ...updated.slice(index + 1),
    ];
    setTaxonomyData(temp);
    setFieldName('')
  }

  const createSubset = (item, e) => {
    const temp = [...subsetData];
    const updated = [...taxonomyData];
    const indexUpdated = updated.indexOf(item);
    if (e.target.checked == true) {
      const updatedObj = { ...updated[indexUpdated], checked: true };
      const tempOne = [
        ...updated.slice(0, indexUpdated),
        updatedObj,
        ...updated.slice(indexUpdated + 1),
      ];
      setTaxonomyData(tempOne);
      temp.push({ name: item.name, id: item.id })
      setSubsetData(temp)
    }
    else {
      const updatedObj = { ...updated[indexUpdated], checked: false };
      const tempOne = [
        ...updated.slice(0, indexUpdated),
        updatedObj,
        ...updated.slice(indexUpdated + 1),
      ];
      setTaxonomyData(tempOne);
      const index = temp.indexOf(item)
      temp.splice(index, 1);
      setSubsetData(temp)
    }
  }

  const onSubmitSubset = () => {
    const temp = [...subsetData];
    taxonomyData.map((data) => {
      data.isRequired &&
        temp.push({ name: data.name, id: data.id })
    })
    setSubsetData(temp)
    setShowSubset(true);
  }

  const searchtheme = createMuiTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });

  const cardPerPage = 20;
  const onhandlePage = (e, page) => {
    const minValue = (page - 1) * cardPerPage;
    const maxValue = page * cardPerPage;
    setmin(minValue);
    setmax(maxValue);
  };

  const onSearchBatch = (data) => {
    const searchData = data.target.value;
    setSearchQuery(searchData);
  };

  const searchfilter = (search, card) => {
    const filteredData = card.filter((e) => {
      if ((e.name.toLowerCase()).includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredData;
  };

  const subsetHandleClose = () => {
    const temp = [...taxonomyData];
    var result = temp.map((el, index) => {
      var o = Object.assign({}, el);
      o.checked = false;
      return o;
    })
    setTaxonomyData(result)
    setShowSubset(false);
    setSubsetData([]);
  }

  const calculateCount = taxonomyData && (searchQuery ? searchfilter(searchQuery, taxonomyData).length : taxonomyData.length) / cardPerPage;
  const totalCount = Math.ceil(calculateCount);
  const batchlist = taxonomyData && (searchQuery ? searchfilter(searchQuery, taxonomyData) : taxonomyData).slice(min, max).map((item, index) => (
    <Col key={item.id} lg={3} md={6}>
      <Card className="batch-card batchbox">
        <div className={item.isRequired ? "taxonomy-checkbox-mandatory-container" : "taxonomy-checkbox-container"}>
          {!showList &&
            <div>
              {!item.isRequired &&
                <Form.Control
                  type="checkbox"
                  className="taxonomy-checkbox"
                  onChange={(e) => { createSubset(item, e) }}
                  checked={item.checked}
                />
              }
            </div>
          }
        </div>
        <Form.Control
          className="input-taxonomy"
          type="text"
          name="taxonomy"
          value={item.isActive ? label : item.name}
          disabled={item.isActive ? false : true}
          onChange={onTaxonomyChange}
        />
        <Row className="taxonomy-icons-container">
          {item.isActive ? <FontAwesomeIcon icon={faCheckCircle} className="taxonomy-icon" onClick={() => { updateTaxonomy(item) }} />
            : null}
          {!showList &&
            <div>
              <FontAwesomeIcon icon={faEdit} className="taxonomy-icon" onClick={() => { editTaxonomy(item) }} />
            </div>
          }
        </Row>
      </Card>
    </Col>
  ));

  const popUpBody = () => (
    <React.Fragment>
      <Form.Group>
        <Row className="taxonomy-popup-row">
          <Col lg={6} sm={6} md={6}>
            <Form.Label>Label <sup className="text-danger">*</sup></Form.Label>
            <Form.Control
              // size="large"
              type="text"
              onChange={onLabelChange}
              value={label}
              className={!label && errorAlert}
            />
          </Col>
          <Col lg={6} sm={6} md={6}>
            <Form.Label>Applicable <sup className="text-danger">*</sup></Form.Label>
            <Select
              name="applicable"
              options={applicableOptions}
              onChange={onApplicableChange}
              value={applicable}
              isDisabled={headerValueDisabled}
              className={!applicable.label && errorAlert}
            // className={role.length == 0 && errorAlert}
            />
          </Col>
        </Row>
        <Row className="taxonomy-popup-row">
          <Col lg={6} sm={6} md={6}>
            <Form.Label>Label type <sup className="text-danger">*</sup></Form.Label>
            <Select
              name="labeltype"
              options={labelTypeOptions}
              onChange={onLabelTypeChange}
              value={labelType}
              isDisabled={headerValueDisabled}
              className={!labelType.label && errorAlert}
            />
          </Col>
          <Col lg={6} sm={6} md={6}>
            <Form.Label>Label values <sup className="text-danger">*</sup></Form.Label>
            <Form.Control
              as="textarea"
              // size="large"
              type="text"
              onChange={onLabelValuesChange}
              value={labelValues}
              disabled={headerValueDisabled || labelValueDisabled}
              className={!labelValues && !labelValueDisabled && errorAlert}
            />
          </Col>
        </Row>
        <Row className="taxonomy-popup-row">
          <Col lg={6} sm={6} md={6}>
            <Form.Label>Display <sup className="text-danger">*</sup></Form.Label>
            <Select
              name="display"
              options={displayOptions}
              onChange={onDisplayChange}
              value={display}
              isDisabled={headerValueDisabled}
              className={!display.label && errorAlert}
            />
          </Col>
        </Row>
      </Form.Group>
    </React.Fragment>
  )

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} title={showList ? "Subset" : "Master Taxonomy"} />
        <div className="container-main">
          <Container className="wrapper">
            <div className="head-tab">
              <div>
                <ThemeProvider theme={searchtheme}>
                  <TextField
                    placeholder="search"
                    style={{ padding: '20px' }}
                    autoComplete="off"
                    onChange={onSearchBatch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faSearch} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </ThemeProvider>
              </div>
              <div className="taxonomy-button-container">
                {showList ?
                  <Button variant="primary" className="taxonomy-btn" onClick={handleListClose}>Back</Button>
                  :
                  <Button variant="primary" className="taxonomy-btn" onClick={addNewTaxonomy}>Add New</Button>
                }
              </div>
            </div>
            <div className="view-min-height">
              {loading && <PageLoader />}
              <Row >
                {batchlist}
              </Row>
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="taxonomy-footer">
                  <div className="taxonomy-submit">
                    {!showList &&
                      <Button variant="primary" className="taxonomy-btn" onClick={onSubmitSubset}>Create New Taxonomy</Button>
                    }
                  </div>
                  <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                </div>
              </Col>
            </Row>
            <NewTaxonomySubset show={showSubset} handleClose={subsetHandleClose} subsetData={subsetData} />
            <Overlay
              className="text-center otp-modal"
              show={show}
              onHide={onhidePopUp}
              backdrop="static"
              keyboard={false}
              animation
              centered
              size="lg"
              title="Header"
              body={popUpBody()}
              alert={alertMsg}
              primary="submit"
              onSubmitPrimary={onSubmitHeader}
              alertClass='danger'
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;
