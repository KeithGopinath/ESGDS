/*eslint-disable*/
import React, { useRef, useState } from 'react';
import { Card, Row, Col, Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const Validation = () => {
    const sideBarRef = useRef();
    const [taxonomy, setTaxonomy] = useState('');
    const [dpCodeType, setDpCodeType] = useState('');
    const [dpCode, setDpCode] = useState('');
    const [description, setDescription] = useState('');
    const [validationType, setValidationType] = useState('');
    //   const [min, setMin] = useState('');
    //   const [max, setMax] = useState('');
    //   const [max, setMax] = useState('');
    const [year, setYear] = useState('');
    //   const [mandatoryDpCode, setMandatoryDpCode] = useState('');


    const validationTypeOptions = [
        { value: 'Type 2', label: 'Type 2' },
        { value: 'Type 3', label: 'Type 3' },
        { value: 'Type 4', label: 'Type 4' },
        { value: 'Type 5', label: 'Type 5' },
        { value: 'Type 6', label: 'Type 6' },
        { value: 'Type 7', label: 'Type 7' },
        { value: 'Type 8', label: 'Type 8' },
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
        setDpCodeType(e.target.value);
    };

    const onChangeDpCode = (e) => {
        setDpCode(e.target.value);
    };

    const onChangeYear = (e) => {
        setYear(e);
    };

    const onChangeValidationType = (e) => {
        setValidationType(e);
    };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
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
                            <Row className=" d-flex m-4">
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
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>DP Code Type <sup className="text-danger">*</sup></Form.Label>
                                        <Select
                                            options
                                            name="dpcodetype"
                                            value={dpCodeType}
                                            onChange={onChangeDpCodeType}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>DP Code <sup className="text-danger">*</sup></Form.Label>
                                        <Select
                                            options
                                            name="dpcode"
                                            value={dpCode}
                                            onChange={onChangeDpCode}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Validation Type <sup className="text-danger">*</sup></Form.Label>
                                        <Select
                                            options={validationTypeOptions}
                                            name="validationtype"
                                            value={validationType}
                                            onChange={onChangeValidationType}
                                        />
                                    </Form.Group>
                                </Col>
                                {(validationType.value === 'Type 2' || validationType.value === 'Type 3' || validationType.value === 'Type 4') &&
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
                                {validationType.value === 'Type 2' &&
                                    <Col className="d-flex" lg={6} sm={6} md={6}>
                                        <Form.Group className="w-50 mr-1">
                                            <Form.Label>Min </Form.Label><sup className="text-danger">*</sup>
                                            <Form.Control
                                                type="number"
                                                name="min"
                                                id="min"
                                                //   value=""
                                                onChange=""
                                            />
                                        </Form.Group>
                                        <Form.Group className="w-50 mr-1">
                                            <Form.Label>Max </Form.Label><sup className="text-danger">*</sup>
                                            <Form.Control
                                                type="number"
                                                name="max"
                                                id="max"
                                                //   value=""
                                                onChange=""
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
                                {validationType.value === 'Type 4' &&
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
                                <div className="d-flex justify-content-center w-100">
                                    <Button className="save-continue" onClick={onSubmitData}>Save</Button>
                                </div>
                            </Row>
                        </Card>
                    </Container>

                </div>
            </div>
        </div>
    );
};

export default Validation;
