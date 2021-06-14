/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Button as AntButton, Image, Upload, message } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import { history } from '../../routes';
import ErrorDataSheet from './ErrorDataSheet';
import DataComment from './DataComment';

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

const DataSheet = (props) => {
  console.log(props, '####');
  const currentRole = sessionStorage.role;

  const [isAnalyst, isQA, isCompanyRep, isClientRep] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
    currentRole === 'Company Representative',
    currentRole === 'Client Representative',
  ];

  const { isHistoryType, reqTask, reqIndexes } = props;

  const defaultData = isHistoryType ? props.reqData.historicalData[0] : props.reqData;
  const formDpCode = defaultData.dpCode;
  const formYear = defaultData.fiscalYear;
  const formDescription = defaultData.description;
  const formDataType = defaultData.dataType.toUpperCase();

  const [formHistoryYear, setFormHistoryYear] = useState(defaultData);
  const [formTextSnippet, setFormTextSnippet] = useState(defaultData.textSnippet || '');
  const [formPageNo, setFormPageNo] = useState(defaultData.pageNo || '');
  const [formScreenShotPath, setFormScreenShotPath] = useState(defaultData.screenShot || '');
  const [formResponse, setFormResponse] = useState(defaultData.response || '');
  const [formSource, setFormSource] = useState(defaultData.source || '');
  const [formURL, setFormURL] = useState((defaultData.source && defaultData.source.url) || '');
  const [formPublicDate, setFormPublicDate] = useState((defaultData.source && defaultData.source.publicationDate) || '');
  const [formScreenShotFile, setFormScreenShotFile] = useState(null);
  const [formErrorType, setFormErrorType] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formIsError, setFormIsError] = useState(false);

  useEffect(() => {
    setFormTextSnippet(defaultData.textSnippet || '');
    setFormPageNo(defaultData.pageNo || '');
    setFormScreenShotPath(defaultData.screenShot || '');
    setFormResponse(defaultData.response || '');
    setFormSource(defaultData.source || '');
    setFormURL((defaultData.source && defaultData.source.url) || '');
    setFormPublicDate((defaultData.source && defaultData.source.publicationDate) || '');
    setFormIsError(false);
  }, [props.locationData]);

  const sourceList = props.reqSourceData;

  const textResponse = ['Yes', 'No', 'M', 'F', 'NA'];

  const errorTypeList = props.reqErrorList;

  const onChangeFormHistoryYear = (event) => {
    setFormHistoryYear(event.value);
    //
    setFormTextSnippet(event.value.textSnippet || '');
    setFormPageNo(event.value.pageNo || '');
    setFormScreenShotPath(event.value.screenShot || '');
    setFormResponse(event.value.response || '');
    setFormSource(event.value.source || '');
    setFormURL((event.value.source && event.value.source.url) || '');
    setFormPublicDate((event.value.source && event.value.source.publicationDate) || '');
  };

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
    setFormIsError(event.target.checked);
  };

  const screenShotBeforeUpload = (file) => {
    if (!(file.type).includes('image')) {
      message.error(`${file.name} is not a image file`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  // BUTTON HANDLERS

  const saveClickHandler = () => {
    console.log('Details To Be Saved: ');
    console.log('DP CODE: ', formDpCode);
    console.log('YEAR: ', formYear);
    console.log('DESCRIPTION: ', formDescription);
    console.log('DATA TYPE: ', formDataType);
    console.log('HISTORY YEAR: ', formHistoryYear);
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
      state: { taskId: reqTask.taskId, dpCode: nextDpCode.dpCode },
    });
  };

  const saveAndNextClickHandler = () => {
    console.log('saveAndNextClickHandler');
    console.log('Details To Be Saved: ');
    console.log('DP CODE: ', formDpCode);
    console.log('YEAR: ', formYear);
    console.log('DESCRIPTION: ', formDescription);
    console.log('DATA TYPE: ', formDataType);
    console.log('HISTORY YEAR: ', formHistoryYear);
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
      state: { taskId: reqTask.taskId, dpCode: nextDpCode.dpCode },
    });
  };

  const saveAndCloseClickHandler = () => {
    console.log('saveAndCloseClickHandler');
    console.log('Details To Be Saved: ');
    console.log('DP CODE: ', formDpCode);
    console.log('YEAR: ', formYear);
    console.log('DESCRIPTION: ', formDescription);
    console.log('DATA TYPE: ', formDataType);
    console.log('HISTORY YEAR: ', formHistoryYear);
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
  };

  const getCondition = () => {
    if (isHistoryType) {
      if (isAnalyst) { return true; }
      if (isQA) { return true; }
      if (isCompanyRep) { return true; }
      if (isClientRep) { return true; }
    }
    if (isAnalyst) { return false; }
    if (isQA) { return true; }
    if (isCompanyRep) { return true; }
    if (isClientRep) { return true; }
    return false;
  };

  const disableField = getCondition();


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

      {/* YEAR Field */}
      <FieldWrapper
        label="Year*"
        visible={(isAnalyst || isQA || isCompanyRep || isClientRep) && !isHistoryType}
        body={
          <Form.Control
            name="year"
            type="text"
            value={formYear}
            disabled
          />
        }
      />

      {/* HISTORY YEAR Field */}
      <FieldWrapper
        label="History Year"
        visible={isHistoryType}
        body={
          <Select
            name="historyYear"
            options={props.reqData.historicalData.map((e) => ({ label: e.fiscalYear, value: e }))}
            onChange={onChangeFormHistoryYear}
            value={formHistoryYear && { label: formHistoryYear.fiscalYear, value: formHistoryYear }}
            placeholder="Choose Historical Year"
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
            options={sourceList.map((e) => ({ label: e.sourceName, value: e }))}
            onChange={onChangeFormSource}
            value={formSource && { label: formSource.sourceName, value: formSource }}
            placeholder="Choose Source File"
            isDisabled={disableField}
          />
        }
      />

      {/* ADD SOURCE Button */}
      {(isAnalyst || isQA) && !isHistoryType &&
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
        visible={isHistoryType || isQA || isCompanyRep || isClientRep}
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
        visible={isHistoryType || isQA || isCompanyRep || isClientRep}
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

      {/* ERROR TYPE Field */}
      <FieldWrapper
        label="Error Type*"
        visible={isQA && !isHistoryType}
        body={
          <Select
            name="errorType"
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
        visible={isQA && !isHistoryType}
        body={
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            placeholder="Comments"
            onChange={onChangeFormComment}
            value={formComment}
          />
        }
      />

      {/* IS ERORR Field */}
      {(isCompanyRep || isClientRep) && !isHistoryType &&
      <Col
        lg={12}
        style={{
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <Form.Check
          type="checkbox"
          label="Error"
          onChange={onChangeFormIsError}
          checked={formIsError}

        />
      </Col>}

      {/* ERROR DATA SHEET COMPANY AND CLIENT REP's */}
      {(isCompanyRep || isClientRep) && formIsError &&
      <ErrorDataSheet reqData={props.reqData} sourceList={sourceList} textResponse={textResponse} locationData={props.locationData} openSourcePanel={props.openSourcePanel} />}

      {/* COMMENTS */}
      <DataComment />

      {/* HORIZONTAL Line */}
      <Col lg={12} className="datapage-horizontalLine"></Col>

      <Col lg={12} className="datapage-button-wrap">

        {/* BACK Button */}
        { (isAnalyst || isQA || isCompanyRep || isClientRep) && !isHistoryType &&
        <Button className="datapage-button" variant="danger" onClick={backClickHandler}>Back</Button>}

        {/* EDIT Button */}
        { (isQA && !isHistoryType) &&
        <Button className="datapage-button" variant="primary" onClick={editClickHandler}>Edit</Button>}

        {/* PREVIOUS Button */}
        { (isAnalyst || isQA || isCompanyRep || isClientRep) && !isHistoryType && (reqIndexes.currentIndex !== reqIndexes.minIndex) &&
        <Button className="datapage-button" variant="primary" onClick={previousClickHandler}>Previous</Button>}

        {/* SAVE&NEXT Button */}
        { (isAnalyst || isQA || isCompanyRep || isClientRep) && !isHistoryType && (reqIndexes.currentIndex !== reqIndexes.maxIndex) &&
        <Button className="datapage-button" variant="success" onClick={saveAndNextClickHandler}>Save And Next</Button>}

        {/* SAVE&CLOSE Button */}
        { (isAnalyst || isQA || isCompanyRep || isClientRep) && !isHistoryType && (reqIndexes.currentIndex === reqIndexes.maxIndex) &&
        <Button className="datapage-button" variant="danger" onClick={saveAndCloseClickHandler}>Save And Close</Button>}

        {/* HISTORY UNFREEZE Button */}
        { (isAnalyst || isQA) && isHistoryType &&
        <Button className="datapage-button" variant="primary" onClick={unFreezeClickHandler}>UnFreeze</Button>}

        {/* HISTORY SAVE Button */}
        { (isAnalyst || isQA) && isHistoryType &&
        <Button className="datapage-button" variant="success" onClick={saveClickHandler}>Save</Button>}

      </Col>
    </Row>
  );
};

export default DataSheet;
