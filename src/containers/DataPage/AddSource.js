/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Upload, Button as AntButton, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
// import Select from 'react-select';
import moment from 'moment';
const sourceTypeData = [
  { sourceTypeName: 'Annual Report', isMultiyear: false, IsMultisource: false },
  { sourceTypeName: 'Integrated Report', isMultiyear: false, IsMultisource: false },
  { sourceTypeName: 'Sustainability Report', isMultiyear: false, IsMultisource: false },
  {
    sourceTypeName: 'Policy documents',
    isMultiyear: true,
    IsMultisource: true,
    subSourceTypes: [
      'Health and Safety Policy',
      'Environment Policy',
      'Modern Slavery Statement',
      'Code of conduct/Code of Ethics',
      'Supplier Code of conduct',
      'Whistleblower',
      'Corporate Governance Guidelines/Report',
      'Others',
    ],
  },
  {
    sourceTypeName: 'Webpages',
    isMultiyear: true,
    IsMultisource: true,
    subSourceTypes: ['Others'],
  },
  {
    sourceTypeName: 'News', isMultiyear: false, IsMultisource: true, subSourceTypes: ['Others'],
  },
  {
    sourceTypeName: 'Press release', isMultiyear: true, IsMultisource: true, subSourceTypes: ['Others'],
  },
  {
    sourceTypeName: 'Meeting Notice & Vote results', isMultiyear: false, IsMultisource: true, subSourceTypes: ['Others'],
  },
  {
    sourceTypeName: 'Others', isMultiyear: 'true/false', IsMultisource: false,
  },
];
const uploadPDFCheck = () => false;
const AddSource = (props) => {
  // CONTROLLED STATES
  const [currentSourceType, setCurrentSourceType] = useState(null);
  const [currentSubSourceType, setCurrentSubSourceType] = useState(null);
  const [sourceName, setSourceName] = useState('');
  const [isMultiyear, setIsMultiyear] = useState(false);
  const [sourceURL, setSourceURL] = useState('');
  const [publicationDate, setPublicationDate] = useState(null);
  const [sourcePDF, setSourcePDF] = useState(null);

  useEffect(() => {
    resetFields();
  }, [currentSourceType]);

  const resetFields = () => {
    setCurrentSubSourceType(null);
    setIsMultiyear(false);
    setSourceURL('');
  };

  const onChangeSourceType = (event) => {
    setCurrentSourceType(event.currentTarget.value);
    if (event.currentTarget.value.label !== 'Others') {
      setSourceName(event.currentTarget.value.label);
    } else {
      setSourceName('');
    }
  };

  const onChangeSubSourceType = (event) => {
    setCurrentSubSourceType(event.currentTarget.value);
    if (event.currentTarget.value.label !== 'Others') {
      setSourceName(event.currentTarget.value.label);
    } else {
      setSourceName('');
    }
  };

  const onChangeSourceName = (event) => {
    setSourceName(event.currentTarget.value);
  };

  const onChangeIsMultiyear = (event) => {
    setIsMultiyear(event.target.value);
  };

  const onChangeSourceURL = (event) => {
    setSourceURL(event.currentTarget.value);
  };

  const onChangePublicationDate = (event) => {
    setPublicationDate(event.currentTarget.value);
  };

  const onChangeSourcePDFUpload = (event) => {
    setSourcePDF(event);
  };

  const onClickUpload = () => {
    console.log(sourcePDF);
    const newSourceName = (currentSourceType.label === 'Others' || (currentSubSourceType && currentSubSourceType.label === 'Others')) && !isMultiyear ? (`${sourceName} 2018-2019`) : sourceName;
    const uploadSourceData = { sourceName: newSourceName, url: sourceURL, publicationDate };
    props.onUploadAddSource(uploadSourceData);
    props.closeAddSourcePanel();
  };

  return (
    <Row>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            Source*
          </Form.Label>
          <Col sm={12}>
            <Select
              name="sourceType"
              // isDisabled={isFieldDisabled}
              onChange={(e) => onChangeSourceType({ currentTarget: { name: 'sourceType', id: 'sourceType', value: e } })}
              value={currentSourceType}
              // onChange={}
              options={sourceTypeData.map((sourceType) => ({ label: sourceType.sourceTypeName, value: sourceType }))}
              // isSearchable={}
              // className={}
              placeholder="Choose source type"
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      { currentSourceType && currentSourceType.value.IsMultisource &&
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            Sub Source Type*
          </Form.Label>
          <Col sm={12}>
            <Select
              name="subSourceType"
              // isDisabled={isFieldDisabled}
              onChange={(e) => onChangeSubSourceType({ currentTarget: { name: 'subSourceType', id: 'subSourceType', value: e } })}
              value={currentSubSourceType}
              // onChange={}
              options={currentSourceType.value.subSourceTypes.map((sourceType) => ({ label: sourceType, value: sourceType }))}
              // isSearchable={}
              // className={}
              placeholder="Choose sub-source type"
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col> }
      { ((currentSourceType && currentSourceType.label === 'Others') || (currentSubSourceType && currentSubSourceType.label === 'Others')) &&
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            Name*
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              type="text"
              // id="response"
              //   readOnly={historyDpCodeData && !historyEdit}
              onChange={onChangeSourceName}
              value={sourceName}
              placeholder="Enter Source Name"
            />
          </Col>
        </Form.Group>
      </Col> }
      { currentSourceType && currentSourceType.label === 'Others' &&
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            Is MultiYear*
          </Form.Label>
          <Col sm={12}>
            <Radio.Group onChange={onChangeIsMultiyear} value={isMultiyear}>
              <Radio value>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Col>
        </Form.Group>
      </Col> }
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            Url*
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              type="text"
              // id="response"
              //   readOnly={historyDpCodeData && !historyEdit}
              onChange={onChangeSourceURL}
              value={sourceURL}
              placeholder="Enter Url"
            />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            Upload*
          </Form.Label>
          <Col sm={12}>
            <Upload style={{ width: '100%' }} multiple beforeUpload={uploadPDFCheck} onChange={onChangeSourcePDFUpload}>
              <AntButton
              // disabled={isFieldDisabled}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px',
                }}
                icon={<UploadOutlined />}
              >Click to Upload
              </AntButton>
            </Upload>
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            Publication Date*
          </Form.Label>
          <Col sm={12}>
            <DatePicker
              className="datapage-datepicker"
              // id="publicationDate"
              // disabled={historyDpCodeData && !historyEdit}
              onChange={(e) => onChangePublicationDate({ currentTarget: { id: 'publicationDate', value: e } })}
              value={publicationDate && moment(publicationDate)}
              size="large"
            />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={12} className="datapage-horizontalLine"></Col>
      <Col lg={12} className="datapage-button-wrap">
        <Button variant="success" onClick={onClickUpload} type="submit">Upload</Button>
      </Col>
    </Row>
  );
};

export default AddSource;
