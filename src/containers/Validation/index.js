/*eslint-disable*/
import React, { useRef, useState } from 'react';
import { Card, Row, Col, Container, Form, Button, Table } from 'react-bootstrap';
import Select from 'react-select';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const Validation = () => {
    const sideBarRef = useRef();
    const [taxonomy, setTaxonomy] = useState('');
    const [dpCodeType, setDpCodeType] = useState('');
    const [dpCode, setDpCode] = useState('');
    const [dpCodeOptions, setDpCodeOptions] = useState('');
    const [description, setDescription] = useState('');
    const [validationType, setValidationType] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [year, setYear] = useState('');
    //   const [mandatoryDpCode, setMandatoryDpCode] = useState('');

    const dpCodeTypeOptions = [
        { value: 'Environmental', label: 'Environmental', dpCodeOptions : [
            { value: '0001', label: '0001' },
            { value: '0002', label: '0002' },
            { value: '0003', label: '0003' },
            { value: '0004', label: '0004' },
        ]},
        { value: 'Social', label: 'Social', dpCodeOptions : [
            { value: '0001', label: '0001' },
            { value: '0002', label: '0002' },
            { value: '0003', label: '0003' },
        ]},
        { value: 'Governance', label: 'Governance', dpCodeOptions : [
            { value: '0001', label: '0001' },
            { value: '0003', label: '0003' },
        ]},
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
        setTaxonomy(e.target.value);
    };

    const onChangeDpCodeType = (e) => {
        setDpCodeType(e);
        setDpCodeOptions( e.dpCodeOptions)
    };

    const onChangeDpCode = (e) => {
        setDpCode(e);
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

    const onSubmitData = () => {

    };

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
                            options
                            name="taxonomy"
                            value={taxonomy}
                            onChange={onChangeTaxonomy}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>DP Code Type <sup className="text-danger">*</sup></Form.Label>
                            <Select
                              // isMulti
                              options={dpCodeTypeOptions}
                              name="dpcodetype"
                              value={dpCodeType}
                              onChange={onChangeDpCodeType}
                             />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>DP Code <sup className="text-danger">*</sup></Form.Label>
                          <Select
                            options={dpCodeOptions}
                            name="dpcode"
                            value={dpCode}
                            onChange={onChangeDpCode}
                          />
                        </Form.Group>
                          </Col>
                            <Col lg={6} sm={6} md={6}>
                                  <label className="mt-1">Validation <sup className="text-danger">*</sup></label>
                                <Table className="w-100" bordered>
                                  <tbody>
                                    {dpCodeType === '' ? '' :
                                      <React.Fragment>
                                        <tr>
                                         {(dpCode.value === '0001' || dpCode.value === '0002' || dpCode.value === '0003') &&
                                         <React.Fragment>
                                        <td>
                                            <div className="form-check w-100">
                                                <label className="form-check-label d-flex justify-content-between" for="radio1">
                                                    <span className="radio-value">Type 2</span> 
                                                <input type="radio" 
                                                  className="mt-auto mb-auto validation-radio" 
                                                  id="Type 2"
                                                  name="formHorizontalRadios" 
                                                  onChange={onRadioSelect}
                                                />
                                                </label>
                                            </div>
                                        </td>
                                        </React.Fragment>
                                    }
                                    </tr>
                                    <tr>
                                    {(dpCode.value === '0004'|| dpCode.value === '0002') &&
                                        <td>
                                            <div className="form-check w-100">
                                                <label className="form-check-label d-flex justify-content-between" for="radio1">
                                                    <span className="radio-value">Type 3 </span>
                                                <input type="radio" 
                                                  className="mt-auto mb-auto validation-radio" 
                                                  id="Type 3"
                                                  name="formHorizontalRadios" 
                                                  onChange={onRadioSelect}
                                                />
                                                </label>
                                            </div>
                                        </td>
                                   }
                                    </tr>
                                     <tr>
                                       {(dpCode.value === '0003' || dpCode.value === '0002') &&
                                        <td>
                                            <div className="form-check w-100">
                                                <label className="form-check-label d-flex justify-content-between" for="radio1">
                                                <span className="radio-value">Type 4</span>
                                                <input type="radio" 
                                                  className="mt-auto mb-auto validation-radio" 
                                                  id="Type 4"
                                                  name="formHorizontalRadios" 
                                                  onChange={onRadioSelect}
                                                />
                                                </label>
                                            </div>
                                        </td>
                                        }
                                    </tr>
                                    <tr>
                                     {dpCode.value === '0004' &&
                                        <td>
                                           <div className="form-check text-right">
                                                <label className="form-check-label d-flex justify-content-between" for="radio1">
                                                    <span className="radio-value">Type 5</span>
                                                <input type="radio" 
                                                  className="mt-auto mb-auto validation-radio" 
                                                  id="Type 5"
                                                  name="formHorizontalRadios" 
                                                  onChange={onRadioSelect}
                                                />
                                                </label>
                                            </div>
                                        </td>
                                     }
                                    </tr>
                                  </React.Fragment>
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Card>
                        {(validationType === 'Type 2' || validationType === 'Type 3' || validationType === 'Type 4' || validationType === 'Type 5') &&
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
