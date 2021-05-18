/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
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
  },[]);
  const handleShow = () => {
    dispatch({ type: 'COMPANY_LIST_REQUEST' });
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

  const batchData = useSelector((batchlist) => batchlist.batchList.batchdata);
  const batchCount = batchData && batchData.count;
  const batches = batchData && batchData.rows;
  console.log(batches, 'batches');

  const cardPerPage = 20;
  const onhandlePage = (e, page) => {
    const minValue = (page - 1) * cardPerPage;
    const maxValue = page * cardPerPage;
    console.log(minValue, maxValue, 'min max cal val');
    setmin(minValue);
    setmax(maxValue);
  };
  const onSearchBatch = (data) => {
    const searchData = data.target.value;
    setSearchQuery(searchData);

  };
  const searchfilter = (search, card) => {
    const filteredData = card.filter((e) => {
      if ((e.batchName.toLowerCase()).includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredData;
  };
  const calculateCount = batches && (searchQuery ? searchfilter(searchQuery, batches).length : batchCount) / cardPerPage;
  const totalCount = Math.ceil(calculateCount);
  const batchlist = batches && (searchQuery ? searchfilter(searchQuery, batches) : batches).slice(min, max).map(({ batchName }) => (
    <Col lg={3} md={6}>
      <Card className="batch-card batchbox" key={batchName} >
        <ListItemText primary={batchName} />
      </Card>
    </Col>
  ));

  const sideBarRef = useRef();
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} title="Batch" />
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
                  <div>Create batch</div>
                </Button>
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
          </Container>
        </div>
      </div>
    </div>
  );
};

export default BatchView;
