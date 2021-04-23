/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';


const RoleAssignment = ({ show, setShow }) => {
  const [role, setRole] = useState('');
  const [pillar, setPillar] = useState('');
  const [status, setStatus] = useState(0);

  const roleOption = [
    { value: 'QA', label: 'QA' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Group Admin', label: 'Group Admin' }];
  const defaultRole = roleOption[0];
  const pillerOption = [
    { value: 'Environment', label: 'Environment' },
    { value: 'Social', label: 'Social' },
    { value: 'Governance', label: 'Governance' }];

  const defaultPillar = pillerOption[0];

  const handleClose = () => setShow(false);

  const onHandleRole = (roles) => {
    setRole(roles);
  };

  const onHandlePillar = (pillars) => {
    setPillar(pillars);
  };

  const handleStatus = () => {
    if (role.length && pillar.length > 0) {
      setTimeout(() => {
        setStatus(0);
      }, 3000);
      setStatus(1);
    } else {
      setTimeout(() => {
        setStatus(0);
      }, 3000);
      setStatus(2);
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false} centered>
        <Modal.Header closeButton className="modal-head">
          <FontAwesomeIcon className="setting-icon" icon={faCog} />
          <Modal.Title className="modal-title">Assign role for the user</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '0.5rem 1.5rem' }}>
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
                  defaultValue={defaultRole}
                  isMulti
                  name="Roles"
                  options={roleOption}
                  onChange={onHandleRole}
                />
              </div>
            </Col>
            <Col lg={6} sm={6} className="modal-content">
              <div className="head-dp">Assign Pillars</div>
              <div className="min-height-dropdown">
                <Select
                  isMulti
                  defaultValue={defaultPillar}
                  name="Piller"
                  options={pillerOption}
                  onChange={onHandlePillar}
                />
              </div>
            </Col>
          </Row>
          <div className="status-minheight">
            {status === 1 &&
              <div className="status-rolepillar">
                <div className="alert alert-success" role="alert" >Assigned successfully !!</div>
              </div>
            }
            {status === 2 &&
              <div className="status-rolepillar">
                <div className="alert alert-danger" role="alert" >Fill all the required fields !</div>
              </div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer style={{ border: 'none' }}>
          <Button variant="btn btn-outline-primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleStatus}>
            Save & Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleAssignment;
