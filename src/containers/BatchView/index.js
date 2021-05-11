/* eslint-disable import/first */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Card, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import ListItemText from '@material-ui/core/ListItemText';
import SideMenuBar from '../../components/SideMenuBar';
import BatchCreation from '../BatchCreation';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';

const BatchView = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(20);
  useEffect(() => {
    dispatch({ type: 'BATCH_REQUEST' });
  });
  const handleShow = () => {
    dispatch({ type: 'COMPANY_REQUEST' });
    setShow(true);
  };
  const searchtheme = createMuiTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });
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
  const cardPerPage = 20;
  const onhandlePage = (e, page) => {
    console.log(totalCount, '***');
    const minValue = (page - 1) * cardPerPage;
    const maxValue = page * cardPerPage;
    console.log(minValue, maxValue, 'min max cal val');
    setmin(minValue);
    setmax(maxValue);
  };
  const onSearchBatch = (data) => {
    const searchData = data.target.value;
    setSearchQuery(searchData);
    console.log(searchData);
  };
  const searchfilter = (search, card) => {
    const filteredData = card.filter((e) => {
      if ((e.name.toLowerCase()).includes(search.toLowerCase())) {
        return true;
      }
      if ((e.id.toLowerCase()).includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredData;
  };
  const calculateCount = (searchQuery ? searchfilter(searchQuery, cardData).length : cardData.length) / cardPerPage;
  const totalCount = Math.ceil(calculateCount);
  const batchlist = (searchQuery ? searchfilter(searchQuery, cardData) : cardData).slice(min, max).map(({ name, id }) => (
    <Col lg={3} md={6}>
      <Card className="batch-card batchbox" key={name} >
        {/* <div className="batch-card-content">
          <div className="batch-card-content-name" >Name:</div>
          <div className="batch-card-content-value" data-toggle="tooltip" data-placement="top" title={name}>{name}</div>
        </div>
        <div className="batch-card-content" >
          <div className="batch-card-content-name"> ID</div >
          <div className="batch-card-content-value">{id}</div>
        </div> */}
        <ListItemText primary={name} secondary={id} />
      </Card>
    </Col>
  ));

  const sideBarRef = useRef();
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <div className="batch-wrapper background-batch-view">
          <div className="batch-heading-wrapper">
            <div className="batch-heading-name">Batch View</div>
          </div>
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
                <div>Create batch</div>
              </Button>
              {/* <Fab size="small" color="secondary" aria-label="add" onClick={handleShow}>
                <AddIcon />
              </Fab> */}
            </div>
          </div>
          <div className="view-min-height">
            <Row >
              {batchlist}
            </Row>
          </div>
          <Row>
            <Col lg={12} sm={12}>
              <div className="batch-footer">
                <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
              </div>
            </Col>
          </Row>
          <BatchCreation show={show} setShow={setShow} />
        </div>
      </div>
    </div>
  );
};

export default BatchView;
