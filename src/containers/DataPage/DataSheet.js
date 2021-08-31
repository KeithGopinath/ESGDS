/* eslint-disable no-nested-ternary */
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
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
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

export const DataSheetComponent = (props) => {
  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // CURRENT TAB
  const currentTab = sessionStorage.tab;

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

  const thresholdValue = defaultData.thresholdValue || { min: 0, max: 100 };

  const lastHistoricalDataResponse = props.lastHistoricalData && props.lastHistoricalData[0] ? props.lastHistoricalData[0].response : null;


  // DATASHEET FORM DATA +
  // *DPCODE*
  const formDpCode = defaultData.dpCode;
  // *DESCRIPTION*
  const formDescription = defaultData.description;
  // *DATATYPE*
  const formDataType = defaultData.dataType ? defaultData.dataType.toUpperCase() : '';

  const reqErrorData = {
    ...defaultData.error,
    refData: (defaultData.error && defaultData.error.refData) ? {
      ...defaultData.error.refData, fiscalYear: defaultData.fiscalYear, description: defaultData.description, dataType: defaultData.dataType,
    } : {},
  };

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
  const [formErrorType, setFormErrorType] = useState((defaultData.error && (defaultData.error.hasError) && defaultData.error.type) || '');
  // *ERROR*
  const [formErrorRefData, setFormErrorRefData] = useState((defaultData.error && (defaultData.error.hasError)) ? {
    ...defaultData.error.refData, fiscalYear: defaultData.fiscalYear, comment: defaultData.error.comment, description: defaultData.description, dataType: defaultData.dataType, error: defaultData.error,
  } : {
    fiscalYear: defaultData.fiscalYear, description: defaultData.description, dataType: defaultData.dataType,
  });
  // *ERROR COMMENT*
  const [formComment, setFormComment] = useState((defaultData.error && (defaultData.error.hasError) && defaultData.error.comment) || '');
  // *QA || CR FOUNDS HAS ERROR *
  const [formIsError, setFormIsError] = useState((defaultData.error && (defaultData.error.hasError)) || false);

  // ANALYST ERROR COMMENT
  const [errorComment, setErrorComment] = useState('');

  // *ANALYST DCR ERROR ACCEPTION OR REJECTION BOOLEAN*
  const [isErrorAccepted, setIsErrorAccepted] = useState(defaultData.error && (defaultData.error.isAccepted === true || defaultData.error.isAccepted === false) ? !!defaultData.error.isAccepted : null);
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

  // USEEFFECTS
  useEffect(() => {
    // // console.log(props, '******PROPS******');
    setFormTextSnippet(defaultData.textSnippet || '');
    setFormPageNo(defaultData.pageNo || '');
    setFormScreenShotPath(defaultData.screenShot || '');
    setFormResponse(defaultData.response || '');
    setFormSource(defaultData.source || '');
    setFormURL((defaultData.source && defaultData.source.url) || '');
    setFormPublicDate((defaultData.source && defaultData.source.publicationDate) || '');
    setFormScreenShotFile(null);
    setFormErrorType((defaultData.error && (defaultData.error.hasError) && defaultData.error.type) || '');
    setFormComment((defaultData.error && (defaultData.error.hasError) && defaultData.error.comment) || '');
    setFormIsError((defaultData.error && (defaultData.error.hasError)) || false);
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

    setIsErrorAccepted(defaultData.error && (defaultData.error.isAccepted === true || defaultData.error.isAccepted === false) ? !!defaultData.error.isAccepted : null);
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
  }, [props.reqData]);

  // // console.log(defaultData.error);
  // // console.log(isErrorAccepted);

  // useEffect(() => {
  //   setErrorComment('');
  // }, [isErrorAccepted]);

  // // console.log(formErrorRefData);

  useEffect(() => {
    if (!formIsError) {
      setFormErrorType(null);
    }
    if (formIsError && isQA_DV) {
      let saveData = props.getDefaultCurrentDataForYear(defaultData.fiscalYear);
      if (isQA_DV) {
        saveData = {
          ...saveData,
          error: {
            ...saveData.error,
            hasError: formIsError,
            isThere: formIsError,
          },
        };
      }
      props.onClickSave(saveData);
    }
  }, [formIsError]);

  // ONCHANGE FUNCTIONS

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

  const doValidate = () => {
    const dpCodeInCompleteStatus = defaultData.status !== 'Completed';
    const errors = {
      formTextSnippet: dpCodeInCompleteStatus && !(formTextSnippet.length > 0),
      formPageNo: dpCodeInCompleteStatus && !(formPageNo),
      formScreenShotPath: dpCodeInCompleteStatus && !formScreenShotPath,
      formResponse: dpCodeInCompleteStatus && (formResponse ?
        lastHistoricalDataResponse ?
          ['NA', 'na', 'Na'].includes(lastHistoricalDataResponse) ? !(['NA', 'na', 'Na'].includes(formResponse) || formResponse) : ['NA', 'na', 'Na'].includes(formResponse)
          : !formResponse
        : !formResponse
      ),
      formSource: dpCodeInCompleteStatus && !(formSource.url && formSource.sourceName && formSource.publicationDate),
      formURL: dpCodeInCompleteStatus && !formURL,
      formPublicDate: dpCodeInCompleteStatus && !formPublicDate,
      formScreenShotFile: dpCodeInCompleteStatus && !formScreenShotFile,
      formErrorType: formIsError === true && !formErrorType,
      formComment: formIsError === true && !(formComment.length > 0),
      formIsError: !(formIsError === true || formIsError === false),
      errorComment: !isErrorAccepted && !(errorComment.length > 0),
      formControversyComment: !(formControversyComment.length > 0),
      formNextReviewDate: dpCodeInCompleteStatus && !formNextReviewDate,
      dynamicFields: dpCodeInCompleteStatus ? dynamicFields.map((e) => {
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
      formThreshold: dpCodeInCompleteStatus && thresholdValue && formDataType === 'NUMBER' && !(formResponse <= thresholdValue.max && formResponse >= thresholdValue.min),
    };
    setHasErrors(errors);

    // // console.log(errors, '*******ERRORS******');
    const roleScreenType = {
      isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR, isHistoryType,
    };
    return validateReqFields(errors, roleScreenType);
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
        screenShotBase64: (formScreenShotFile && formScreenShotFile.base64) || formScreenShotPath,
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
          screenShotBase64: (formScreenShotFile && formScreenShotFile.base64) || formScreenShotPath,
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
          screenShotBase64: (formScreenShotFile && formScreenShotFile.base64) || formScreenShotPath,
          additionalDetails: dynamicFields,
          isAccepted: isErrorAccepted,
          rejectComment: errorComment,
          status: 'Completed',
          error: { ...defaultData.error, errorStatus: 'Completed' },
        };
      }
      if (isQA_DV) {
        saveData = {
          ...defaultData,
          status: 'Completed',
          source: formSource,
          response: formResponse,
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          screenShotBase64: (formScreenShotFile && formScreenShotFile.base64) || formScreenShotPath,
          additionalDetails: dynamicFields,
          error: {
            ...defaultData.error,
            hasError: formIsError,
            isThere: formIsError,
            type: formErrorType,
            comment: formComment,
            errorStatus: 'Completed',
            raisedBy: sessionStorage.role,
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
          screenShotBase64: (formScreenShotFile && formScreenShotFile.base64) || formScreenShotPath,
          comment: formControversyComment,
          nextReviewDate: formNextReviewDate,
          additionalDetails: dynamicFields,
        };
      }
    }

    if (doValidate()) {
      props.onClickSave(saveData);
    } else {
      message.error('Please Fill Required fields !');
      if (hasErrors.formThreshold) {
        message.error(`Response Should Be Range ${thresholdValue.min} - ${thresholdValue.max}`, 8);
      }
      if (lastHistoricalDataResponse && !['NA', 'na', 'Na'].includes(lastHistoricalDataResponse) && ['NA', 'na', 'Na'].includes(formResponse)) {
        message.error('Response Should Not Be "NA');
      }
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
            ...defaultData.error,
            errorStatus: 'Editable',
          },
        };
      }
      if (isAnalyst_CC) {
        saveData = { ...defaultData, status: 'Editable' };
      }
    }
    props.onClickSave(saveData);
  };

  const dummyQAEditClickHandler = () => {
    let saveData;
    if (isQA_DV) {
      saveData = {
        ...defaultData,
        status: 'Editable',
      };
    }
    setFormIsError(false);
    props.onClickSave(saveData);
  };

  const onClickViewError = () => {
    setIsErrorPanelVisible(true);
  };

  const onCloseErrorPanel = () => {
    setIsErrorPanelVisible(false);
  };

  const onAccept = () => {
    let saveData;
    if (isAnalyst_DCR) {
      saveData = { ...defaultData, status: 'Editable', error: { ...defaultData.error, isAccepted: true, errorStatus: 'Incomplete' } };
    }
    props.onClickSave(saveData);
    setIsErrorAccepted(true);
    message.success('Error Accepted Successfully, Please make required changes and, Click "Save" button to update changes !');
    onCloseErrorPanel();
  };

  const onReject = () => {
    setIsErrorAccepted(false);
  };

  const onRejectSubmit = () => {
    let saveData;
    if (isAnalyst_DCR) {
      saveData = {
        ...defaultData, isAccepted: false, rejectComment: errorComment, status: 'Completed', error: { ...defaultData.error, isAccepted: false, errorStatus: 'Completed' },
      };
    }
    if (doValidate()) {
      props.onClickSave(saveData);
      setIsErrorAccepted(false);
      message.success('Error Rejected Successfully, And your response has been recorded!', 8);
      onCloseErrorPanel();
    } else {
      message.error('Please Fill Required Details !', 8);
      if (hasErrors.formThreshold) {
        message.error(`Response Should Be Range ${thresholdValue.min} - ${thresholdValue.max}`, 8);
      }
      if (lastHistoricalDataResponse && !['NA', 'na', 'Na'].includes(lastHistoricalDataResponse) && ['NA', 'na', 'Na'].includes(formResponse)) {
        message.error('Response Should Not Be "NA');
      }
    }
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
    if (isQA_DV) {
      if (defaultData.status === 'Completed') {
        return true;
      }
      return false;
    }
    if (isCompanyRep_DR) { return true; }
    if (isClientRep_DR) { return true; }
    return false;
  };

  const disableField = getIsDisableOrNot();


  const saveClickHandler = () => {
    // // console.log('HISTORICAL SAVE');
    dummySaveClickHandler();
  };

  const unFreezeClickHandler = () => {
    // // console.log('UNFREEZE');
    dummyEditClickHandler();
  };

  return (
    <Row>

      {/* DPCode Field */}
      <FieldWrapper
        label={<div>Dp Code<span className="addNewMember-red-asterik"> * </span></div>}
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
        label={<div>Year<span className="addNewMember-red-asterik"> * </span></div>}
        visible={isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR || isHistoryType}
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
        label={<div>Source Name<span className="addNewMember-red-asterik"> * </span></div>}
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="response"
            placeholder="Response"
            className={hasErrors.formSource && 'red-class'}
            value={formSource && formSource.sourceName}
            onChange={onChangeFormSource}
            disabled={disableField}
          />
        }
      />

      {/* SOURCE Field */}
      <FieldWrapper
        label={<div>Source<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR || isHistoryType)}
        size={[6, 5, 7]}
        body={
          <Select
            name="source"
            className={hasErrors.formSource && 'red-class'}
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
        label={<div>Description</div>}
        visible
        size={[6, 5, 7]}
        body={formDescription}
      />

      {/* RESPONSE Field */}
      { formDataType === 'NUMBER' &&
      <FieldWrapper
        label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="number"
            name="response"
            className={(hasErrors.formResponse || hasErrors.formThreshold) && 'red-class'}
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
        label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="response"
            placeholder="Response"
            className={hasErrors.formResponse && 'red-class'}
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
        visible
        size={[6, 5, 7]}
        body={
          <DatePicker
            name="response"
            size="large"
            className={hasErrors.formResponse ? 'red-class datapage-datepicke' : 'datapage-datepicke'}
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
        visible
        size={[6, 5, 7]}
        body={
          <Select
            name="response"
            options={textResponse.concat([{ label: 'NA', value: 'NA' }])}
            className={hasErrors.formResponse && 'red-class'}
            onChange={onChangeFormResponse}
            value={formResponse && { label: formResponse, value: formResponse }}
            placeholder="Choose Response"
            isDisabled={disableField}
          />
        }
      />}

      {/* TEXT SNIPPET Field */}
      <FieldWrapper
        label={<div>Text Snippet<span className="addNewMember-red-asterik"> * </span></div>}
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            name="textSnippet"
            placeholder="Snippet"
            className={hasErrors.formTextSnippet && 'red-class'}
            onChange={onChangeFormTextSnippet}
            value={formTextSnippet}
            disabled={disableField}
          />
        }
      />

      {/* PAGE NO Field */}
      <FieldWrapper
        label={<div>Page No<span className="addNewMember-red-asterik"> * </span></div>}
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="number"
            placeholder="Page No"
            className={hasErrors.formPageNo && 'red-class'}
            onChange={onChangeFormPageNo}
            value={formPageNo}
            disabled={disableField}
          />
        }
      />

      {/* URL Field */}
      <FieldWrapper
        label={<div>URL<span className="addNewMember-red-asterik"> * </span></div>}
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="url"
            placeholder="Url"
            className={hasErrors.formURL && 'red-class'}
            onChange={onChangeFormURL}
            value={formURL}
            disabled={disableField}
          />
        }
      />

      {/* PUBLICATION DATE Field */}
      <FieldWrapper
        label={<div>PublicationDate<span className="addNewMember-red-asterik"> * </span></div>}
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <DatePicker
            name="publicationDate"
            size="large"
            className={hasErrors.formPublicDate ? 'red-class datapage-datepicker' : 'datapage-datepicker'}
            onChange={onChangeFormPublicDate}
            value={formPublicDate && moment(formPublicDate)}
            disabled={disableField}
          />
        }
      />

      {/* UPLOAD Field */}
      <Col lg={12}>
        <Row>
          <FieldWrapper
            label={<div>Upload Screenshot<span className="addNewMember-red-asterik"> * </span></div>}
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
            label={<div>Screenshot<span className="addNewMember-red-asterik"> * </span></div>}
            visible
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

      {/* Controversy Next Review Date Field */}
      <FieldWrapper
        label={<div>Next review date<span className="addNewMember-red-asterik"> * </span></div>}
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <DatePicker
            className={hasErrors.formNextReviewDate ? 'red-class datapage-datepicker' : 'datapage-datepicker'}
            name="response"
            size="large"
            onChange={onChangeFormNextReviewDate}
            value={formNextReviewDate && moment(formNextReviewDate)}
            disabled={disableField}
          />
        }
      />

      {/* DYNAMIC FIELDS COMES HERE */}
      {dynamicFields.map((eachData, index) => (
        <FieldWrapper
          visible
          label={<div>{eachData.name}<span className="addNewMember-red-asterik"> * </span></div>}
          size={[6, 5, 7]}
          body={getReqFields({
            eachData, dynamicFields, setDynamicFields, disableField, error: hasErrors.dynamicFields[index],
          })}
        />
      ))}

      {/* IS ERORR Field */}
      {(isCompanyRep_DR || isClientRep_DR || isQA_DV) && !isHistoryType &&
      <Col lg={12}>
        <Row>
          <FieldWrapper
            label={<div>Error<span className="addNewMember-red-asterik"> * </span></div>}
            visible
            size={[6, 5, 7]}
            body={
              <Radio.Group disabled={defaultData.error && defaultData.error.errorStatus === 'Completed'} onChange={onChangeFormIsError} value={formIsError}>
                <Radio value>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            }
          />
        </Row>
      </Col>
      }

      {/* ERROR TYPE Field */}
      <FieldWrapper
        label={<div>Error Type<span className="addNewMember-red-asterik"> * </span></div>}
        visible={isQA_DV && !isHistoryType && formIsError}
        size={[6, 5, 7]}
        body={
          <Select
            name="errorType"
            className={hasErrors.formErrorType && 'red-class'}
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
        label={<div>Comment<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(isQA_DV && !isHistoryType && formIsError)}
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            className={hasErrors.formComment && 'red-class'}
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
        label={<div>Comment<span className="addNewMember-red-asterik"> * </span></div>}
        visible={isAnalyst_CC}
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            className={hasErrors.formNextReviewDate && 'red-class'}
            disabled={disableField}
            aria-label="With textarea"
            placeholder="Comments"
            onChange={onChangeFormControversyComment}
            value={formControversyComment}
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
        { isAnalyst_DCR && !isHistoryType && defaultData.error &&
        <Button className="datapage-button" variant="success" onClick={onClickViewError}>View Error</Button>}
        {/* FOR QA */}
        {(isQA_DV) && !isHistoryType && ((defaultData.error && defaultData.error.errorStatus !== 'Completed') || defaultData.status !== 'Completed') &&
        <Button className="datapage-button" variant="success" onClick={dummySaveClickHandler}>Save</Button>}
        {(isQA_DV) && !isHistoryType && (defaultData.error && defaultData.error.errorStatus === 'Completed') &&
        <Button className="datapage-button" variant="primary" onClick={dummyEditClickHandler}>Edit Error</Button>}
        {(isQA_DV) && !isHistoryType && defaultData.status === 'Completed' && (defaultData.error && !defaultData.error.hasError) &&
        <Button className="datapage-button" variant="primary" onClick={dummyQAEditClickHandler}>UnFreeze Data</Button>}
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
        {isSrcPanelOpened && <AddSource fiscalYear={defaultData.fiscalYear} locationData={props.locationData} companyId={props.locationData.state.dpCodeDetails.companyId} closeAddSourcePanel={onClickCloseAddSource} />}
      </Drawer>

      {/* ERROR PANEL FOR DATA CORRECTION */}
      <Modal
        title="Error Panel"
        width="75%"
        style={{ top: 8, maxWidth: 1000 }}
        className="error-panel"
        visible={isErrorPanelVisible}
        footer={
          <React.Fragment>
            {isErrorAccepted === false && <Button className="datapage-button" variant="success" onClick={onRejectSubmit}>Close</Button>}
            {(isErrorAccepted === null) && <Button className="datapage-button" variant="success" onClick={onAccept}>Accept</Button>}
            {(isErrorAccepted === null) && <Button className="datapage-button" variant="danger" onClick={onReject}>Reject</Button>}
          </React.Fragment>
        }
        onCancel={onCloseErrorPanel}
      >
        <ErrorPanel reqErrorData={reqErrorData} isAccepted={isErrorAccepted} errorComment={errorComment} setErrorComment={setErrorComment} />
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
  getDefaultCurrentDataForYear: PropTypes.func,
  lastHistoricalData: PropTypes.array,
  // reqSourceData: PropTypes.array,
  // dummyDataCheck: PropTypes.func,
};
