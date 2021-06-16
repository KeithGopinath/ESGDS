/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import Overlay from '../../components/Overlay';
import { Menu, Dropdown, Button } from 'antd';
import 'antd/dist/antd.css';


const RoleAssignment = ({ show, setShow }) => {
  const [name, setName] = useState('');
  const [taxonomy, setTaxonomy] = useState('');
  const [group, setGroup] = useState('');
  const [role, setRole] = useState();
  const [primaryRole, setPrimaryRole] = useState();
  const [pillar, setPillar] = useState();
  const [primaryPillar, setPrimaryPillar] = useState();
  const [flag, setFlag] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');

  const employeeDetails = [
    {
      'name': 'Jerin vs',
      'id': '1',
      'group': { 'value': 'Group 1', 'label': 'Group 1' },
      'roles': {
        'role': [
          { 'value': 'Group Admin', 'label': 'Group Admin' },
        ],
        'primaryRole': { 'value': 'Group Admin', 'label': 'Group Admin' }
      },
      'pillars': {
        'pillar': [
          { 'value': 'Environment', 'label': 'Environment' },
        ],
        'primaryPillar': { 'value': 'Environment', 'label': 'Environment' },

      },
    },
    {
      'name': 'Jerin vs',
      'id': '2',
      'group': { 'value': 'Group 1', 'label': 'Group 1' },
      'roles': {
        'role': [
          { 'value': 'QA', 'label': 'QA' },
        ],
        'primaryRole': { 'value': 'QA', 'label': 'QA' },
      },
      'pillars': {
        'pillar': [
          { 'value': 'Environment', 'label': 'Environment' },
        ],
        'primaryPillar': { 'value': 'Environment', 'label': 'Environment' },

      },
    },
    {
      'name': 'Rajesh',
      'id': '3',
      'group': { 'value': 'Group 2', 'label': 'Group 2' },
      'roles': {
        'role': [
          { 'value': 'Group Admin', 'label': 'Group Admin' },
          { 'value': 'QA', 'label': 'QA' },
        ],
        'primaryRole': { 'value': 'QA', 'label': 'QA' }
      },
      'pillars': {
        'pillar': [
          { 'value': 'Environment', 'label': 'Environment' },
          { 'value': 'Social', 'label': 'Social' },
        ],
        'primaryPillar': { 'value': 'Social', 'label': 'Social' }

      },
    },
    {
      'name': 'Gopi',
      'id': '4',
      'group': { 'value': 'Group 3', 'label': 'Group 3' },
      'roles': {
        'role': [
          { 'value': 'Group Admin', 'label': 'Group Admin' },
          { 'value': 'QA', 'label': 'QA' },
          { 'value': 'Super Admin', 'label': 'Super Admin' },
        ],
        'primaryRole': { 'value': 'Super Admin', 'label': 'Super Admin' }
      },
      'pillars': {
        'pillar': [
          { 'value': 'Environment', 'label': 'Environment' },
          { 'value': 'Social', 'label': 'Social' },
          { 'value': 'Governance', 'label': 'Governance' }
        ],
        'primaryPillar': { 'value': 'Governance', 'label': 'Governance' }
      },
    },
  ]

  const roleOption = [
    { value: 'Group Admin', label: 'Group Admin' },
    { value: 'QA', label: 'QA' },
    { value: 'Analyst', label: 'Analyst' },
    { value: 'Super Admin', label: 'Super Admin' }];

  const groupOption = [
    { value: 'Group 1', label: 'Group 1' },
    { value: 'Group 2', label: 'Group 2' },
    { value: 'Group 3', label: 'Group 3' }];

  const pillerOption = [
    { value: 'Environment', label: 'Environment' },
    { value: 'Social', label: 'Social' },
    { value: 'Governance', label: 'Governance' }];

  const nameOptions = employeeDetails.map((data) => ({
    value: data.id,
    label: data.name
  }))

  const handleClose = () => {
    setShow(false);
    clearState();
  }

  const clearState = () => {
    setName('');
    setGroup('')
    setRole('')
    setPrimaryRole('')
    setPillar('')
    setPrimaryPillar('')
    setAlertMsg('');
    setFlag(true);
  }

  const onNameChange = (name) => {
    setName(name);
    employeeDetails.filter(val => val.id == name.value).map((data) => {
      setGroup(data.group)
      setRole(data.roles.role)
      setPrimaryRole(data.roles.primaryRole)
      setPillar(data.pillars.pillar)
      setPrimaryPillar(data.pillars.primaryPillar)
    })
  };

  const onGroupChange = (group) => {
    setGroup(group);
  };

  const onRoleChange = (role) => {
    setRole(role);
    setPrimaryRole('')
  }

  const onPrimaryRoleChange = (data) => {
    setPrimaryRole(data)
  }

  const onPillarChange = (role) => {
    setPillar(role);
    setPrimaryPillar('')
  }

  const onPrimaryPillarChange = (data) => {
    setPrimaryPillar(data)
  }

  const onEditPrimary = () => {
    setFlag(false)
  }

  const onSubmitDetails = () => {
    const payload = {
      name: name.label,
      id: name.value,
      group: group,
      roles: {
        role: role,
        primaryRole: primaryRole
      },
      pillars: {
        pillar: pillar,
        primaryPillar: primaryPillar
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

  const pillarMenu = (
    <Menu>
      {pillar && pillar.filter(val => val.label.includes(primaryPillar.label) == false).map((data) => {
        return (
          <Menu.Item>
            <p onClick={() => { onPrimaryPillarChange(data) }}>{data.label}</p>
          </Menu.Item>
        )
      })}
    </Menu>
  );

  const RoleAssignBody = () => (
    <div>
      <Row>
        <Col lg={6} sm={6} className="modal-content">
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
        <Col lg={6} sm={6} className="modal-content">
          <div className="head-dp">Taxonomy</div>
          <div>
            <Select
              // value={name}
              name="name"
            // options={nameOptions}
            // onChange={onNameChange}
            />
          </div>
        </Col>
        <Col lg={6} sm={6} className="modal-content">
          <div className="head-dp">Group</div>
          <div>
            <Select
              value={group}
              name="group"
              options={groupOption}
              onChange={onGroupChange}
              isDisabled={flag}
            />
          </div>
        </Col>
        <Col lg={6} sm={6} className="modal-content">
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
        <Col lg={6} sm={6} className="modal-content">
          <div className="head-dp">Primary Role</div>
          <Dropdown overlay={roleMenu} placement="bottomCenter" arrow disabled={flag} >
            <Button>{primaryRole ? primaryRole.label : "Select"}</Button>
          </Dropdown>
        </Col>
        <Col lg={6} sm={6} className="modal-content">
          <div className="head-dp">Pillar</div>
          <div>
            <Select
              value={pillar}
              isMulti
              name="Pillar"
              options={pillerOption}
              onChange={onPillarChange}
              isDisabled={flag}
            />
          </div>
        </Col>
        <Col lg={6} sm={6} className="modal-content">
          <div className="head-dp">Primary Pillar</div>
          <Dropdown overlay={pillarMenu} placement="bottomCenter" arrow disabled={flag} >
            <Button>{primaryPillar ? primaryPillar.label : "Select"}</Button>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );

  console.log(role);

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
