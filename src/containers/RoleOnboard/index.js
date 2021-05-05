/*eslint-disable*/
import React, { useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import Overlay from '../../components/Overlay';
import { history } from './../../routes';

const RoleOnboard = ({ showOnboardRoles, handleClose }) => {

  const [selectOption, setSelectOption] = useState('');
  const [onboardAlert, setOnboardAlert] = useState('');

  const handleSelect = (e) => {
    setSelectOption(e.target.id);
  };

  const onSubmitOnboard = () => {
    if (!selectOption) {
      setOnboardAlert("Please select the option");
    } else {
      history.push({
        pathname: '/onboard',
        state: selectOption
      });
    }
  };

  const RoleBody = () => (
    <div>
      <p>Please select any one role to send the onboard link</p>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Employee"
          name="formHorizontalRadios"
          id="Employee"
          onChange={handleSelect}
        />
        <Form.Check
          type="radio"
          label="Client Representative"
          name="formHorizontalRadios"
          id="client"
          onChange={handleSelect}
        />
        <Form.Check
          type="radio"
          label="Company Representative"
          name="formHorizontalRadios"
          id="company"
          onChange={handleSelect}
        />
      </Col>
    </div>
  );
  return (
    <Overlay
      className="text-center otp-modal"
      show={showOnboardRoles}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation
      centered
      size="md"
      title="Select role:"
      body={RoleBody()}
      alert={onboardAlert}
      alertClass='danger'
      primary="Next"
      onSubmitPrimary={onSubmitOnboard}
    />
  );
};

export default RoleOnboard;