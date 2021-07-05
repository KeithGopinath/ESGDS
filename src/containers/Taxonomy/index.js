/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, Button, Container, Form } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { faSearch, faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Pagination from '@material-ui/lab/Pagination';
import NewTaxonomySubset from '../../containers/NewTaxonomySubset';
import PageLoader from '../../components/PageLoader';

const Taxonomy = ({ subsetList, showList, handleListClose }) => {
  const [showSubset, setShowSubset] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(20);
  const [newTaxonomy, setNewTaxonomy] = useState('');
  const [taxonomyData, setTaxonomyData] = useState()
  const [subsetData, setSubsetData] = useState([])

  const dispatch = useDispatch();
  const taxonomy = useSelector((state) => state.masterTaxonomy.masterTaxonomy);
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
    !showList &&
      dispatch({ type: 'MASTER_TAXONOMY_REQUEST' });
  }, []);

  const sideBarRef = useRef();
  const flag = subsetData.length > 0 ? true : false;

  const onTaxonomyChange = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9_@./#&+-\s-]*$/.test(e.target.value)) {
      setNewTaxonomy(e.target.value)
    }
  }

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
          value={item.isActive ? newTaxonomy : item.name}
          disabled={item.isActive ? false : true}
          onChange={onTaxonomyChange}
        />
        <Row className="taxonomy-icons-container">
          {item.isActive ? <FontAwesomeIcon icon={faCheckCircle} className="taxonomy-icon" onClick={() => { updateTaxonomy(item) }} />
            : null}
          {!showList &&
            <FontAwesomeIcon icon={faEdit} className="taxonomy-icon" onClick={() => { editTaxonomy(item) }} />
          }
        </Row>
      </Card>
    </Col>
  ));

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
              {showList &&
                <div className="taxonomy-button-container">
                  <Button variant="primary" className="taxonomy-btn" onClick={handleListClose}>Back</Button>
                </div>
              }
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
                      <Button variant="primary" className="taxonomy-btn" onClick={onSubmitSubset}>Create New Subset</Button>
                    }
                  </div>
                  <Pagination count={totalCount} defaultPage={1} showFirstButton showLastButton onChange={onhandlePage} />
                </div>
              </Col>
            </Row>
            <NewTaxonomySubset show={showSubset} handleClose={subsetHandleClose} subsetData={subsetData} />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Taxonomy;
