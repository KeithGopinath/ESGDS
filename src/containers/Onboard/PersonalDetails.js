/* eslint-disable no-console */
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container, Button } from 'react-bootstrap';

const PersonalDetails = () => {
  const [personal, setPersonla] = useState({
    name: '',
    email: '',
    compName: '',
    repId: '',
    mobile: '',
  });

  const onValueChange = (e) => {
    setPersonla(e.target.value);
  };

  const onPersonalDetails = () => {
    // history.push('/proofupload');
  };

  return (
    <Container>
      <Card className="personal-details shadow  mb-5">
        <h4 className="personal-text">Personal Details</h4>
        <Row className="d-flex justify-content-around">
          <Col lg={5} sm={6} md={6}>
            <Form.Group>
              <Form.Label>Name*</Form.Label>
              <Form.Control
                className=""
                type="text"
                name="name"
                id="name"
                value={personal.name}
                onChange={onValueChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company Name*</Form.Label>
              <Form.Control
                className=""
                type="text"
                name="companyname"
                id="conpantname"
                value={personal.compName}
                onChange={onValueChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repreentative ID*</Form.Label>
              <Form.Control
                className=""
                type="text"
                name="repid"
                id="repid"
                value={personal.repId}
                onChange={onValueChange}
              />
            </Form.Group>
          </Col>
          <Col lg={5} sm={6} md={6}>
            <Form.Group>
              <Form.Label>Email*</Form.Label>
              <Form.Control
                className=""
                type="email"
                name="email"
                id="email"
                value={personal.email}
                onChange={onValueChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone*</Form.Label>
              <Form.Control
                className=""
                type="phone"
                name="phone"
                id="phone"
                value={personal.mobile}
                onChange={onValueChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>
      <Button className="save-btn float-right" onClick={onPersonalDetails}>Save & Continue</Button>
    </Container>
  );
};

export default PersonalDetails;
