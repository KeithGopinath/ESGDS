/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
import Overlay from '../../components/Overlay';
import { Menu, Dropdown, Button as AntButton } from 'antd';
import 'antd/dist/antd.css';

const RoleAssignment = ({ show, setShow }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState([]);
  const [primaryRole, setPrimaryRole] = useState({ value: '', label: '' });
  const [flag, setFlag] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [errorAlert, setErrorAlert] = useState('');

  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.roles.roles);
  const userData = useSelector((state) => state.roleAssignment.roleAssignment);
  const roleAssignmentEdit = useSelector((state) => state.roleAssignmentEdit.roleAssignmentEdit);
  const roleAssignmentEditError = useSelector((state) => state.roleAssignmentEdit.error);

  useEffect(() => {
    if (show) {
      dispatch({ type: 'GET_ROLE_ASSIGNMENT_REQUEST' });
      dispatch({ type: 'GET_ROLES_REQUEST' });
    }
  }, [show]);

  useEffect(() => {
    if (roleAssignmentEdit) {
      setAlertMsg(roleAssignmentEdit.message)
    }
    else if (roleAssignmentEditError) {
      setAlertMsg(roleAssignmentEditError.message)
    }
  }, [roleAssignmentEdit, roleAssignmentEditError]);

  const roleOptions = roleData && roleData.rows.filter(val => val.roleName == 'GroupAdmin' ||
    val.roleName == 'Analyst' || val.roleName == 'QA').map((data) => ({
      value: data.id,
      label: data.roleName
    }))

  const nameOptions = userData && userData.rows.map((data) => {
    return (
      data.userDetails
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
    setFlag(false);
    setErrorAlert('')
  }

  const onNameChange = (name) => {
    setName(name);
    userData && userData.rows.filter(val => val.userDetails.value == name.value).map((data) => {
      setRole(data.roleDetails.role)
      setPrimaryRole(data.roleDetails.primaryRole)
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
    setFlag(true)
  }

  const onSubmitDetails = () => {
    if (!name || role.length == 0 || !primaryRole.value) {
      setAlertMsg('Please enter all the details')
      setErrorAlert('error-alert')
    }
    else {
      const payload = {
        userDetails: name,
        roleDetails: {
          role: role,
          primaryRole: primaryRole
        }
      }
      dispatch({ type: 'ROLE_ASSIGNMENT_EDIT_REQUEST', payload });
      setErrorAlert('');
    }
  };

  const roleMenu = (
    <Menu>
      {role && role.filter(val => val.value !== primaryRole.value).map((data) => {
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
              className={!name && errorAlert}
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
              className={role.length == 0 && errorAlert}
              value={role}
              isMulti
              name="Roles"
              options={roleOptions}
              onChange={onRoleChange}
              isDisabled={!flag}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={12} className="modal-content">
          <div className="head-dp">Primary Role</div>
          <Dropdown overlay={roleMenu} placement="bottomCenter" arrow disabled={!flag} >
            <AntButton className={!primaryRole.value && errorAlert}>{primaryRole && primaryRole.label ? primaryRole.label : "Select"}</AntButton>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );

  const RoleAssignFooter = () => (
    <div>
      <Button variant="primary secondary-button" onClick={onSubmitDetails}>Submit</Button>
    </div>
  );

  // condition for checking alert className
  const alertClassName = errorAlert ? 'danger' : roleAssignmentEdit && roleAssignmentEdit.status == '200' ? 'success' : 'danger';

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
      alert={alertMsg}
      alertClass={alertClassName}
      onSubmitPrimary={onEditPrimary}
      footer={<RoleAssignFooter />}
    />
  );
};

export default RoleAssignment;
