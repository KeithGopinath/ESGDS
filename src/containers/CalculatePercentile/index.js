/* eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Card, Row, Col, Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { message } from 'antd';
import CustomTable from '../../components/CustomTable';
import moment from 'moment';

const CalculatePercentile = () => {
  const sideBarRef = useRef();
  const [taxonomy, setTaxonomy] = useState();
  const [NIC, setNIC] = useState();
  const [pillar, setPillar] = useState();
  const [errorAlert, setErrorAlert] = useState('');
  const [dropDownErrorAlert, setDropDownErrorAlert] = useState('');
  const [percentileData, setPercentileData] = useState([]);
  const [flag, setFlag] = useState(false);

  const dispatch = useDispatch();
  const taxonomyData = useSelector((state) => state.clientTaxonomy.taxonomydata);
  const loading = useSelector((state) => state.pillarWisePercentile.isLoading);
  const pillarWisePercentile = useSelector((state) => state.pillarWisePercentile.pillarWisePercentile);
  const calculatePercentile = useSelector((state) => state.calculatePercentile.calculatePercentile);
  const calculatePercentileError = useSelector((state) => state.calculatePercentile.error);

  const responseData = pillarWisePercentile && pillarWisePercentile.response;

  useEffect(() => {
    dispatch({ type: 'ClientTaxonomy_REQUEST' });
    dispatch({ type: 'PILLAR_WISE_PERCENTILE_RESET' });
  }, []);

  useEffect(() => {
    setPercentileData(responseData)
  }, [pillarWisePercentile]);

  useEffect(() => {
    if (calculatePercentile && flag) {
      message.success(calculatePercentile.message);
      setNIC('');
      setTaxonomy('');
      setPillar('');
      setPercentileData([]);
    }
    else if (calculatePercentileError && flag) {
      message.error(calculatePercentileError.message)
    }
  }, [calculatePercentile, calculatePercentileError]);

  const currentYear = moment().year();
  const years = [`${currentYear - 6}-${currentYear - 5}`, `${currentYear - 5}-${currentYear - 4}`, `${currentYear - 4}-${currentYear - 3}`, `${currentYear - 3}-${currentYear - 2}`, `${currentYear - 2}-${currentYear - 1}`];

  const onSubmit = () => {
    if (!taxonomy || !NIC || !pillar) {
      message.error('Please select required fields')
      setDropDownErrorAlert('border-danger dropdown-alert');
    } else {
      const payload = {
        taxonomy: taxonomy.value,
        nicCode: NIC.value,
        pillar: pillar.value,
        years: years,
        currentYear: `${currentYear - 1}-${currentYear}`
      }
      dispatch({ type: 'PILLAR_WISE_PERCENTILE_REQUEST', payload });
    }
  }

  const onSubmitTableData = () => {
    const test = percentileData.map((data) => {
      if (data.projectedAvg == '' || data.projectedSd == '') {
        return 'empty'
      }
      else if (((!isNaN(data.projectedAvg) || data.projectedAvg.includes('NA')) && (!isNaN(data.projectedSd) || data.projectedSd.includes('NA')))) {
        return 'ok'
      }
      else if ((isNaN(data.projectedAvg) || isNaN(data.projectedSd))) {
        if (!data.projectedAvg.includes('NA') || !data.projectedSd.includes('NA')) {
          return 'na'
        }
      }
    })

    if (test.find(val => val == 'empty')) {
      message.error('Please fill all the fields')
      setErrorAlert('border-danger')
    }
    else if (test.find(val => val == 'na')) {
      message.error('If the values are not available , please fill the field as NA')
      setErrorAlert('border-danger')
    }
    else if (test.find(val => val == 'ok')) {
      const data = percentileData.map((data) => ({
        dpCodeId: data.dpCodeId,
        dpCode: data.dpCode,
        projectedAvg: data.projectedAvg,
        projectedSd: data.projectedSd
      }));
      const payload = {
        taxonomy: taxonomy.value,
        nicCode: NIC.value,
        pillar: pillar.value,
        currentYear: `${currentYear - 1}-${currentYear}`,
        data: data
      }
      dispatch({ type: 'CALCULATE_PERCENTILE_REQUEST', payload });
      setFlag(true);
    }
  }

  const onTaxonomyChange = (taxonomy) => {
    setTaxonomy(taxonomy);
    setNIC('');
    setPillar('');
  }

  const onNICChangeChange = (NIC) => {
    setNIC(NIC)
  }

  const onPillarChange = (pillar) => {
    setPillar(pillar)
  }

  const onAverageChange = (e, data) => {
    if (e.target.value.match('^[a-zA-Z0-9-.]*$')) {
      const temp = [...percentileData];
      const index = temp.findIndex(val => val.dpCode === data.dpCode);
      const updatedObj = { ...temp[index], projectedAvg: e.target.value.toUpperCase() };
      const current = [
        ...temp.slice(0, index),
        updatedObj,
        ...temp.slice(index + 1),
      ];
      setPercentileData(current)
    }
  }

  const onSDChange = (e, data) => {
    if (e.target.value.match('^[a-zA-Z0-9-.]*$')) {
      const temp = [...percentileData];
      const index = temp.findIndex(val => val.dpCode === data.dpCode);
      const updatedObj = { ...temp[index], projectedSd: e.target.value.toUpperCase() };
      const current = [
        ...temp.slice(0, index),
        updatedObj,
        ...temp.slice(index + 1),
      ];
      setPercentileData(current)
    }
  }

  const classNamefinder = (data) => {
    if (!data) {
      return true
    }
    else if ((!isNaN(data) || data.includes('NA'))) {
      return false
    }
    else return true;
  }

  const optionsData = taxonomyData && taxonomyData.rows.filter((val => taxonomy && taxonomy.value == val._id));
  const taxonomyOptions = taxonomyData && taxonomyData.rows.map((data) => ({
    value: data._id,
    label: data.taxonomyName
  }));
  const nicOptions = optionsData && optionsData[0] && optionsData[0].nicList;
  const pillarOptions = optionsData && optionsData[0] && optionsData[0].pillarList;

  const calculatePercentileTableData = (props) => {
    const tableRowData = (data) => data.map((data) => ({
      key: data.dpCode,
      dpCode: data.dpCode,
      fiveYearsBackAvg: (data.fiveYearsBackAvg >= 0 && data.fiveYearsBackAvg !== '') ? data.fiveYearsBackAvg : '--',
      fourYearsBackAvg: (data.fourYearsBackAvg >= 0 && data.fourYearsBackAvg !== '') ? data.fourYearsBackAvg : '--',
      threeYearsBackAvg: (data.threeYearsBackAvg >= 0 && data.threeYearsBackAvg !== '') ? data.threeYearsBackAvg : '--',
      twoYerasBackAvg: (data.twoYearsBackAvg >= 0 && data.twoYearsBackAvg !== '') ? data.twoYearsBackAvg : '--',
      oneYearBackAvg: (data.oneYearBackAvg >= 0 && data.oneYearBackAvg !== '') ? data.oneYearBackAvg : '--',
      projectedAvg: <Form.Control
        type="text"
        name="projectedAvg"
        value={data.projectedAvg}
        onChange={(e) => { onAverageChange(e, data) }}
        maxLength={isNaN(data.projectedAvg) ? 2 : ''}
        className={classNamefinder(data.projectedAvg) ? errorAlert : ''} />,
      fiveYearsBackSD: (data.fiveYearsBackSd >= 0 && data.fiveYearsBackSd !== '') ? data.fiveYearsBackSd : '--',
      fourYearsBackSD: (data.fourYearsBackSd >= 0 && data.fourYearsBackSd !== '') ? data.fourYearsBackSd : '--',
      threeYearsBackSD: (data.threeYearsBackSd >= 0 && data.threeYearsBackSd !== '') ? data.threeYearsBackSd : '--',
      twoYearsBackSD: (data.twoYearsBackSd >= 0 && data.twoYearsBackSd !== '') ? data.twoYearsBackSd : '--',
      oneYearBackSD: (data.oneYearBackSd >= 0 && data.oneYearBackSd !== '') ? data.oneYearBackSd : '--',
      projectedSD: <Form.Control
        type="text"
        name="projectedSD"
        value={data.projectedSd}
        onChange={(e) => { onSDChange(e, data) }}
        maxLength={isNaN(data.projectedSd) ? 2 : ''}
        className={classNamefinder(data.projectedSd) ? errorAlert : ''} />,
    }));

    return {
      rowsData: tableRowData(props),
      columnsHeadData: [{
        id: 'dpCode',
        align: 'center',
        label: 'DP Code',
        dataType: 'string',
      },
      {
        id: 'fiveYearsBackAvg',
        align: 'center',
        label: `${currentYear - 6}-${currentYear - 5} Actual Avg`,
        dataType: 'string',
      },
      {
        id: 'fourYearsBackAvg',
        align: 'center',
        label: `${currentYear - 5}-${currentYear - 4} Actual Avg`,
        dataType: 'string',
      },
      {
        id: 'threeYearsBackAvg',
        align: 'center',
        label: `${currentYear - 4}-${currentYear - 3} Actual Avg`,
        dataType: 'string',
      },
      {
        id: 'twoYerasBackAvg',
        align: 'center',
        label: `${currentYear - 3}-${currentYear - 2} Actual Avg`,
        dataType: 'string',
      },
      {
        id: 'oneYearBackAvg',
        align: 'center',
        label: `${currentYear - 2}-${currentYear - 1} Actual Avg`,
        dataType: 'string',
      },
      {
        id: 'projectedAvg',
        align: 'center',
        label: 'Projected Avg',
        dataType: 'element',
      },
      {
        id: 'fiveYearsBackSD',
        align: 'center',
        label: `${currentYear - 6}-${currentYear - 5} Actual S.D`,
        dataType: 'string',
      },
      {
        id: 'fourYearsBackSD',
        align: 'center',
        label: `${currentYear - 5}-${currentYear - 4} Actual S.D`,
        dataType: 'string',
      },
      {
        id: 'threeYearsBackSD',
        align: 'center',
        label: `${currentYear - 4}-${currentYear - 3} Actual S.D`,
        dataType: 'string',
      },
      {
        id: 'twoYearsBackSD',
        align: 'center',
        label: `${currentYear - 3}-${currentYear - 2} Actual S.D`,
        dataType: 'string',
      },
      {
        id: 'oneYearBackSD',
        align: 'center',
        label: `${currentYear - 2}-${currentYear - 1} Actual S.D`,
        dataType: 'string',
      },
      {
        id: 'projectedSD',
        align: 'center',
        label: 'Projected S.D',
        dataType: 'element',
      },
      ],
    };
  };

  const tableData = calculatePercentileTableData(percentileData || [])

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Calculate Percentile" />
        <div className="container-main">
          <Container>
            <Card className="upload-container">
              <Row>
                <Col lg={4} sm={4} md={4}>
                  <Form.Group>
                    <Form.Label>Select Taxonomy <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={taxonomyOptions}
                      name="taxonomy"
                      value={taxonomy}
                      onChange={onTaxonomyChange}
                      className={!taxonomy && dropDownErrorAlert}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} sm={4} md={4}>
                  <Form.Group>
                    <Form.Label>Select NIC <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={nicOptions}
                      name="nic"
                      value={NIC}
                      onChange={onNICChangeChange}
                      className={!NIC && dropDownErrorAlert}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} sm={4} md={4}>
                  <Form.Group>
                    <Form.Label>Select Pillar <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={pillarOptions}
                      name="pillar"
                      value={pillar}
                      onChange={onPillarChange}
                      className={!pillar && dropDownErrorAlert}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="upload-button-container">
                <Button variant="primary" className="upload-data-button" onClick={onSubmit}>Submit</Button>
              </Row>
            </Card>
            <div className="calculate-projectile-table">
              <Card className="upload-container">
                <CustomTable tableData={tableData} isLoading={loading} />
                <Row className="upload-button-container">
                  {percentileData && <Button variant="primary" className="upload-data-button" onClick={onSubmitTableData}>Save</Button>}
                </Row>
              </Card>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CalculatePercentile;