/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container } from 'react-bootstrap';
import Dropdown from 'react-dropdown';

const PersonalDetails = ({ role }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [repId, setRepId] = useState('');
    const [mobile, setMobile] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [pancardNumber, setPancardNumber] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [accountHoldrName, setAccountHolderName] = useState('asdf');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankIfsc, setBankIsfc] = useState('');
    const [empId, setEmpId] = useState('12345');

    // personal details
    const onNameChange = (e) => {
        setLastName(e.target.value);
    };

    const onLastNameChange = (e) => {
        setUserName(e.target.value);
    };

    const onMiddleNameChange = (e) => {
        setMiddleName(e.target.value);
    };

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPhoneChange = (e) => {
        setMobile(e.target.value);
    };

    const onPancardNoChange = (e) => {
        setPancardNumber(e.target.value);
    };

    const onAadharNoChange = (e) => {
        setAadharNo(e.target.value);
    };

    const onAccountHolderNameChange = (e) => {
        setAccountHolderName(e.target.value);
    };

    const onCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    const onAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const onBankIfscChange = (e) => {
        setBankIsfc(e.target.value);
    };

    const onEmployeeIdChange = (e) => {
        setEmpId(e.target.value);
    };

    const onRepresentativeIdChange = (e) => {
        setRepId(e.target.value);
    };

    const COMPANY_LIST = ['Relience', 'Indian Oils'];

    return (
        <Container>
            <Row className="personal-content">
                <Card className="personal-details shadow mb-5">
                    <h4 className="personal-text">Personal Details</h4>
                    <Row className='d-flex ml-2 mr-2'>
                        <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                                {(role === 'client' || role === 'company') && <Form.Label>Name <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'employee' && <Form.Label>First Name <sup className="text-danger">*</sup></Form.Label>}
                                <Form.Control
                                    className=""
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={userName}
                                    onChange={onNameChange}
                                />
                            </Form.Group>
                        </Col>
                        {role === 'employee' &&
                            <React.Fragment>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Last Name <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={lastName}
                                            onChange={onLastNameChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Middle Name</Form.Label>
                                        <Form.Control
                                            className=""
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="optional"
                                            value={middleName}
                                            onChange={onMiddleNameChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </React.Fragment>
                        }
                        <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                                <Form.Label>Email <sup className="text-danger">*</sup></Form.Label>
                                <Form.Control
                                    className=""
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={onEmailChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={6} sm={6} md={6}>
                            <Form.Group>
                                <Form.Label>Phone <sup className="text-danger">*</sup></Form.Label>
                                <Form.Control
                                    className=""
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={mobile}
                                    onChange={onPhoneChange}
                                />
                            </Form.Group>
                        </Col>
                        {(role === 'client' || role === 'employee') &&
                            <Col lg={6} sm={6} md={6}>
                                <Form.Group>
                                    <Form.Label>Company Name <sup className="text-danger">*</sup></Form.Label>
                                    <Form.Control
                                        className=""
                                        type="text"
                                        name="repid"
                                        id="companyName"
                                        value={companyName}
                                        onChange={onCompanyNameChange}
                                    />
                                </Form.Group>
                            </Col>}
                        {role === 'company' &&
                            <Col lg={6} sm={6} md={6}>
                                <Form.Group>
                                    <Form.Label>Company Name <sup className="text-danger">*</sup></Form.Label>
                                    <Dropdown
                                        controlClassName="company-drop-down"
                                        menuClassName="drop-down-company-menu"
                                        options={COMPANY_LIST}
                                        value={companyName}
                                        tabIndex="0"
                                        placeholder="Select an option"
                                        onchange={onCompanyNameChange}
                                    />
                                </Form.Group>
                            </Col>}
                        {(role === 'client' || role === 'company') &&
                            <Col lg={6} sm={6} md={6}>
                                <Form.Group>
                                    <Form.Label>Repreentative ID <sup className="text-danger">*</sup></Form.Label>
                                    <Form.Control
                                        className=""
                                        type="text"
                                        name="repid"
                                        id="repid"
                                        value={repId}
                                        onChange={onRepresentativeIdChange}
                                    />
                                </Form.Group>
                            </Col>}
                        {role === 'employee' &&
                            <React.Fragment>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Pancard Number <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type=""
                                            name="pancardnumner"
                                            id="pancardnumber"
                                            value={pancardNumber}
                                            onChange={onPancardNoChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Aadhar Number <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type=""
                                            name="aadharnumber"
                                            id="aadharnumber"
                                            value={aadharNo}
                                            onChange={onAadharNoChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Account Holder Name <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type=""
                                            name="accholdername"
                                            id="accholdername"
                                            value={accountHoldrName}
                                            readOnly
                                            onChange={onAccountHolderNameChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Account Number <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type=""
                                            name="accountnumber"
                                            id="accountnumber"
                                            value={accountNumber}
                                            onChange={onAccountNumberChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Bank IFSC <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type=""
                                            name="bankifsc"
                                            id="bankifsc"
                                            value={bankIfsc}
                                            onChange={onBankIfscChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Employee ID <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type="text"
                                            name="wmpid"
                                            id="empid"
                                            value={empId}
                                            readOnly
                                            onChange={onEmployeeIdChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </React.Fragment>
                        }
                    </Row>
                </Card>
            </Row>
        </Container>
    );
};

export default PersonalDetails;
