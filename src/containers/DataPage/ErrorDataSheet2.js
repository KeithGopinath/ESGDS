/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Button as AntButton, Image, Upload, message } from 'antd';
import Select from 'react-select';
import moment from 'moment';

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

const ErrorDataSheetTwo = (props) => {
  const currentRole = sessionStorage.role;

  const [isAnalyst, isQA, isCompanyRep, isClientRep] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
    currentRole === 'Company Representative',
    currentRole === 'Client Representative',
  ];

  const defaultData = props.reqData;
  console.log(defaultData, '---------');
  const formDescription = defaultData.description;
  const formDataType = defaultData.dataType.toUpperCase();

  const [formTextSnippet, setFormTextSnippet] = useState(defaultData.textSnippet || '');
  const [formPageNo, setFormPageNo] = useState(defaultData.pageNo || '');
  const [formScreenShotPath, setFormScreenShotPath] = useState(defaultData.screenShot || '');
  const [formResponse, setFormResponse] = useState(defaultData.response || '');
  const [formSource, setFormSource] = useState(defaultData.source || '');
  const [formURL, setFormURL] = useState((defaultData.source && defaultData.source.url) || '');
  const [formPublicDate, setFormPublicDate] = useState((defaultData.source && defaultData.source.publicationDate) || '');
  const [formScreenShotFile, setFormScreenShotFile] = useState(null);
  const [formComment, setFormComment] = useState((defaultData.error && defaultData.error.isThere && defaultData.error.comment) || '');

  useEffect(() => {
    setFormTextSnippet(defaultData.textSnippet || '');
    setFormPageNo(defaultData.pageNo || '');
    setFormScreenShotPath(defaultData.screenShot || '');
    setFormResponse(defaultData.response || '');
    setFormSource(defaultData.source || '');
    setFormURL((defaultData.source && defaultData.source.url) || '');
    setFormPublicDate((defaultData.source && defaultData.source.publicationDate) || '');
    setFormScreenShotFile(null);
    setFormComment((defaultData.error && defaultData.error.isThere && defaultData.error.comment) || '');
  }, [props.locationData]);

  const sourceList = props.reqSourceData;

  const { textResponse } = props;

  const { isError } = props;

  const { isVisible } = props;

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
    if (isAnalyst) {
      if (defaultData.status === 'Completed') {
        return true;
      }
      return false;
    }
    if (isQA) { return true; }
    if (isCompanyRep) {
      if (defaultData.error && defaultData.error.errorStatus === 'Completed') {
        return true;
      }
      return false;
    }
    if (isClientRep) {
      if (defaultData.error && defaultData.error.errorStatus === 'Completed') {
        return true;
      }
      return false;
    }
    return false;
  };

  const disableField = props.isDataCorrection ? true : getIsDisableOrNot();

  const onClickSave = () => {
    const dummyDataReps = {
      fiscalYear: defaultData.fiscalYear,
      error: {
        isThere: isError,
        refData: {
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          response: formResponse,
          source: formSource,
          url: formURL,
          publicationDate: formPublicDate,
        },
        comment: formComment,
        errorStatus: 'Completed',
      },
    };

    props.onClickSave(dummyDataReps);
  };

  const onClickEdit = () => {
    const dummyDataReps = {
      fiscalYear: defaultData.fiscalYear,
      error: {
        isThere: isError,
        refData: {
          textSnippet: formTextSnippet,
          pageNo: formPageNo,
          screenShot: formScreenShotPath,
          response: formResponse,
          source: formSource,
          url: formURL,
          publicationDate: formPublicDate,
        },
        comment: formComment,
        errorStatus: 'unknown',
      },
    };

    props.onClickSave(dummyDataReps);
  };

  return (
    <React.Fragment>

      {/* HORIZONTAL Line */}
      {isVisible && isError &&
      <Col lg={12} className="datapage-horizontalLine"></Col>}

      {/* DESCRIPTION Field */}
      <FieldWrapper
        label="Description*"
        visible={isVisible && isError}
        body={formDescription}
      />

      {/* RESPONSE Field */}
      { formDataType === 'NUMBER' &&
        <FieldWrapper
          label="Response*"
          visible={isVisible && isError}
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
          visible={isVisible && isError}
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
          visible={isVisible && isError}
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

      {/* SOURCE Field */}
      <FieldWrapper
        label="Source*"
        visible={isVisible && isError}
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
      {isVisible && isError &&
      <Col lg={6}>
        <Button onClick={props.openSourcePanel}>Add Source</Button>
      </Col>}

      {/* TEXT SNIPPET Field */}
      <FieldWrapper
        label="Text Snippet*"
        visible={isVisible && isError}
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
        visible={isVisible && isError}
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
        visible={isVisible && isError}
        body={
          <Form.Control
            type="text"
            name="url"
            placeholder="Url"
            onChange={onChangeFormURL}
            value={formURL}
            disabled
          />
        }
      />

      {/* PUBLICATION DATE Field */}
      <FieldWrapper
        label="PublicationDate*"
        visible={isVisible && isError}
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
      <FieldWrapper
        label="Upload Screenshot*"
        visible={isVisible && isError}
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
        visible={isVisible && isError}
        body={
          <Image
            width="50%"
            src={formScreenShotPath}
          />
        }
      />


      {/* Comments Field */}
      <FieldWrapper
        label="Comments*"
        visible={isVisible && isError}
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

      <Col lg={12} className="datapage-button-wrap">
        {isVisible && (defaultData.error ? defaultData.error.errorStatus !== 'Completed' : true) &&
        <Button className="datapage-button" variant="success" onClick={onClickSave}>{`Save ${defaultData.fiscalYear}`}</Button>}
        {isVisible && (defaultData.error && defaultData.error.errorStatus === 'Completed') &&
        <Button className="datapage-button" variant="primary" onClick={onClickEdit}>{`Edit ${defaultData.fiscalYear}`}</Button>}
      </Col>

    </React.Fragment>
  );
};

export default ErrorDataSheetTwo;
