/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Row, Col, Container, Button, } from 'react-bootstrap';
import { message } from 'antd';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faCheckCircle, faBackward } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';
import NewTaxonomySubset from '../../containers/NewTaxonomySubset';
import PageLoader from '../../components/PageLoader';
import Overlay from '../../components/Overlay';
import Select from 'react-select';

const Taxonomy = ({ subsetList, showList, handleListClose, taxonomyName }) => {
  const sideBarRef = useRef();
  const [showSubset, setShowSubset] = useState(false);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(30);
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
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const taxonomy = useSelector((state) => state.masterTaxonomy.masterTaxonomy);
  const taxonomyHeader = useSelector((state) => state.masterTaxonomyHeader.masterTaxonomyHeader);
  const taxonomyHeaderLoading = useSelector((state) => state.masterTaxonomyHeader.isLoading);
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
    if (taxonomyHeader && taxonomyHeader.status === '200' && flag) {
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
    setErrorAlert('')
    setAlertMsg('')
    setHeader(item)
    setShow(true);
  };

  const onSubmitHeader = (info) => {
    if (header.isRequired && !label) {
      setErrorAlert('error-alert')
      setAlertMsg('Please enter all the fields')

    } else if (!label || !applicable.label || !labelType.label || !display.label || (!labelValueDisabled && !labelValues)) {
      setErrorAlert('error-alert')
      setAlertMsg('Please enter all the fields')
    }
    else {
      const column = {
        name: label,
        fieldName: label.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
        applicableFor: applicable.value,
        inputType: labelType.value,
        inputValues: labelValues,
        toDisplay: display.value
      }
      dispatch({ type: 'MASTER_TAXONOMY_HEADER_REQUEST', column, header });
      setFlag(true);
    }
  }

  // disabled conditions 
  // const labelValueDisabled = !labelType.value || labelType && (labelType.value.includes('Text')||labelType.value.includes('Static') ) ? true : false;
  const labelValueDisabled = !labelType.value || !labelType.value.includes('Select')
  const headerValueDisabled = header.isRequired ? true : false;

  const onTaxonomyChange = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
      setFieldName(e.target.value)
    }
  }

  const addNewTaxonomy = () => {
    setShow(true)
    setHeader('')
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
      temp.push({ name: item.name, fieldName: item.fieldName, applicableFor: item.applicableFor, inputType: item.inputType, inputValues: item.inputValues, toDisplay: item.toDisplay })
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
        temp.push({ name: data.name, fieldName: data.fieldName, applicableFor: data.applicableFor, inputType: data.inputType, inputValues: data.inputValues, toDisplay: data.toDisplay })
    })
    setSubsetData(temp)
    setShowSubset(true);
  }

  const searchtheme = createTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });

  const cardPerPage = 30;
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
    <Col key={item.id} lg={2} md={6} sm={6}>
      <Card className="taxonomy-card">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className="taxonomy-icons-container">
            {item.isActive ? <FontAwesomeIcon icon={faCheckCircle} className="taxonomy-icon" onClick={() => { updateTaxonomy(item) }} />
              : null}
            {!showList &&
              <div>
                <FontAwesomeIcon icon={faEdit} className="taxonomy-icon" onClick={() => { editTaxonomy(item) }} />
              </div>
            }
          </div>
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
        </div>
        <span className="input-taxonomy" onChange={onTaxonomyChange} title={item.isActive ? label : item.name}>{item.isActive ? label : item.name}</span>
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
            <Form.Label>Label Type <sup className="text-danger">*</sup></Form.Label>
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
            <Form.Label>Label Values <sup className="text-danger">*</sup></Form.Label>
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
        <Header sideBarRef={sideBarRef} title={showList ? taxonomyName : "Master Taxonomy"} />
        <div className="container-main pb-1">
          {showList && <FontAwesomeIcon size="lg" className="taxonomy-backward-icon" icon={faBackward} onClick={handleListClose} />}
          <Container className="wrapper">
            <div className="head-tab">
              <div>
                <ThemeProvider theme={searchtheme}>
                  <TextField
                    placeholder="Search"
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
                {!showList && <Button variant="primary" className="taxonomy-btn" onClick={addNewTaxonomy}>Add New</Button>}
              </div>
            </div>
            <div className="view-min-height">
              {loading && <PageLoader />}
              <Row>
                {batchlist}
              </Row>
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="taxonomy-footer">
                  <div className="submit-taxonomy">
                    {!showList &&
                      <Button variant="primary" className="taxonomy-btn" onClick={onSubmitSubset}>Create New Taxonomy</Button>
                    }
                  </div>
                  <div className="master-taxonomy-pagination">
                    <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                  </div>
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
              isLoading={taxonomyHeaderLoading}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;
