/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { message } from 'antd';

const AddNewBoardMember = (props) => {
  // PROPS
  const { reqYears, reqMemberType, onCloseAddNewMemberModal } = props;

  // STATES
  const [reqMemberName, setReqMemberName] = useState('');
  const [reqFiscalYears, setreqFiscalYears] = useState([]);
  const [statusAlert, setStatusAlert] = useState(false);

  // REDUX FUNC'S
  const dispatch = useDispatch();
  const matrixMember = useSelector((state) => (state.matrixMember));

  // ONCHNAGE & ONCLICK FUNC'S
  const onChangeMemberName = (event) => {
    setReqMemberName(event.target.value);
  };

  const onChangeReqFiscalYears = (event) => {
    setreqFiscalYears(event.map((eYear) => (eYear.value)));
  };

  const onClickSubmit = () => {
    const putData = {
      companyId: '60b64f09b09656fa36dc10fc', // HARDCODED COMPANY
      name: reqMemberName,
      years: reqFiscalYears,
      memberType: reqMemberType, // MEMBER TYPE FROM PROPS
    };

    dispatch({ type: 'MATRIX_MEMBER_PUT_REQUEST', payload: putData });
    setStatusAlert(true);
  };

  // USEEFFECTS FUNC'S
  useEffect(() => {
    if (matrixMember && matrixMember.matrixMember && matrixMember.matrixMember.status && statusAlert) {
      message[matrixMember.matrixMember.status === '200' ? 'success' : 'error'](matrixMember.matrixMember.message);
      onCloseAddNewMemberModal();
      setStatusAlert(false);
    }
    if (matrixMember && matrixMember.error && statusAlert) {
      message.error(matrixMember.error.message ? matrixMember.error.message : 'Something went wrong, Try again later !');
      setStatusAlert(false);
    }
  }, [matrixMember]);

  return (
    <Row>
      {/* --------------------------------------------------------------------------------------------- DPCODE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Name*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" value={reqMemberName} onChange={onChangeMemberName} placeholder="Enter full name" />
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
              options={reqYears.split(',').map((eYear) => ({ label: eYear, value: eYear }))}
              maxLength={2}
              onChange={onChangeReqFiscalYears}
              value={reqFiscalYears.map((eYear) => ({ label: eYear, value: eYear }))}
              isMulti
            />
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
      <Col style={{ display: 'flex', justifyContent: 'center' }}><Button onClick={onClickSubmit} variant="success">Submit</Button></Col>
    </Row>
  );
};

export default AddNewBoardMember;
