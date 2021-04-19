/* eslint-disable prefer-const */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserTag } from '@fortawesome/free-solid-svg-icons';


const RoleAssignment = () => {
  const [role, setrole] = useState('');
  const [pillar, setpillar] = useState('');
  const [status, setstatus] = useState(0);

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
  const onHandlerole = (roles) => {
    setrole(roles);
  };
  const onHandlepillar = (pillars) => {
    setpillar(pillars);
  };
  const handlestatus = () => {
    if (role.length && pillar.length > 0) {
      setTimeout(() => {
        setstatus(0);
      }, 3000);
      setstatus(1);
    } else {
      setTimeout(() => {
        setstatus(0);
      }, 3000);
      setstatus(2);
    }
  };
  return (
    <div>
      <div role="button" tabIndex={0} className="sideMenu-rolebtn" onClick={handleShow} onKeyDown={handleShow} >
        <FontAwesomeIcon className="role-icon" icon={faUserTag} />
        <div className="sideMenu-btn-rolelabel">Role Assignment</div>
      </div>
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
                  isMulti
                  name="Roles"
                  options={RoleOption}
                  onChange={onHandlerole}
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
                  onChange={onHandlepillar}
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
          <Button variant="success" onClick={handlestatus}>
            Save & Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleAssignment;
