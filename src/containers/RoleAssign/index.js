/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import Overlay from '../../components/Overlay';
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css';


const RoleAssignment = ({ show, setShow }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState();
  const [primaryRole, setPrimaryRole] = useState();
  const [flag, setFlag] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');

  const employeeDetails = [
    {
      'name': { 'value': '1', 'label': 'Jerin vs' },
      'roles': {
        'role': [
          { 'value': 'Group Admin', 'label': 'Group Admin' },
        ],
        'primaryRole': { 'value': 'Group Admin', 'label': 'Group Admin' }
      },
    },
    {
      'name': { 'value': '2', 'label': 'Jerin vs' },
      'roles': {
        'role': [
          { 'value': 'QA', 'label': 'QA' },
        ],
        'primaryRole': { 'value': 'QA', 'label': 'QA' },
      },
    },
    {
      'name': { 'value': '3', 'label': 'Rajesh' },
      'roles': {
        'role': [
          { 'value': 'Group Admin', 'label': 'Group Admin' },
          { 'value': 'QA', 'label': 'QA' },
        ],
        'primaryRole': { 'value': 'QA', 'label': 'QA' }
      },
    },
    {
      'name': { 'value': '4', 'label': 'Gopi' },
      'roles': {
        'role': [
          { 'value': 'Group Admin', 'label': 'Group Admin' },
          { 'value': 'QA', 'label': 'QA' },
          { 'value': 'Super Admin', 'label': 'Super Admin' },
        ],
        'primaryRole': { 'value': 'Super Admin', 'label': 'Super Admin' }
      },
    },
  ]

  const roleOption = [
    { value: 'Group Admin', label: 'Group Admin' },
    { value: 'QA', label: 'QA' },
    { value: 'Analyst', label: 'Analyst' }]

  const nameOptions = employeeDetails.map((data) => {
    return (
      data.name
    )
  })

  const handleClose = () => {
    setShow(false);
    clearState();
  }

  const clearState = () => {
    setName('');
    setRole('')
    setPrimaryRole('')
    setAlertMsg('');
    setFlag(true);
  }

  const onNameChange = (name) => {
    setName(name);
    employeeDetails.filter(val => val.name.value == name.value).map((data) => {
      setRole(data.roles.role)
      setPrimaryRole(data.roles.primaryRole)
    })
  };

  const onRoleChange = (role) => {
    setRole(role);
    setPrimaryRole('')
  }

  const onPrimaryRoleChange = (data) => {
    setPrimaryRole(data)
  }

  const onEditPrimary = () => {
    setFlag(false)
  }

  const onSubmitDetails = () => {
    const payload = {
      name,
      roles: {
        role: role,
        primaryRole: primaryRole
      }
    }

    console.log(payload);
  };

  const roleMenu = (
    <Menu>
      {role && role.filter(val => val.label.includes(primaryRole.label) == false).map((data) => {
        return (
          <Menu.Item>
            <p onClick={() => { onPrimaryRoleChange(data) }}>{data.label}</p>
          </Menu.Item>
        )
      })}
    </Menu>
  );

  const RoleAssignBody = () => (
    <div>
      <Row>
        <Col lg={12} sm={12} className="modal-content">
          <div className="head-dp">Name</div>
          <div>
            <Select
              value={name}
              name="name"
              options={nameOptions}
              onChange={onNameChange}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={12} className="modal-content">
          <div className="head-dp">Role</div>
          <div>
            <Select
              value={role}
              isMulti
              name="Roles"
              options={roleOption}
              onChange={onRoleChange}
              isDisabled={flag}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={12} className="modal-content">
          <div className="head-dp">Primary Role</div>
          <Dropdown overlay={roleMenu} placement="bottomCenter" arrow disabled={flag} >
            <Button>{primaryRole ? primaryRole.label : "Select"}</Button>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );

  const RoleAssignFooter = () => (
    <div>
      <Button className="role-button" onClick={onSubmitDetails}>Submit</Button>
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
      primary="Edit"
      alert={status}
      onSubmitPrimary={onEditPrimary}
      footer={<RoleAssignFooter />}
    />
  );
};

export default RoleAssignment;
