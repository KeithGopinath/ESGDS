/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const LoginCredentials = ({ role }) => {
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <Row className="login-content">
            <Card className="logincred-details shadow mb-5">
                <h4 className="logincred-text">Login Credentials</h4>
                <Row className="d-flex justify-content-around">
                    <Col lg={5} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Create pssword <sup className="text-danger">*</sup></Form.Label>
                            <Form.Control
                                className=""
                                type="password"
                                name="createpassword"
                                id="createpassword"
                                defaultValue={password}
                                onChange={handlePassword}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={5} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Confirm pssword <sup className="text-danger">*</sup></Form.Label>
                            <Form.Control
                                className=""
                                type="password"
                                name="confirmpassword"
                                id="confirmpassword"
                                defaultValue={confirmpassword}
                                onChange={handleConfirmPassword}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
            </Card>
        </Row>
    );
};

export default LoginCredentials;
