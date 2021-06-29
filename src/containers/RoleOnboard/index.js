/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../../components/Overlay';

const RoleOnboard = ({ showOnboardRoles, handleClose }) => {

  const [onboardAlert, setOnboardAlert] = useState('');
  const [inputList, setInputList] = useState([{ email: '', onboardingtype: '', link: '' }]);
  const [listOfData, setListOfData] = useState([]);
  const [emailFileUpload, setEmailFileUpload] = useState('');
  const [emailFile, setEmailFile] = useState('');
  const [fileUploadValidation, setFileUploadValidation] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [fileValid, setFileValid] = useState(true);
  const [disableAdd, setDisableAdd] = useState(false);
  const [chooseOption, setChooseOption] = useState('');

  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.roles.roles);

  const validMailStatus = useSelector((state) => state.RoleOnboarding.roleOnboarding);
  const InvalidMailStatus = useSelector((state) => state.RoleOnboarding.error);

// mail status alert
  useEffect(() => {
    if (validMailStatus) {
      setOnboardAlert(validMailStatus.message);
    } else if (InvalidMailStatus) {
      setOnboardAlert(InvalidMailStatus.message);
    }
  }, [validMailStatus, InvalidMailStatus]);

  // role onboarding status class
  const mailStatusClass = validMailStatus || InvalidMailStatus ? "success" : "danger" ;

  useEffect(() => {
    if (showOnboardRoles) {
      dispatch({ type: 'GET_ROLES_REQUEST' });
      setOnboardAlert('');
      setEmailValid(true);
      setFileValid(true);
      setInputList([{ email: '', onboardingtype: '', link: '' }]);
    }
  }, [showOnboardRoles]);

  const handleSelect = (e) => {
    let data = e.target.id;
    setChooseOption(data);
    if (data === 'email') {
      setOnboardAlert("");
      setEmailValid(false);
      setFileValid(true);
    } else if (data === 'excel') {
      setOnboardAlert("");
      setEmailValid(true);
      setFileValid(false);
    }
  }

  const onSubmitOnboard = () => {
    if (!chooseOption) {
      setOnboardAlert("Should choose anyone option");
    } else if (chooseOption === 'email') {
      const roleOnboardingData = { emailList: listOfData };
      dispatch({ type: 'ROLE_ONBOARDING_REQUEST', roleOnboardingData });
    } else if (chooseOption === 'excel') {
      if (!emailFileUpload) {
        setFileUploadValidation(true);
      } else {
        const roleOnboardingData = { emailFile };
        dispatch({ type: 'ROLE_ONBOARDING_REQUEST', roleOnboardingData });
      }
    }
  };

  // Email text filed
  const handleEmailChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setListOfData(list);
  };

  const onRoleChange = (e, index, field) => {
    const { value } = e;
    const list = [...inputList];
    list[index][field] = value;
    list.map((item) => {
      if (item.onboardingtype === "60a2440d356d366605b04524") {
        return item.link = '/onboard?role=employee';
      } else if (item.onboardingtype === "60a243f0356d366605b04522") {
        return item.link = '/onboard?role=client';
      } else if (item.onboardingtype === "60a243e1356d366605b04521") {
        return item.link = '/onboard?role=company';
      }
    });
    setListOfData(list);
  }

  // add the email & role fileds
  const onClickAdd = () => {
    setInputList([...inputList, { email: '', onboardingtype: '', link: '' }]);
    if (inputList.length === 4) {
      setDisableAdd(true);
    }
  };

  // remove the mail and role fields
  const onClickRemove = (index) => {
    if (inputList.length <= 5) {
      setDisableAdd(false);
    }
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // role_options api integration
  const roleOptions = roleData && roleData.rows.filter(data => data.roleName === 'Employee' || data.roleName === 'Client Representative' || data.roleName === 'Company Representative').map(details => ({
    value: details.id,
    label: details.roleName
  }));

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
      setOnboardAlert("Should upload excel file only");
    }
  }

  const RoleBody = () => (
    <div>
      <p>Please select anyone option to send the onboard link</p>
      {inputList.map((data, index) => {
        return (
          <Form.Group controlId="formPlaintextEmail" key={index}>
            <Row>
              {index === 0 ? <Form.Label column sm="3" className="d-flex">
                <Form.Check
                  type="radio"
                  name="formHorizontalRadios"
                  id="email"
                  onChange={handleSelect}
                />Email:</Form.Label> : index <= 5 ? <Form.Label column sm="3" className=""></Form.Label> : ''}
              <Col sm="4" className="">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={e => handleEmailChange(e, index)}
                  disabled={emailValid && true}
                />
              </Col>
              <Col sm="3">
                <Select
                  options={roleOptions}
                  name="role"
                  onChange={e => onRoleChange(e, index, "onboardingtype")}
                  isDisabled={emailValid && true}
                />
              </Col>
              <div className="role-email-buttons ml-1"
                column sm="2"
                disabled={emailValid && true}>
                {inputList.length !== 1 &&
                  <FontAwesomeIcon
                    className="minus-icon"
                    icon={faMinusCircle}
                    onClick={() => onClickRemove(index)}
                  />}
                {inputList.length - 1 === index &&
                  <FontAwesomeIcon
                    className={disableAdd === true ? "d-none" : "plus-icon"}
                    icon={faPlusCircle}
                    onClick={onClickAdd}
                  />}
              </div>
            </Row>
          </Form.Group>
        );
      })}
      <Form.Group>
        <Row>
          <Form.Label column sm="3" className="d-flex">
            <Form.Check
              type="radio"
              name="formHorizontalRadios"
              id="excel"
              onChange={handleSelect}
            />Upload Excel:</Form.Label>
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
              disabled={fileValid && true}
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
      alertClass={mailStatusClass}
      primary="Send"
      onSubmitPrimary={onSubmitOnboard}
    />
  );
};

export default RoleOnboard;