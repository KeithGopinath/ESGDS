/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import SideMenuBar from '../../components/SideMenuBar';
import { Result } from 'antd';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';
import PageLoader from '../../components/PageLoader';

const GroupView = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(20);
  const history = useHistory();
  const searchtheme = createTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });
  const dispatch = useDispatch();
 useEffect(()=>{
  
  dispatch({ type: 'GROUPLIST_REQUEST' });
  dispatch({type: "GROUPBYID_RESET"});
 },[]);
 const isGroupCreated = useSelector((getgrouplist) => getgrouplist.getgrouplist);
 const isGroupCreatedLoading = useSelector((getgrouplist) => getgrouplist.getgrouplist.isLoading);
 const groupList = isGroupCreated.grouplist && isGroupCreated.grouplist.rows;
  const groupCount = groupList && groupList.length;
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
  const onhandlegrpid = (grpid) => {
    history.push({
      pathname: '/group-assignment',
      state: grpid,
    })
  };
  const onhandeleGrpPage = () => {
    history.push("/group-assignment");
  }
  const searchfilter = (search, card) => {
    const filteredData = card.filter((e) => {
      if ((e.groupName.toLowerCase()).includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
    return filteredData;
  };
  const calculateCount = groupList && (searchQuery ? searchfilter(searchQuery, groupList).length : groupCount) / cardPerPage;
  const totalCount = Math.ceil(calculateCount);
  const batchlist = groupList && (searchQuery ? searchfilter(searchQuery, groupList) : groupList).slice(min, max).map(({ _id, groupName, assignBatch }) => (
    <Col lg={3} md={6} key={_id}>
      <Card className="batch-card batchbox" onClick={()=>{onhandlegrpid(_id)}}>
        <ListItemText primary={groupName} secondary={`batches(${assignBatch.length})`} />
      </Card>
    </Col>
  ));

  const sideBarRef = useRef();
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} title="Group List" />
        <div className="container-main">
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
              <div>
                <Button variant="primary" className="imp-btn" onClick={onhandeleGrpPage}>
                  <div>Create Group</div>
                </Button>
              </div>
            </div>
    
            <div className="view-min-height">
             
              { 
                (!isGroupCreated.error && !isGroupCreated.isLoading && isGroupCreated.grouplist) && (
                  <Row >
                    {batchlist}
                  </Row>
                )
              }

              { 
                (isGroupCreated.error && !isGroupCreatedLoading) && (
                <Result
                  status="error"
                  title={isGroupCreated.error.message}
                >
                </Result>
                )
              }
              {
                (isGroupCreatedLoading) &&  
                (<PageLoader />)
              }
            </div>
            <Row>
              <Col lg={12} sm={12}>
                <div className="batch-footer">
                  <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default GroupView;
