/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Button as AntButton, Image, Upload, message, Radio, Modal } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import { history } from '../../routes';
import ErrorDataSheetTwo from './ErrorDataSheet2';
import ErrorPanel from './ErrorPanel';

let temporaryData;

// Field Wrapper ::
// A function which wraps the datasheet fields with bootstrap's row and col tags

const FieldWrapper = (props) => {
  if (props.visible) {
    return (
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            {props.label}
          </Form.Label>
          <Col sm={7}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

// DataSheetComponent ::
// A Main DataSheet Component Which Renders All Fields And Buttons That Are Required For DataCollection, Correction, Verification, Review Screens

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
    isHistoryType, reqTask, reqIndexes,
  } = props;

  const sourceList = props.reqSourceData;

  const textResponse = isAnalyst_CC ? ['Very High', 'High', 'Medium', 'Low', 'No'] : ['Yes', 'No', 'M', 'F', 'NA'];

  const errorTypeList = props.reqErrorList;

  // DEFAULT DATA
  const defaultData = props.reqData;

  // DATASHEET FORM DATA

  // *DPCODE*
  const formDpCode = defaultData.dpCode;
  // *DESCRIPTION*
  const formDescription = defaultData.description;
  // *DATATYPE*
  const formDataType = defaultData.dataType.toUpperCase();
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

  // *ANALYST DCR ERROR ACCEPTION OR REJECTION BOOLEAN*
  const [isErrorAccepted, setIsErrorAccepted] = useState(null);
  // *ANALYST DCR ERROR PANEL BOOLEAN*
  const [isErrorPanelVisible, setIsErrorPanelVisible] = useState(false);

  // CONTROVERSY COLLECTION COMMENT
  const [formControversyComment, setFormControversyComment] = useState(defaultData.comment || '');

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
  }, [props.reqData]);

  // Onchange Functions

  const onChangeFormTextSnippet = (event) => {
    setFormTextSnippet(event.currentTarget.value);
  };

  const onChangeFormPageNo = (event) => {
    setFormPageNo(event.currentTarget.value);
  };

  const onChangeFormScreenShotPath = (event) => {
    setFormScreenShotPath(event.fileList[0] && URL.createObjectURL(event.fileList[0].originFileObj));
    setFormScreenShotFile(event);
  };

  const onChangeFormResponse = (event) => {
    switch (formDataType) {
      case 'TEXT':
        setFormResponse(event.value);
        break;
      case 'BOOLEAN':
        setFormResponse(event.value);
        break;
      case 'GENDER':
        setFormResponse(event.value);
        break;
      case 'DATE':
        setFormResponse(event);
        break;
      case 'NUMBER':
        setFormResponse(event.currentTarget.value);
        break;
      case 'STRING':
        setFormResponse(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const onChangeFormSource = (event) => {
    if (isAnalyst_CC) {
      setFormSource({
        ...formSource,
        sourceName: event.target.value,
      });
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
        publicationDate: event.target.value,
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


  const onClickViewError = () => {
    setIsErrorPanelVisible(true);
  };

  // BUTTON HANDLERS

  const saveClickHandler = () => {
    console.log('HISTORICAL SAVE');
    dummySaveClickHandler();
  };

  const unFreezeClickHandler = () => {
    console.log('UNFREEZE');
    dummyEditClickHandler();
  };

  const backClickHandler = () => {
    console.log('backClickHandler');
    history.push({
      pathname: `/task/${reqTask.taskNumber}`,
      state: {
        taskDetails: {
          taskId: reqTask.taskId,
          pillar: reqTask.pillar,
          company: reqTask.company,
          taskNumber: reqTask.taskNumber,
        },
      },
    });
  };

  const previousClickHandler = () => {
    console.log('previousClickHandler');
    const nextDpCode = reqTask.dpCodesData[reqIndexes.currentIndex - 1];
    history.push({
      pathname: `/dpcode/${nextDpCode.dpCode}`,
      state: { taskId: reqTask.taskId, dpCodeDetails: nextDpCode, filteredData: reqTask.dpCodesData },
    });
  };

  const saveAndNextClickHandler = () => {
    console.log(props.dummyDataCheck(), 'LIST OF NUMS');
    if ((props.dummyDataCheck().currentData).length === 0 && (props.dummyDataCheck().historicalData).length === 0) {
      console.log('saveAndNextClickHandler');
      console.log('Details To Be Saved: ');
      console.log('DP CODE: ', formDpCode);
      console.log('DESCRIPTION: ', formDescription);
      console.log('DATA TYPE: ', formDataType);
      console.log('TEXT SNIPPET: ', formTextSnippet);
      console.log('PAGE NO: ', formPageNo);
      console.log('SCREENSHOT PATH: ', formScreenShotPath);
      console.log('RESPONSE: ', formResponse);
      console.log('SOURCE: ', formSource);
      console.log('URL: ', formURL);
      console.log('PUBLICATION DATE: ', formPublicDate);
      console.log('SCREENSHOT FILE: ', formScreenShotFile);
      console.log('ERROR TYPE: ', formErrorType);
      console.log('COMMENTS: ', formComment);
      const nextDpCode = reqTask.dpCodesData[reqIndexes.currentIndex + 1];
      history.push({
        pathname: `/dpcode/${nextDpCode.dpCode}`,
        state: { dpCodeDetails: nextDpCode },
      });
    } else {
      const msgCurrent = props.dummyDataCheck().currentData;
      const msgHistorical = props.dummyDataCheck().historicalData;
      if (isAnalyst_DC) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `current data for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isAnalyst_DCR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is accepted or rejected.`, 8);
      }
      if (isAnalyst_CC) {
        message.error(`Please make sure the current data for ${msgCurrent} fiscal year(s) is entered and saved.`, 8);
      }
      if (isQA_DV) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isClientRep_DR || isCompanyRep_DR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
    }
  };

  const saveAndCloseClickHandler = () => {
    if (isAnalyst_CC && defaultData.status === 'Completed') {
      history.goBack();
    } else if (isAnalyst_CC) {
      message.error('Please make sure the required data is entered and saved.', 8);
    }
    if (!isAnalyst_CC && (props.dummyDataCheck().currentData).length === 0 && (props.dummyDataCheck().historicalData).length === 0) {
      console.log('saveAndCloseClickHandler');
      console.log('Details To Be Saved: ');
      console.log('DP CODE: ', formDpCode);
      console.log('DESCRIPTION: ', formDescription);
      console.log('DATA TYPE: ', formDataType);
      console.log('TEXT SNIPPET: ', formTextSnippet);
      console.log('PAGE NO: ', formPageNo);
      console.log('SCREENSHOT PATH: ', formScreenShotPath);
      console.log('RESPONSE: ', formResponse);
      console.log('SOURCE: ', formSource);
      console.log('URL: ', formURL);
      console.log('PUBLICATION DATE: ', formPublicDate);
      console.log('SCREENSHOT FILE: ', formScreenShotFile);
      console.log('ERROR TYPE: ', formErrorType);
      console.log('COMMENTS: ', formComment);
      history.push({
        pathname: `/task/${reqTask.taskNumber}`,
        state: {
          taskDetails: {
            taskId: reqTask.taskId,
            pillar: reqTask.pillar,
            company: reqTask.company,
            taskNumber: reqTask.taskNumber,
          },
        },
      });
    } else {
      const msgCurrent = props.dummyDataCheck().currentData;
      const msgHistorical = props.dummyDataCheck().historicalData;
      if (isAnalyst_DC) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `current data for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isAnalyst_DCR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is accepted or rejected.`, 8);
      }
      if (isAnalyst_CC) {
        message.error(`Please make sure the current data for ${msgCurrent} fiscal year(s) is entered and saved.`, 8);
      }
      if (isQA_DV) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isClientRep_DR || isCompanyRep_DR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
    }
  };

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
        };
      }
      if (isAnalyst_DCR) {
        saveData = { ...defaultData, status: 'Completed', error: { ...defaultData.error, status: 'Completed' } };
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
          comment: formComment,
        };
      }
    }
    props.onClickSave(saveData);
    message.success('Saved Successfully');
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

  const getIsDisableOrNot = () => {
    if (isHistoryType) {
      if (isAnalyst_DC) {
        if (defaultData.status === 'Completed') {
          return true;
        }
        return false;
      }
      if (isAnalyst_DCR) { return true; }
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

  const onCloseErrorPanel = () => {
    temporaryData = defaultData;
    console.log('sdfsadsfdfdsfdsafsdf', temporaryData, defaultData);
    setIsErrorPanelVisible(false);
  };

  const openNotificationWithIcon = (type, subType) => {
    if (subType === 'accepted') {
      message.success('Error Accepted Successfully, Please make required changes and, Click "Save" button to update changes !');
    }
    if (subType === 'revert') {
      message.info('Reverted Successfully, Please click "View Error" button to Accept or Reject the error, again!', 8);
    }
    if (subType === 'rejected') {
      message.error('Error Rejected Successfully, And your response has been recorded!', 8);
    }
  };

  const onAccept = () => {
    const dummyData = {
      dpCode: formDpCode,
      fiscalYear: defaultData.fiscalYear,
      status: 'unknown',
      textSnippet: formTextSnippet,
      pageNo: formPageNo,
      screenShot: formScreenShotPath,
      response: formResponse,
      source: formSource,
    };
    let saveData;
    if (isAnalyst_DCR) {
      saveData = { ...dummyData, error: { ...defaultData.error, status: 'Incomplete' } };
    }
    props.onClickSave(saveData);
    setIsErrorAccepted(true);
    onCloseErrorPanel();
    openNotificationWithIcon('success', 'accepted');
  };

  const onReject = () => {
    setIsErrorAccepted(false);
  };

  const onRevert = () => {
    console.log(temporaryData);
    props.onClickSave(temporaryData);
    setIsErrorAccepted(null);
    openNotificationWithIcon('info', 'revert');
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
    };
    let saveData;
    if (isAnalyst_DCR) {
      saveData = { ...dummyData, error: { ...defaultData.error, status: 'Completed' } };
    }
    props.onClickSave(saveData);
    onCloseErrorPanel();
    openNotificationWithIcon('success', 'rejected');
  };

  return (
    <Row>

      {/* DPCode Field */}
      <FieldWrapper
        label="Dp Code*"
        visible
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
        body={
          <Form.Control
            type="text"
            name="response"
            placeholder="Response"
            onChange={null}
            value={formSource.sourceName}
            disabled={disableField}
          />
        }
      />

      {/* SOURCE Field */}
      <FieldWrapper
        label="Source*"
        visible={!isAnalyst_CC}
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
        <Button onClick={props.openSourcePanel}>Add Source</Button>
      </Col>}

      {/* HORIZONTAL Line */}
      <Col lg={12} className="datapage-horizontalLine"></Col>

      {/* DESCRIPTION Field */}
      <FieldWrapper
        label="Description*"
        visible
        body={formDescription}
      />

      {/* RESPONSE Field */}
      { formDataType === 'NUMBER' &&
      <FieldWrapper
        label="Response*"
        visible
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
      { formDataType === 'STRING' &&
      <FieldWrapper
        label="Response*"
        visible
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
      { formDataType === 'TEXT' &&
      <FieldWrapper
        label="Response*"
        visible
        body={
          <Select
            name="response"
            options={textResponse.map((e) => ({ label: e, value: e }))}
            onChange={onChangeFormResponse}
            value={formResponse && { label: formResponse, value: formResponse }}
            placeholder="Choose Response"
            isDisabled={disableField}
          />
        }
      />}

      { formDataType === 'BOOLEAN' &&
      <FieldWrapper
        label="Response*"
        visible
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
      />}

      {/* TEXT SNIPPET Field */}
      <FieldWrapper
        label="Text Snippet*"
        visible
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
        body={
          <Image
            width="50%"
            src={formScreenShotPath}
          />
        }
      />

      {/* IS ERORR Field */}
      {(isCompanyRep_DR || isClientRep_DR || isQA_DV) && !isHistoryType &&
      <React.Fragment>
        <FieldWrapper
          label="Error*"
          visible
          body={
            <Radio.Group disabled={defaultData.error && defaultData.error.errorStatus === 'Completed'} onChange={onChangeFormIsError} value={formIsError}>
              <Radio value>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          }
        />
        <FieldWrapper
          label={null}
          visible
          body={null}
        />
      </React.Fragment>
      }

      {/* ERROR TYPE Field */}
      <FieldWrapper
        label="Error Type*"
        visible={isQA_DV && !isHistoryType && formIsError}
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

      {/* ERROR DATA SHEET COMPANY AND CLIENT REP's */}
      {(isCompanyRep_DR || isClientRep_DR) && !isHistoryType &&
      <ErrorDataSheetTwo
        isError={formIsError}
        reqData={formErrorRefData}
        reqSourceData={sourceList}
        textResponse={textResponse}
        locationData={props.locationData}
        openSourcePanel={props.openSourcePanel}
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
      { !isAnalyst_CC && <Col lg={12} className="datapage-button-wrap"><div>{`${reqIndexes.currentIndex + 1}/${reqIndexes.maxIndex + 1}`}</div></Col>}
      <Col lg={12} className="datapage-button-wrap">
        {/* BACK Button */}
        { ((isAnalyst_DC || isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType &&
        <Button className="datapage-button" variant="danger" onClick={backClickHandler}>Back</Button>}

        {/* PREVIOUS Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType && (reqIndexes.currentIndex !== reqIndexes.minIndex) &&
        <Button className="datapage-button" variant="primary" onClick={previousClickHandler}>Previous</Button>}

        {/* SAVE&NEXT Button */}
        { (isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType && (reqIndexes.currentIndex !== reqIndexes.maxIndex) &&
        <Button className="datapage-button" variant="success" onClick={saveAndNextClickHandler}>Save And Next</Button>}

        {/* SAVE&CLOSE Button */}
        { (((isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType && (reqIndexes.currentIndex === reqIndexes.maxIndex)) || (isAnalyst_CC)) &&
        <Button className="datapage-button" variant="danger" onClick={saveAndCloseClickHandler}>Save And Close</Button>}

        {/* HISTORY UNFREEZE Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType && defaultData.status === 'Completed' &&
        <Button className="datapage-button" variant="primary" onClick={unFreezeClickHandler}>UnFreeze</Button>}

        {/* HISTORY SAVE Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType && defaultData.status !== 'Completed' &&
        <Button className="datapage-button" variant="success" onClick={saveClickHandler}>Save</Button>}


      </Col>

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
        <ErrorPanel reqErrorData={defaultData.error} isAccepted={isErrorAccepted} />
      </Modal>

    </Row>
  );
};
