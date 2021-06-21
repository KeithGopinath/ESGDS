/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { message, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../../components/Overlay';
import { history } from './../../routes';

const RoleOnboard = ({ showOnboardRoles, handleClose }) => {

  const [onboardAlert, setOnboardAlert] = useState('');
  const [inputList, setInputList] = useState([{ email: '', role: '', url: '' }]);
  const [emailFileUpload, setEmailFileUpload] = useState('');
  const [emailFile, setEmailFile] = useState('');
  const [fileUploadValidation, setFileUploadValidation] = useState(false);

  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.roles.roles);

  const onSubmitOnboard = () => {
    const roleOnboardingData = {
      emailList: inputList,
      emailFile,
    }
    dispatch({ type: 'ROLE_ONBOARDING_REQUEST', roleOnboardingData });
  };

  // Email text filed
  const handleEmailChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const onRoleChange = (e, index, field) => {
    const { label, value, url } = e;
    const list = [...inputList];
    list[index][field] = value;
    list.map((item) => {
      if (item.role === "60a2440d356d366605b04524") {
        return item.url = '/onboard?role=employee';
      } else if (item.role === "60a243f0356d366605b04522") {
        return item.url = '/onboard?role=client';
      } else if (item.role === "60a243e1356d366605b04521") {
        return item.url = '/onboard?role=company';
      }
    });
    setInputList(list);
  }

  // add the email & role fileds
  const onClickAdd = () => {
    setInputList([...inputList, { email: '', role: '' }])
  };

  // remove the mail and role fields
  const onClickRemove = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // role_options api integration
  const roleOptions = roleData && roleData.rows.filter(data => data.roleName === 'Employee' || data.roleName === 'Client Representative' || data.roleName === 'Company Representative').map(details => ({
    value: details.id,
    label: details.roleName
  }));

  const AlertMessage = () => {
    <Alert message="Please choose excel file" type="error" />
  };

  // excel file upload:
  const onUploadExcel = (e) => {
    let file = e.target.files[0];
    if (file.type.match('^.*\.(xls|xlsx|sheet)$')) {
      setEmailFileUpload(file.name);
      let reader = new FileReader();
      reader.onloadend = function () {
        setEmailFile(reader.result);
      }
      reader.readAsDataURL(file);
      setFileUploadValidation(false);
    } else {
      setFileUploadValidation(true);
      setOnboardAlert({ AlertMessage });
    }
  }

  const RoleBody = () => (
    <div>
      <p>Please select any one role to send the onboard link</p>
      {inputList.map((data, index) => {
        return (
          <Form.Group controlId="formPlaintextEmail" key={index}>
            <Row>
              <Form.Label column sm="2">Email:</Form.Label>
              <Col sm="4">

                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={e => handleEmailChange(e, index)}
                />
              </Col>
              <Col sm="3">
                <Select
                  options={roleOptions}
                  name="role"
                  onChange={e => onRoleChange(e, index, "role")}
                />
              </Col>
              <div className="role-email-buttons ml-1" column sm="2">
                {inputList.length !== 1 &&
                  <FontAwesomeIcon
                    className="minus-icon"
                    icon={faMinusCircle}
                    onClick={() => onClickRemove(index)}
                  />}
                {inputList.length - 1 === index &&
                  <FontAwesomeIcon
                    className="plus-icon"
                    icon={faPlusCircle}
                    onClick={onClickAdd} />}
              </div>
            </Row>
          </Form.Group>
        );
      })}
      <Form.Group>
        <Row>
          <Form.Label column sm="2">Upload Excel:</Form.Label>
          <Col sm="4">
            <Form.File
              type="file"
              title="Upload excel files only"
              accept="*/.xlxs,*/.xls"
              className={fileUploadValidation && 'file-not-upload'}
              id="choose-file"
              label={emailFileUpload === '' ? "Upload excel file" : emailFileUpload}
              onChange={onUploadExcel}
              custom
            />
          </Col>
        </Row>
      </Form.Group>
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
      size="lg"
      title="Select role:"
      body={RoleBody()}
      alert={onboardAlert}
      alertClass='danger'
      primary="Send"
      onSubmitPrimary={onSubmitOnboard}
    />
  );
};

export default RoleOnboard;