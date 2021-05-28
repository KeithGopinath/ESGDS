/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Card, Button, Container, Form } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { faSearch, faEdit, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';
import UploadTaxonomy from '../../containers/UploadTaxonomy';
import NewTaxonomySubset from '../../containers/NewTaxonomySubset';
import FileSaver from "file-saver";
import XLSX from "xlsx";

const Taxonomy = () => {
  const [show, setShow] = useState(false);
  const [showSubset, setShowSubset] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(20);
  const [newTaxonomy, setNewTaxonomy] = useState('');
  const [taxonomyData, setTaxonomyData] = useState()
  const [subsetData, setSubsetData] = useState([])

  useEffect(() => {
    setTaxonomyData(cardData)
  }, []);

  const cardData = [
    { name: 'Category Code' },
    { name: 'Category' },
    { name: 'Theme Code' },
    { name: 'Theme' },
    { name: 'Key Issues' },
    { name: 'Function' },
    { name: 'DP Code' },
    { name: 'DP Name' },
    { name: 'Description' },
    { name: 'Polarity' },
    { name: 'Data Collection' },
    { name: 'Guide' },
    { name: 'Unit' },
    { name: 'Signal' },
    { name: 'Aid DP/Logic' },
    { name: 'Normalized by' },
    { name: 'Weighted' },
    { name: 'Relevant for India' },
    { name: 'Percentile' },
    { name: 'Final Unit' },
    { name: 'Standalone/ Matrix' },
    { name: 'Industry Relevancy' },
    { name: 'Mining of coal and lignite' },
    { name: 'Extraction of crude petroleum and natural gas' },
  ];

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const sideBarRef = useRef();
  const flag = subsetData.length > 0 ? true : false;

  const onTaxonomyChange = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
      setNewTaxonomy(e.target.value)
    }
  }

  const addNewTaxonomy = () => {
    const temp = [...taxonomyData];
    temp.push({ name: '' })
    setTaxonomyData(temp)
  }

  const deleteTaxonomy = (item) => {
    const temp = [...taxonomyData];
    const index = temp.indexOf(item)
    temp.splice(index, 1);
    setTaxonomyData(temp)
  };

  const editTaxonomy = (item) => {
    const temp = [...taxonomyData];
    const index1 = temp.indexOf(item)
    var result = temp.map((el, index) => {
      if (index1 == index) {
        var o = Object.assign({}, el);
        o.isActive = true;
        return o;
      }
      else {
        return el
      }
    })
    setTaxonomyData(result)
  };

  const updateTaxonomy = (item) => {
    const updated = [...taxonomyData];
    const index = updated.indexOf(item)
    const updatedObj = { ...updated[index], name: newTaxonomy, isActive: false };
    const temp = [
      ...updated.slice(0, index),
      updatedObj,
      ...updated.slice(index + 1),
    ];
    setTaxonomyData(temp);
    setNewTaxonomy('')
  }

  const exportTaxonomy = (Data, fileName) => {
    let modifiedDta = [];
    let obj = {};
    for (let key in Data) {
      const x = Data[key].name;
      obj[x] = '';
    }
    modifiedDta.push(obj);
    const ws = XLSX.utils.json_to_sheet(modifiedDta);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
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
      temp.push({ name: item.name })
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

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false)
  }

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
    <Col lg={3} md={6}>
      <Card className="batch-card batchbox">
        <div className="taxonomy-checkbox-container">
          <Form.Control
            type="checkbox"
            className="taxonomy-checkbox"
            onChange={(e) => { createSubset(item, e) }}
            checked={item.checked}
          />
        </div>
        <Form.Control
          className="input-taxonomy"
          type="text"
          name="taxonomy"
          value={item.isActive ? newTaxonomy : item.name}
          disabled={item.isActive ? false : true}
          onChange={onTaxonomyChange}
        />
        <Row className="taxonomy-icons-container">
          {item.isActive ? <FontAwesomeIcon icon={faCheckCircle} className="taxonomy-icon" onClick={() => { updateTaxonomy(item) }} />
            : null}
          <FontAwesomeIcon icon={faEdit} className="taxonomy-icon" onClick={() => { editTaxonomy(item) }} />
          <FontAwesomeIcon icon={faTrashAlt} className="taxonomy-icon" onClick={() => { deleteTaxonomy(item) }} />
        </Row>
      </Card>
    </Col>
  ));

  console.log(taxonomyData);
  console.log(subsetData);

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} title="Taxonomy" />
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
                <Button variant="primary" className="taxonomy-btn" onClick={addNewTaxonomy}>Add New</Button>
                <Button variant="primary" className="taxonomy-btn" onClick={() => { exportTaxonomy(taxonomyData, "Taxonomy") }}>Export Taxonomy</Button>
                <Button variant="primary" className="taxonomy-btn" onClick={handleShow}>Upload Taxonomy</Button>
              </div>
            </div>
            <div className="view-min-height">
              <Row >
                {batchlist}
              </Row>
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="taxonomy-footer">
                  <div className="taxonomy-submit">
                    {flag ?
                      <Button variant="primary" className="taxonomy-btn" onClick={onSubmitSubset}>Create New Subset</Button>
                      : null}
                  </div>
                  <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                </div>
              </Col>
            </Row>
            <UploadTaxonomy show={show} handleClose={handleClose} />
            <NewTaxonomySubset show={showSubset} handleClose={subsetHandleClose} subsetData={subsetData} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;
