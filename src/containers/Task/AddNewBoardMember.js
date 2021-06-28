/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddNewBoardMember = () => (
  <Row>
    {/* --------------------------------------------------------------------------------------------- DPCODE */}
    <Col lg={6}>
      <Form.Group as={Row} >
        <Form.Label column sm={5}>
          Name*
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text" placeholder="Enter full name" />
        </Col>
      </Form.Group>
    </Col>
    <Col lg={6}>
      <Form.Group as={Row} >
        <Form.Label column sm={5}>
          Status*
        </Form.Label>
        <Col sm={7}>
          <Form.Control type="text" placeholder="Active or Inactive" />
        </Col>
      </Form.Group>
    </Col>
    <Col lg={12}>
      <Form.Group as={Row} >
        <Form.Label column sm={3}>
          BODP001
        </Form.Label>
        <Form.Label column sm={5}>
          Board member ethnicity/culture/nationality
        </Form.Label>
        <Col sm={4}>
          <Select
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
            maxLength={30}
          />
        </Col>
      </Form.Group>
    </Col>
    <Col lg={12}>
      <Form.Group as={Row} >
        <Form.Label column sm={3}>
          BODR005
        </Form.Label>
        <Form.Label column sm={5}>
          Board member's declared gender
        </Form.Label>
        <Col sm={4}>
          <Select
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
            maxLength={30}
          />
        </Col>
      </Form.Group>
    </Col>
    <Col lg={12}>
      <Form.Group as={Row} >
        <Form.Label column sm={3}>
          BOSP004
        </Form.Label>
        <Form.Label column sm={5}>
          Board member name
        </Form.Label>
        <Col sm={4}>
          <Select
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
            maxLength={30}
          />
        </Col>
      </Form.Group>
    </Col>
    <Col lg={12}>
      <Form.Group as={Row} >
        <Form.Label column sm={3}>
          BOSP005
        </Form.Label>
        <Form.Label column sm={5}>
          Does the board member have industry experience?
        </Form.Label>
        <Col sm={4}>
          <Select
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
            maxLength={30}
          />
        </Col>
      </Form.Group>
    </Col>
    <Col lg={12}>
      <Form.Group as={Row} >
        <Form.Label column sm={3}>
          BOSP006
        </Form.Label>
        <Form.Label column sm={5}>
          Does the board member have financial expertise?
        </Form.Label>
        <Col sm={4}>
          <Select
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
            maxLength={30}
          />
        </Col>
      </Form.Group>
    </Col>
    <Col style={{ display: 'flex', justifyContent: 'center' }}><Button variant="success">Submit</Button></Col>
  </Row>
);

export default AddNewBoardMember;
