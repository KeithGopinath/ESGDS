/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';

const PersonalDetails = ({ role }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [pancardNumber, setPancardNumber] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankIfsc, setBankIsfc] = useState('');

    // personal details
    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const onLastNameChange = (e) => {
        setLastName(e.target.value);
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

    const onCompanyNameChange = (e) => {
        setCompanyName(e);
    };

    const onAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const onBankIfscChange = (e) => {
        setBankIsfc(e.target.value);
    };

    const companyList = [
        { value: 'Reliance', label: 'Reliance' },
        { value: 'Indian Oils', label: 'Indian Oils' },
        { value: 'Hindustan', label: 'Hindustan' },
        { value: 'Bharat', label: 'Bharat' }
    ];

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
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    placeholder={`${role === 'employee' ? "Enter your first name" : "Enter your name"}`}
                                    onChange={onFirstNameChange}
                                />
                            </Form.Group>
                        </Col>
                        {role === 'employee' &&
                            <React.Fragment>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Middle Name</Form.Label>
                                        <Form.Control
                                            className=""
                                            type="text"
                                            name="middleName"
                                            id="middleName"
                                            placeholder="Optional"
                                            value={middleName}
                                            onChange={onMiddleNameChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Last Name <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value={lastName}
                                            placeholder="Enter your last name"
                                            onChange={onLastNameChange}
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
                                    placeholder="This will be your user ID"
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
                                    placeholder="Enter your valid mobile number"
                                    onChange={onPhoneChange}
                                />
                            </Form.Group>
                        </Col>
                        {role === 'client' &&
                            <Col lg={6} sm={6} md={6}>
                                <Form.Group>
                                    <Form.Label>Company Name <sup className="text-danger">*</sup></Form.Label>
                                    <Form.Control
                                        className=""
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        value={companyName}
                                        placeholder="Enter your company name"
                                        onChange={onCompanyNameChange}
                                    />
                                </Form.Group>
                            </Col>}
                        {role === 'company' &&
                            <Col lg={6} sm={6} md={6}>
                                <Form.Group>
                                    <Form.Label>Company Name <sup className="text-danger">*</sup></Form.Label>
                                    <Select
                                        isMulti
                                        options={companyList}
                                        name="companyName"
                                        onChange={onCompanyNameChange}
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
                                            name="pancardNumber"
                                            id="pancardNumber"
                                            value={pancardNumber}
                                            placeholder="Enter your pancard number"
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
                                            name="aadharNumber"
                                            id="aadharNumber"
                                            value={aadharNo}
                                            placeholder="Enter your aadhar number"
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
                                            name="accHolderName"
                                            id="accHolderName"
                                            value={`${firstName} ${middleName && `${middleName} `}${lastName}`}
                                            readOnly
                                            placeholder="Same as your name"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Account Number <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type=""
                                            name="accountNumber"
                                            id="accountNumber"
                                            value={accountNumber}
                                            placeholder="Enter your account number"
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
                                            name="bankIFSC"
                                            id="bankIFSC"
                                            value={bankIfsc}
                                            placeholder="Enter your IFSC code"
                                            onChange={onBankIfscChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </React.Fragment>
                        }
                    </Row>
                    <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
                    {role === 'employee' && <p className="ml-3 mt-2"><sup className="text-danger">*</sup> Please enter your name same as bank account details</p>}
                </Card>
            </Row>
        </Container>
    );
};

export default PersonalDetails;
