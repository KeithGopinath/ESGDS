/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Image, Upload, Button as AntButton, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Select from 'react-select';
import moment from 'moment';
import 'antd/dist/antd.css';
import { history } from '../../routes';
import DataComment from './DataComment';


const DataSheet = (props) => {
  const {
    isAnalyst, isAnalystHistory, isQA, isQAHistory, isCompanyRep, isCompanyRepHistory, indexes, dpCodeData, taskData, sourceData, openSourcePanel, location, errorList,
  } = props;
  console.log(props);
  const { minIndex, currentIndex, maxIndex } = indexes || { minIndex: null, currentIndex: null, maxIndex: null };

  // # historicalData # A Variable Is Just A List Of Historical Data Of currentDpCode
  const { historicalData } = dpCodeData;

  // # defaultHistoricalData # A variable which stores a 0th index of Historical Data List
  const defaultHistoricalData = historicalData[0];

  // # isHistoryEditable # A Boolean State which makes historicalData editable on OnClick
  const [isQAHistoryEditable, setIsQAHistoryEditable] = useState(false);
  const [isAnalystHistoryEditable, setIsAnalystHistoryEditable] = useState(false);

  // # getCondition #  A Function which returns the condition to disable the formData fields based on the certain role types
  const getCondition = () => {
    if (isAnalyst) {
      return false;
    } else if (isAnalystHistory) {
      return !isAnalystHistoryEditable;
    } else if (isQA) {
      return true;
    } else if (isQAHistory) {
      return !isQAHistoryEditable;
    } else if (isCompanyRep) {
      return true;
    } else if (isCompanyRepHistory) {
      return true;
    }
    return false;
  };

  const isHistoryType = isAnalystHistory || isQAHistory || isCompanyRepHistory;

  const isFieldDisabled = getCondition();

  // # defaultData # A Variable Is Used For Initializing The formData State Based On The Data That Comes From Props
  const defaultData = (!isHistoryType) ?
    {
      dpCode: dpCodeData.dpCode,
      year: dpCodeData.fiscalYear,
      description: dpCodeData.description,
      dataType: dpCodeData.dataType,
      textSnippet: dpCodeData.textSnippet || '',
      pageNo: dpCodeData.pageNo || '',
      filePath: dpCodeData.screenShot || '',
      response: dpCodeData.response || '',
      screen: dpCodeData.screen || '',
      source: dpCodeData.source || '',
      url: (dpCodeData.source && dpCodeData.source.url) || '',
      publicationDate: (dpCodeData.source && dpCodeData.source.publicationDate) || '',
      screenShotFile: null,
    } :
    {
      dpCode: defaultHistoricalData.dpCode,
      year: defaultHistoricalData.fiscalYear,
      description: defaultHistoricalData.description,
      dataType: defaultHistoricalData.dataType,
      textSnippet: defaultHistoricalData.textSnippet || '',
      pageNo: defaultHistoricalData.pageNo || '',
      filePath: defaultHistoricalData.screenShot || '',
      response: defaultHistoricalData.response || '',
      screen: defaultHistoricalData.screen || '',
      source: defaultHistoricalData.source || '',
      url: (defaultHistoricalData.source && defaultHistoricalData.source.url) || '',
      publicationDate: (defaultHistoricalData.source && defaultHistoricalData.source.publicationDate) || '',
      screenShotFile: null,
    };

  // # formData # A State Intialized With defaultData
  const [formData, setFormData] = useState(defaultData);

  // Below useEffect Is Defined To Change (Empty Out/Clear Out) The Current formData State With Respect To Location Prop Attribute
  useEffect(() => {
    setFormData(defaultData);
    setIsAnalystHistoryEditable(false);
    setIsQAHistoryEditable(false);
    setRequestChanges(false);
  }, [location]);

  // onChangeFormData Function Gets Called When Every Form Fields Changes And Updates The formData State
  const onChangeFormData = (event) => {
    const key = event.currentTarget.name;
    switch (key) {
      case 'dpCode':
        setFormData({
          ...formData,
        });
        break;
      case 'year':
        setFormData({
          ...formData, year: event.currentTarget.value.value,
        });
        break;
      case 'pageNo':
        setFormData({
          ...formData, pageNo: event.currentTarget.value,
        });
        break;
      case 'publicationDate':
        setFormData({
          ...formData, publicationDate: event.currentTarget.value,
        });
        break;
      case 'url':
        setFormData({
          ...formData, url: event.currentTarget.value,
        });
        break;
      case 'description':
        setFormData({
          ...formData, description: event.currentTarget.value,
        });
        break;
      case 'textSnippet':
        setFormData({
          ...formData, textSnippet: event.currentTarget.value,
        });
        break;
      case 'screen':
        setFormData({
          ...formData, screen: event.currentTarget.value,
        });
        break;
      case 'source':
        setFormData({
          ...formData, source: event.currentTarget.value.value, url: event.currentTarget.value.value.url, publicationDate: event.currentTarget.value.value.publicationDate,
        });
        break;
      case 'uploadScreenshot':
        if (event.currentTarget.value.fileList[0]) {
          setFormData({
            ...formData, filePath: URL.createObjectURL(event.currentTarget.value.fileList[0].originFileObj), screenShotFile: event.currentTarget.value,
          });
        } else {
          setFormData({
            ...formData, filePath: '', screenShotFile: null,
          });
        }
        break;
      case 'response':
        if (formData.dataType === 'text') {
          setFormData({
            ...formData, response: event.currentTarget.value.value,
          });
        } else if (formData.dataType === 'date') {
          setFormData({
            ...formData, response: event.currentTarget.value,
          });
        } else if (formData.dataType === 'number') {
          setFormData({
            ...formData, response: event.currentTarget.value,
          });
        }
        break;

      default:
        break;
    }
  };

  // saveAndNextClickHandler Function Handle A Click Comes From A Button And Traverse Forth To The Next DpCode Page
  const saveAndNextClickHandler = () => {
    console.log(formData);
    const nextDpCode = taskData.dpCodesData[currentIndex + 1];
    history.push({
      pathname: `/dpcode/${nextDpCode.dpCode}`,
      state: { taskId: taskData.taskId, dpCode: nextDpCode.dpCode },
    });
  };

  // editAndPreviousClickHandler Function Handle A Click Comes From A Button And Traverse Back To The Previous DpCode Page
  const editAndPreviousClickHandler = () => {
    const nextDpCode = taskData.dpCodesData[currentIndex - 1];
    history.push({
      pathname: `/dpcode/${nextDpCode.dpCode}`,
      state: { taskId: taskData.taskId, dpCode: nextDpCode.dpCode },
    });
  };

  const onClickBack = () => {
    history.push({
      pathname: `/task/${taskData.taskId}`,
      state: { taskId: taskData.taskId },
    });
  };

  const onClickSaveAndClose = () => {
    history.push({
      pathname: `/task/${taskData.taskId}`,
      state: { taskId: taskData.taskId },
    });
  };

  const uploadScreenshotCheck = (file) => {
    console.log(file.type);
    if (!(file.type).includes('image')) {
      message.error(`${file.name} is not a image file`);
    }
    return (file.type).includes('image') ? false : Upload.LIST_IGNORE;
  };

  // inChangeHistoryYear Function Change The fromData Values With Respect To The Selected Year
  const onChangeHistoryYear = (event) => {
    console.log(event);
    setFormData({
      dpCode: event.value.dpCode,
      year: event.value.fiscalYear,
      description: event.value.description,
      dataType: event.value.dataType,
      textSnippet: event.value.textSnippet || '',
      pageNo: event.value.pageNo || '',
      filePath: event.value.screenShot || '',
      response: event.value.response || '',
      screen: event.value.screen || '',
      source: event.value.source || '',
      url: (event.value.source && event.value.source.url) || '',
      publicationDate: (event.value.source && event.value.source.publicationDate) || '',
      screenShotFile: null,
    });
  };

  const onClickUnFreeze = () => {
    setIsAnalystHistoryEditable(true);
  };

  const [requestChanges, setRequestChanges] = useState(false);
  const onClickRequestChanges = (event) => {
    setRequestChanges(event.target.checked);
  };


  return (
    <Row>
      {/* ################################################################################################ DPCODE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Dp Code*
          </Form.Label>
          <Col sm={7}>
            <Form.Control
              name="dpCode"
              type="text"
              readOnly
              value={formData.dpCode}
            />
          </Col>
        </Form.Group>
      </Col>

      { !isHistoryType &&
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Year*
            </Form.Label>
            <Col sm={7}>
              <Select
                name="year"
                isDisabled
                value={{ label: formData.year, value: formData.year }}
                options={[{ label: formData.year, value: formData.year }]}
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col> }
      { isHistoryType &&
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              History Year*
            </Form.Label>
            <Col sm={7}>
              <Select
                name="year"
                // onChange={(e) => onChangeFormData({ currentTarget: { id: 'year', value: e } })}
                value={{ label: formData.year, value: formData.year }}
                onChange={onChangeHistoryYear}
                options={historicalData.map((dpData) => ({ label: dpData.fiscalYear, value: dpData }))}
                // isSearchable={}
                // className={}
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col> }
      {/* ################################################################################################ SOURCE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Source*
          </Form.Label>
          <Col sm={7}>
            <Select
              name="source"
              isDisabled={isFieldDisabled}
              onChange={(e) => onChangeFormData({ currentTarget: { name: 'source', id: 'source', value: e } })}
              value={formData.source && { label: formData.source.sourceName, value: formData.source }}
              // onChange={}
              options={sourceData.map((source) => ({ label: source.sourceName, value: source }))}
              // isSearchable={}
              // className={}
              placeholder="Choose source"
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      {!isHistoryType && !isCompanyRep &&
      <Col lg={6}>
        <Button onClick={openSourcePanel} >Add Source</Button>
      </Col> }
      {/* ################################################################################################ LINE */}
      <Col lg={12} className="datapage-horizontalLine"></Col>
      {/* ################################################################################################ DESCRIPTION */}
      <Col lg={8}>
        <Form.Group as={Row} >
          <Form.Label column sm={4}>
            Description*
          </Form.Label>
          <Form.Label column sm={8}>
            {formData.description}
          </Form.Label>
          {/* <Col sm={8}>
            {formData.description}
            <Form.Control type="text" id="description" onChange={onChangeFormData} value={formData.description} placeholder="Description" />
          </Col> */}
        </Form.Group>
      </Col>
      {/* ################################################################################################ Response */}
      <Col lg={4}>
        <Form.Group as={Row} >
          {/* <Form.Label column sm={5}>
            Response*
          </Form.Label> */}
          <Col sm={12}>
            {formData.dataType === 'number' && <Form.Control type="text" name="response" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.response} placeholder="Response" />}
            {formData.dataType === 'date' && <DatePicker className="datapage-datepicker" name="response" disabled={isFieldDisabled} onChange={(e) => onChangeFormData({ currentTarget: { name: 'response', id: 'response', value: e } })} value={formData.response && moment(formData.response)} size="large" />}
            {formData.dataType === 'text' &&
            <Select
              name="response"
              isDisabled={isFieldDisabled}
              onChange={(e) => onChangeFormData({ currentTarget: { name: 'response', id: 'response', value: e } })}
              value={formData.response && { label: formData.response, value: formData.response }}
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              // isSearchable={}
              // className={}
              maxLength={30}
            />}
          </Col>
        </Form.Group>
      </Col>
      {/* ################################################################################################ TEXT SNIPPET */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            TextSnippet*
          </Form.Label>
          <Col sm={7}>
            {/* <Form.Control type="text" name="textSnippet" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.textSnippet} placeholder="Snippet" /> */}
            <Form.Control as="textarea" name="textSnippet" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.textSnippet} placeholder="Snippet" />
          </Col>
        </Form.Group>
      </Col>
      {/* ################################################################################################ PAGE NO */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            PageNo*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" name="pageNo" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.pageNo} placeholder="Page No" />
          </Col>
        </Form.Group>
      </Col>
      { (isHistoryType || isCompanyRep) &&
        <React.Fragment>
          {/* ################################################################################################ URL */}
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                Url*
              </Form.Label>
              <Col sm={7}>
                <Form.Control type="text" name="url" readOnly={isFieldDisabled} onChange={onChangeFormData} value={formData.url} placeholder="Url" />
              </Col>
            </Form.Group>
          </Col>
          {/* ################################################################################################ PUBLICATION DATE */}
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                PublicationDate*
              </Form.Label>
              <Col sm={7}>
                <DatePicker className="datapage-datepicker" name="publicationDate" disabled={isFieldDisabled} onChange={(e) => onChangeFormData({ currentTarget: { name: 'publicationDate', id: 'publicationDate', value: e } })} value={formData.publicationDate && moment(formData.publicationDate)} size="large" />
              </Col>
            </Form.Group>
          </Col>
        </React.Fragment> }
      {/* ################################################################################################ SCREEN */}
      {/* <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Screen*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" id="screen" readOnly={isHistoryType} onChange={onChangeFormData} value={formData.screen} placeholder="Screen" />
          </Col>
        </Form.Group>
      </Col> */}
      {/* ################################################################################################ FILE PATH */}
      { !isCompanyRep && !isCompanyRepHistory &&
        <React.Fragment>
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                Upload Screenshot*
              </Form.Label>
              <Col sm={7}>
                <Upload className="datapage-ant-upload" fileList={formData.screenShotFile ? formData.screenShotFile.fileList : null} maxCount={1} beforeUpload={uploadScreenshotCheck} onChange={(e) => { onChangeFormData({ currentTarget: { name: 'uploadScreenshot', value: e } }); }}>
                  <AntButton
                    disabled={isFieldDisabled}
                    className="datapage-ant-button"
                    icon={<UploadOutlined />}
                  >Click to Upload
                  </AntButton>
                </Upload>
              </Col>
            </Form.Group>
          </Col>
        </React.Fragment>}
      {formData.filePath &&
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Screenshot*
          </Form.Label>
          <Col sm={7}>
            <Image width="50%" src={formData.filePath} />
          </Col>
        </Form.Group>
      </Col>}
      { isQA &&
        <React.Fragment>
          <Col lg={12} className="datapage-horizontalLine"></Col>
          {/* ################################################################################################ ERROR TYPE */}
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                Error Type*
              </Form.Label>
              <Col sm={7}>
                <Select
                  name="userRole"
                  // value={""}
                  options={errorList.map((e) => ({ label: e, value: e }))}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                />
              </Col>
            </Form.Group>
          </Col>
          {/* ################################################################################################ COMMENTS */}
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                Comments*
              </Form.Label>
              <Col sm={7}>
                <Form.Control as="textarea" aria-label="With textarea" placeholder="Comments" />
              </Col>
            </Form.Group>
          </Col>
        </React.Fragment> }
      { isCompanyRep &&
      <React.Fragment>
        <Col style={{ display: 'flex', flexDirection: 'row-reverse' }} lg={6}>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" checked={requestChanges} onChange={onClickRequestChanges} label="Error" />
          </Form.Group>
        </Col>
      </React.Fragment>}
      { isCompanyRep && requestChanges &&
      <React.Fragment>
        <Col lg={12} className="datapage-horizontalLine"></Col>
        <Col lg={8}>
          <Form.Group as={Row} >
            <Form.Label column sm={4}>
              Description*
            </Form.Label>
            <Form.Label column sm={8}>
              {formData.description}
            </Form.Label>
          </Form.Group>
        </Col>
        <Col lg={4}>
          <Form.Group as={Row} >
            {/* <Form.Label column sm={5}>
            Response*
          </Form.Label> */}
            <Col sm={12}>
              {formData.dataType === 'number' && <Form.Control type="text" name="response" placeholder="Response" />}
              {formData.dataType === 'date' && <DatePicker className="datapage-datepicker" name="response" />}
              {formData.dataType === 'text' &&
              <Select
                name="response"
                // onChange={(e) => onChangeFormData({ currentTarget: { name: 'response', id: 'response', value: e } })}
                // value={formData.response && { label: formData.response, value: formData.response }}
                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
                // isSearchable={}
                // className={}
                maxLength={30}
              />}
            </Col>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Source*
            </Form.Label>
            <Col sm={7}>
              <Select
                name="source"
                // isDisabled={isFieldDisabled}
                // onChange={(e) => onChangeFormData({ currentTarget: { name: 'source', id: 'source', value: e } })}
                // value={formData.source && { label: formData.source.sourceName, value: formData.source }}
                // // onChange={}
                options={sourceData.map((source) => ({ label: source.sourceName, value: source }))}
                // isSearchable={}
                // className={}
                placeholder="Choose source"
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Button onClick={openSourcePanel} >Add Source</Button>
        </Col>
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Text Snippet*
            </Form.Label>
            <Col sm={7}>
              <Form.Control as="textarea" aria-label="With textarea" placeholder="Snippet" />
            </Col>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Page No*
            </Form.Label>
            <Col sm={7}>
              <Form.Control type="text" name="pageNo" placeholder="Page No" />
            </Col>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Upload Screenshot*
            </Form.Label>
            <Col sm={7}>
              <Upload className="datapage-ant-upload" maxCount={1} beforeUpload={uploadScreenshotCheck}>
                <AntButton
                  // disabled={isFieldDisabled}
                  className="datapage-ant-button"
                  icon={<UploadOutlined />}
                >Click to Upload
                </AntButton>
              </Upload>
            </Col>
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Comments*
            </Form.Label>
            <Col sm={7}>
              <Form.Control as="textarea" aria-label="With textarea" placeholder="Comments" />
            </Col>
          </Form.Group>
        </Col>
      </React.Fragment>}
      {(!isAnalyst && !isHistoryType) && <DataComment />}
      {/* ################################################################################################ LINE */}
      <Col lg={12} className="datapage-horizontalLine"></Col>
      <Col lg={12} className="datapage-button-wrap">
        { isAnalyst &&
          <React.Fragment>
            <Button className="datapage-button" variant="danger" onClick={onClickBack} type="submit" >Back</Button>
            <Button className="datapage-button" disabled={minIndex === currentIndex} variant="primary" onClick={editAndPreviousClickHandler} type="submit">Previous</Button>
            {maxIndex !== currentIndex && <Button variant="success" disabled={maxIndex === currentIndex} onClick={saveAndNextClickHandler} type="submit">Save And Next</Button>}
            {maxIndex === currentIndex && <Button className="datapage-button" variant="danger" onClick={onClickSaveAndClose} type="submit">Save And Close</Button> }
          </React.Fragment> }
        { isQA &&
          <React.Fragment>
            <Button className="datapage-button" variant="primary" onClick={null} type="submit">Edit</Button>
            <Button className="datapage-button" variant="danger" onClick={onClickBack} type="submit" >Back</Button>
            <Button className="datapage-button" disabled={minIndex === currentIndex} variant="primary" onClick={editAndPreviousClickHandler} type="submit">Previous</Button>
            {maxIndex !== currentIndex && <Button variant="success" disabled={maxIndex === currentIndex} onClick={saveAndNextClickHandler} type="submit">Save And Next</Button>}
            {maxIndex === currentIndex && <Button className="datapage-button" variant="danger" onClick={onClickSaveAndClose} type="submit">Save And Close</Button>}
          </React.Fragment> }
        { isAnalystHistory &&
          <React.Fragment>
            <Button className="datapage-button" variant="primary" onClick={onClickUnFreeze} type="submit">UnFreeze</Button>
            {isAnalystHistoryEditable && <Button className="datapage-button" variant="success" onClick={null} type="submit">Save</Button>}
          </React.Fragment> }
        { isQAHistory &&
        <React.Fragment>
          <Button className="datapage-button" variant="primary" onClick={null} type="submit">UnFreeze</Button>
        </React.Fragment>
        }
        { isCompanyRep &&
        <React.Fragment>
          <Button className="datapage-button" variant="danger" onClick={onClickBack} type="submit" >Back</Button>
          {maxIndex !== currentIndex && <Button variant="success" disabled={maxIndex === currentIndex} onClick={saveAndNextClickHandler} type="submit">Save And Next</Button>}
          {maxIndex === currentIndex && <Button className="datapage-button" variant="danger" onClick={onClickSaveAndClose} type="submit">Save And Close</Button> }
        </React.Fragment>
        }
      </Col>

    </Row>
  );
};


export default DataSheet;
