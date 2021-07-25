/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Upload, Button as AntButton, Radio, Spin, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../../components/PageLoader';


const uploadPDFCheck = (file) => {
  console.log(file.type);
  if (!(file.type).includes('application/pdf')) {
    message.error(`${file.name} is not a pdf file`);
    return Upload.LIST_IGNORE;
  }
  return false;
};

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
  // DISPATCH
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SOURCE_TYPE_GET_REQUEST' });
    setStatusAlert(true);
  }, []);

  const getSourceTypeFromStore = useSelector((state) => state.sourceTypeGet);

  const postSourceTypeFromStore = useSelector((state) => state.sourceTypePost);

  const sourceListAPIData = (getSourceTypeFromStore && getSourceTypeFromStore.source && getSourceTypeFromStore.source.data ? getSourceTypeFromStore.source.data : []);

  console.log(sourceListAPIData);

  console.log(sourcePDF);

  useEffect(() => {
    if (postSourceTypeFromStore && postSourceTypeFromStore.source && postSourceTypeFromStore.source.status && statusAlert) {
      message.success(postSourceTypeFromStore.source.message);
      setStatusAlert(false);
      props.closeAddSourcePanel();
    }
    if (postSourceTypeFromStore && postSourceTypeFromStore.error && statusAlert) {
      message.error(postSourceTypeFromStore.error.message ? postSourceTypeFromStore.error.message : 'Something went wrong, Try again later !');
      setStatusAlert(false);
    }
  }, [postSourceTypeFromStore]);

  useEffect(() => {
    if (getSourceTypeFromStore && getSourceTypeFromStore.source && getSourceTypeFromStore.source.status && statusAlert) {
      message.success(getSourceTypeFromStore.source.message);
      setStatusAlert(false);
    }
    if (getSourceTypeFromStore && getSourceTypeFromStore.error && statusAlert) {
      message.error(getSourceTypeFromStore.error.message ? getSourceTypeFromStore.error.message : 'Something went wrong, Try again later !');
      setStatusAlert(false);
      props.closeAddSourcePanel();
    }
  }, [getSourceTypeFromStore]);

  // CONTROLLED STATES
  const [currentSourceType, setCurrentSourceType] = useState(null);
  const [currentSubSourceType, setCurrentSubSourceType] = useState(null);
  const [sourceName, setSourceName] = useState('');
  const [isMultiYear, setIsMultiYear] = useState(false);
  const [isMultiSource, setIsMultiSource] = useState(false);
  const [sourceURL, setSourceURL] = useState('');
  const [publicationDate, setPublicationDate] = useState(null);
  const [sourcePDF, setSourcePDF] = useState(null);
  const [sourcePDFBase64, setSourcePDF64] = useState(null);

  const [statusAlert, setStatusAlert] = useState(false);

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
    console.log(event);
    setSourcePDF(event.fileList.length > 0 ? event : null);
    getBase64(event.fileList.length > 0 ? event.fileList[0].originFileObj : null).then((e) => setSourcePDF64(e));
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
        sourcePDFBase64,
        sourceTypeName: currentSourceType && currentSourceType.label === 'Others' && sourceName,
        subSourceTypeName: currentSubSourceType && currentSubSourceType.label === 'Others' && sourceName,
        errors,
      },
    });
    if (validate()) {
      const postableData = {
        companyId: props.companyId,
        sourceTypeId: currentSourceType && currentSourceType.value,
        isMultiYear,
        isMultiSource,
        sourceSubTypeId: currentSubSourceType && currentSubSourceType.value,
        url: sourceURL,
        publicationDate: publicationDate._d.toDateString(),
        fiscalYear: props.fiscalYear,
        sourcePDF: sourcePDFBase64,
        newSourceTypeName: currentSourceType && currentSourceType.label === 'Others' && sourceName,
        newSubSourceTypeName: currentSubSourceType && currentSubSourceType.label === 'Others' && sourceName,
      };
      console.log({
        postableData,
      });
      dispatch({ type: 'SOURCE_TYPE_POST_REQUEST', sourceTypeData: postableData });
      setStatusAlert(true);
      // const newSourceName = !isMultiYear ? (`${sourceName} 2018-2019`) : sourceName;
      // const uploadSourceData = { sourceName: newSourceName, url: sourceURL, publicationDate };
      // props.onUploadAddSource(uploadSourceData);
      // props.closeAddSourcePanel();
    }
  };

  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    }
  });

  console.log(getSourceTypeFromStore.isLoading || postSourceTypeFromStore.isLoading);

  return (
    <Spin indicator={<PageLoader />} spinning={getSourceTypeFromStore.isLoading || postSourceTypeFromStore.isLoading}>
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
                options={sourceListAPIData.map((sourceType) => sourceType)}
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
              <Upload
                style={{ width: '100%' }}
                maxCount={1}
                fileList={sourcePDF && sourcePDF.fileList}
                beforeUpload={uploadPDFCheck}
                onChange={onChangeSourcePDFUpload}
              >
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
    </Spin>
  );
};

export default AddSource;
