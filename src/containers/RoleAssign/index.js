/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';


const RoleAssignment = () => {
  let multiselectRef = React.createRef();
  let multiselectpillarRef = React.createRef();
  const RoleOption = [
    { value: 'QA', label: 'QA' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'Group Admin', label: 'Group Admin' }];
  const PillerOption = [
    { value: 'Environment', label: 'Environment' },
    { value: 'Social', label: 'Social' },
    { value: 'Governance', label: 'Governance' }];
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlestatus = () => {
    const role = multiselectRef.current.value;
    const pillar = multiselectpillarRef.current.value;
    console.log(role, 'role');
    console.log(pillar, 'pillar');
    return (
      <div>
        balaji
      </div>
    );
  };
  return (
    <div>
      <Button variant="primary" className="" onClick={handleShow}>
        Role Assignment
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} animation={false} centered>
        <Modal.Header closeButton style={{ padding: '1rem 1.5rem 0.5rem' }}>
          <FontAwesomeIcon className="setting-icon" icon={faCog} />
          <Modal.Title className="modal-title" >Assign role for the user</Modal.Title>
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
                  isMulti
                  name="Roles"
                  options={RoleOption}
                  ref={multiselectRef}
                />
              </div>
            </Col>
            <Col lg={6} sm={6} className="modal-content">
              <div className="head-dp">Assign Pillars</div>
              <div className="min-height-dropdown">
                <Select
                  isMulti
                  name="Piller"
                  options={PillerOption}
                  ref={multiselectpillarRef}
                />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ border: 'none' }}>
          <Button variant="btn btn-outline-primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlestatus}>
            Save & Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleAssignment;
