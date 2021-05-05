/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const LoginCredentials = ({ onPassword, onConfirmPassword, validate }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);
        onPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        onConfirmPassword(e.target.value);
    };

    return (
        <Row className="login-content">
            <Card className="logincred-details shadow mb-5">
                <h4 className="logincred-text">Login Credentials</h4>
                <Row className="d-flex justify-content-around">
                    <Col lg={5} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Create password <sup className="text-danger">*</sup></Form.Label>
                            <Form.Control
                                className={password}
                                type="password"
                                name="createPassword"
                                id="createPassword"
                                defaultValue={password}
                                placeholder="Password"
                                onChange={handlePassword}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={5} md={6} sm={6}>
                        <Form.Group>
                            <Form.Label>Confirm password <sup className="text-danger">*</sup></Form.Label>
                            <Form.Control
                                className={confirmPassword}
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                defaultValue={confirmPassword}
                                placeholder="Confirm password"
                                onChange={handleConfirmPassword}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
                <p className="ml-3 mr-3 mt-2"> <sup className="text-danger">*</sup> Use 8 or more characters at least one Uppercase, Lowercase letter, Number & special character</p>
            </Card>
        </Row>
    );
};

export default LoginCredentials;
