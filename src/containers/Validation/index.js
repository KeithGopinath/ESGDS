/*eslint-disable*/
import React, { useRef, useState } from 'react';
import { Card, Row, Col, Container, Form, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const Validation = () => {
  const sideBarRef = useRef();
  const [taxonomy, setTaxonomy] = useState('');
  const [dpCodeType, setDpCodeType] = useState('');
  const [dpCode, setDpCode] = useState('');
  const [dpCodeOptions, setDpCodeOptions] = useState([]);
  const [description, setDescription] = useState('');
  const [validationType, setValidationType] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [year, setYear] = useState('');
  const [trValidation, setTrValication] = useState(false);
  //   const [mandatoryDpCode, setMandatoryDpCode] = useState('');

  const taxonomyOptions = [
    { value: "Biodiversity", label: "Biodiversity" },
    { value: "Community", label: "Community" },
    { value: "Energy", label: "Energy" },
    { value: "Emission", label: "Emission" },
  ];

  const dpCodeTypeOptions = [
    {
      dpcode_type_name: 'Standalone',
      dpCodeOptions: [
        {
          dpcode: '0001',
          types: [
            { type: "Type 2" },
            { type: "Type 3" }
          ]
        }
      ]
    },
    {
      dpcode_type_name: 'Matrix',
      dpCodeOptions: [
        {
          dpcode: '0001',
          types: [
            { type: "Type 2" },
            { type: "Type 4" },
            { type: "Type 5" },
          ]
        },
        {
          dpcode: '0002',
          types: [
            { type: "Type 3" }
          ]
        },
        {
          dpcode: '0003',
          types: [
            { type: "Type 2" },
            { type: "Type 3" },
            { type: "Type 4" },
            { type: "Type 5" }
          ]
        },
      ]
    },
  ];

  const yearOptions = [
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
  ];

  const onChangeTaxonomy = (e) => {
    setTaxonomy(e);
  };

  const onChangeDpCodeType = (e) => {
    setDpCodeType(e);
    setDpCodeOptions(e.value.dpCodeOptions);
    console.log("type: ", e.value.dpCodeOptions);
  };

  const onChangeDpCode = (e) => {
    setDpCode(e.value);
  };

  const onChangeMinimum = (e) => {
    setMin(e.target.value);
  };

  const onChangeMaximum = (e) => {
    setMax(e.target.value);
  };

  const onChangeYear = (e) => {
    setYear(e);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onRadioSelect = (e) => {
    setValidationType(e.target.id);
  };

  const onChangeMandatoryDpCode = () => {

  };

  const TransferLists = () => {

  }

  const typeSubmit = (e) => {
    alert(e);
  }

  const onSubmitData = () => {
    setTrValication(false);
    if ((validationType === 'Type 2' || validationType === 'na2') || (validationType === 'Type 3' || validationType === 'na3') || (validationType === 'Type 4' || validationType === 'na4') || (validationType === 'Type 5' || validationType === 'na5')) {
      setTrValication(true);
    }
  };
  console.log("dp code types: ", dpCode.types)
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} title="Validation" />
        <div className="container-main ">
          <Container>
            <Card>
              <Row className="d-flex m-4">
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Taxonomy <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={taxonomyOptions}
                      name="taxonomy"
                      value={taxonomy}
                      onChange={onChangeTaxonomy}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>DP Code Type <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      // isMulti
                      options={dpCodeTypeOptions.map(e => ({ label: e.dpcode_type_name, value: e }))}
                      name="dpcodetype"
                      value={dpCodeType}
                      onChange={onChangeDpCodeType}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>DP Code <sup className="text-danger">*</sup></Form.Label>
                    <Select
                      options={dpCodeOptions.map(e => ({ label: e.dpcode, value: e }))}
                      name="dpcode"
                      value={{ label: dpCode.dpcode, value: dpCode }}
                      onChange={onChangeDpCode}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Validation <sup className="text-danger">*</sup></Form.Label>
                    <Table responsive="sm" className="validation-table border-right-0 border-left-0" striped bordered >
                      <tbody>
                        {dpCode === '' ? '' : dpCode.types.map(data => (
                          <tr key={data.type}>
                            <td>
                              <div className="form-check w-100 d-flex justify-content-around">
                                <span>
                                  {data.type}
                                  <FontAwesomeIcon
                                    className="info-icon text-success"
                                    icon={faCheckCircle}
                                    onClick={() => typeSubmit()}
                                  />
                                </span>
                                <span className="">
                                  <span>NA</span>
                                  <FontAwesomeIcon
                                    className="info-icon text-success"
                                    icon={faCheckCircle}
                                  />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                        }
                      </tbody>
                    </Table>
                  </Form.Group>
                </Col>
              </Row>
            </Card>
            {(validationType === 'Type 2' || validationType === 'Type 3' || validationType === 'Type 4' || validationType === 'Type 5' || validationType === 'na1' || validationType === 'na2' || validationType === 'na3' || validationType === 'na4' || validationType === 'na5') &&
              <Card className="mt-2">
                <Row className="d-flex m-4">
                  {(validationType === 'Type 2' || validationType === 'Type 3' || validationType === 'Type 4') &&
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Description <sup className="text-danger">*</sup></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={description}
                          onChange={onChangeDescription}
                        />
                      </Form.Group>
                    </Col>
                  }
                  {validationType === 'Type 2' &&
                    <Col className="d-flex" lg={6} sm={6} md={6}>
                      <Form.Group className="w-50 mr-1">
                        <Form.Label>Min </Form.Label><sup className="text-danger">*</sup>
                        <Form.Control
                          type="number"
                          name="min"
                          id="min"
                          value={min}
                          onChange={onChangeMinimum}
                        />
                      </Form.Group>
                      <Form.Group className="w-50 mr-1">
                        <Form.Label>Max </Form.Label><sup className="text-danger">*</sup>
                        <Form.Control
                          type="number"
                          name="max"
                          id="max"
                          value={max}
                          onChange={onChangeMaximum}
                        />
                      </Form.Group>
                      <Form.Group className="w-50">
                        <Form.Label>Year </Form.Label><sup className="text-danger">*</sup>
                        <Select
                          options={yearOptions}
                          name="year"
                          value={year}
                          onChange={onChangeYear}
                        />
                      </Form.Group>
                    </Col>
                  }
                  {validationType === 'Type 4' &&
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Mandatory DP Code <sup className="text-danger">*</sup></Form.Label>
                        <Select
                          options
                          name="mandatorydpcode"
                          onChange={onChangeMandatoryDpCode}
                        />
                      </Form.Group>
                    </Col>
                  }
                  {validationType === 'Type 5' && <p>Sorry no data available!</p>}
                  <div className="d-flex justify-content-center w-100 ">
                    <Button className="save-continue" onClick={onSubmitData}>Save</Button>
                  </div>
                </Row>
              </Card>
            }
          </Container>

        </div>
      </div>
    </div>
  );
};

export default Validation;
