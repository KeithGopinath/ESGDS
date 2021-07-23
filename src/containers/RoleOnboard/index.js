/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Overlay from '../../components/Overlay';

const RoleOnboard = ({ showOnboardRoles, handleClose }) => {

  const [onboardAlert, setOnboardAlert] = useState('');
  const [inputList, setInputList] = useState([]);
  const [listOfData, setListOfData] = useState([]);
  const [emailFileUpload, setEmailFileUpload] = useState('');
  const [emailFile, setEmailFile] = useState('');
  const [fileUploadValidation, setFileUploadValidation] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [fileValid, setFileValid] = useState(true);
  const [disableAdd, setDisableAdd] = useState(false);
  const [chooseOption, setChooseOption] = useState('');
  const [emailFiledsValidation, setEmailFiledsValidation] = useState(false);
  const [duplicateMails, setDuplicateMails] = useState([]);

  const dispatch = useDispatch();
  const roleData = useSelector((state) => state.roles.roles);
  // const rolesLoading = useSelector((state) => state.roles.isLoading);

  const validMailStatus = useSelector((state) => state.roleOnboarding.roleOnboarding);
  const loading = useSelector((state) => state.roleOnboarding.isLoading);
  const InvalidMailStatus = useSelector((state) => state.roleOnboarding.error);

  // mail status alert
  useEffect(() => {
    if (validMailStatus) {
      setOnboardAlert(validMailStatus.message);
      setDuplicateMails([]);
    } else if (InvalidMailStatus) {
      setChooseOption(chooseOption);
      setOnboardAlert(InvalidMailStatus.message);
      setDuplicateMails(InvalidMailStatus && InvalidMailStatus.duplicateEmailsList);
    }
  }, [validMailStatus, InvalidMailStatus]);

  // role onboarding status class
  const mailStatusClass = validMailStatus ? "success" : "danger";
  
  // get roles API
  useEffect(() => {
    if (showOnboardRoles) {
      dispatch({ type: 'GET_ROLES_REQUEST' });
      setOnboardAlert('');
      setEmailValid(true);
      setFileValid(true);
      setInputList([{ email: '', onboardingtype: '', link: '' }]);
      setEmailFileUpload('');
      setFileUploadValidation(false);
      setEmailFiledsValidation(false);
    }
  }, [showOnboardRoles]);

  // radio button select
  const handleSelect = (e) => {
    setOnboardAlert("");
    let data = e.target.id;
    setChooseOption(data);
    if (data === 'email') {
      setFileUploadValidation(false);
      setDuplicateMails([]);
      setOnboardAlert("");
      setEmailValid(false);
      setFileValid(true);
    } else if (data === 'excel') {
      setEmailFiledsValidation(false);
      setDuplicateMails([]);
      setOnboardAlert("");
      setEmailValid(true);
      setFileValid(false);
    }
  }

  // Submit role onbaord
  const onSubmitOnboard = () => {
    if (!chooseOption) {
      setOnboardAlert("Please choose anyone option");
    } else if (chooseOption === 'email') {
      setFileUploadValidation(false);
      const emptyFields = inputList.filter((field) => {
        return field.email === "" || field.onboardingtype === ""
      });
      if (emptyFields.length > 0) {
        setEmailFiledsValidation(true);
        setOnboardAlert("Please fill all the fields");
        return;
      }
      const roleOnboardingData = { emailList: listOfData.map(details => (
        { email:details.email,
          onboardingtype:details.onboardingtype.value,
          link:details.link,
        }))};
      dispatch({ type: 'ROLE_ONBOARDING_REQUEST', roleOnboardingData });
    } else if (chooseOption === 'excel') {
      setEmailFiledsValidation(false);
      if (!emailFileUpload) {
        setFileUploadValidation(true);
        setOnboardAlert("Should upload excel file only");
      } else {
        const roleOnboardingData = { emailFile };
        dispatch({ type: 'ROLE_ONBOARDING_REQUEST', roleOnboardingData });
      }
    }
  };

  // Email text filed
  const handleEmailChange = (e, index) => {
    setEmailFiledsValidation(false);
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setListOfData(list);
  };

  // Role Choose
  const onRoleChange = (e, index) => {
    setEmailFiledsValidation(false);
    const list = [...inputList];
    list[index].onboardingtype = e;
    list.map((item, index) => {
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
    setListOfData(list);
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
      setFileUploadValidation(false);
      setEmailFileUpload(file.name);
      let reader = new FileReader();
      reader.onloadend = function () {
        setEmailFile(reader.result);
      }
      reader.readAsDataURL(file);
      setFileUploadValidation(false);
    }
  }

  const RoleBody = () => (
    <div>
      <p>Please select anyone option to send the onboard link</p>
      {inputList.map((data, index) => {
        return (
          <Form.Group controlId="formPlaintextEmail" key={index}>
            <Row>
              {index === 0 ?
                <Col sm="3" className="mt-auto mb-auto">
                  <Form.Label className="d-flex mt-auto mb-auto">
                    <Form.Check
                      type="radio"
                      name="formHorizontalRadios"
                      id="email"
                      value={chooseOption}
                      onChange={handleSelect}
                    />Email:</Form.Label>
                </Col> : index <= 5 ?
                  <Col sm="3">
                    <Form.Label className=""></Form.Label></Col> : ''}
              <Col sm="4" className="">
                <Form.Control
                  className={(!data.email && emailFiledsValidation === true) ? 'border-danger' : 'email-list'}
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
                  className={((data.onboardingtype.length === 0) && emailFiledsValidation) ? 'dropdown-alert' : 'select-role'}
                  options={roleOptions}
                  name="role"
                  value={data.onboardingtype}
                  onChange={e => onRoleChange(e, index)}
                  isDisabled={emailValid && true}
                />
              </Col>
              <Col sm="2" className="mt-auto mb-auto">
                <div className="role-email-buttons d-flex ml-1"
                  disabled={emailValid && true}>
                  {inputList.length !== 1 &&
                    <FontAwesomeIcon
                      title="remove user from list"
                      className="minus-icon"
                      icon={faUserTimes}
                      onClick={() => onClickRemove(index)}
                    />}
                  {inputList.length - 1 === index &&
                    <FontAwesomeIcon
                      title="add new user to list"
                      className={disableAdd === true ? "d-none" : "plus-icon"}
                      icon={faUserPlus}
                      onClick={onClickAdd}
                    />}
                </div>
              </Col>
            </Row>
          </Form.Group>
        );
      })}
      <Form.Group>
        <Row>
          <Col sm="3" className="mt-auto mb-auto">
            <Form.Label className="d-flex mt-auto mb-auto">
              <Form.Check
                type="radio"
                name="formHorizontalRadios"
                id="excel"
                value={chooseOption}
                onChange={handleSelect}
              />Upload Excel:</Form.Label>
          </Col>
          <Col sm="4">
            <Form.File
              type="file"
              title="Upload excel files only"
              accept="*/.xlxs,*/.xls"
              className={fileUploadValidation ? 'file-not-upload' : ''}
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
      alert={onboardAlert && !duplicateMails ? `${onboardAlert}` : (onboardAlert && duplicateMails ? `${onboardAlert} \n ${duplicateMails.map(e => ` ${e} \n`)}` : '')}
      alertClass={mailStatusClass}
      primary="Send"
      isLoading={loading}
      onSubmitPrimary={onSubmitOnboard}
    />
  );
};

export default RoleOnboard;