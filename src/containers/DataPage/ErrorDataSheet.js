/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Button as AntButton, Image, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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

const ErrorDataSheet = (props) => {
  const defaultData = props.reqData;
  const { textResponse, sourceList } = props;

  const formDescription = defaultData.description;
  const formDataType = defaultData.dataType.toUpperCase();

  const [formTextSnippet, setFormTextSnippet] = useState('');
  const [formPageNo, setFormPageNo] = useState('');
  const [formScreenShotPath, setFormScreenShotPath] = useState('');
  const [formResponse, setFormResponse] = useState('');
  const [formSource, setFormSource] = useState('');
  const [formURL, setFormURL] = useState('');
  const [formPublicDate, setFormPublicDate] = useState('');
  const [formScreenShotFile, setFormScreenShotFile] = useState(null);
  const [formComment, setFormComment] = useState('');

  useEffect(() => {
    setFormTextSnippet('');
    setFormPageNo('');
    setFormScreenShotPath('');
    setFormResponse('');
    setFormSource('');
    setFormURL('');
    setFormPublicDate('');
    setFormComment('');
  }, [props.locationData]);

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

  return (
    <React.Fragment>

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
          />
        }
      />}

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
          />
        }
      />

      {/* ADD SOURCE Button */}
      <Col lg={6}>
        <Button onClick={props.openSourcePanel}>Add Source</Button>
      </Col>

      {/* URL Field */}
      <FieldWrapper
        label="URL*"
        visible={false}
        body={
          <Form.Control
            type="text"
            name="url"
            placeholder="Url"
            onChange={onChangeFormURL}
            value={formURL}
          />
        }
      />

      {/* PUBLICATION DATE Field */}
      <FieldWrapper
        label="PublicationDate*"
        visible={false}
        body={
          <DatePicker
            className="datapage-datepicker"
            name="publicationDate"
            size="large"
            onChange={onChangeFormPublicDate}
            value={formPublicDate && moment(formPublicDate)}
          />
        }
      />

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

      {/* Comments Field */}
      <FieldWrapper
        label="Comments*"
        visible
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
    </React.Fragment>
  );
};

export default ErrorDataSheet;
