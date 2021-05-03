/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
import Overlay from '../../components/Overlay';


const RoleAssignment = ({ show, setShow }) => {
  const [role, setRole] = useState('');
  const [pillar, setPillar] = useState('');
  const [status, setStatus] = useState('');

  const roleOption = [
    { value: 'QA', label: 'QA' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Group Admin', label: 'Group Admin' }];
  const pillerOption = [
    { value: 'Environment', label: 'Environment' },
    { value: 'Social', label: 'Social' },
    { value: 'Governance', label: 'Governance' }];


  const handleClose = () => setShow(false);

  const onHandleRole = (roles) => {
    console.log(roles);
    setRole(roles);
  };

  const onHandlePillar = (pillars) => {
    setPillar(pillars);
  };

  const handleStatus = () => {
    if (role.length && pillar.length > 0) {
      setStatus('');
    } else {
      setStatus('Please fill all fields');
    }
  };
  const RoleAssignBody = () => (
    <div>
      <Row>
        <Col lg={6} sm={6} className="modal-content">
          <div className="heading">name</div>
          <div className="heading-name">Balaji</div>
        </Col>
        <Col lg={6} sm={6} className="modal-content">
          <div className="heading">e-mail</div>
          <div className="heading-email">balaji@gmail.com</div>
        </Col>
        <Col lg={6} sm={6} className="modal-content">
          <div className="head-dp">Assign Role</div>
          <div>
            <Select
              isMulti
              name="Roles"
              value={role}
              options={roleOption}
              onChange={onHandleRole}
            />
          </div>
        </Col>
        <Col lg={6} sm={6} className="modal-content">
          <div className="head-dp">Assign Pillars</div>
          <div>
            <Select
              isMulti
              value={pillar}
              name="Piller"
              options={pillerOption}
              onChange={onHandlePillar}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
  const RoleAssignFooter = () => (
    <div>
      <Button variant="success" onClick={handleStatus}>
        Save & Continue
      </Button>
    </div>
  );
  return (
    <Overlay
      className="role-assign-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation
      centered
      size="md"
      title="Role Assignment"
      body={<RoleAssignBody />}
      primary="Verify"
      alert={status}
      onSubmitPrimary={handleStatus}
      footer={<RoleAssignFooter />}
    />
  );
};

export default RoleAssignment;
