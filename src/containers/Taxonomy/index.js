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
import ImportTaxonomy from '../../containers/ImportTaxonomy';

const Taxonomy = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(16);
  const [newTaxonomy, setNewTaxonomy] = useState('');
  const [taxonomyData, setTaxonomyData] = useState()

  useEffect(() => {
    setTaxonomyData(cardData)
  }, []);

  const cardData = [
    { name: 'Batch1', id: 'ID001' },
    { name: 'Batch2', id: 'ID002' },
    { name: 'Batch3', id: 'ID003' },
    { name: 'Batch4', id: 'ID004' },
    { name: 'Batch5', id: 'ID005' },
    { name: 'Batch6', id: 'ID006' },
    { name: 'Batch7', id: 'ID007' },
    { name: 'Batch8', id: 'ID008' },
    { name: 'Batch9', id: 'ID009' },
    { name: 'Batch10', id: 'ID010' },
    { name: 'Batch11', id: 'ID011' },
    { name: 'Batch12', id: 'ID012' },
    { name: 'Batch13', id: 'ID013' },
    { name: 'Batch14', id: 'ID014' },
    { name: 'Batch15', id: 'ID015' },
    { name: 'Batch16', id: 'ID0016' },
    { name: 'Batch15', id: 'ID017' },
    { name: 'Batch18', id: 'ID0018' },
    { name: 'Batch19', id: 'ID019' },
    { name: 'Batch20', id: 'ID020' },
    { name: 'Batch21', id: 'ID021' },
    { name: 'Batch22', id: 'ID022' },
    { name: 'Batch23', id: 'ID023' },
    { name: 'Batch24', id: 'ID024' },
  ];

  const onTaxonomyChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      setNewTaxonomy(e.target.value)
    }
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

  const calculateCount = taxonomyData && (searchQuery ? searchfilter(searchQuery, taxonomyData).length : taxonomyData.length) / cardPerPage;
  const totalCount = Math.ceil(calculateCount);
  const batchlist = taxonomyData && (searchQuery ? searchfilter(searchQuery, taxonomyData) : taxonomyData).slice(min, max).map((item, index) => (
    <Col lg={3} md={6}>
      <Card className="batch-card batchbox">
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

  const sideBarRef = useRef();

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
              <div>
                <Button variant="primary" className="imp-btn" onClick={handleShow}>
                  <div>Import File</div>
                </Button>
              </div>
            </div>
            <div className="view-min-height">
              <Row >
                {batchlist}
              </Row>
              <Button variant="primary" className="submit-taxonomy-btn">
                <div>Submit</div>
              </Button>
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="batch-footer">
                  <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                </div>
              </Col>
            </Row>
            <ImportTaxonomy show={show} handleClose={handleClose} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;
