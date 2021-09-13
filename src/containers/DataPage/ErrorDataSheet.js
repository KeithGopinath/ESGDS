/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Button as AntButton, Image, Upload, message, Input } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import PropTypes from 'prop-types';
import validateReqFields from './validateReqFields';


const FieldWrapper = (props) => {
  // PROPS ARE {VISIBLE}, {LABEL}, {BODY}, {SIZE} !
  if (props.visible) {
    return (
      <Col lg={props.size[0]}>
        <Form.Group as={Row} >
          <Form.Label column sm={props.size[1]}>
            {props.label}
          </Form.Label>
          <Col sm={props.size[2]}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

FieldWrapper.propTypes = {
  visible: PropTypes.bool,
  size: PropTypes.array.isRequired,
  label: PropTypes.string,
  body: PropTypes.element,
};

const onChangeDynamiceFieldsValue = (event, dynamicDataList, eachField, setDynamicData) => {
  let latestValue = null;
  const { inputType } = eachField;

  switch (inputType) {
    case 'Text':
      latestValue = event.target.value;
      break;
    case 'TextArea':
      latestValue = event.target.value;
      break;
    case 'Number':
      latestValue = event.target.value;
      break;
    case 'Date':
      latestValue = event;
      break;
    case 'Select':
      latestValue = event;
      break;
    case 'Image':
      latestValue = event.target.value;
      break;
    default:
      break;
  }

  const filteredData = dynamicDataList.map((e) => {
    if (e.fieldName === eachField.fieldName) return { ...e, value: latestValue };
    return e;
  });

  setDynamicData(filteredData);
};

const getReqFields = ({
  eachData, dynamicFields, setDynamicFields, disableField, error,
}) => {
  const {
    inputType, name, value, inputValues,
  } = eachData;

  switch (inputType) {
    case 'Text':
      return (
        <Input
          placeholder={`Enter ${name}`}
          className={error && 'red-class'}
          onChange={(e) => onChangeDynamiceFieldsValue(e, dynamicFields, eachData, setDynamicFields)}
          value={value}
          size="large"
          disabled={disableField}
        />
      );
    case 'TextArea':
      return (

        <Input.TextArea
          rows={1}
          size="large"
          className={error && 'red-class'}
          placeholder={`Enter ${name}`}
          onChange={(e) => onChangeDynamiceFieldsValue(e, dynamicFields, eachData, setDynamicFields)}
          value={value}
          disabled={disableField}
        />
      );
    case 'Number':
      return (
        <Input
          placeholder={`Enter ${name}`}
          onChange={(e) => onChangeDynamiceFieldsValue(e, dynamicFields, eachData, setDynamicFields)}
          type="number"
          value={value}
          size="large"
          disabled={disableField}
        />
      );
    case 'Date':
      return (
        <DatePicker
          size="large"
          style={{ width: '100%' }}
          placeholder={`Select ${name}`}
          value={value && moment(value)}
          onChange={(e) => onChangeDynamiceFieldsValue(e, dynamicFields, eachData, setDynamicFields)}
          className=""
          disabled={disableField}
        />
      );
    case 'Select':
      return (
        <Select
          name={name}
          options={inputValues}
          className={error && 'red-class'}
          onChange={(e) => onChangeDynamiceFieldsValue(e, dynamicFields, eachData, setDynamicFields)}
          value={value.value && value.label ? value : null}
          placeholder={`Select ${name}`}
          isDisabled={disableField}
        />);
    case 'Image':
      return (
        <Image
          width="50%"
          src={value}
        />
      );
    case 'Static':
      return inputValues;
    default:
      break;
  }
  return null;
};


const ErrorDataSheetTwo = (props) => {
  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // CURRENT TAB
  const currentTab = sessionStorage.tab;

  // REQUIRED CONSOLE:
  // ('******DATA SHEET PROPS******', props)

  // BOOLEANS BASED ON CURRENT ROLE & SELECTED TAB
  const [isAnalyst_DCR, isCompanyRep_DR, isClientRep_DR] = [
    currentRole === 'Analyst' && currentTab === 'Data Correction',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  const defaultData = props.reqData;
  const formDescription = defaultData.description;
  const formDataType = defaultData.dataType && defaultData.dataType.toUpperCase();

  const [formTextSnippet, setFormTextSnippet] = useState(defaultData.textSnippet || '');
  const [formPageNo, setFormPageNo] = useState(defaultData.pageNo || '');
  const [formScreenShotPath, setFormScreenShotPath] = useState(defaultData.screenShot || '');
  const [formResponse, setFormResponse] = useState(defaultData.response || '');
  const [formSource, setFormSource] = useState(defaultData.source || '');
  const [formURL, setFormURL] = useState((defaultData.source && defaultData.source.url) || '');
  const [formPublicDate, setFormPublicDate] = useState((defaultData.source && defaultData.source.publicationDate) || '');
  const [formScreenShotFile, setFormScreenShotFile] = useState(null);
  const [formComment, setFormComment] = useState((defaultData.error && defaultData.error.hasError && defaultData.error.comment) || '');

  // DYNAMIC FIELDS ADDITIONAL TO MASTER MANDATORY FIELDS
  const [dynamicFields, setDynamicFields] = useState(defaultData.additionalDetails || []);
  const [hasErrors, setHasErrors] = useState({
    formTextSnippet: false,
    formPageNo: false,
    formScreenShotPath: false,
    formResponse: false,
    formSource: false,
    formURL: false,
    formPublicDate: false,
    formScreenShotFile: false,
    formErrorType: false,
    formComment: false,
    formIsError: false,
    errorComment: false,
    formControversyComment: false,
    formNextReviewDate: false,
    dynamicFields: [false],
    formThreshold: false,
  });

  const sourceList = props.reqSourceData;

  const { textResponse } = props;

  const { isError, isErrorCommentType } = props;

  const thresholdValue = { min: 0, max: 100 };

  useEffect(() => {
    setFormTextSnippet(defaultData.textSnippet || '');
    setFormPageNo(defaultData.pageNo || '');
    setFormScreenShotPath(defaultData.screenShot || '');
    setFormResponse(defaultData.response || '');
    setFormSource(defaultData.source || '');
    setFormURL((defaultData.source && defaultData.source.url) || '');
    setFormPublicDate((defaultData.source && defaultData.source.publicationDate) || '');
    setFormScreenShotFile(null);
    setFormComment((defaultData.error && defaultData.error.hasError && defaultData.error.comment) || '');

    setDynamicFields(defaultData.additionalDetails || []);
    setHasErrors({
      formTextSnippet: false,
      formPageNo: false,
      formScreenShotPath: false,
      formResponse: false,
      formSource: false,
      formURL: false,
      formPublicDate: false,
      formScreenShotFile: false,
      formErrorType: false,
      formComment: false,
      formIsError: false,
      errorComment: false,
      formControversyComment: false,
      formNextReviewDate: false,
      dynamicFields: [false],
      formThreshold: false,
    });
  }, [defaultData, isError]);

  const onChangeFormTextSnippet = (event) => {
    setFormTextSnippet(event.currentTarget.value);
  };

  const onChangeFormPageNo = (event) => {
    setFormPageNo(event.currentTarget.value);
  };

  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }
  });

  const onChangeFormScreenShotPath = (event) => {
    setFormScreenShotPath(event.fileList[0] && URL.createObjectURL(event.fileList[0].originFileObj));
    if (event.fileList[0]) {
      getBase64(event.fileList[0] && event.fileList[0].originFileObj).then((e) => setFormScreenShotFile({ ...event, base64: e }));
    } else {
      setFormScreenShotFile({ ...event, base64: null });
    }
  };

  const onChangeFormResponse = (event) => {
    switch (formDataType) {
      case 'SELECT':
        setFormResponse(event.value);
        break;
      case 'DATE':
        setFormResponse(event);
        break;
      case 'NUMBER':
        setFormResponse(event.currentTarget.value);
        break;
      case 'TEXT':
        setFormResponse(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const onChangeFormSource = (event) => {
    setFormSource(event.value);
    setFormURL(event.value.url);
    setFormPublicDate(event.value.publicationDate);
  };

  const onChangeFormURL = (event) => {
    setFormURL(event.currentTarget.value);
  };

  const onChangeFormPublicDate = (event) => {
    setFormPublicDate(event);
  };

  const onChangeFormComment = (event) => {
    setFormComment(event.currentTarget.value);
  };

  const screenShotBeforeUpload = (file) => {
    if (!(file.type).includes('image')) {
      message.error(`${file.name} is not a image file`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const getIsDisableOrNot = () => {
    if (isAnalyst_DCR) {
      return true;
    }
    if (isCompanyRep_DR) {
      if (defaultData.error && defaultData.error.errorStatus === 'Completed') {
        return true;
      }
      return false;
    }
    if (isClientRep_DR) {
      if (defaultData.error && defaultData.error.errorStatus === 'Completed') {
        return true;
      }
      return false;
    }
    return false;
  };

  const doValidate = () => {
    const errors = {
      formTextSnippet: isError && !(formTextSnippet.length > 0),
      formPageNo: isError && !(formPageNo),
      formScreenShotPath: isError && false, // !formScreenShotPath, Not Mandatory
      formResponse: isError && !formResponse,
      formSource: isError && !(formSource.url && formSource.sourceName && formSource.publicationDate),
      formURL: isError && !formURL,
      formPublicDate: isError && !formPublicDate,
      formScreenShotFile: isError && false, // !formScreenShotFile, Not Mandatory
      formComment: isError && !(formComment.length > 0),
      dynamicFields: isError ? dynamicFields.map((e) => {
        if (e.inputType === 'Select') {
          return !(e.value && e.value.value && e.value.label);
        }
        if (e.inputType === 'Text') {
          return !(e.value.length > 0);
        }
        if (e.inputType === 'TextArea') {
          return !(e.value.length > 0);
        }
        return false;
      }) : [false],
      formThreshold: isError && thresholdValue && formDataType === 'NUMBER' && !(formResponse <= thresholdValue.max && formResponse >= thresholdValue.min),
    };
    setHasErrors(errors);

    const roleScreenType = {
      isAnalyst_DCR, isCompanyRep_DR, isClientRep_DR,
    };
    return validateReqFields(errors, roleScreenType);
  };

  const onClickSave = () => {
    const dummyDataReps = {
      fiscalYear: defaultData.fiscalYear, // NEEDS AS UNIQUE KEY TO SAVE
      error: {
        hasError: isError,
        isThere: isError,
        refData: {
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          screenShotBase64: (formScreenShotFile && formScreenShotFile.base64) || formScreenShotPath,
          response: formResponse,
          source: formSource,
          url: formURL,
          publicationDate: formPublicDate,
          additionalDetails: dynamicFields,
        },
        raisedBy: sessionStorage.role,
        comment: formComment,
        errorStatus: 'Completed',
      },
    };
    if (doValidate()) {
      props.onClickSave(dummyDataReps);
    } else {
      message.error('Please Fill Required fields !');
      if (hasErrors.formThreshold) {
        message.error(`Response Should Be Range ${thresholdValue.min} - ${thresholdValue.max}`, 8);
      }
    }
  };

  const onClickEdit = () => {
    const dummyDataReps = {
      fiscalYear: defaultData.fiscalYear,
      error: {
        hasError: isError,
        isThere: isError,
        refData: {
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          screenShotBase64: (formScreenShotFile && formScreenShotFile.base64) || formScreenShotPath,
          response: formResponse,
          source: formSource,
          url: formURL,
        },
        comment: formComment,
        errorStatus: 'Editable',
      },
    };

    props.onClickSave(dummyDataReps);
  };

  const disableField = getIsDisableOrNot();

  return (
    <React.Fragment>

      {/* HORIZONTAL Line */}
      {!isErrorCommentType && isError &&
      <Col lg={12} className="datapage-horizontalLine"></Col>}

      {/* DESCRIPTION Field */}
      <FieldWrapper
        label={<div>Description</div>}
        size={[6, 5, 7]}
        visible={isErrorCommentType || isError}
        body={formDescription}
      />

      {/* RESPONSE Field */}
      { formDataType === 'NUMBER' &&
        <FieldWrapper
          label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
          size={[6, 5, 7]}
          visible={isErrorCommentType || isError}
          body={
            <Form.Control
              type="number"
              className={(hasErrors.formResponse || hasErrors.formThreshold) && 'red-class'}
              name="response"
              placeholder="Enter Response"
              onChange={onChangeFormResponse}
              value={formResponse}
              disabled={disableField}
            />
          }
        />}

      {/* RESPONSE Field */}
      { formDataType === 'TEXT' &&
      <FieldWrapper
        label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
        size={[6, 5, 7]}
        visible={isErrorCommentType || isError}
        body={
          <Form.Control
            type="text"
            name="response"
            className={hasErrors.formResponse && 'red-class'}
            placeholder="Enter Response"
            onChange={onChangeFormResponse}
            value={formResponse}
            disabled={disableField}
          />
        }
      />}

      {/* RESPONSE Field */}
      { formDataType === 'DATE' &&
        <FieldWrapper
          label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
          size={[6, 5, 7]}
          visible={isErrorCommentType || isError}
          body={
            <DatePicker
              className={hasErrors.formResponse ? 'red-class datapage-datepicker' : 'datapage-datepicker'}
              name="response"
              size="large"
              onChange={onChangeFormResponse}
              value={formResponse && moment(formResponse)}
              disabled={disableField}
            />
          }
        />}

      {/* RESPONSE Field */}
      { formDataType === 'SELECT' &&
        <FieldWrapper
          label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
          size={[6, 5, 7]}
          visible={isErrorCommentType || isError}
          body={
            <Select
              name="response"
              className={hasErrors.formResponse && 'red-class'}
              options={textResponse}
              onChange={onChangeFormResponse}
              value={formResponse && { label: formResponse, value: formResponse }}
              placeholder="Select Response"
              isDisabled={disableField}
            />
          }
        />}

      {/* SOURCE Field */}
      <FieldWrapper
        label={<div>Source<span className="addNewMember-red-asterik"> * </span></div>}
        size={[6, 5, 7]}
        visible={isErrorCommentType || isError}
        body={
          <Select
            name="source"
            className={hasErrors.formSource && 'red-class'}
            options={sourceList && sourceList.map((e) => ({ label: e.sourceName, value: e }))}
            onChange={onChangeFormSource}
            value={formSource && { label: formSource.sourceName, value: formSource }}
            placeholder="Select Source"
            isDisabled={disableField}
          />
        }
      />

      {/* ADD SOURCE Button */}
      {!isErrorCommentType && isError && !disableField &&
      <Col lg={6}>
        <Button onClick={props.openSourcePanel}>Add Source</Button>
      </Col>}

      {/* TEXT SNIPPET Field */}
      <FieldWrapper
        label={<div>Text Snippet<span className="addNewMember-red-asterik"> * </span></div>}
        size={[6, 5, 7]}
        visible={isErrorCommentType || isError}
        body={
          <Form.Control
            as="textarea"
            className={hasErrors.formTextSnippet && 'red-class'}
            name="textSnippet"
            placeholder="Enter Text Snippet"
            onChange={onChangeFormTextSnippet}
            value={formTextSnippet}
            disabled={disableField}
          />
        }
      />

      {/* PAGE NO Field */}
      <FieldWrapper
        label={<div>Page No<span className="addNewMember-red-asterik"> * </span></div>}
        size={[6, 5, 7]}
        visible={isErrorCommentType || isError}
        body={
          <Form.Control
            type="number"
            className={hasErrors.formPageNo && 'red-class'}
            placeholder="Enter Page No"
            onChange={onChangeFormPageNo}
            value={formPageNo}
            disabled={disableField}
          />
        }
      />

      {/* URL Field */}
      <FieldWrapper
        label={<div>URL<span className="addNewMember-red-asterik"> * </span></div>}
        size={[6, 5, 7]}
        visible={isErrorCommentType || isError}
        body={
          <Form.Control
            type="text"
            name="url"
            placeholder="Enter Url"
            onChange={onChangeFormURL}
            value={formURL}
            disabled
          />
        }
      />

      {/* PUBLICATION DATE Field */}
      <FieldWrapper
        label={<div>PublicationDate<span className="addNewMember-red-asterik"> * </span></div>}
        size={[6, 5, 7]}
        visible={isErrorCommentType || isError}
        body={
          <DatePicker
            className="datapage-datepicker"
            name="publicationDate"
            size="large"
            onChange={onChangeFormPublicDate}
            value={formPublicDate && moment(formPublicDate)}
            disabled
          />
        }
      />

      {/* UPLOAD Field */}
      <Col lg={12}>
        <Row>
          <FieldWrapper
            label={<div>Upload Screenshot</div>} // <span className="addNewMember-red-asterik"> * </span>
            visible={isErrorCommentType || isError}
            size={[6, 5, 7]}
            body={
              <Upload
                className="datapage-ant-upload"
                maxCount={1}
                fileList={formScreenShotFile && formScreenShotFile.fileList}
                beforeUpload={screenShotBeforeUpload}
                onChange={onChangeFormScreenShotPath}
              >
                <AntButton
                  className={hasErrors.formScreenShotPath ? 'red-class datapage-ant-button' : 'datapage-ant-button'}
                  disabled={disableField}
                  icon={<UploadOutlined />}
                >Click to Upload
                </AntButton>
              </Upload>
            }
          />

          {/* ScreenShot Field */}
          <FieldWrapper
            label={<div>Screenshot</div>}// <span className="addNewMember-red-asterik"> * </span>
            visible={(isErrorCommentType || isError) && formScreenShotPath}
            size={[6, 5, 7]}
            body={
              <Image
                width="50%"
                src={formScreenShotPath}
              />
            }
          />
        </Row>
      </Col>

      {/* DYNAMIC FIELDS COMES HERE */}
      {dynamicFields.map((eachData, index) => (
        <FieldWrapper
          visible={isErrorCommentType || isError}
          label={<div>{eachData.name}<span className="addNewMember-red-asterik"> * </span></div>}
          size={[6, 5, 7]}
          body={getReqFields({
            eachData, dynamicFields, setDynamicFields, disableField, error: hasErrors.dynamicFields[index],
          })}
        />
      ))}


      {/* Comments Field */}
      <FieldWrapper
        label={<div>Comment<span className="addNewMember-red-asterik"> * </span></div>}
        size={[6, 5, 7]}
        visible={!isErrorCommentType && isError}
        body={
          <Form.Control
            as="textarea"
            disabled={disableField}
            aria-label="With textarea"
            className={hasErrors.formComment && 'red-class'}
            placeholder="Enter Comment"
            onChange={onChangeFormComment}
            value={formComment}
          />
        }
      />

      <Col lg={12} className="datapage-button-wrap">
        {!isErrorCommentType && (defaultData.error ? defaultData.error.errorStatus !== 'Completed' : true) &&
        <Button className="datapage-button" variant="success" onClick={onClickSave}>Save</Button>}
        {!isErrorCommentType && (defaultData.error && defaultData.error.errorStatus === 'Completed') &&
        <Button className="datapage-button" variant="primary" onClick={onClickEdit}>Edit</Button>}
      </Col>

    </React.Fragment>
  );
};

ErrorDataSheetTwo.propTypes = {
  reqData: PropTypes.object,
  reqSourceData: PropTypes.array,
  textResponse: PropTypes.array,
  isError: PropTypes.bool,
  isErrorCommentType: PropTypes.bool,
  openSourcePanel: PropTypes.func,
  onClickSave: PropTypes.func,
};

export default ErrorDataSheetTwo;
