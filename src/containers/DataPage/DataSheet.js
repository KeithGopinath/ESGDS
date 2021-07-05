/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Button as AntButton, Image, Upload, message, Radio, Modal, notification } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import { history } from '../../routes';
// import ErrorDataSheet from './ErrorDataSheet';
import ErrorDataSheetTwo from './ErrorDataSheet2';
import ErrorPanel from './ErrorPanel';

let temporaryData;

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

  const defaultData = props.reqData;
  const formDpCode = defaultData.dpCode;
  const formDescription = defaultData.description;
  const formDataType = defaultData.dataType.toUpperCase();
  const [formErrorRefData, setFormErrorRefData] = useState((defaultData.error && defaultData.error.isThere) ? {
    ...defaultData.error.refData, fiscalYear: defaultData.fiscalYear, comment: defaultData.error.comment, description: defaultData.description, dataType: defaultData.dataType, error: defaultData.error,
  } : {
    fiscalYear: defaultData.fiscalYear, description: defaultData.description, dataType: defaultData.dataType,
  });

  console.log('DATASHEET PROPS', props);

  const [formTextSnippet, setFormTextSnippet] = useState(defaultData.textSnippet || '');
  const [formPageNo, setFormPageNo] = useState(defaultData.pageNo || '');
  const [formScreenShotPath, setFormScreenShotPath] = useState(defaultData.screenShot || '');
  const [formResponse, setFormResponse] = useState(defaultData.response || '');
  const [formSource, setFormSource] = useState(defaultData.source || '');
  const [formURL, setFormURL] = useState((defaultData.source && defaultData.source.url) || '');
  const [formPublicDate, setFormPublicDate] = useState((defaultData.source && defaultData.source.publicationDate) || '');
  const [formScreenShotFile, setFormScreenShotFile] = useState(null);
  const [formErrorType, setFormErrorType] = useState((defaultData.error && defaultData.error.isThere && defaultData.error.type) || '');
  const [formComment, setFormComment] = useState((defaultData.error && defaultData.error.isThere && defaultData.error.comment) || '');
  const [formIsError, setFormIsError] = useState((defaultData.error && defaultData.error.isThere) || false);

  const [isErrorAccepted, setIsErrorAccepted] = useState(null);
  const [isErrorPanelVisible, setIsErrorPanelVisible] = useState(false);
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
  }, [props.reqData]);

  console.log(formErrorRefData);

  const sourceList = props.reqSourceData;

  const textResponse = ['Yes', 'No', 'M', 'F', 'NA'];

  const errorTypeList = props.reqErrorList;

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
      case 'DATE':
        setFormResponse(event);
        break;
      case 'NUMBER':
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

  const onChangeFormErrorType = (event) => {
    setFormErrorType(event.value);
  };

  const onChangeFormComment = (event) => {
    setFormComment(event.currentTarget.value);
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
  };

  const unFreezeClickHandler = () => {
    console.log('UNFREEZE');
  };

  const backClickHandler = () => {
    console.log('backClickHandler');
    history.push({
      pathname: `/task/${reqTask.taskId}`,
      state: { taskId: reqTask.taskId },
    });
  };

  const editClickHandler = () => {
    console.log('editClickHandler');
  };

  const previousClickHandler = () => {
    console.log('previousClickHandler');
    const nextDpCode = reqTask.dpCodesData[reqIndexes.currentIndex - 1];
    history.push({
      pathname: `/dpcode/${nextDpCode.dpCode}`,
      state: { taskId: reqTask.taskId, dpCode: nextDpCode.dpCode, filteredData: reqTask.dpCodesData },
    });
  };

  const saveAndNextClickHandler = () => {
    console.log(props.dummyDataCheck(), 'LIST OF NUMS');
    if ((props.dummyDataCheck()).length === 0) {
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
        state: { taskId: reqTask.taskId, dpCode: nextDpCode.dpCode, filteredData: reqTask.dpCodesData },
      });
    } else {
      if (isAnalyst_DC) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the current data for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
      if (isAnalyst_DCR) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the current data for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
      if (isAnalyst_CC) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the error(s) for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is accepted and rejected.`,
        });
      }
      if (isQA_DV) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the error(s) for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
      if (isClientRep_DR || isCompanyRep_DR) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the error(s) for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
    }
  };

  const saveAndCloseClickHandler = () => {
    console.log(props.dummyDataCheck(), 'LIST OF NUMS');
    if ((props.dummyDataCheck()).length === 0) {
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
        pathname: `/task/${reqTask.taskId}`,
        state: { taskId: reqTask.taskId },
      });
    } else {
      if (isAnalyst_DC) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the current data for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
      if (isAnalyst_DCR) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the error(s) for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is accepted and rejected.`,
        });
      }
      if (isAnalyst_CC) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the current data for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
      if (isQA_DV) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the error(s) for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
      if (isClientRep_DR || isCompanyRep_DR) {
        notification.error({
          message: 'Error',
          description:
            `Please make sure the error(s) for ${props.dummyDataCheck().map((e) => ` ${e}`)} fiscal year(s) is entered and saved.`,
        });
      }
    }
  };

  const dummySaveClickHandler = () => {
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
    const dummyDataQA = {
      error: {
        isThere: formIsError,
        type: formErrorType,
        comment: formComment,
        errorStatus: 'Completed',
      },
    };

    let saveData;
    if (isAnalyst_DC) {
      saveData = { ...dummyData };
    }
    if (isAnalyst_DCR) {
      saveData = { ...dummyData, error: { ...defaultData.error, status: 'Completed' } };
    }
    if (isQA_DV) {
      saveData = { ...dummyData, ...dummyDataQA };
    }
    props.onClickSave(saveData);
  };

  const dummyEditClickHandler = () => {
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

    const dummyDataQA = {
      error: {
        isThere: formIsError,
        type: formErrorType,
        comment: formComment,
        errorStatus: 'unknown',
      },
    };
    let saveData;
    if (isAnalyst_DC || isAnalyst_DCR) {
      saveData = { ...dummyData };
    }
    if (isQA_DV) {
      saveData = { ...dummyData, ...dummyDataQA };
    }
    props.onClickSave(saveData);
    message.success('Saved Successfully');
  };

  const getIsDisableOrNot = () => {
    if (isHistoryType) {
      if (isAnalyst_DC) { return true; }
      if (isAnalyst_DCR) { return true; }
      if (isQA_DV) { return true; }
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
      notification[type]({
        message: 'Error Accepted Successfully',
        description:
          'Please make required changes and, Click "Save" button to update changes!',
      });
    }
    if (subType === 'revert') {
      notification[type]({
        message: 'Reverted Successfully',
        description:
          'Please click "View Error" button to Accept or Reject the error, again!',
      });
    }
    if (subType === 'rejected') {
      notification[type]({
        message: 'Error Rejected Successfully',
        description: 'And your response has been recorded! ',
      });
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
        visible
        body={
          <Form.Control
            name="year"
            type="text"
            value={defaultData.fiscalYear}
            disabled
          />
        }
      />

      {/* SOURCE Field */}
      <FieldWrapper
        label="Source*"
        visible
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
      {(isAnalyst_DC || isAnalyst_DCR || isQA_DV) && !isHistoryType && !disableField &&
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
        visible={isHistoryType || isQA_DV || isCompanyRep_DR || isClientRep_DR}
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
        visible={isHistoryType || isQA_DV || isCompanyRep_DR || isClientRep_DR}
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
            options={errorTypeList.map((e) => ({ label: e, value: e }))}
            onChange={onChangeFormErrorType}
            value={formErrorType && { label: formErrorType, value: formErrorType }}
            placeholder="Choose Error Type"
          />
        }
      />

      {/* Comments Field */}
      <FieldWrapper
        label="Comments*"
        visible={isQA_DV && !isHistoryType && formIsError}
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

      {/* ERROR DATA SHEET COMPANY AND CLIENT REP's */}
      {/* <ErrorDataSheet
        visible={(isCompanyRep || isClientRep)}
        isError={formIsError}
        reqData={defaultData}
        sourceList={sourceList}
        textResponse={textResponse}
        locationData={props.locationData}
        openSourcePanel={props.openSourcePanel}
        onClickSave={props.onClickSave}
      /> */}
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
        { (isAnalyst_DC || (isAnalyst_DCR && isErrorAccepted)) && !isHistoryType && defaultData.status !== 'Completed' &&
        <Button className="datapage-button" variant="success" onClick={dummySaveClickHandler}>Save</Button>}
        { (isAnalyst_DC || (isAnalyst_DCR && isErrorAccepted)) && !isHistoryType && defaultData.status === 'Completed' &&
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

        {/* BACK Button */}
        { ((isAnalyst_DC || isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType &&
        <Button className="datapage-button" variant="danger" onClick={backClickHandler}>Back</Button>}

        {/* EDIT Button */}
        { (!isQA_DV && !isHistoryType && !isAnalyst_DC && !isAnalyst_DCR && !isCompanyRep_DR && !isClientRep_DR) &&
        <Button className="datapage-button" variant="primary" onClick={editClickHandler}>Edit</Button>}

        {/* PREVIOUS Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType && (reqIndexes.currentIndex !== reqIndexes.minIndex) &&
        <Button className="datapage-button" variant="primary" onClick={previousClickHandler}>Previous</Button>}

        {/* SAVE&NEXT Button */}
        { (isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType && (reqIndexes.currentIndex !== reqIndexes.maxIndex) &&
        <Button className="datapage-button" variant="success" onClick={saveAndNextClickHandler}>Save And Next</Button>}

        {/* SAVE&CLOSE Button */}
        { (isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && !isHistoryType && (reqIndexes.currentIndex === reqIndexes.maxIndex) &&
        <Button className="datapage-button" variant="danger" onClick={saveAndCloseClickHandler}>Save And Close</Button>}

        {/* HISTORY UNFREEZE Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType &&
        <Button className="datapage-button" variant="primary" onClick={unFreezeClickHandler}>UnFreeze</Button>}

        {/* HISTORY SAVE Button */}
        { (isAnalyst_DC || isAnalyst_DCR || isQA_DV) && isHistoryType &&
        <Button className="datapage-button" variant="success" onClick={saveClickHandler}>Save</Button>}


      </Col>

      <Modal
        title="Error Panel"
        width="75%"
        style={{ top: 20, maxWidth: 1000 }}
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
