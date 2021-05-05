/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Row, Col, Container } from 'react-bootstrap';
import Select from 'react-select';
import { history } from './../../routes';

const PersonalDetails = ({ role, onFirstName, onMiddleName, onLastName, onEmail, onPhone, onPancard, onAadhar, onBankAccount, onBankIfsc, onCompanyName, validate, location }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [pancardNumber, setPancardNumber] = useState('');
    const [adharCard, setAdharCard] = useState('');
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankIFSCCode, setBankIFSCCode] = useState('');
    const [validation, setValidation] = useState('');

    // history.push({state:firstName});
    const onFirstNameChange = (e) => {
        if (e.target.value.match('^[a-zA-Z_@./#&+-]*$')) {
            setFirstName(e.target.value);
            onFirstName(e.target.value);
        }
    };

    const onMiddleNameChange = (e) => {
        setMiddleName(e.target.value);
        onMiddleName(e.target.value)
    };

    const onLastNameChange = (e) => {
        setLastName(e.target.value);
        onLastName(e.target.value);
    };

    const onEmailChange = (e) => {
        if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
            setEmail(e.target.value);
            onEmail(e.target.value);
        }
    };

    const onPhoneChange = (e) => {
        setPhoneNumber(e.target.value);
        onPhone(e.target.value);
    };

    const onPancardNoChange = (e) => {
        setPancardNumber(e.target.value);
        onPancard(e.target.value);
    };

    const onAadharNoChange = (e) => {
        setAdharCard(e.target.value);
        onAadhar(e.target.value);
    };

    const onCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
        onCompanyName(e.target.value);
    };

    const onCompanyNameSelect = (companySelect) => {
        setCompanyName(companySelect);
        onCompanyName(companySelect);
    };

    const onAccountNumberChange = (e) => {
        setBankAccountNumber(e.target.value);
        onBankAccount(e.target.value);
    };

    const onBankIfscChange = (e) => {
        setBankIFSCCode(e.target.value);
        onBankIfsc(e.target.value);
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
                                {role === 'Employee' && <Form.Label>First Name <sup className="text-danger">*</sup></Form.Label>}
                                <Form.Control
                                    className={!firstName && validate}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    placeholder={`${role === 'Employee' ? "Enter your first name" : "Enter your name"}`}
                                    onChange={onFirstNameChange}
                                    name={firstName}
                                />
                            </Form.Group>
                        </Col>
                        {role === 'Employee' &&
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
                                            className={!lastName}
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
                                    className={!email}
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
                                    className={!phoneNumber}
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    maxLength={10}
                                    value={phoneNumber}
                                    placeholder="Enter your valid phone number"
                                    onChange={onPhoneChange}
                                />
                            </Form.Group>
                        </Col>
                        {role === 'client' &&
                            <Col lg={6} sm={6} md={6}>
                                <Form.Group>
                                    <Form.Label>Company Name <sup className="text-danger">*</sup></Form.Label>
                                    <Form.Control
                                        className={!companyName}
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
                                        className={!companyList}
                                        isMulti
                                        options={companyList}
                                        name="companyName"
                                        onChange={onCompanyNameSelect}
                                    />
                                </Form.Group>
                            </Col>}
                        {role === 'Employee' &&
                            <React.Fragment>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Pan Card Number <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className={!pancardNumber}
                                            type="text"
                                            maxLength={10}
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
                                            className={!adharCard}
                                            type="tel"
                                            maxLength={12}
                                            name="aadharNumber"
                                            id="aadharNumber"
                                            value={adharCard}
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
                                            type="text"
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
                                            className={!bankAccountNumber}
                                            type="tel"
                                            minLength={11}
                                            maxLength={16}
                                            name="bankAccountNumber"
                                            id="bankAccountNumber"
                                            value={bankAccountNumber}
                                            placeholder="Enter your account number"
                                            onChange={onAccountNumberChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Bank IFSC <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className={!bankIFSCCode}
                                            type="text"
                                            name="bankIFSC"
                                            id="bankIFSC"
                                            value={bankIFSCCode}
                                            placeholder="Enter your IFSC code"
                                            onChange={onBankIfscChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </React.Fragment>
                        }
                    </Row>
                    <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
                    {role === 'Employee' && <p className="ml-3 mt-2"><sup className="text-danger">*</sup> Please enter your name same as bank account details</p>}
                </Card>
            </Row>
        </Container>
    );
};

export default PersonalDetails;
