/* eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Card, Row, Col, Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { message } from 'antd';
import moment from 'moment';
import PageLoader from '../../components/PageLoader';

const CalculateActuals = () => {
  const sideBarRef = useRef();
  const [taxonomy, setTaxonomy] = useState();
  const [NIC, setNIC] = useState();
  const [year, setYear] = useState();
  const [errorAlert, setErrorAlert] = useState('');
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const taxonomyData = useSelector((state) => state.clientTaxonomy.taxonomydata);
  const taxonomyDataLoading = useSelector((state) => state.clientTaxonomy.isLoading);
  const calculateActuals = useSelector((state) => state.calculateActuals.calculateActuals);
  const calculateActualsError = useSelector((state) => state.calculateActuals.error);
  const loading = useSelector((state) => state.calculateActuals.isLoading);

  useEffect(() => {
    dispatch({ type: 'ClientTaxonomy_REQUEST' });
  }, []);

  useEffect(() => {
    if (calculateActuals && flag) {
      message.success(calculateActuals.message);
      setTaxonomy('');
      setNIC('');
      setYear('');
    } else if (calculateActualsError && flag) {
      message.error(calculateActualsError.message)
    }
  }, [calculateActuals, calculateActualsError]);

  const onSubmit = () => {
    if (!taxonomy || !NIC || !year) {
      message.error('Please select required fields')
      setErrorAlert('border-danger dropdown-alert');
    } else {
      const payload = {
        clientTaxonomyId: taxonomy.value,
        nic: NIC.value,
        year: year.label,
      }
      dispatch({ type: 'CALCULATE_ACTUALS_REQUEST', payload });
      setFlag(true);
    }
  }

  const onTaxonomyChange = (taxonomy) => {
    setTaxonomy(taxonomy)
    setNIC('')
  }

  const onNICChangeChange = (NIC) => {
    setNIC(NIC)
  }

  const onYearChange = (year) => {
    setYear(year)
  }

  const currentYear = moment().year();
  const yearOptions = [
    { value: currentYear, label: `${currentYear - 1}-${currentYear}` },
    { value: currentYear - 1, label: `${currentYear - 2}-${currentYear - 1}` },
    { value: currentYear - 2, label: `${currentYear - 3}-${currentYear - 2}` },
    { value: currentYear - 3, label: `${currentYear - 4}-${currentYear - 3}` },
    { value: currentYear - 4, label: `${currentYear - 5}-${currentYear - 4}` },
  ]

  const nicData = taxonomyData && taxonomyData.rows.filter((val => taxonomy && taxonomy.value == val._id));
  const taxonomyOptions = taxonomyData && taxonomyData.rows.map((data) => ({
    value: data._id,
    label: data.taxonomyName
  }));
  const nicOptions = nicData && nicData[0] && nicData[0].nicList;

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Calculate Actuals" />
        <div className="container-main">
          <Container>
            <Card className="upload-container">
              {taxonomyDataLoading ? <PageLoader /> : <React.Fragment>
              <Row>
                <Col lg={4} sm={4} md={4}>
                  <Form.Group>
                    <Form.Label>Select Taxonomy <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={taxonomyOptions}
                      name="taxonomy"
                      value={taxonomy}
                      onChange={onTaxonomyChange}
                      className={!taxonomy && errorAlert}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} sm={4} md={4}>
                  <Form.Group>
                    <Form.Label>Select NIC <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={nicOptions}
                      name="taxonomy"
                      value={NIC}
                      onChange={onNICChangeChange}
                      className={!NIC && errorAlert}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} sm={4} md={4}>
                  <Form.Group>
                    <Form.Label>Select Years <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={yearOptions}
                      name="taxonomy"
                      value={year}
                      onChange={onYearChange}
                      className={!year && errorAlert}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="upload-button-container">
                <Button variant="primary" className="upload-data-button" onClick={onSubmit}>Calculate Actuals</Button>
              </Row> </React.Fragment>}
              {loading && <PageLoader />}
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CalculateActuals;