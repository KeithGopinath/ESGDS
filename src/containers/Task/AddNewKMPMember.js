/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Select from 'react-select';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Input, Select as AntSelect, Divider, DatePicker } from 'antd';
import moment from 'moment';


const FieldWrapper = (props) => {
  // PROPS ARE {VISIBLE}, {LABEL}, {BODY}, {SIZE} !
  if (props.visible) {
    return (
      <Col lg={props.size[0]}>
        <Form.Group as={Row} >
          <Form.Label column sm={props.size[1]}>
            {props.label}
          </Form.Label>
          <Col sm={props.size[2]}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

const AddNewKMPMember = (props) => {
  const { modalType } = props;
  const [isAddNewKmp, isAddNewBoard, isTerminateKmp, isTerminateBoard] = [
    modalType === 'AddNewKmpType',
    modalType === 'AddNewBoardType',
    modalType === 'TerminateKmpType',
    modalType === 'TerminateBoardType',
  ];

  const [title, setTitle] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const [gender, setGender] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [financialExp, setFinancialExp] = useState(null);
  const [industrialExp, setIndustrialExp] = useState(null);

  const [dob, setDob] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isExecutiveType, setIsExecutiveType] = useState(false);

  const [boardMembersToTeminate, setBoardMembersToTerminate] = useState([]);
  const [kmpMembersToTerminate, setKmpMembersToTerminate] = useState([]);
  const [endDate, setEndDate] = useState(null);

  const tempMembersLists = [
    { label: 'Gopi', value: 'gopi001' },
    { label: 'balaji', value: 'balaji001' },
    { label: 'praveen', value: 'praveen007' },
  ];

  const tempSalutationList = [
    { label: 'Dr.', value: 'Dr.' },
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mrs.', value: 'Mrs.' },
    { label: 'Ms.', value: 'Ms.' },
  ];

  const onChangetitle = (event) => {
    setTitle(event);
  };
  const onChangeFirstName = (event) => {
    setFirstName(event.currentTarget.value);
  };
  const onChangeMiddleName = (event) => {
    setMiddleName(event.currentTarget.value);
  };
  const onChangeLastName = (event) => {
    setLastName(event.currentTarget.value);
  };
  const onChangeGender = (event) => {
    setGender(event);
  };
  const onChangeNationality = (event) => {
    setNationality(event);
  };
  const onChangeFinancialExp = (event) => {
    setFinancialExp(event);
  };
  const onChangeIndustrialExp = (event) => {
    setIndustrialExp(event);
  };
  const onChangeDob = (event) => {
    setDob(event);
  };
  const onChangeStartDate = (event) => {
    setStartDate(event);
  };
  const onChangeIsExecutiveType = (event) => {
    setIsExecutiveType(event);
  };

  const onChangeBoardMembersToTerminate = (event) => {
    setBoardMembersToTerminate(event);
  };

  const onChangeKmpMembersToTerminate = (event) => {
    setKmpMembersToTerminate(event);
  };

  const onChangeEndDate = (event) => {
    setEndDate(event);
  };

  const onSubmitClick = () => {
    props.closeModal();
  };

  const onTerminateClick = () => {
    props.closeModal();
  };
  return (
    <Row>
      {/* --------------------------------------------------------------------------------------------- DPCODE */}
      {/* KMP && BOARD MEMBER NAME */}
      <FieldWrapper
        visible={isAddNewBoard || isAddNewKmp}
        size={[12, 2, 10]}
        label={
          <React.Fragment>
            <div>Full Name<span style={{ color: 'red' }}> * </span></div>
            <div>{isAddNewBoard && '(MASP003)'}{isAddNewKmp && '(BOSP004)'}{isExecutiveType.value && '/(BOSP004)'}</div>
          </React.Fragment>
        }
        body={
          <Input.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
            <AntSelect size="large" style={{ width: '18%' }} placeholder="Title" value={title} onChange={onChangetitle}>
              {tempSalutationList.map((e) => <AntSelect.Option value={e.value}>{e.label}</AntSelect.Option>)}
            </AntSelect>
            <Input size="large" style={{ width: '26%' }} placeholder="First Name" value={firstName} onChange={onChangeFirstName} />
            <Input size="large" style={{ width: '26%' }} placeholder="Middle Name" value={middleName} onChange={onChangeMiddleName} />
            <Input size="large" style={{ width: '26%' }} placeholder="Last Name" value={lastName} onChange={onChangeLastName} />
          </Input.Group>
        }
      />

      {(isAddNewBoard || isAddNewKmp) && <Divider />}

      {/* KMP && BOARD MEMBER GENDER */}
      <FieldWrapper
        visible={isAddNewBoard || isAddNewKmp}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            <div>Gender<span style={{ color: 'red' }}> * </span></div>
            <div>{isAddNewBoard && '(MASR008)'}{isAddNewKmp && '(BODR005)'}{isExecutiveType.value && '/(BODR005)'}</div>
          </React.Fragment>
        }
        body={
          <Select
            value={gender}
            onChange={onChangeGender}
            options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }, { label: 'NA', value: 'Na' }]}
            maxLength={30}
          />
        }
      />

      {/* BOARD MEMBER BOSP006 */}
      <FieldWrapper
        visible={isAddNewBoard}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            <div>Does the board member have financial expertise?<span style={{ color: 'red' }}> * </span></div>
            <div>(BOSP006)</div>
          </React.Fragment>
        }
        body={
          <Select
            value={financialExp}
            onChange={onChangeFinancialExp}
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            maxLength={30}
          />
        }
      />

      {/* BOARD MEMBER BOSP005 */}
      <FieldWrapper
        visible={isAddNewBoard}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            <div>Does the board member have industry experience?<span style={{ color: 'red' }}> * </span></div>
            <div>(BOSP005)</div>
          </React.Fragment>
        }
        body={
          <Select
            value={industrialExp}
            onChange={onChangeIndustrialExp}
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            maxLength={30}
          />
        }
      />

      {/* BOARD MEMBER BODP001 */}
      <FieldWrapper
        visible={isAddNewBoard}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            <div>Board member ethnicity/culture/nationality<span style={{ color: 'red' }}> * </span></div>
            <div>(BODP001)</div>
          </React.Fragment>
        }
        body={
          <Select
            value={nationality}
            onChange={onChangeNationality}
            options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
            maxLength={30}
          />
        }
      />

      {/* KMP && BOARD MEMBER DOB */}
      <FieldWrapper
        visible={isAddNewBoard || isAddNewKmp}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            DOB<span style={{ color: 'red' }}> * </span>
          </React.Fragment>
        }
        body={
          <DatePicker size="large" value={dob && moment(dob)} onChange={onChangeDob} style={{ width: '100%' }} />
        }
      />

      {/* EXECUTIVE */}
      <FieldWrapper
        visible={isAddNewBoard}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            Is also a executive member ?<span style={{ color: 'red' }}> * </span>
          </React.Fragment>
        }
        body={
          <Select
            value={isExecutiveType}
            onChange={onChangeIsExecutiveType}
            options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
            maxLength={30}
          />
        }
      />

      {/* KMP && BOARD MEMBER START DATE */}
      <FieldWrapper
        visible={isAddNewBoard || isAddNewKmp}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            Start Date<span style={{ color: 'red' }}> * </span>
          </React.Fragment>
        }
        body={
          <DatePicker size="large" value={startDate && moment(startDate)} onChange={onChangeStartDate} style={{ width: '100%' }} />
        }
      />

      <FieldWrapper
        visible={isTerminateBoard}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            Members List<span style={{ color: 'red' }}> * </span>
          </React.Fragment>
        }
        body={
          <AntSelect mode="multiple" size="large" style={{ width: '100%' }} placeholder="Choose" value={boardMembersToTeminate} onChange={onChangeBoardMembersToTerminate}>
            {tempMembersLists.map((e) => <AntSelect.Option value={e.value}>{e.label}</AntSelect.Option>)}
          </AntSelect>
        }
      />

      <FieldWrapper
        visible={isTerminateKmp}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            Members List<span style={{ color: 'red' }}> * </span>
          </React.Fragment>
        }
        body={
          <AntSelect mode="multiple" size="large" style={{ width: '100%' }} placeholder="Choose" value={kmpMembersToTerminate} onChange={onChangeKmpMembersToTerminate}>
            {tempMembersLists.map((e) => <AntSelect.Option value={e.value}>{e.label}</AntSelect.Option>)}
          </AntSelect>
        }
      />

      <FieldWrapper
        visible={isTerminateBoard || isTerminateKmp}
        size={[6, 6, 6]}
        label={
          <React.Fragment>
            End Date<span style={{ color: 'red' }}> * </span>
          </React.Fragment>
        }
        body={
          <DatePicker size="large" value={endDate && moment(endDate)} onChange={onChangeEndDate} style={{ width: '100%' }} />
        }
      />


      <Divider />

      {(isAddNewBoard || isAddNewKmp) && <Col lg={12} style={{ display: 'flex', justifyContent: 'center' }}><Button onClick={onSubmitClick} variant="success">Submit</Button></Col>}
      {(isTerminateKmp || isTerminateBoard) && <Col lg={12} style={{ display: 'flex', justifyContent: 'center' }}><Button onClick={onTerminateClick} variant="danger">Terminate</Button></Col>}
    </Row>
  );
};

export default AddNewKMPMember;

