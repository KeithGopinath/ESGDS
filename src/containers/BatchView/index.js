/* eslint-disable import/first */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Card, Button } from 'react-bootstrap';
import Header from '../../components/Header';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
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
    { name: 'Batch1', id: 1 },
    { name: 'Batch2', id: 1 },
    { name: 'Batch3', id: 1 },
    { name: 'Batch4', id: 1 },
    { name: 'Batch5', id: 1 },
    { name: 'Batch6', id: 1 },
    { name: 'Batch7', id: 1 },
    { name: 'Batch8', id: 1 },
    { name: 'Batch9', id: 1 },
    { name: 'Batch10', id: 1 },
    { name: 'Batch11', id: 1 },
    { name: 'Batch12', id: 1 },
    { name: 'Batch13', id: 1 },
    { name: 'Batch14', id: 1 },
    { name: 'Batch15', id: 1 },
    { name: 'Batch16', id: 1 },
    { name: 'Batch15', id: 1 },
    { name: 'Batch18', id: 1 },
    { name: 'Batch19', id: 1 },
    { name: 'Batch20', id: 1 },
    { name: 'Batch21', id: 1 },
    { name: 'Batch22', id: 1 },
    { name: 'Batch23', id: 1 },
    { name: 'Batch24', id: 1 },
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
      // if ((e.id).includes(search)) {
      //   return true;
      // }
      return false;
    });
    return filteredData;
  };
  const calculateCount = (searchQuery ? searchfilter(searchQuery, cardData).length : cardData.length) / cardPerPage;
  const totalCount = Math.ceil(calculateCount);
  const batchlist = (searchQuery ? searchfilter(searchQuery, cardData) : cardData).slice(min, max).map(({ name, id }) => (
    <Col lg={3} md={6}>
      <Card className="batch-card batchbox" key={name} >
        <div className="batch-card-content">
          <div className="batch-card-content-name" >Name:</div>
          <div className="batch-card-content-value" data-toggle="tooltip" data-placement="top" title={name}>{name}</div>
        </div>
        <div className="batch-card-content" >
          <div className="batch-card-content-name"> ID</div >
          <div className="batch-card-content-value">{id}</div>
        </div>
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
