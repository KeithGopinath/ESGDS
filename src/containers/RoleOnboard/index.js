/*eslint-disable*/
import React, { useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import Select from 'react-select';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../../components/Overlay';
import { history } from './../../routes';

const RoleOnboard = ({ showOnboardRoles, handleClose }) => {

  const [selectOption, setSelectOption] = useState('');
  const [onboardAlert, setOnboardAlert] = useState('');
  const [inputList, setInputList] = useState([{ email: '', role: '' }]);
  const [chooseRole, setChooseRole] = useState('');
  const [excelFileUpload, setExcelFileUpload] = useState('');
  const [excelValidate, setExcelValidate] = useState(false);

  const handleSelect = (e) => {
    setSelectOption(e.target.id);
  };

  const onSubmitOnboard = () => {
    if (!selectOption) {
      // setOnboardAlert("Please select the option");
      message.error('Please select the option');
    } else {
      history.push({
        pathname: '/onboard',
        state: selectOption
      });
    }
  };

  // Email text filed
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // const onRoleSelect = (e,index) => {
  //   const { roleSelect, roleValue } = e;
  //   const list = [...inputList];
  //   list[index][roleSelect] = roleValue;

  //   console.log("data :", e);
  //   console.log("name :", list);
  //   console.log("value :", roleValue);
  // }

  const onClickAdd = () => {
    setInputList([...inputList, { email: '', role: '' }])
  };

  const onClickRemove = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const roleOptions = [
    { value: "employee", label: "Employee" },
    { value: "client", label: "Client Representative" },
    { value: "company", label: "Company Representative" }
  ];

  // excel file upload:
  const onUploadExcel = (e) => {
    let file = e.target.files[0];
    console.log("file name : ", file.type);
    if (file.type.match('^.*\.(xls|xlsx|sheet)$')) {
      setExcelFileUpload(file.name);
      setExcelValidate(false);
    } else {
      setExcelValidate(true);
      message.error('Please choose excel file');
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
                  onChange={e => handleInputChange(e, index)}
                />
              </Col>
              <Col sm="3">
                <Select
                  options={roleOptions}
                  name="role"
                  value={data.role}
                  onChange={e => handleInputChange(e, index)}
                />
              </Col>
              <div className="role-email-buttons ml-1" column sm="2">
                {inputList.length !== 1 &&
                  <FontAwesomeIcon
                    className="minus-icon"
                    icon={faMinusSquare}
                    onClick={() => onClickRemove(index)}
                  />}
                {inputList.length - 1 === index &&
                  <FontAwesomeIcon
                    className="plus-icon"
                    icon={faPlusSquare}
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
              className={excelValidate && 'file-not-upload'}
              id="choose-file"
              label={excelFileUpload === '' ? "Upload excel file" : excelFileUpload}
              onChange={onUploadExcel}
              custom
            />
          </Col>
        </Row>
      </Form.Group>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Employee"
          name="formHorizontalRadios"
          id="employee"
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