/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container } from 'react-bootstrap';
import Dropdown from 'react-dropdown';

const PersonalDetails = ({ role }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [pancardNumber, setPancardNumber] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [accountHoldrName, setAccountHolderName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankIfsc, setBankIsfc] = useState('');
    const [personalId, setPersonalId] = useState('254543');

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

    const onPersonalIdChanage = (e) => {
        setPersonalId(e.target.value);
    };

    const companyList = ['Relience', 'Indian Oils'];

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
                                    placeholder={`${role==='employee' ? "Enter your first name": "Enter your name"}`}
                                    onChange={onFirstNameChange}
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
                                            name="lastName"
                                            id="lastName"
                                            value={lastName}
                                            placeholder="Enter your last name"
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
                                            name="middleName"
                                            id="middleName"
                                            placeholder="Optional"
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
                                    placeholder="Enter your user ID"
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
                                        placeholder = "Enter your company name"
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
                                        name="companyName"
                                        id="companyName"
                                        options={companyList}
                                        value={companyName}
                                        tabIndex="0"
                                        onchange={onCompanyNameChange}
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
                                            name="pancardNumner"
                                            id="pancardNumner"
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
                                            placeholder="Enter your Aadhar number"
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
                                            value={accountHoldrName}
                                            placeholder="Same as your name"
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
                                            name="accountNumber"
                                            id="accountNumber"
                                            value={accountNumber}
                                            placeholder="Enter your Account number"
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
                                <Col lg={6} sm={6} md={6}>
                                    <Form.Group>
                                        <Form.Label>Personal ID <sup className="text-danger">*</sup></Form.Label>
                                        <Form.Control
                                            className=""
                                            type="text"
                                            name="personalId"
                                            id="personalId"
                                            value={personalId}
                                            readOnly
                                            onChange={onPersonalIdChanage}
                                        />
                                    </Form.Group>
                                </Col>
                            </React.Fragment>
                        }
                    </Row>
                    <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
                </Card>
            </Row>
        </Container>
    );
};

export default PersonalDetails;
