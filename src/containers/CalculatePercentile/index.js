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
  const [averageData, setAverageData] = useState([]);
  const [sdData, setSdData] = useState([]);

  const dispatch = useDispatch();
  const taxonomyData = useSelector((state) => state.clientTaxonomy.taxonomydata);

  useEffect(() => {
    dispatch({ type: 'ClientTaxonomy_REQUEST' });
  }, []);

  const onSubmit = () => {
    if (!taxonomy || !NIC || !pillar) {
      message.error('Please select required fields')
      setErrorAlert('border-danger dropdown-alert');
    } else {
      const payload = {
        taxonomy: taxonomy.value,
        nicCode: NIC.value,
        pillar: pillar.value,
      }
      console.log(payload);
      // dispatch({ type: 'UPLOAD_COMPANIES_REQUEST', payload });
    }
  }

  const onSubmitTableData = () => {
    if (!taxonomy || !NIC || !pillar) {
      message.error('Please select required fields')
      setErrorAlert('border-danger dropdown-alert');
    } else {
      const percentileData = [];
      const updatedAvg = averageData.slice().reverse().filter((v, i, a) => a.findIndex(t => (t.dpCode === v.dpCode)) === i).reverse();
      const updatedSd = sdData.slice().reverse().filter((v, i, a) => a.findIndex(t => (t.dpCode === v.dpCode)) === i).reverse()

      updatedAvg.map((data) => {
        updatedSd.filter(val => data.dpCode == val.dpCode).map((value) => {
          var obj = {
            dpCode: value.dpCode,
            percentileAvg: data.percentileAvg,
            percentileSd: value.percentileSd
          }
          percentileData.push(obj)
        })
      })
      const payload = {
        taxonomy: taxonomy.value,
        nicCode: NIC.value,
        pillar: pillar.value,
        currentYear:`${currentYear - 1}-${currentYear}`,
        data: percentileData
      }
      console.log('payload', payload);
      // dispatch({ type: 'UPLOAD_COMPANIES_REQUEST', payload });
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
    const temp = [...averageData];
    const obj = { dpCode: data, percentileAvg: e.target.value }
    temp.push(obj);
    setAverageData(temp)
  }

  const onSDChange = (e, data) => {
    const temp = [...sdData];
    const obj = { dpCode: data, percentileSd: e.target.value }
    temp.push(obj);
    setSdData(temp)
  }

  const currentYear = moment().year();
  const optionsData = taxonomyData && taxonomyData.rows.filter((val => taxonomy && taxonomy.value == val._id));

  const taxonomyOptions = taxonomyData && taxonomyData.rows.map((data) => ({
    value: data._id,
    label: data.taxonomyName
  }));
  const nicOptions = optionsData && optionsData[0] && optionsData[0].nicList;
  const pillarOptions = optionsData && optionsData[0] && optionsData[0].pillarList;

  const calculatePercentileTableData = (props) => {
    const tableRowData = (data) => data.map((data) => ({
      dpCode: data.dpCode,
      fourYearsBackAvg: data.fourYearsBackAvg,
      threeYearsBackAvg: data.threeYearsBackAvg,
      twoYerasBackAvg: data.twoYerasBackAvg,
      oneYearBackAvg: data.oneYearBackAvg,
      currentYearAvg: data.currentYearAvg,
      percentileAvg: <Form.Control type="text" name="projectileAvg" onChange={(e) => { onAverageChange(e, data.dpCode) }} />,
      fourYearsBackSD: data.fourYearsBackSD,
      threeYearsBackSD: data.threeYearsBackSD,
      twoYearsBackSD: data.twoYearsBackSD,
      oneYearBackSD: data.oneYearBackSD,
      currentYearSD: data.currentYearSD,
      percentileSD: <Form.Control type="text" name="projectileSD" onChange={(e) => { onSDChange(e, data.dpCode) }} />,
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
        id: 'currentYearAvg',
        align: 'center',
        label: `${currentYear - 1}-${currentYear} Actual Avg`,
        dataType: 'string',
      },
      {
        id: 'percentileAvg',
        align: 'center',
        label: 'Percentile Avg',
        dataType: 'element',
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
        id: 'currentYearSD',
        align: 'center',
        label: `${currentYear - 1}-${currentYear} Actual S.D`,
        dataType: 'string',
      },
      {
        id: 'percentileSD',
        align: 'center',
        label: 'Percentile S.D',
        dataType: 'element',
      },
      ],
    };
  };

  const dummyData = [
    {
      'dpCode': '00567',
      'fourYearsBackAvg': '32',
      'threeYearsBackAvg': '36',
      'twoYerasBackAvg': '40',
      'oneYearBackAvg': '33',
      'currentYearAvg': '36',
      'fourYearsBackSD': '21',
      'threeYearsBackSD': '19',
      'twoYearsBackSD': '17',
      'oneYearBackSD': '18',
      'currentYearSD': '21',
    },
    {
      'dpCode': '11345',
      'fourYearsBackAvg': '32',
      'threeYearsBackAvg': '36',
      'twoYerasBackAvg': '40',
      'oneYearBackAvg': '33',
      'currentYearAvg': '36',
      'fourYearsBackSD': '21',
      'threeYearsBackSD': '19',
      'twoYearsBackSD': '17',
      'oneYearBackSD': '18',
      'currentYearSD': '21',
    }
  ]

  const tableData = calculatePercentileTableData(dummyData)


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
                      className={!taxonomy && errorAlert}
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
                      className={!NIC && errorAlert}
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
                      className={!pillar && errorAlert}
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
                <CustomTable tableData={tableData} />
                <Row className="upload-button-container">
                  <Button variant="primary" className="upload-data-button" onClick={onSubmitTableData}>Calculate Percentile</Button>
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