import React, { useState } from 'react';
import { Card, Container, Form, Col, Row, Button } from 'react-bootstrap';
import { history } from '../../routes';


const Logincredentials = () => {
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onHandleProofUplpad = () => {
    history.push('/proofupload');
  };

  const handleSubmit = () => {
    history.push('/');
  };

  return (
    <Container>
      <Card className="proof-details shadow mb-5">
        <h4 className="logincred-text">Login Credentials</h4>
        <Row className="d-flex justify-content-around">
          <Col lg={5} md={6} sm={6}>
            <Form.Group>
              <Form.Label>Create pssword*</Form.Label>
              <Form.Control
                className=""
                type="password"
                name="createpassword"
                id="createpassword"
                value={password}
                onChange={handlePassword}
              />
            </Form.Group>
          </Col>
          <Col lg={5} md={6} sm={6}>
            <Form.Group>
              <Form.Label>Confirm pssword*</Form.Label>
              <Form.Control
                className=""
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={confirmpassword}
                onChange={handleConfirmPassword}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>
      <div>
        <Button className="btn-back" onClick={onHandleProofUplpad}> Back </Button>
        <Button className="save-btn float-right" onClick={handleSubmit}>Submit</Button>
      </div>
    </Container>
  );
};

export default Logincredentials;

