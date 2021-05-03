/* eslint-disable*/
import React, { useState } from 'react';
import { Row, Button, Card, Form, Col, Jumbotron } from 'react-bootstrap';
import Logo from '../../../assets/images/logo.png';
import Banner from '../../../assets/images/login_image.png';


const UpdatePassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alertMsg, setAlertMsg] = useState('');
    const [validate, setValidate] = useState('');

    const onPasswordChange = (e) => {
        if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
            setPassword(e.target.value)
        }
    };

    const onConfirmPasswordChange = (e) => {
        if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
            setConfirmPassword(e.target.value)
        }
    };

    const onPasswordSubmit = () => {
        if (!password || !confirmPassword) {
            setAlertMsg('Please fill the required fields');
            setValidate('border-danger');
        } else if (password !== confirmPassword) {
            setAlertMsg("Password and confirm password does not match")
            setValidate('border-danger');
        }
        else {
            const updatePassDetails = {
                password: password,
                confirmPassword: confirmPassword,
            }
            setValidate('');
        }
    };

    const customStyle ={
        backgroundImage: `url(${Banner})`,
        height: '100vh', 
        backgroundColor: '#50bfa5'
    }

    return (
        <Jumbotron style={customStyle}>
            <div className="card-container-update">
                <Row>
                    <Col lg={12} sm={8} md={10}>
                        <Card className="card-styles shadow">
                            <div className="update-password-logo">
                            <img  src={Logo} alt="logo" height="70vh" width="180vh"/>
                            </div>
                            <Card.Title className="reset-title">Update Password</Card.Title>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    className={!password && validate}
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="passsword"
                                    onChange={onPasswordChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    className={!confirmPassword && validate}
                                    type="password"
                                    name="confirmpassword"
                                    value={confirmPassword}
                                    placeholder="confirm password"
                                    onChange={onConfirmPasswordChange}
                                />
                            </Form.Group>
                            <span className="w-100 text-center text-danger"><p>{alertMsg}</p></span>
                            <Button className="w-100 login-button" type="submit" onClick={onPasswordSubmit}>Update password</Button><br></br>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Jumbotron>
    );
};

export default UpdatePassword;
