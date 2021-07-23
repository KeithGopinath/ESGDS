/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Upload, Button as AntButton, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import moment from 'moment';

const uploadPDFCheck = () => false;

const sourceTypeData = [
  {
    value: '60f9268d290387754929342b',
    label: 'Annual Report',
    isMultiYear: false,
    isMultiSource: false,
    subSourceTypes: [],
  },
  {
    value: '60f926a1290387754929342c',
    label: 'Integrated Report',
    isMultiYear: false,
    isMultiSource: false,
    subSourceTypes: [],
  },
  {
    value: '60f926b6290387754929342d',
    label: 'Sustainability Report',
    isMultiYear: false,
    isMultiSource: false,
    subSourceTypes: [],
  },
  {
    value: '60f926d3290387754929342e',
    label: 'Policy documents',
    isMultiYear: true,
    isMultiSource: true,
    subSourceTypes: [
      {
        value: '60f927ca2903877549293436',
        label: 'Health and Safety Policy',
      },
      {
        value: '60f928172903877549293437',
        label: 'Environment Policy',
      },
      {
        value: '60f928222903877549293438',
        label: 'Modern Slavery Statement',
      },
      {
        value: '60f928312903877549293439',
        label: 'Code of conduct/Code of Ethics',
      },
      {
        value: '60f9283f290387754929343a',
        label: 'Supplier Code of conduct',
      },
      {
        value: '60f92855290387754929343b',
        label: 'Whistleblower',
      },
      {
        value: '60f92863290387754929343c',
        label: 'Corporate Governance Guidelines/Report',
      },
      {
        value: '60f92871290387754929343d',
        label: 'Others',
      },
    ],
  },
  {
    value: '60f926f2290387754929342f',
    label: 'Webpages',
    isMultiYear: true,
    isMultiSource: true,
    subSourceTypes: [
      {
        value: '60f92871290387754929343d',
        label: 'Others',
      },
    ],
  },
  {
    value: '60f9270d2903877549293430',
    label: 'News',
    isMultiYear: false,
    isMultiSource: true,
    subSourceTypes: [
      {
        value: '60f92871290387754929343d',
        label: 'Others',
      },
    ],
  },
  {
    value: '60f927342903877549293431',
    label: 'Press release',
    isMultiYear: true,
    isMultiSource: true,
    subSourceTypes: [
      {
        value: '60f92871290387754929343d',
        label: 'Others',
      },
    ],
  },
  {
    value: '60f9274c2903877549293432',
    label: 'Meeting Notice & Vote results',
    isMultiYear: false,
    isMultiSource: true,
    subSourceTypes: [
      {
        value: '60f92871290387754929343d',
        label: 'Others',
      },
    ],
  },
  {
    value: '60f927632903877549293435',
    label: 'Others',
    isMultiYear: false,
    isMultiSource: false,
    subSourceTypes: [],
  },
];
// Field Wrapper ::
// A function which wraps the fields with bootstrap's row and col tags

