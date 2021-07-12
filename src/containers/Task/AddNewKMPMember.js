/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddNewKMPMember = () => (
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
          Year*
        </Form.Label>
        <Col sm={7}>
          <Select
            options={['2018-2019', '2019-2020'].map((e) => ({ label: e, value: e }))}
            maxLength={30}
            isMulti
          />
        </Col>
      </Form.Group>
    </Col>
    {/* <Col lg={6}>
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
          MASP003
        </Form.Label>
        <Form.Label column sm={5}>
          Key Management Personel Name
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
          MASR008
        </Form.Label>
        <Form.Label column sm={5}>
          Key Management Personel Gender
        </Form.Label>
        <Col sm={4}>
          <Select
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
            maxLength={30}
          />
        </Col>
      </Form.Group>
    </Col> */}
    <Col style={{ display: 'flex', justifyContent: 'center' }}><Button variant="success">Submit</Button></Col>
  </Row>
);

export default AddNewKMPMember;
