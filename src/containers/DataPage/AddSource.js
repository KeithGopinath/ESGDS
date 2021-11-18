/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
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
  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // CURRENT TAB
  const currentTab = sessionStorage.tab;

  // BOOLEANS BASED ON CURRENT ROLE & SELECTED TAB
  const [isAnalyst_DC, isAnalyst_DCR, isQA_DV, isCompanyRep_DR, isClientRep_DR] = [
    currentRole === 'Analyst' && currentTab === 'Data Collection',
    currentRole === 'Analyst' && currentTab === 'Data Correction',
    currentRole === 'QA',
    currentRole === 'Company Representative' && currentTab === 'Data Review',
    currentRole === 'Client Representative' && currentTab === 'Data Review',
  ];

  // DISPATCH
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SOURCE_TYPE_GET_REQUEST' });
    setStatusAlert(true);
  }, []);

  const [getSourceTypeFromStore, postSourceTypeFromStore] = useSelector((state) => [state.sourceType, state.sourceTypeCreate]);

  const sourceListAPIData = (getSourceTypeFromStore && getSourceTypeFromStore.source && getSourceTypeFromStore.source.data ? getSourceTypeFromStore.source.data : []);

  const { dpCodeDetails, taskDetails } = props.locationData.state;

  const [sourceTypeOthers, subSourceTypeOthers] = [
    [
      {
        value: '-Others-',
        label: '-Others-',
        isMultiYear: false,
        isMultiSource: false,
        subSourceTypes: [],
      },
    ],
    [
      {
        label: '-Others-',
        value: '-Others-',
      },
    ],
  ];

  useEffect(() => {
    if (postSourceTypeFromStore && postSourceTypeFromStore.source && postSourceTypeFromStore.source.status && statusAlert) {
      if (isAnalyst_DC || isAnalyst_DCR || isQA_DV) {
        dispatch({
          type: 'DPCODEDATA_GET_REQUEST',
          payload: {
            taskId: taskDetails.taskId,
            datapointId: dpCodeDetails.dpCodeId,
            year: dpCodeDetails.fiscalYear,
            memberType: taskDetails.memberType === 'Kmp Matrix' ? 'KMP Matrix' : taskDetails.memberType,
            memberName: dpCodeDetails.memberName || '',
            memberId: dpCodeDetails.memberId || '',
          },
          taskType: 'DATA_COLLECTION_CORRECTION_VERIFICATION',
        });
      }
      if (isClientRep_DR || isCompanyRep_DR) {
        dispatch({
          type: 'DPCODEDATA_GET_REQUEST',
          payload: {
            taskId: taskDetails.taskId,
            datapointId: dpCodeDetails.dpCodeId,
            year: dpCodeDetails.fiscalYear,
            memberType: taskDetails.memberType === 'Kmp Matrix' ? 'KMP Matrix' : taskDetails.memberType,
            memberName: dpCodeDetails.memberName || '',
            memberId: dpCodeDetails.memberId || '',
          },
          taskType: 'DATA_REVIEW',
        });
      }
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

  useEffect(() => {
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
  }, [setCurrentSubSourceType]);

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
    setSourceName(event.label === '-Others-' && event.value === '-Others-' ? '' : event.label);
  };

  const onChangeSubSourceType = (event) => {
    setCurrentSubSourceType(event);
    setSourceName(event.label === '-Others-' && event.value === '-Others-' ? '' : event.label);
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
    setSourcePDF(event.fileList.length > 0 ? event : null);
    getBase64(event.fileList.length > 0 ? event.fileList[0].originFileObj : null).then((e) => setSourcePDF64(e));
  };

  const menuListOptionStyles = (base, state) => {
    if (state.data.label === '-Others-' && state.data.value === '-Others-') {
      return ({
        ...base,
        backgroundColor: state.isFocused ? '#2199c887' : state.isSelected ? '#2684FF' : '#e9ecef',
      });
    }
    return ({
      ...base,
    });
  };

  const disabledPublicationDate = (event) => event && event > moment().endOf('day');

  const validate = () => {
    const sourceTypeCheck = (currentSourceType !== null);
    const subSourceTypeCheck = (currentSubSourceType !== null);
    const sourceNameCheck = (sourceName.length > 0);
    const isMultiYearCheck = (isMultiYear === true || isMultiYear === false);
    const isMultiSourceCheck = (isMultiSource === true || isMultiSource === false);
    const sourceURLCheck = (sourceURL.length > 0) &&
    (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(sourceURL)); // REGEX FOR URL VALIDATION
    const publicationDateCheck = (publicationDate !== null);
    const sourcePDFCheck = (currentSourceType && currentSourceType.value === '-Others-' && currentSourceType.label === '-Others-') || (currentSubSourceType && currentSubSourceType.value === '-Others-' && currentSubSourceType.label === '-Others-') || (currentSourceType && currentSourceType.label === 'Webpages') ? true : (sourcePDF !== null);
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
    if (validate()) {
      const postableData = {
        companyId: props.companyId, // THIS DATA IS DEPENDENT ON EACH DPCODE FETCH API
        sourceTypeId: currentSourceType && !(currentSourceType.value === '-Others-' && currentSourceType.label === '-Others-') ? currentSourceType.value : '',
        isMultiYear,
        isMultiSource,
        sourceSubTypeId: currentSubSourceType && !(currentSubSourceType.value === '-Others-' && currentSubSourceType.label === '-Others-') ? currentSubSourceType.value : '',
        url: sourceURL,
        publicationDate,
        fiscalYear: props.fiscalYear,
        sourcePDF: sourcePDFBase64 || '',
        newSourceTypeName: currentSourceType && currentSourceType.label === '-Others-' ? sourceName : '',
        newSubSourceTypeName: currentSubSourceType && currentSubSourceType.label === '-Others-' ? sourceName : '',
        name: !isMultiYear ? `${sourceName}_${props.fiscalYear}` : `${sourceName}`,
      };
      dispatch({ type: 'SOURCE_TYPE_POST_REQUEST', sourceTypeData: postableData });
      setStatusAlert(true);
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

  return (
    <Spin indicator={<PageLoader />} spinning={getSourceTypeFromStore.isLoading || postSourceTypeFromStore.isLoading}>
      <Row>
        {/* SOURCE TYPE  */}
        <FieldWrapper
          visible
          label={<div>Source<span className="addNewMember-red-asterik"> * </span></div>}
          body={
            <React.Fragment>
              <Select
                name="sourceType"
                className={errors.sourceType && 'red-class'}
                onChange={onChangeSourceType}
                value={currentSourceType}
                options={sourceListAPIData.map((sourceType) => sourceType).concat(sourceTypeOthers)}
                isSearchable
                placeholder="Choose source type"
                maxLength={30}
                styles={{
                  option: menuListOptionStyles,
                }}
              />
              {errors.sourceType && <small className="addsource-validate-text">*Required</small>}
            </React.Fragment>
          }
        />

        {/* SUB SOURCE TYPE */}
        {currentSourceType && currentSourceType.isMultiSource && currentSourceType.isMultiSource !== 'true/false' &&
        <FieldWrapper
          visible
          label={<div>Sub Source Type<span className="addNewMember-red-asterik"> * </span></div>}
          body={
            <React.Fragment>
              <Select
                name="subSourceType"
                onChange={onChangeSubSourceType}
                className={errors.subSourceType && 'red-class'}
                value={currentSubSourceType}
                options={currentSourceType.subSourceTypes.map((sourceType) => sourceType).concat(subSourceTypeOthers)}
                isSearchable
                placeholder="Choose sub-source type"
                maxLength={30}
                styles={{
                  option: menuListOptionStyles,
                }}
              />
              {errors.subSourceType && <small className="addsource-validate-text">*Required</small>}
            </React.Fragment>
          }
        />}

        {/* SOURCE NAME */}
        {((currentSourceType && currentSourceType.label === '-Others-' && currentSourceType.value === '-Others-') || (currentSubSourceType && currentSubSourceType.label === '-Others-' && currentSubSourceType.label === '-Others-')) &&
        <FieldWrapper
          visible
          label={<div>Name<span className="addNewMember-red-asterik"> * </span></div>}
          body={
            <React.Fragment>
              <Form.Control
                type="text"
                className={errors.sourceName && 'red-class'}
                onChange={onChangeSourceName}
                value={sourceName}
                placeholder="Enter Source Name"
              />
              {errors.sourceName && <small className="addsource-validate-text">*Should have atleast one character</small>}
            </React.Fragment>
          }
        />}

        {/* IS MULTIYEAR */}
        {currentSourceType && currentSourceType.label === '-Others-' && currentSourceType.value === '-Others-' &&
        <FieldWrapper
          visible
          label="Is MultiYear"
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
        {currentSourceType && currentSourceType.label === '-Others-' && currentSourceType.value === '-Others-' &&
        <FieldWrapper
          visible
          label="Is MultiSource"
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
          label={<div>Url<span className="addNewMember-red-asterik"> * </span></div>}
          body={
            <React.Fragment>
              <Form.Control
                type="text"
                onChange={onChangeSourceURL}
                value={sourceURL}
                placeholder="Enter Url"
                className={errors.sourceURL && 'red-class'}
              />
              {errors.sourceURL && <small className="addsource-validate-text">*Invalid Url</small>}
            </React.Fragment>
          }
        />

        {/* UPLOAD BUTTON */}
        <FieldWrapper
          visible
          label={<div>Upload{!((currentSourceType && currentSourceType.value === '-Others-' && currentSourceType.label === '-Others-') || (currentSubSourceType && currentSubSourceType.value === '-Others-' && currentSubSourceType.label === '-Others-') || (currentSourceType && currentSourceType.label === 'Webpages')) && <span className="addNewMember-red-asterik"> * </span>}</div>}
          body={
            <React.Fragment>
              <Upload
                style={{ width: '100%' }}
                maxCount={1}
                className="datapage-ant-upload"
                fileList={sourcePDF && sourcePDF.fileList}
                beforeUpload={uploadPDFCheck}
                onChange={onChangeSourcePDFUpload}
                accept="application/pdf"
              >
                <AntButton
                  className={errors.sourcePDF ? 'red-class datapage-ant-button' : 'datapage-ant-button'}
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
          label={<div>Publication Date<span className="addNewMember-red-asterik"> * </span></div>}
          body={
            <React.Fragment>
              <DatePicker
                format="DD/MM/YYYY"
                className={errors.publicationDate ? 'datapage-datepicker red-class' : 'datapage-datepicker'}
                onChange={onChangePublicationDate}
                value={publicationDate && moment(publicationDate)}
                size="large"
                disabledDate={disabledPublicationDate}
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