const FieldWrapper = (props) => {
  if (props.visible) {
    return (
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={12}>
            {props.label}
          </Form.Label>
          <Col sm={12}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

const AddSource = (props) => {
  // CONTROLLED STATES
  const [currentSourceType, setCurrentSourceType] = useState(null);
  const [currentSubSourceType, setCurrentSubSourceType] = useState(null);
  const [sourceName, setSourceName] = useState('');
  const [isMultiYear, setIsMultiYear] = useState(false);
  const [isMultiSource, setIsMultiSource] = useState(false);
  const [sourceURL, setSourceURL] = useState('');
  const [publicationDate, setPublicationDate] = useState(null);
  const [sourcePDF, setSourcePDF] = useState(null);

  // STATE FOR ERRORS
  const [errors, setErrors] = useState({
    sourceType: null,
    subSourceType: null,
    sourceName: null,
    isMultiYear: null,
    isMultiSource: null,
    sourceURL: null,
    publicationDate: null,
    sourcePDF: null,
  });

  useEffect(() => {
    resetFields();
  }, [currentSourceType]);

  const resetFields = () => {
    setCurrentSubSourceType(null);
    setSourceURL('');
    setPublicationDate(null);
    setSourcePDF(null);
    setErrors({
      sourceType: null,
      subSourceType: null,
      sourceName: null,
      isMultiYear: null,
      isMultiSource: null,
      sourceURL: null,
      publicationDate: null,
      sourcePDF: null,
    });
  };

  const onChangeSourceType = (event) => {
    setCurrentSourceType(event);
    setIsMultiYear(event.isMultiYear);
    setIsMultiSource(event.isMultiSource);
  };

  const onChangeSubSourceType = (event) => {
    setCurrentSubSourceType(event);
  };

  const onChangeSourceName = (event) => {
    setSourceName(event.currentTarget.value);
  };

  const onChangeIsMultiyear = (event) => {
    setIsMultiYear(event.target.value);
  };

  const onChangeIsMultiSource = (event) => {
    setIsMultiSource(event.target.value);
  };

  const onChangeSourceURL = (event) => {
    setSourceURL(event.currentTarget.value);
  };

  const onChangePublicationDate = (event) => {
    setPublicationDate(event);
  };

  const onChangeSourcePDFUpload = (event) => {
    setSourcePDF(event.fileList.length > 0 ? event.fileList : null);
  };

  const validate = () => {
    const sourceTypeCheck = (currentSourceType !== null);
    const subSourceTypeCheck = (currentSubSourceType !== null);
    const sourceNameCheck = (sourceName.length > 0);
    const isMultiYearCheck = (isMultiYear === true || isMultiYear === false);
    const isMultiSourceCheck = (isMultiSource === true || isMultiSource === false);
    const sourceURLCheck = (sourceURL.length > 0);
    const publicationDateCheck = (publicationDate !== null);
    const sourcePDFCheck = (sourcePDF !== null);
    setErrors({
      sourceType: !sourceTypeCheck,
      subSourceType: !subSourceTypeCheck,
      sourceName: !sourceNameCheck,
      isMultiYear: !isMultiYearCheck,
      isMultiSource: !isMultiSourceCheck,
      sourceURL: !sourceURLCheck,
      publicationDate: !publicationDateCheck,
      sourcePDF: !sourcePDFCheck,
    });

    if (currentSourceType) {
      if (currentSourceType.label === 'Others') {
        if (sourceTypeCheck && sourceNameCheck && isMultiYearCheck && sourceURLCheck && publicationDateCheck && sourcePDFCheck) {
          return true;
        }
        return false;
      }
      if (currentSourceType.isMultiSource && currentSubSourceType) {
        if (currentSubSourceType.label === 'Others') {
          if (sourceTypeCheck && subSourceTypeCheck && sourceNameCheck && isMultiYearCheck && sourceURLCheck && publicationDateCheck && sourcePDFCheck) {
            return true;
          }
          return false;
        }
        if (currentSubSourceType.label !== 'Others') {
          if (sourceTypeCheck && subSourceTypeCheck && sourceURLCheck && publicationDateCheck && sourcePDFCheck) {
            return true;
          }
          return false;
        }
      }
      if (!currentSourceType.isMultiSource) {
        if (sourceTypeCheck && sourceURLCheck && publicationDateCheck && sourcePDFCheck) {
          return true;
        }
        return false;
      }
    }
    return false;
  };
  const onClickUpload = () => {
    console.log({
      data: {
        currentSourceType,
        isMultiYear,
        isMultiSource,
        currentSubSourceType,
        sourceURL,
        publicationDate,
        sourcePDF,
        sourceTypeName: currentSourceType && currentSourceType.label === 'Others' && sourceName,
        subSourceTypeName: currentSubSourceType && currentSubSourceType.label === 'Others' && sourceName,
        errors,
      },
    });
    if (validate()) {
      console.log({
        data: {
          currentSourceType,
          isMultiYear,
          isMultiSource,
          currentSubSourceType,
          sourceURL,
          publicationDate,
          sourcePDF,
          sourceTypeName: currentSourceType.label === 'Others' && sourceName,
          subSourceTypeName: currentSubSourceType && currentSubSourceType.label === 'Others' && sourceName,
          errors,
        },
      });
      const newSourceName = !isMultiYear ? (`${sourceName} 2018-2019`) : sourceName;
      const uploadSourceData = { sourceName: newSourceName, url: sourceURL, publicationDate };
      props.onUploadAddSource(uploadSourceData);
      props.closeAddSourcePanel();
    }
  };

  return (
    <Row>

      {/* SOURCE TYPE  */}
      <FieldWrapper
        visible
        label="Source*"
        body={
          <React.Fragment>
            <Select
              name="sourceType"
              onChange={onChangeSourceType}
              value={currentSourceType}
              options={sourceTypeData.map((sourceType) => sourceType)}
              isSearchable
              placeholder="Choose source type"
              maxLength={30}
            />
            {errors.sourceType && <small className="addsource-validate-text">*Required</small>}
          </React.Fragment>
        }
      />

      {/* SUB SOURCE TYPE */}
      {currentSourceType && currentSourceType.isMultiSource && currentSourceType.isMultiSource !== 'true/false' &&
      <FieldWrapper
        visible
        label="Sub Source Type*"
        body={
          <React.Fragment>
            <Select
              name="subSourceType"
              onChange={onChangeSubSourceType}
              value={currentSubSourceType}
              options={currentSourceType.subSourceTypes.map((sourceType) => sourceType)}
              isSearchable
              placeholder="Choose sub-source type"
              maxLength={30}
            />
            {errors.subSourceType && <small className="addsource-validate-text">*Required</small>}
          </React.Fragment>
        }
      />}

      {/* SOURCE NAME */}
      {((currentSourceType && currentSourceType.label === 'Others') || (currentSubSourceType && currentSubSourceType.label === 'Others')) &&
      <FieldWrapper
        visible
        label="Name*"
        body={
          <React.Fragment>
            <Form.Control
              type="text"
              // id="response"
              //   readOnly={historyDpCodeData && !historyEdit}
              onChange={onChangeSourceName}
              value={sourceName}
              placeholder="Enter Source Name"
            />
            {errors.sourceName && <small className="addsource-validate-text">*Should have atleast one character</small>}
          </React.Fragment>
        }
      />}

      {/* IS MULTIYEAR */}
      {currentSourceType && currentSourceType.label === 'Others' &&
      <FieldWrapper
        visible
        label="Is MultiYear*"
        body={
          <React.Fragment>
            <Radio.Group onChange={onChangeIsMultiyear} value={isMultiYear}>
              <Radio value>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </React.Fragment>
        }
      />}

      {/* ISMULTISOURCE */}
      {currentSourceType && currentSourceType.label === 'Others' &&
      <FieldWrapper
        visible
        label="Is MultiSource*"
        body={
          <React.Fragment>
            <Radio.Group onChange={onChangeIsMultiSource} value={isMultiSource}>
              <Radio value>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </React.Fragment>
        }
      />}

      {/* SOURCE URL */}
      <FieldWrapper
        visible
        label="Url*"
        body={
          <React.Fragment>
            <Form.Control
              type="text"
              onChange={onChangeSourceURL}
              value={sourceURL}
              placeholder="Enter Url"
            />
            {errors.sourceURL && <small className="addsource-validate-text">*Should have atleast one character</small>}
          </React.Fragment>
        }
      />

      {/* UPLOAD BUTTON */}
      <FieldWrapper
        visible
        label="Upload*"
        body={
          <React.Fragment>
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
            {errors.sourcePDF && <small className="addsource-validate-text">*Required</small>}
          </React.Fragment>
        }
      />

      {/* PUBLICATION DATE */}
      <FieldWrapper
        visible
        label="Publication Date*"
        body={
          <React.Fragment>
            <DatePicker
              className="datapage-datepicker"
              onChange={onChangePublicationDate}
              value={publicationDate && moment(publicationDate)}
              size="large"
            />
            {errors.publicationDate && <small className="addsource-validate-text">*Required</small>}
          </React.Fragment>
        }
      />
      <Col lg={12} className="datapage-horizontalLine"></Col>
      <Col lg={12} className="datapage-button-wrap">
        <Button variant="success" onClick={onClickUpload} type="submit">Upload</Button>
      </Col>
    </Row>
  );
};

export default AddSource;
