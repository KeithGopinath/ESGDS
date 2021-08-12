/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Button as AntButton, Image, Upload, message, Radio, Modal, Drawer, Input } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import ErrorDataSheetTwo from './ErrorDataSheet2';
import ErrorPanel from './ErrorPanel';

import validateReqFields from './validateReqFields';

import AddSource from './AddSource';
// import dynamicThings from '../../constants/DynamicConstants';

let temporaryData;
// Field Wrapper ::
// A function which wraps the datasheet fields with bootstrap's row and col tags
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
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
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
  eachData, dynamicFields, setDynamicFields, disableField,
}) => {
  const {
    inputType, name, value, inputValues,
  } = eachData;

  switch (inputType) {
    case 'Text':
      return (
        <Input
          placeholder={`Enter ${name}`}
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

export const DataSheetComponent = (props) => {
  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // CURRENT TAB
  const currentTab = sessionStorage.tab;

  // REQUIRED CONSOLE:
  // console.log('******DATA SHEET PROPS******', props);

  // BOOLEANS BASED ON CURRENT ROLE & SELECTED TAB
  const [isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR] = [
    currentRole === 'Analyst' && currentTab === 'Data Collection',
    currentRole === 'Analyst' && currentTab === 'Data Correction',
    currentRole === 'Analyst' && currentTab === 'Controversy Collection',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  const {
    isHistoryType,
  } = props;


  // DEFAULT DATA
  const defaultData = props.reqData;

  // TEMPORANY DATAS
  const sourceList = defaultData.sourceList || [];

  const textResponse = defaultData.inputValues || [];

  const errorTypeList = props.reqErrorList;

  // DATASHEET FORM DATA +
  // *DPCODE*
  const formDpCode = defaultData.dpCode;
  // *DESCRIPTION*
  const formDescription = defaultData.description;
  // *DATATYPE*
  const formDataType = defaultData.dataType.toUpperCase();

  // *STATES* +
  // *TEXT SNIPPET*
  const [formTextSnippet, setFormTextSnippet] = useState(defaultData.textSnippet || '');
  // *PAGE NO*
  const [formPageNo, setFormPageNo] = useState(defaultData.pageNo || '');
  // *SCREEN SHOT PATH*
  const [formScreenShotPath, setFormScreenShotPath] = useState(defaultData.screenShot || '');
  // *RESPONSE*
  const [formResponse, setFormResponse] = useState(defaultData.response || '');
  // *SOURCE OBJ { SRCNAME, PUBLICATION DATE, URL }*
  const [formSource, setFormSource] = useState(defaultData.source || '');
  // *URL*
  const [formURL, setFormURL] = useState((defaultData.source && defaultData.source.url) || '');
  // *PUBLICATION DATE*
  const [formPublicDate, setFormPublicDate] = useState((defaultData.source && defaultData.source.publicationDate) || '');
  // *SCREEN SHOT FILE*
  const [formScreenShotFile, setFormScreenShotFile] = useState(null);
  // *ERROR TYPE*
  const [formErrorType, setFormErrorType] = useState((defaultData.error && defaultData.error.isThere && defaultData.error.type) || '');
  // *ERROR*
  const [formErrorRefData, setFormErrorRefData] = useState((defaultData.error && defaultData.error.isThere) ? {
    ...defaultData.error.refData, fiscalYear: defaultData.fiscalYear, comment: defaultData.error.comment, description: defaultData.description, dataType: defaultData.dataType, error: defaultData.error,
  } : {
    fiscalYear: defaultData.fiscalYear, description: defaultData.description, dataType: defaultData.dataType,
  });
  // *ERROR COMMENT*
  const [formComment, setFormComment] = useState((defaultData.error && defaultData.error.isThere && defaultData.error.comment) || '');
  // *QA || CR FOUNDS HAS ERROR *
  const [formIsError, setFormIsError] = useState((defaultData.error && defaultData.error.isThere) || false);

  // ANALYST ERROR COMMENT
  const [errorComment, setErrorComment] = useState('');

  // *ANALYST DCR ERROR ACCEPTION OR REJECTION BOOLEAN*
  const [isErrorAccepted, setIsErrorAccepted] = useState(null);
  // *ANALYST DCR ERROR PANEL BOOLEAN*
  const [isErrorPanelVisible, setIsErrorPanelVisible] = useState(false);

  // CONTROVERSY COLLECTION COMMENT
  const [formControversyComment, setFormControversyComment] = useState(defaultData.comment || '');

  // CONTROVERSY COLLECTION NEXT REVIEW DATE
  const [formNextReviewDate, setFormNextReviewDate] = useState(defaultData.nextReviewDate || '');

  // SOURCE PANEL OPEN/CLOSE BOOLEAN FLAG
  const [isSrcPanelOpened, setIsSrcPanelOpened] = useState(false);

  // DYNAMIC FIELDS ADDITIONAL TO MASTER MANDATORY FIELDS
  const [dynamicFields, setDynamicFields] = useState(defaultData.additionalDetails || []);

  // USEEFFECTS
  useEffect(() => {
    setFormTextSnippet(defaultData.textSnippet || '');
    setFormPageNo(defaultData.pageNo || '');
    setFormScreenShotPath(defaultData.screenShot || '');
    setFormResponse(defaultData.response || '');
    setFormSource(defaultData.source || '');
    setFormURL((defaultData.source && defaultData.source.url) || '');
    setFormPublicDate((defaultData.source && defaultData.source.publicationDate) || '');
    setFormScreenShotFile(null);
    setFormErrorType((defaultData.error && defaultData.error.isThere && defaultData.error.type) || '');
    setFormComment((defaultData.error && defaultData.error.isThere && defaultData.error.comment) || '');
    setFormIsError((defaultData.error && defaultData.error.isThere) || false);
    setFormErrorRefData((defaultData.error) ? {
      ...defaultData.error.refData, fiscalYear: defaultData.fiscalYear, comment: defaultData.error.comment, description: defaultData.description, dataType: defaultData.dataType, error: defaultData.error,
    } : {
      fiscalYear: defaultData.fiscalYear, description: defaultData.description, dataType: defaultData.dataType,
    });
    setIsErrorPanelVisible(false);
    setFormControversyComment(defaultData.comment || '');
    setFormNextReviewDate(defaultData.nextReviewDate || '');

    setIsSrcPanelOpened(false);
    setDynamicFields(defaultData.additionalDetails || []);
  }, [props.reqData]);

  useEffect(() => {
    setErrorComment('');
  }, [isErrorAccepted]);

  // Onchange Functions
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
    getBase64(event.fileList[0] && event.fileList[0].originFileObj).then((e) => setFormScreenShotFile({ ...event, base64: e }));
  };

  const onChangeFormResponse = (event) => {
    switch (formDataType) {
      case 'SELECT':
        setFormResponse(event.value);
        break;
      // case 'BOOLEAN':
      //   setFormResponse(event.value);
      //   break;
      // case 'GENDER':
      //   setFormResponse(event.value);
      //   break;
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
    if (isAnalyst_CC) {
      setFormSource({ ...formSource, sourceName: event.target.value });
    } else {
      setFormSource(event.value);
      setFormURL(event.value.url);
      setFormPublicDate(event.value.publicationDate);
    }
  };

  const onChangeFormURL = (event) => {
    if (isAnalyst_CC) {
      setFormSource({
        ...formSource,
        url: event.target.value,
      });
    }
    setFormURL(event.currentTarget.value);
  };

  const onChangeFormPublicDate = (event) => {
    if (isAnalyst_CC) {
      setFormSource({
        ...formSource,
        publicationDate: event,
      });
    }
    setFormPublicDate(event);
  };

  const onChangeFormErrorType = (event) => {
    setFormErrorType(event.value);
  };

  const onChangeFormComment = (event) => {
    setFormComment(event.currentTarget.value);
  };

  const onChangeFormControversyComment = (event) => {
    setFormControversyComment(event.target.value);
  };

  const onChangeFormNextReviewDate = (event) => {
    setFormNextReviewDate(event);
  };

  const onChangeFormIsError = (event) => {
    setFormIsError(event.target.value);
  };

  const screenShotBeforeUpload = (file) => {
    if (!(file.type).includes('image')) {
      message.error(`${file.name} is not a image file`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  // ONCLICK HANDLERS
  const dummySaveClickHandler = () => {
    let saveData;

    if (isHistoryType) {
      saveData = {
        ...defaultData,
        status: 'Completed',
        source: formSource,
        response: formResponse,
        textSnippet: formTextSnippet,
        pageNo: formPageNo,
        screenShot: formScreenShotPath,
        additionalDetails: dynamicFields,
      };
    } else {
      if (isAnalyst_DC) {
        saveData = {
          ...defaultData,
          status: 'Completed',
          source: formSource,
          response: formResponse,
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          additionalDetails: dynamicFields,
        };
      }
      if (isAnalyst_DCR) {
        saveData = {
          ...defaultData,
          source: formSource,
          response: formResponse,
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          additionalDetails: dynamicFields,
          isAccepted: isErrorAccepted,
          rejectComment: errorComment,
          status: 'Completed',
          error: { ...defaultData.error, status: 'Completed' },
        };
      }
      if (isQA_DV) {
        saveData = {
          ...defaultData,
          error: {
            isThere: formIsError,
            type: formErrorType,
            comment: formComment,
            errorStatus: 'Completed',
          },
        };
      }
      if (isAnalyst_CC) {
        saveData = {
          ...defaultData,
          status: 'Completed',
          source: formSource,
          response: formResponse,
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          screenShotBase64: formScreenShotFile && formScreenShotFile.base64,
          comment: formControversyComment,
          nextReviewDate: formNextReviewDate,
          additionalDetails: dynamicFields,
        };
      }
    }

    const roleScreenType = [isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR, isHistoryType];
    if (validateReqFields(saveData, roleScreenType)) {
      props.onClickSave(saveData);
    } else {
      message.error('Please Fill Required fields !');
    }
  };

  const dummyEditClickHandler = () => {
    let saveData;

    if (isHistoryType) {
      saveData = { ...defaultData, status: 'Editable' };
    } else {
      if (isAnalyst_DC) {
        saveData = { ...defaultData, status: 'Editable' };
      }
      if (isAnalyst_DCR) {
        saveData = { ...defaultData, status: 'Editable' };
      }
      if (isQA_DV) {
        saveData = {
          ...defaultData,
          error: {
            isThere: formIsError,
            type: formErrorType,
            comment: formComment,
            status: 'Editable',
          },
        };
      }
      if (isAnalyst_CC) {
        saveData = { ...defaultData, status: 'Editable' };
      }
    }
    props.onClickSave(saveData);
  };

  const onClickViewError = () => {
    setIsErrorPanelVisible(true);
  };

  const onCloseErrorPanel = () => {
    temporaryData = defaultData;
    setIsErrorPanelVisible(false);
  };

  const onAccept = () => {
    let saveData;
    if (isAnalyst_DCR) {
      saveData = { ...defaultData, status: 'Editable', error: { ...defaultData.error, status: 'Incomplete' } };
    }
    props.onClickSave(saveData);
    setIsErrorAccepted(true);
    message.success('Error Accepted Successfully, Please make required changes and, Click "Save" button to update changes !');
    onCloseErrorPanel();
  };

  const onReject = () => {
    setIsErrorAccepted(false);
  };

  const onRevert = () => {
    props.onClickSave(temporaryData);
    setIsErrorAccepted(null);
    message.info('Reverted Successfully, Please click "View Error" button to Accept or Reject the error, again!', 8);
  };

  const onRejectSubmit = () => {
    const dummyData = {
      dpCode: formDpCode,
      fiscalYear: defaultData.fiscalYear,
      status: 'Completed',
      textSnippet: formTextSnippet,
      pageNo: formPageNo,
      screenShot: formScreenShotPath,
      response: formResponse,
      source: formSource,
      rejectComment: errorComment,
      isAccepted: isErrorAccepted,
    };
    let saveData;
    if (isAnalyst_DCR) {
      saveData = { ...dummyData, error: { ...defaultData.error, status: 'Completed' } };
    }
    props.onClickSave(saveData);
    message.error('Error Rejected Successfully, And your response has been recorded!', 8);
    onCloseErrorPanel();
  };

  // FUNC THAT MAKE SRC PANEL TO OPEN ON CALL
  const onClickOpenAddSource = () => {
    setIsSrcPanelOpened(true);
  };

  // FUNC THAT MAKE SRC PANEL TO CLOSE ON CALL
  const onClickCloseAddSource = () => {
    setIsSrcPanelOpened(false);
  };

  const getIsDisableOrNot = () => {
    if (isHistoryType) {
      if (isAnalyst_DC) {
        if (defaultData.status === 'Completed') {
          return true;
        }
        return false;
      }
      if (isAnalyst_DCR) {
        if (defaultData.status === 'Completed') {
          return true;
        }
        return false;
      }
      if (isQA_DV) {
        if (defaultData.status === 'Completed') {
          return true;
        }
        return false;
      }
      if (isCompanyRep_DR) { return true; }
      if (isClientRep_DR) { return true; }
    }
    if (isAnalyst_DC) {
      if (defaultData.status === 'Completed') {
        return true;
      }
      return false;
    }
    if (isAnalyst_DCR) {
      if (defaultData.status === 'Completed') {
        return true;
      }

      return false;
    }
    if (isAnalyst_CC) {
      if (defaultData.status === 'Completed') {
        return true;
      }

      return false;
    }
    if (isQA_DV) { return true; }
    if (isCompanyRep_DR) { return true; }
    if (isClientRep_DR) { return true; }
    return false;
  };

  const disableField = getIsDisableOrNot();


  const saveClickHandler = () => {
    console.log('HISTORICAL SAVE');
    dummySaveClickHandler();
  };

  const unFreezeClickHandler = () => {
    console.log('UNFREEZE');
    dummyEditClickHandler();
  };

  return (
    <Row>

      {/* DPCode Field */}
      <FieldWrapper
        label="Dp Code*"
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            name="dpCode"
            type="text"
            value={formDpCode}
            disabled
          />
        }
      />

      {/* HISTORY YEAR Field */}
      <FieldWrapper
        label="Year"
        visible={!isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Form.Control
            name="year"
            type="text"
            value={defaultData.fiscalYear}
            disabled
          />
        }
      />

      {/* SOURCE NAME Field */}
      <FieldWrapper
        label="Source Name*"
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="response"
            placeholder="Response"
            value={formSource && formSource.sourceName}
            onChange={onChangeFormSource}
            disabled={disableField}
          />
        }
      />

      {/* SOURCE Field */}
      <FieldWrapper
        label="Source*"
        visible={!isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Select
            name="source"
            options={sourceList && sourceList.map((e) => ({ label: e.sourceName, value: e }))}
            onChange={onChangeFormSource}
            value={formSource && { label: formSource.sourceName, value: formSource }}
            placeholder="Choose Source File"
            isDisabled={disableField}
          />
        }
      />

      {/* ADD SOURCE Button */}
      {(isAnalyst_DC || isAnalyst_DCR || isQA_DV) && !isHistoryType && !disableField && !isAnalyst_CC &&
      <Col lg={6}>
        <Button onClick={onClickOpenAddSource}>Add Source</Button>
      </Col>}

      {/* HORIZONTAL Line */}
      <Col lg={12} className="datapage-horizontalLine"></Col>

      {/* DESCRIPTION Field */}
      <FieldWrapper
        label="Description*"
        visible
        size={[6, 5, 7]}
        body={formDescription}
      />

      {/* RESPONSE Field */}
      { formDataType === 'NUMBER' &&
      <FieldWrapper
        label="Response*"
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="number"
            name="response"
            placeholder="Response"
            onChange={onChangeFormResponse}
            value={formResponse}
            disabled={disableField}
          />
        }
      />}


      {/* RESPONSE Field */}
      { formDataType === 'TEXT' &&
      <FieldWrapper
        label="Response*"
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="response"
            placeholder="Response"
            onChange={onChangeFormResponse}
            value={formResponse}
            disabled={disableField}
          />
        }
      />}

      {/* RESPONSE Field */}
      { formDataType === 'DATE' &&
      <FieldWrapper
        label="Response*"
        visible
        size={[6, 5, 7]}
        body={
          <DatePicker
            className="datapage-datepicker"
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
        label="Response*"
        visible
        size={[6, 5, 7]}
        body={
          <Select
            name="response"
            options={textResponse}
            onChange={onChangeFormResponse}
            value={formResponse && { label: formResponse, value: formResponse }}
            placeholder="Choose Response"
            isDisabled={disableField}
          />
        }
      />}

      {/* { formDataType === 'BOOLEAN' &&
      <FieldWrapper
        label="Response*"
        visible
        size={[6, 5, 7]}
        body={
          <Select
            name="response"
            options={['Yes', 'No'].map((e) => ({ label: e, value: e }))}
            onChange={onChangeFormResponse}
            value={formResponse && { label: formResponse, value: formResponse }}
            placeholder="Choose Response"
            isDisabled={disableField}
          />
        }
      />}

      { formDataType === 'GENDER' &&
      <FieldWrapper
        label="Response*"
        visible
        size={[6, 5, 7]}
        body={
          <Select
            name="response"
            options={['M', 'F', 'NA'].map((e) => ({ label: e, value: e }))}
            onChange={onChangeFormResponse}
            value={formResponse && { label: formResponse, value: formResponse }}
            placeholder="Choose Response"
            isDisabled={disableField}
          />
        }
      />} */}

      {/* TEXT SNIPPET Field */}
      <FieldWrapper
        label="Text Snippet*"
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            name="textSnippet"
            placeholder="Snippet"
            onChange={onChangeFormTextSnippet}
            value={formTextSnippet}
            disabled={disableField}
          />
        }
      />

      {/* PAGE NO Field */}
      <FieldWrapper
        label="Page No*"
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="number"
            placeholder="Page No"
            onChange={onChangeFormPageNo}
            value={formPageNo}
            disabled={disableField}
          />
        }
      />

      {/* URL Field */}
      <FieldWrapper
        label="URL*"
        visible={isHistoryType || isQA_DV || isCompanyRep_DR || isClientRep_DR || isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="url"
            placeholder="Url"
            onChange={onChangeFormURL}
            value={formURL}
            disabled={disableField}
          />
        }
      />

      {/* PUBLICATION DATE Field */}
      <FieldWrapper
        label="PublicationDate*"
        visible={isHistoryType || isQA_DV || isCompanyRep_DR || isClientRep_DR || isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <DatePicker
            className="datapage-datepicker"
            name="publicationDate"
            size="large"
            onChange={onChangeFormPublicDate}
            value={formPublicDate && moment(formPublicDate)}
            disabled={disableField}
          />
        }
      />

      {/* UPLOAD Field */}
      <FieldWrapper
        label="Upload Screenshot*"
        visible
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
              className="datapage-ant-button"
              disabled={disableField}
              icon={<UploadOutlined />}
            >Click to Upload
            </AntButton>
          </Upload>
        }
      />

      {/* ScreenShot Field */}
      <FieldWrapper
        label="Screenshot*"
        visible
        size={[6, 5, 7]}
        body={
          <Image
            width="50%"
            src={formScreenShotPath}
          />
        }
      />

      {/* DYNAMIC FIELDS COMES HERE */}
      {dynamicFields.map((eachData) => (
        <FieldWrapper
          visible
          label={`${eachData.name}*`}
          size={[6, 5, 7]}
          body={getReqFields({
            eachData, dynamicFields, setDynamicFields, disableField,
          })}
        />
      ))}

      {/* IS ERORR Field */}
      {(isCompanyRep_DR || isClientRep_DR || isQA_DV) && !isHistoryType &&
      <Col lg={12}>
        <Row>
          <FieldWrapper
            label="Error*"
            visible
            size={[6, 5, 7]}
            body={
              <Radio.Group disabled={defaultData.error && defaultData.error.errorStatus === 'Completed'} onChange={onChangeFormIsError} value={formIsError}>
                <Radio value>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            }
          />
          {/* <FieldWrapper
          label={null}
          visible
          size={[6, 5, 7]}
          body={null}
        /> */}
        </Row>
      </Col>
      }

      {/* ERROR TYPE Field */}
      <FieldWrapper
        label="Error Type*"
        visible={isQA_DV && !isHistoryType && formIsError}
        size={[6, 5, 7]}
        body={
          <Select
            name="errorType"
            isDisabled={defaultData.error && defaultData.error.errorStatus === 'Completed'}
            options={errorTypeList && errorTypeList.map((e) => ({ label: e, value: e }))}
            onChange={onChangeFormErrorType}
            value={formErrorType && { label: formErrorType, value: formErrorType }}
            placeholder="Choose Error Type"
          />
        }
      />

      {/* Comments Field */}
      <FieldWrapper
        label="Comments*"
        visible={(isQA_DV && !isHistoryType && formIsError)}
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            disabled={defaultData.error && defaultData.error.errorStatus === 'Completed'}
            aria-label="With textarea"
            placeholder="Comments"
            onChange={onChangeFormComment}
            value={formComment}
          />
        }
      />

      {/* Controversy Comments Field */}
      <FieldWrapper
        label="Comments*"
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            disabled={disableField}
            aria-label="With textarea"
            placeholder="Comments"
            onChange={onChangeFormControversyComment}
            value={formControversyComment}
          />
        }
      />

      {/* Controversy Next Review Date Field */}
      <FieldWrapper
        label="Next review date*"
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <DatePicker
            className="datapage-datepicker"
            name="response"
            size="large"
            onChange={onChangeFormNextReviewDate}
            value={formNextReviewDate && moment(formNextReviewDate)}
            disabled={disableField}
          />
        }
      />

      {/* ERROR DATA SHEET COMPANY AND CLIENT REP's */}
      {(isCompanyRep_DR || isClientRep_DR) && !isHistoryType &&
      <ErrorDataSheetTwo
        isError={formIsError}
        reqData={formErrorRefData}
        reqSourceData={sourceList}
        textResponse={textResponse}
        locationData={props.locationData}
        openSourcePanel={onClickOpenAddSource}
        onClickSave={props.onClickSave}
      />}

      <Col lg={12} className="datapage-button-wrap">
        { (isAnalyst_DC || isAnalyst_CC || (isAnalyst_DCR && isErrorAccepted)) && !isHistoryType && defaultData.status !== 'Completed' &&
        <Button className="datapage-button" variant="success" onClick={dummySaveClickHandler}>Save</Button>}
        { (isAnalyst_DC || isAnalyst_CC || (isAnalyst_DCR && isErrorAccepted)) && !isHistoryType && defaultData.status === 'Completed' &&
        <Button className="datapage-button" variant="primary" onClick={dummyEditClickHandler}>Edit</Button>}
        { isAnalyst_DCR && !isHistoryType &&
        <Button className="datapage-button" variant="success" onClick={onClickViewError}>View Error</Button>}
        {/* FOR QA */}
        {(isQA_DV) && !isHistoryType && (defaultData.error ? defaultData.error.errorStatus !== 'Completed' : true) &&
        <Button className="datapage-button" variant="success" onClick={dummySaveClickHandler}>Save</Button>}
        {(isQA_DV) && !isHistoryType && (defaultData.error && defaultData.error.errorStatus === 'Completed') &&
        <Button className="datapage-button" variant="primary" onClick={dummyEditClickHandler}>Edit</Button>}
      </Col>

      {/* HORIZONTAL Line */}
      <Col lg={12} className="datapage-horizontalLine"></Col>

      <Col lg={12} className="datapage-button-wrap">

        {/* HISTORY UNFREEZE Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType && defaultData.status === 'Completed' &&
        <Button className="datapage-button" variant="primary" onClick={unFreezeClickHandler}>UnFreeze</Button>}

        {/* HISTORY SAVE Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType && defaultData.status !== 'Completed' &&
        <Button className="datapage-button" variant="success" onClick={saveClickHandler}>Save</Button>}


      </Col>

      {/* ADD SOURCE PANEL */}
      <Drawer
        title="Add Source"
        placement="right"
        closable={false}
        onClose={onClickCloseAddSource}
        visible={isSrcPanelOpened}
        key="right"
        width={300}
        headerStyle={{ backgroundColor: '#2199c8' }}
      >
        {isSrcPanelOpened && <AddSource fiscalYear={defaultData.fiscalYear} companyId={defaultData.companyId} closeAddSourcePanel={onClickCloseAddSource} />}
      </Drawer>

      <Modal
        title="Error Panel"
        width="75%"
        style={{ top: 8, maxWidth: 1000 }}
        className="error-panel"
        visible={isErrorPanelVisible}
        footer={
          <React.Fragment>
            {isErrorAccepted === false && <Button className="datapage-button" variant="success" onClick={onRejectSubmit}>Submit And Close</Button>}
            {(isErrorAccepted === null) && <Button className="datapage-button" variant="success" onClick={onAccept}>Accept</Button>}
            {(isErrorAccepted === null) && <Button className="datapage-button" variant="danger" onClick={onReject}>Reject</Button>}
            {(isErrorAccepted !== null) && (defaultData.error) && (defaultData.error.status) && <Button className="datapage-button" variant="info" onClick={onRevert}>Revert</Button>}
          </React.Fragment>
        }
        onCancel={onCloseErrorPanel}
      >
        <ErrorPanel reqErrorData={defaultData.error} isAccepted={isErrorAccepted} errorComment={errorComment} setErrorComment={setErrorComment} />
      </Modal>

    </Row>
  );
};

DataSheetComponent.propTypes = {
  isHistoryType: PropTypes.bool,
  // reqTask: PropTypes.object,
  // reqIndexes: PropTypes.object,
  reqData: PropTypes.object,
  reqErrorList: PropTypes.array,
  locationData: PropTypes.object,
  onClickSave: PropTypes.func,
  // reqSourceData: PropTypes.array,
  // dummyDataCheck: PropTypes.func,
};
