/* eslint-disable no-useless-escape */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Button as AntButton, Image, Upload, message, Radio, Modal, Drawer, Input } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import ErrorDataSheetTwo from './ErrorDataSheet';
import ErrorPanel from './ErrorPanel';
import validateReqFields from './validateReqFields';
import AddSource from './AddSource';

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
          format="DD/MM/YYYY"
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
          styles={{
            menuList: (provided) => ({
              ...provided,
              maxHeight: 120,
            }),
          }}
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
  const [isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR, isCompanyRep_CR, isClientRep_CR, IsAdmin] = [
    currentRole === 'Analyst' && currentTab === 'Data Collection',
    currentRole === 'Analyst' && currentTab === 'Data Correction',
    currentRole === 'Analyst' && currentTab === 'Controversy Collection',
    currentRole === 'QA',
    currentRole === 'Company Representative' && currentTab === 'Data Review',
    currentRole === 'Client Representative' && currentTab === 'Data Review',
    currentRole === 'Company Representative' && currentTab === 'Controversy Review',
    currentRole === 'Client Representative' && currentTab === 'Controversy Review',
    currentRole === 'SuperAdmin' || currentRole === 'Admin' || currentRole === 'GroupAdmin',
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

  const thresholdValue = defaultData.thresholdValue || { min: -1000000000000, max: 1000000000000 };

  const lastHistoricalDataResponse = props.lastHistoricalData && props.lastHistoricalData[0] ? props.lastHistoricalData[0].response : null;

  const getControversyYearList = (currentYear, nos) => {
    const list = [];
    for (let i = 0; i < nos; i += 1) {
      list.push({
        label: `${currentYear - i - 1}-${currentYear - i}`,
        value: `${currentYear - i - 1}-${currentYear - i}`,
      });
    }
    return list;
  };
  const controversyFiscalYearList = getControversyYearList(moment().year(), 10);

  const getSingleYearsList = (currentYear, startYear) => {
    const list = [];
    const nos = currentYear - startYear;
    for (let i = 0; i <= nos; i += 1) {
      if (`${currentYear - i - 1}-${currentYear - i}` !== defaultData.fiscalYear) {
        list.push({
          label: `${currentYear - i - 1}-${currentYear - i}`,
          value: `${currentYear - i - 1}-${currentYear - i}`,
        });
      }
    }
    return list;
  };

  const restatedOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const restatedForYearList = getSingleYearsList(Number(moment().year()), 2010);
  const restatedInYearList = restatedForYearList;


  // DATASHEET FORM DATA +
  // *DPCODE*
  const formDpCode = defaultData.dpCode;
  // *DPNAME*
  const formDpName = defaultData.dpName;
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
  const [formScreenShotPath, setFormScreenShotPath] = useState(defaultData.screenShot || []);
  // *RESPONSE*
  const [formResponse, setFormResponse] = useState(defaultData.response || '');
  // *SOURCE OBJ { SRCNAME, PUBLICATION DATE, URL }*
  const [formSource, setFormSource] = useState(defaultData.source || '');
  // *URL*
  const [formURL, setFormURL] = useState((defaultData.source && defaultData.source.url) || '');
  // *PUBLICATION DATE*
  const [formPublicDate, setFormPublicDate] = useState((defaultData.source && defaultData.source.publicationDate) || '');
  // *SCREEN SHOT FILE*
  // const [formScreenShotFile, setFormScreenShotFile] = useState(defaultData.screenShotBase64 ? {
  //   added: [...defaultData.screenShotBase64.added],
  //   deleted: [...defaultData.screenShotBase64.deleted],
  // } : {
  //   added: [], deleted: [],
  // });
  // *ERROR TYPE*
  const [formErrorType, setFormErrorType] = useState((defaultData.error && (defaultData.error.hasError) && defaultData.error.type) || '');
  // *ERROR*
  const [formErrorRefData, setFormErrorRefData] = useState((defaultData.error && (defaultData.error.hasError)) ? {
    ...defaultData.error.refData, fiscalYear: defaultData.fiscalYear, comment: defaultData.error.comment, description: defaultData.description, dataType: defaultData.dataType, status: defaultData.error.errorStatus, // error: defaultData.error,
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
  const [formControversyComment, setFormControversyComment] = useState(defaultData.comments || '');

  // CONTROVERSY COLLECTION REVIEW DATE
  const [formReviewDate, setFormReviewDate] = useState(defaultData.reviewDate || '');

  // CONTROVERSY COLLECTION COMMITEE REVIEW
  const [formIsApplicableForCommiteeReview, setFormIsApplicableForCommiteeReview] = useState(defaultData.isApplicableForCommiteeReview || '');

  // CONTROVERSY COLLECTION REVIEW DATE
  const [formAssessmentDate, setFormAssessmentDate] = useState(defaultData.assessmentDate || moment());

  // CONTROVERSY COLLECTION REVIEW DATE
  const [formReassessmentDate, setFormReassessmentDate] = useState(defaultData.reassessmentDate || moment());

  // CONTROVERSY COLLECTION FISCAL YEAR DATE
  const [formControversyFiscalYear, setFormControversyfiscalYear] = useState(defaultData.controversyFiscalYear || '');

  // CONTROVERSY COLLECTION FISCAL YEAR END DATE
  const [formControversyFiscalYearEnd, setFormControversyFiscalYearEnd] = useState(defaultData.controversyFiscalYearEnd || '');

  // SOURCE PANEL OPEN/CLOSE BOOLEAN FLAG
  const [isSrcPanelOpened, setIsSrcPanelOpened] = useState(false);

  // DYNAMIC FIELDS ADDITIONAL TO MASTER MANDATORY FIELDS
  const [dynamicFields, setDynamicFields] = useState(defaultData.additionalDetails || []);

  // SHOW IMAGE UPLOADE ERROR
  const [showImgUploadError, setShowImgUploadError] = useState(false);

  // RESTATEMENT OPTIONS
  const [formIsRestated, setFormIsRestated] = useState(defaultData.isRestated || 'No');
  // RESTATEMENT OPTIONS
  const [formRestatedValue, setFormRestatedValue] = useState(defaultData.restatedValue || '');
  // RESTATEMENT OPTIONS
  const [formRestatedInYear, setFormRestatedInYear] = useState(defaultData.restatedInYear || '');
  // RESTATEMENT OPTIONS
  const [formRestatedForYear, setFormRestatedForYear] = useState(defaultData.restatedForYear || '');

  const [hasErrors, setHasErrors] = useState({
    formTextSnippet: false,
    formPageNo: false,
    formScreenShotPath: false,
    formResponse: false,
    formSource: false,
    formURL: false,
    formPublicDate: false,
    // formScreenShotFile: false,
    formErrorType: false,
    formComment: false,
    formIsError: false,
    errorComment: false,
    formControversyComment: false,
    formReviewDate: false,
    formIsApplicableForCommiteeReview: false,
    formAssessmentDate: false,
    formReassessmentDate: false,
    formControversyFiscalYear: false,
    dynamicFields: [false],
    formThreshold: false,
    formIsRestated: false,
    formRestatedValue: false,
    formRestatedForYear: false,
    formRestatedInYear: false,
  });

  // CONVERTING SCREENSHOTS URL PATHS TO BASE 64
  const urlToBlob = (imgObjs) => Promise.all(imgObjs.map((eImg) => new Promise((res, rej) => {
    if (eImg.url) {
      fetch(eImg.url).then((response) => response.blob().then((blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (blob) {
          reader.readAsDataURL(blob);
          reader.onload = () => resolve({
            uid: eImg.uid,
            name: eImg.name,
            base64: reader.result,
          });
          reader.onerror = (error) => reject(error);
        }
      }))).then((base64res) => res(base64res)).catch((error) => rej(error));
    } else {
      res(eImg);
    }
  })));

  // USEEFFECTS
  useEffect(() => {
    setFormTextSnippet(defaultData.textSnippet || '');
    setFormPageNo(defaultData.pageNo || '');
    urlToBlob(defaultData.screenShot || []).then((base64Res) => setFormScreenShotPath(base64Res));
    //  setFormScreenShotPath(defaultData.screenShot || []);
    setFormResponse(defaultData.response || '');
    setFormSource(defaultData.source || '');
    setFormURL((defaultData.source && defaultData.source.url) || '');
    setFormPublicDate((defaultData.source && defaultData.source.publicationDate) || '');
    // setFormScreenShotFile(defaultData.screenShotBase64 ? {
    //   added: [...defaultData.screenShotBase64.added],
    //   deleted: [...defaultData.screenShotBase64.deleted],
    // } : {
    //   added: [], deleted: [],
    // });
    setFormErrorType((defaultData.error && (defaultData.error.hasError) && defaultData.error.type) || '');
    setFormComment((defaultData.error && (defaultData.error.hasError) && defaultData.error.comment) || '');
    setFormIsError((defaultData.error && (defaultData.error.hasError)) || false);
    setFormErrorRefData((defaultData.error) ? {
      ...defaultData.error.refData, fiscalYear: defaultData.fiscalYear, comment: defaultData.error.comment, description: defaultData.description, dataType: defaultData.dataType, status: defaultData.error.errorStatus, // error: defaultData.error,
    } : {
      fiscalYear: defaultData.fiscalYear, description: defaultData.description, dataType: defaultData.dataType,
    });
    setIsErrorPanelVisible(false);
    setFormControversyComment(defaultData.comments || '');

    setFormReviewDate(defaultData.reviewDate || '');
    setFormIsApplicableForCommiteeReview(defaultData.isApplicableForCommiteeReview || '');
    setFormAssessmentDate(defaultData.assessmentDate || moment());
    setFormReassessmentDate(defaultData.reassessmentDate || moment());
    setFormControversyfiscalYear(defaultData.controversyFiscalYear || '');
    setFormControversyFiscalYearEnd(defaultData.controversyFiscalYearEnd || '');

    setIsSrcPanelOpened(false);
    setDynamicFields(defaultData.additionalDetails || []);

    setFormIsRestated(defaultData.isRestated || 'No');
    setFormRestatedValue(defaultData.restatedValue || '');
    setFormRestatedInYear(defaultData.restatedInYear || '');
    setFormRestatedForYear(defaultData.restatedForYear || '');
    setIsErrorAccepted(defaultData.error && (defaultData.error.isAccepted === true || defaultData.error.isAccepted === false) ? !!defaultData.error.isAccepted : null);
    setHasErrors({
      formTextSnippet: false,
      formPageNo: false,
      formScreenShotPath: false,
      formResponse: false,
      formSource: false,
      formURL: false,
      formPublicDate: false,
      // formScreenShotFile: false,
      formErrorType: false,
      formComment: false,
      formIsError: false,
      errorComment: false,
      formControversyComment: false,
      formReviewDate: false,
      formIsApplicableForCommiteeReview: false,
      formAssessmentDate: false,
      formReassessmentDate: false,
      formControversyFiscalYear: false,
      dynamicFields: [false],
      formThreshold: false,
      formIsRestated: false,
      formRestatedValue: false,
      formRestatedForYear: false,
      formRestatedInYear: false,
    });

    setShowImgUploadError(false);
  }, [props.reqData]);

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
      props.onClickSave(saveData, true);
    }
  }, [formIsError]);

  // ONCHANGE FUNCTIONS

  const onChangeFormTextSnippet = (event) => {
    setFormTextSnippet(event.currentTarget.value);
  };

  const onChangeFormPageNo = (event) => {
    setFormPageNo(event.currentTarget.value);
  };

  const getBase64 = (filesArray) => Promise.all(filesArray.map((eachFile) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (eachFile) {
      reader.readAsDataURL(eachFile.originFileObj);
      reader.onload = () => resolve({
        uid: eachFile.uid,
        name: eachFile.name,
        base64: reader.result,
      });
      reader.onerror = (error) => reject(error);
    }
  })));

  const onChangeFormScreenShotPath = (event) => {
    if (event && event.file && event.file.status === 'removed') {
      // setFormScreenShotFile({
      //   added: formScreenShotFile.added.filter((e) => e.uid !== event.file.uid),
      //   deleted: [...formScreenShotFile.deleted, ...formScreenShotPath.filter((e) => e.uid === event.file.uid && !e.base64)],
      // });
      setFormScreenShotPath(formScreenShotPath.filter((e) => e.uid !== event.file.uid));
    } else if (event && event.fileList.length > 0) {
      const uploadedFiles = event.fileList.filter((e) => !!e.originFileObj);
      getBase64(uploadedFiles).then((filesWithBase64) => {
        setFormScreenShotPath([...formScreenShotPath, ...filesWithBase64]);
        // setFormScreenShotFile({
        //   ...formScreenShotFile,
        //   added: [...formScreenShotFile.added, ...filesWithBase64],
        // });
        setShowImgUploadError(true);
      }).catch((error) => message(error));
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
        setFormResponse(/(^-?\d*\.?\d*$)|(^([Nn][Aa])$)|(^([Nn])$)/.test(event.currentTarget.value) ? event.currentTarget.value : formResponse);
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

  const onChangeFormReviewDate = (event) => {
    setFormReviewDate(event);
  };

  const onChangeFormcommiteeReview = (event) => {
    setFormIsApplicableForCommiteeReview(event);
  };

  const onChangeFormAssessmentDate = (event) => {
    setFormAssessmentDate(event);
  };

  const onChangeFormReassessmentDate = (event) => {
    setFormReassessmentDate(event);
  };

  const onChangeFormControversyFiscalYear = (event) => {
    setFormControversyfiscalYear(event.value);
  };

  const onChangeFormIsError = (event) => {
    setFormIsError(event.target.value);
  };

  const onChangeFormIsRestated = (event) => {
    setFormIsRestated(event.value);
    if (event.value === 'Yes') {
      setFormRestatedInYear(defaultData.fiscalYear);
    } else if (event.value === 'No') {
      setFormRestatedInYear('');
      setFormRestatedValue('');
      setFormRestatedForYear('');
    }
  };
  const onChangeFormRestatedValue = (event) => {
    setFormRestatedValue(/(^-?\d*\.?\d*$)|(^([Nn][Aa])$)|(^([Nn])$)/.test(event.currentTarget.value) ? event.currentTarget.value : formRestatedValue);
  };
  const onChangeFormRestatedForYear = (event) => {
    setFormRestatedForYear(event.value);
  };


  const screenShotBeforeUpload = (file) => {
    if (!(file.type).includes('image')) {
      message.error(`${file.name} is not a image file`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const disabledPublicationDate = (event) => event && event > moment().endOf('day');

  const onScreenShotUploadError = () => {
    if (showImgUploadError) {
      message.warn('Uploaded img file is broken');
      setShowImgUploadError(false);
    }
  };

  const doValidate = () => {
    const dpCodeInCompleteStatus = defaultData.status !== 'Completed';
    const errors = {
      formTextSnippet: dpCodeInCompleteStatus && (formDataType === 'SELECT') && !(formTextSnippet.length > 0),
      formPageNo: dpCodeInCompleteStatus && !(formPageNo),
      formScreenShotPath: dpCodeInCompleteStatus && false, // !formScreenShotPath, Not Mandatory
      formResponse: dpCodeInCompleteStatus && (formResponse ?
        lastHistoricalDataResponse ?
          ['NA', 'na', 'Na'].includes(lastHistoricalDataResponse) ? !(['NA', 'na', 'Na'].includes(formResponse) || formResponse) : ['NA', 'na', 'Na'].includes(formResponse)
          : !formResponse
        : !formResponse
      ),
      formSource: dpCodeInCompleteStatus && !(formSource.url && formSource.sourceName && formSource.publicationDate),
      formURL: dpCodeInCompleteStatus && !(formURL && (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(formURL))),
      formPublicDate: dpCodeInCompleteStatus && !formPublicDate,
      // formScreenShotFile: dpCodeInCompleteStatus && false, // !formScreenShotFile, Not Mandatory
      formErrorType: formIsError === true && !formErrorType,
      formComment: formIsError === true && !(formComment.length > 0),
      formIsError: !(formIsError === true || formIsError === false),
      errorComment: !isErrorAccepted && !(errorComment.length > 0),
      formControversyComment: !(formControversyComment.length > 0),
      formReviewDate: dpCodeInCompleteStatus && !formReviewDate,
      formIsApplicableForCommiteeReview: dpCodeInCompleteStatus && !formIsApplicableForCommiteeReview,
      formAssessmentDate: dpCodeInCompleteStatus && !formAssessmentDate,
      formReassessmentDate: dpCodeInCompleteStatus && !formReassessmentDate,
      formControversyFiscalYear: dpCodeInCompleteStatus && !formControversyFiscalYear,
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
      formThreshold: dpCodeInCompleteStatus && thresholdValue && formDataType === 'NUMBER' && !(/^([Nn][Aa])$/.test(formResponse)) && !(formResponse <= thresholdValue.max && formResponse >= thresholdValue.min),
      formIsRestated: dpCodeInCompleteStatus && formDataType === 'NUMBER' && (formIsRestated !== 'Yes' && formIsRestated !== 'No'),
      formRestatedValue: dpCodeInCompleteStatus && formIsRestated === 'Yes' && formRestatedValue.length === 0,
      formRestatedInYear: dpCodeInCompleteStatus && formIsRestated === 'Yes' && formRestatedInYear.length === 0,
      formRestatedForYear: dpCodeInCompleteStatus && formIsRestated === 'Yes' && formRestatedForYear.length === 0,
    };
    setHasErrors(errors);

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
        isRestated: formIsRestated,
        restatedForYear: formRestatedForYear,
        restatedInYear: formRestatedInYear,
        restatedValue: formRestatedValue,
        screenShot: formScreenShotPath,
        // screenShotBase64: formScreenShotFile,
        additionalDetails: dynamicFields,
        isEdited: true,
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
          isRestated: formIsRestated,
          restatedForYear: formRestatedForYear,
          restatedInYear: formRestatedInYear,
          restatedValue: formRestatedValue,
          screenShot: formScreenShotPath,
          // screenShotBase64: formScreenShotFile,
          additionalDetails: dynamicFields,
          isEdited: true,
        };
      }
      if (isAnalyst_DCR) {
        saveData = {
          ...defaultData,
          source: formSource,
          response: formResponse,
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          isRestated: formIsRestated,
          restatedForYear: formRestatedForYear,
          restatedInYear: formRestatedInYear,
          restatedValue: formRestatedValue,
          screenShot: formScreenShotPath,
          // screenShotBase64: formScreenShotFile,
          additionalDetails: dynamicFields,
          isAccepted: isErrorAccepted,
          rejectComment: errorComment,
          status: 'Completed',
          error: { ...defaultData.error, errorStatus: 'Completed' },
          isEdited: true,
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
          isRestated: formIsRestated,
          restatedForYear: formRestatedForYear,
          restatedInYear: formRestatedInYear,
          restatedValue: formRestatedValue,
          screenShot: formScreenShotPath,
          // screenShotBase64: formScreenShotFile,
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
          isEdited: true,
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
          // screenShotBase64: formScreenShotFile,
          comments: formControversyComment,
          reviewDate: formReviewDate,
          isApplicableForCommiteeReview: formIsApplicableForCommiteeReview,
          assessmentDate: formAssessmentDate,
          reassessmentDate: formReassessmentDate,
          controversyFiscalYear: formControversyFiscalYear,
          additionalDetails: dynamicFields,
          isEdited: true,
        };
      }
    }

    if (doValidate()) {
      props.onClickSave(saveData);
    } else if (hasErrors.formThreshold) {
      message.error(`Numeric Response Should Be In Range ${thresholdValue.min} - ${thresholdValue.max}`, 8);
    } else if (lastHistoricalDataResponse && !['NA', 'na', 'Na'].includes(lastHistoricalDataResponse) && ['NA', 'na', 'Na'].includes(formResponse)) {
      message.error('Response Should Not Be "NA');
    } else if (hasErrors.formURL && formURL) {
      message.error('Invalid Url');
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
            ...defaultData.error,
            errorStatus: 'Editable',
          },
        };
      }
      if (isAnalyst_CC) {
        saveData = {
          ...defaultData, comments: '', reassessmentDate: moment(), status: 'Editable',
        };
      }
    }
    props.onClickSave(saveData);
  };

  const dummyQAEditClickHandler = () => {
    let saveData;
    if (isQA_DV) {
      saveData = {
        ...defaultData,
        isUnfreezed: true,
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
        ...defaultData, isAccepted: false, rejectComment: `${!defaultData.error.type ? `${errorComment}` : `${errorComment} - ( ${defaultData.error.type} ).`}`, status: 'Completed', error: { ...defaultData.error, isAccepted: false, errorStatus: 'Completed' }, isEdited: true,
      };
    }
    if (doValidate()) {
      props.onClickSave(saveData);
      setIsErrorAccepted(false);
      message.success('Error Rejected Successfully !', 8);
      onCloseErrorPanel();
    } else {
      message.error('Please Enter Comments !', 8); // Please Fill Required Fields !
      if (hasErrors.formThreshold) {
        message.error(`Numeric Response Should Be In Range ${thresholdValue.min} - ${thresholdValue.max}`, 8);
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
      if (isAnalyst_CC) {
        return true;
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
    if (isCompanyRep_DR || isClientRep_DR || IsAdmin || isClientRep_CR || isCompanyRep_CR) {
      return true;
    }
    return false;
  };

  const disableField = getIsDisableOrNot();


  const saveClickHandler = () => {
    dummySaveClickHandler();
  };

  const unFreezeClickHandler = () => {
    dummyEditClickHandler();
  };

  return (
    <Row>
      {/* DP Code Field */}
      <FieldWrapper
        label={<div>Dp Code</div>}
        visible
        size={[6, 5, 7]}
        body={<div className="datapage-current-tab">{formDpCode}</div>}
      />
      {/* DP Name Field */}
      <FieldWrapper
        label={<div>Dp Name</div>}
        visible
        size={[6, 5, 7]}
        body={<div className="datapage-current-tab">{formDpName}</div>}
      />
      {/* HISTORY YEAR Field */}
      <FieldWrapper
        label={<div>Year</div>}
        visible={(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR || isHistoryType) && !(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={<div className="datapage-current-tab">{defaultData.fiscalYear}</div>}
      />
      {/* SOURCE NAME Field */}
      <FieldWrapper
        label={<div>Source Name<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="response"
            autoComplete="false"
            placeholder="Select Response"
            className={hasErrors.formSource && !formSource.sourceName && 'red-class'}
            value={formSource ? formSource.sourceName : null}
            onChange={onChangeFormSource}
            disabled={disableField}
          />
        }
      />
      {/* SOURCE Field */}
      <FieldWrapper
        label={<div>Source<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR || isHistoryType) && !(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <Select
            name="source"
            className={hasErrors.formSource && 'red-class'}
            options={sourceList && sourceList.map((e) => ({ label: e.sourceName, value: e }))}
            onChange={onChangeFormSource}
            value={formSource && formSource.sourceName && formSource.value ? { label: formSource.sourceName, value: formSource } : null}
            placeholder="Select Source"
            isDisabled={disableField}
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 120,
              }),
            }}
          />
        }
      />
      {/* ADD SOURCE Button */}
      {(isAnalyst_DC || isAnalyst_DCR || isQA_DV) && !isHistoryType && !disableField && !(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR) &&
        <Col lg={12}>
          <Button className="datapage-addsource-button" onClick={onClickOpenAddSource}>Add Source</Button>
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
      {formDataType === 'NUMBER' &&
        <FieldWrapper
          label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
          visible
          size={[6, 5, 7]}
          body={
            <Form.Control
              type="text"
              autoComplete="false"
              name="response"
              className={(hasErrors.formResponse || hasErrors.formThreshold) && 'red-class'}
              placeholder="Enter Response"
              onChange={onChangeFormResponse}
              value={formResponse}
              disabled={disableField}
            />
          }
        />}
      {/* RESPONSE Field */}
      {formDataType === 'TEXT' &&
        <FieldWrapper
          label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
          visible
          size={[6, 5, 7]}
          body={
            <Form.Control
              type="text"
              autoComplete="false"
              name="response"
              placeholder="Enter Response"
              className={hasErrors.formResponse && 'red-class'}
              onChange={onChangeFormResponse}
              value={formResponse}
              disabled={disableField}
            />
          }
        />}
      {/* RESPONSE Field */}
      {formDataType === 'DATE' &&
        <FieldWrapper
          label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
          visible
          size={[6, 5, 7]}
          body={
            <DatePicker
              format="DD/MM/YYYY"
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
      {formDataType === 'SELECT' &&
        <FieldWrapper
          label={<div>Response<span className="addNewMember-red-asterik"> * </span></div>}
          visible
          size={[6, 5, 7]}
          body={
            <Select
              name="response"
              options={textResponse}
              className={hasErrors.formResponse && 'red-class'}
              onChange={onChangeFormResponse}
              value={formResponse && { label: formResponse, value: formResponse }}
              placeholder="Select Response"
              isDisabled={disableField}
              styles={{
                menuList: (provided) => ({
                  ...provided,
                  maxHeight: 120,
                }),
              }}
            />
          }
        />}
      {/* TEXT SNIPPET Field */}
      <FieldWrapper
        label={<div>Text Snippet{(formDataType === 'SELECT') ? <span className="addNewMember-red-asterik"> * </span> : ''}</div>}
        visible
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            autoComplete="false"
            name="textSnippet"
            placeholder="Enter Text Snippet"
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
            placeholder="Enter Page No"
            autoComplete="false"
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
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            name="url"
            placeholder="Enter Url"
            autoComplete="false"
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
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <DatePicker
            format="DD/MM/YYYY"
            name="publicationDate"
            size="large"
            className={hasErrors.formPublicDate ? 'red-class datapage-datepicker' : 'datapage-datepicker'}
            onChange={onChangeFormPublicDate}
            value={formPublicDate && moment(formPublicDate)}
            disabled={disableField}
            disabledDate={disabledPublicationDate}
          />
        }
      />

      {/* IS RESTATED */}
      <FieldWrapper
        label={<div>Restated<span className="addNewMember-red-asterik"> * </span></div>}
        visible={formDataType === 'NUMBER' && (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isClientRep_DR || isCompanyRep_DR || IsAdmin)}
        size={[6, 5, 7]}
        body={
          <Select
            name="restated"
            options={restatedOptions}
            className={hasErrors.formIsRestated && 'red-class'}
            value={formIsRestated && { label: formIsRestated, value: formIsRestated }}
            onChange={onChangeFormIsRestated}
            placeholder="Choose an option"
            isDisabled={disableField}
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 120,
              }),
            }}
          />
        }
      />

      {/* RESTATED FOR YEAR */}
      <FieldWrapper
        label={<div>Restated For Year<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(formIsRestated === 'Yes' && (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isClientRep_DR || isCompanyRep_DR || IsAdmin))}
        size={[6, 5, 7]}
        body={
          <Select
            name="restated"
            options={restatedForYearList}
            className={hasErrors.formRestatedForYear && 'red-class'}
            value={formRestatedForYear && { label: formRestatedForYear, value: formRestatedForYear }}
            onChange={onChangeFormRestatedForYear}
            placeholder="Select Year"
            isDisabled={disableField}
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 120,
              }),
            }}
          />
        }
      />

      {/* RESTATED IN YEAR */}
      <FieldWrapper
        label={<div>Restated In Year<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(formIsRestated === 'Yes' && (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isClientRep_DR || isCompanyRep_DR || IsAdmin))}
        size={[6, 5, 7]}
        body={
          <Select
            name="restated"
            options={restatedInYearList}
            className={hasErrors.formRestatedInYear && 'red-class'}
            value={formRestatedInYear && { label: formRestatedInYear, value: formRestatedInYear }}
            placeholder="Select Year"
            isDisabled
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 120,
              }),
            }}
          />
        }
      />

      {/* RESTATED VALUE */}
      <FieldWrapper
        label={<div>Restated Value<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(formIsRestated === 'Yes' && (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isClientRep_DR || isCompanyRep_DR || IsAdmin))}
        size={[6, 5, 7]}
        body={
          <Form.Control
            type="text"
            autoComplete="false"
            name="restated value"
            placeholder="Enter Restated Value"
            className={hasErrors.formRestatedValue && 'red-class'}
            onChange={onChangeFormRestatedValue}
            value={formRestatedValue}
            disabled={disableField}
          />
        }
      />

      {/* UPLOAD Field */}
      <Col lg={12} className="datapage-ant-screenshots">
        <Row>
          <FieldWrapper
            label={<div>Upload Screenshot</div>} // <span className="addNewMember-red-asterik"> * </span>
            visible
            size={[6, 5, 7]}
            body={
              <Upload
                className="datapage-ant-upload"
                multiple
                maxCount={6}
                accept="image/*"
                fileList={formScreenShotPath}
                beforeUpload={screenShotBeforeUpload}
                onChange={onChangeFormScreenShotPath}
                showUploadList={!disableField}
              >
                <AntButton
                  className={hasErrors.formScreenShotPath ? 'red-class datapage-ant-button' : 'datapage-ant-button'}
                  disabled={disableField || formScreenShotPath.length >= 6}
                  icon={<UploadOutlined />}
                >{formScreenShotPath.length >= 6 ? 'Upload Limit Reached (Max: 6)' : 'Click to Upload'}
                </AntButton>
              </Upload>
            }
          />
          {/* ScreenShot Field */}
          <FieldWrapper
            label={<div>Screenshot</div>}// <span className="addNewMember-red-asterik"> * </span>
            // visible={!!formScreenShotPath}
            visible={formScreenShotPath.length > 0}
            size={[6, 5, 7]}
            body={
              <Image.PreviewGroup>
                {formScreenShotPath.map((e) =>
                  (<Image
                    width="46%"
                    className="antd-img-set-cover"
                    key={e.uid}
                    src={e.url || e.base64}
                    onError={onScreenShotUploadError}
                  />))}
              </Image.PreviewGroup>
            }
          />
        </Row>
      </Col>
      {/* Controversy Fiscal Year Field */}
      <FieldWrapper
        label={<div>Fiscal Year<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <Select
            name="fiscal yera"
            options={controversyFiscalYearList}
            className={hasErrors.formControversyFiscalYear && 'red-class'}
            onChange={onChangeFormControversyFiscalYear}
            value={formControversyFiscalYear && { label: formControversyFiscalYear, value: formControversyFiscalYear }}
            placeholder="Select Value"
            isDisabled={disableField}
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 120,
              }),
            }}
          />
        }
      />
      {/* Controversy Fiscal Year End Date Field */}
      <FieldWrapper
        label={<div>Fiscal Year End Date</div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={formControversyFiscalYearEnd || 'NA'}
      />
      {/* Controversy Assessment Date Field */}
      <FieldWrapper
        label={<div>Assessment date</div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <DatePicker
            format="DD/MM/YYYY"
            className={hasErrors.formAssessmentDate ? 'red-class datapage-datepicker' : 'datapage-datepicker'}
            name="response"
            size="large"
            onChange={onChangeFormAssessmentDate}
            value={formAssessmentDate && moment(formAssessmentDate)}
            disabled
          />
        }
      />
      {/* Controversy Reassessment Date Field */}
      <FieldWrapper
        label={<div>Reassessment date</div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <DatePicker
            format="DD/MM/YYYY"
            className={hasErrors.formReassessmentDate ? 'red-class datapage-datepicker' : 'datapage-datepicker'}
            name="response"
            size="large"
            onChange={onChangeFormReassessmentDate}
            value={formReassessmentDate && moment(formReassessmentDate)}
            disabled
          />
        }
      />
      {/* Controversy Review Date Field */}
      <FieldWrapper
        label={<div>Review date</div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <DatePicker
            format="DD/MM/YYYY"
            className={hasErrors.formReviewDate ? 'red-class datapage-datepicker' : 'datapage-datepicker'}
            name="response"
            size="large"
            onChange={onChangeFormReviewDate}
            value={formReviewDate && moment(formReviewDate)}
            disabled={disableField}
          />
        }
      />
      {/* RESPONSE Field */}
      <FieldWrapper
        label={<div>Commitee review<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR)}
        size={[6, 5, 7]}
        body={
          <Select
            name="commity review"
            options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
            className={hasErrors.formIsApplicableForCommiteeReview && 'red-class'}
            onChange={onChangeFormcommiteeReview}
            value={formIsApplicableForCommiteeReview}
            placeholder="Select Value"
            isDisabled={disableField}
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 120,
              }),
            }}
          />
        }
      />
      {/* DYNAMIC FIELDS COMES HERE */}
      {dynamicFields.map((eachData, index) => (
        <FieldWrapper
          key={eachData.name}
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
            placeholder="Select Error Type"
            styles={{
              menuList: (provided) => ({
                ...provided,
                maxHeight: 120,
              }),
            }}
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
            autoComplete="false"
            placeholder="Enter Comment"
            onChange={onChangeFormComment}
            value={formComment}
          />
        }
      />
      {/* Controversy Comments Field */}
      <FieldWrapper
        label={<div>Comment<span className="addNewMember-red-asterik"> * </span></div>}
        visible={(isAnalyst_CC || isClientRep_CR || isCompanyRep_CR) && !disableField}
        size={[6, 5, 7]}
        body={
          <Form.Control
            as="textarea"
            className={hasErrors.formControversyComment && 'red-class'}
            disabled={disableField}
            aria-label="With textarea"
            placeholder="Enter Comment"
            autoComplete="false"
            value={formControversyComment}
            onChange={onChangeFormControversyComment}
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

      {!((isAnalyst_CC || isClientRep_CR || isCompanyRep_CR) && isHistoryType) && // Button elements will not appear if it is historical data of controversy screen
        <Col lg={12} className="datapage-button-wrap">
          {(isAnalyst_DC || isAnalyst_CC || (isAnalyst_DCR && isErrorAccepted)) && !isHistoryType && defaultData.status !== 'Completed' &&
            <Button className="datapage-button" variant="success" onClick={dummySaveClickHandler}>Save</Button>}
          {(isAnalyst_DC || isAnalyst_CC || (isAnalyst_DCR && isErrorAccepted)) && !isHistoryType && defaultData.status === 'Completed' &&
            <Button className="datapage-button" variant="primary" onClick={dummyEditClickHandler}>Edit</Button>}
          {isAnalyst_DCR && !isHistoryType && defaultData.error &&
            <Button className="datapage-button" variant="success" onClick={onClickViewError}>View Error</Button>}
          {/* FOR QA */}
          {(isQA_DV) && !isHistoryType && ((defaultData.error && defaultData.error.errorStatus !== 'Completed') || defaultData.status !== 'Completed') &&
            <Button className="datapage-button" variant="success" onClick={dummySaveClickHandler}>Save</Button>}
          {(isQA_DV) && !isHistoryType && (defaultData.error && defaultData.error.errorStatus === 'Completed') &&
            <Button className="datapage-button" variant="primary" onClick={dummyEditClickHandler}>Edit Error</Button>}
          {(isQA_DV) && !isHistoryType && defaultData.status === 'Completed' && (defaultData.error && !defaultData.error.hasError) &&
            <Button className="datapage-button" variant="primary" onClick={dummyQAEditClickHandler}>UnFreeze Data</Button>}
          {/* HISTORY UNFREEZE Button */}
          {(isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType && defaultData.status === 'Completed' &&
            <Button className="datapage-button" variant="primary" onClick={unFreezeClickHandler}>UnFreeze</Button>}
          {/* HISTORY SAVE Button */}
          {(isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType && defaultData.status !== 'Completed' &&
            <Button className="datapage-button" variant="success" onClick={saveClickHandler}>Save</Button>}
        </Col>}
      {/* HORIZONTAL Line */}
      {!(isAnalyst_CC && isHistoryType) && <Col lg={12} className="datapage-horizontalLine"></Col>}
      {/* ADD SOURCE PANEL */}
      <Drawer
        title="Add Source"
        placement="right"
        closable={false}
        onClose={onClickCloseAddSource}
        visible={isSrcPanelOpened}
        key="right"
        width={325}
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
            {isErrorAccepted === false && reqErrorData.errorStatus !== 'Completed' && <Button className="datapage-button" variant="success" onClick={onRejectSubmit}>Close</Button>}
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
  reqData: PropTypes.object,
  reqErrorList: PropTypes.array,
  locationData: PropTypes.object,
  onClickSave: PropTypes.func,
  getDefaultCurrentDataForYear: PropTypes.func,
  lastHistoricalData: PropTypes.array,
};
