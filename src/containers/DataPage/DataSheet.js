/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Image } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import 'antd/dist/antd.css';
import { history } from '../../routes';

const DataSheet = ({
  maxIndex, minIndex, currentIndex, currentDpCode, currentTask, location, historyDpCodeData,
}) => {
  const currentUser = 'analyst';
  const [historyEdit, setHistoryEdit] = useState(false);
  //   DEFAULT DATA
  const historicalData = currentDpCode.historyDpData;
  const defaultHistoricalData = historicalData[0];

  const defaultData = (!historyDpCodeData) ?
    {
      dpCode: currentDpCode.dpCode,
      dataType: currentDpCode.dataType,
      year: currentDpCode.fiscalYear,
      pageNo: currentDpCode.pageNo || '',
      url: currentDpCode.url || '',
      publicationDate: currentDpCode.publicationDate || '',
      description: currentDpCode.description,
      textSnippet: currentDpCode.textSnippet || '',
      screen: currentDpCode.screen || '',
      source: currentDpCode.source || '',
      filePath: currentDpCode.filePath || '',
      response: currentDpCode.response || '',
    } :
    {
      dpCode: defaultHistoricalData.dpCode,
      dataType: defaultHistoricalData.dataType,
      year: defaultHistoricalData.fiscalYear,
      pageNo: defaultHistoricalData.pageNo || '',
      url: defaultHistoricalData.url || '',
      publicationDate: defaultHistoricalData.publicationDate || '',
      description: defaultHistoricalData.description,
      textSnippet: defaultHistoricalData.textSnippet || '',
      screen: defaultHistoricalData.screen || '',
      source: defaultHistoricalData.source || '',
      filePath: defaultHistoricalData.filePath || '',
      response: defaultHistoricalData.response || '',
    };

  const [formData, setFormData] = useState(defaultData);
  //   const [imagePreview, setImagePreview] = useState(false);

  useEffect(() => {
    setFormData(defaultData);
    // setImagePreview(null);
  }, [location]);

  console.log(formData, 'sss');

  //   const imageBrowser = (event) => {
  //     console.log(URL.createObjectURL(event.target.files[0]));
  //     setImagePreview(URL.createObjectURL(event.target.files[0]));
  //   };

  const onChangeFormData = (event) => {
    console.log(event);
    const key = event.currentTarget.id;
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
        setFormData({
          ...formData, filePath: URL.createObjectURL(event.target.files[0]),
        });
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

  const saveAndNextClickHandler = () => {
    console.log(formData);
    const nextDpCode = currentTask.data[currentIndex + 1];
    history.push(`/pendingtasks/${currentTask.taskId}/${nextDpCode.dpCode}`);
  };
  const editAndPreviousClickHandler = () => {
    const nextDpCode = currentTask.data[currentIndex - 1];
    history.push(`/pendingtasks/${currentTask.taskId}/${nextDpCode.dpCode}`);
  };

  const onChangeHistoryYear = (event) => {
    setFormData({
      dpCode: event.value.dpCode,
      dataType: event.value.dataType,
      year: event.value.fiscalYear,
      pageNo: event.value.pageNo,
      url: event.value.url,
      publicationDate: event.value.publicationDate,
      description: event.value.description,
      textSnippet: event.value.textSnippet,
      screen: event.value.screen,
      source: event.value.source,
      filePath: event.value.filePath,
      response: event.value.response,
    });
  };
  const sourceApiData = [
    { sourceName: 'Annual Report_2019-2018', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: moment('Tue May 04 2021') },
  ];
  return (
    <Row>
      {/* --------------------------------------------------------------------------------------------- DPCODE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            DP Code*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" readOnly id="dpCode" value={formData.dpCode} />
          </Col>
        </Form.Group>
      </Col>
      { !historyDpCodeData ?
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              Year*
            </Form.Label>
            <Col sm={7}>
              <Select
                id="year"
                name="userRole"
                isDisabled
                onChange={(e) => onChangeFormData({ currentTarget: { id: 'year', value: e } })}
                value={{ label: formData.year, value: formData.year }}
                // onChange={}
                options={[{ label: formData.year, value: formData.year }]}
                // isSearchable={}
                // className={}
                maxLength={30}
              />
            </Col>
          </Form.Group>
        </Col> :
        <Col lg={6}>
          <Form.Group as={Row} >
            <Form.Label column sm={5}>
              History Year*
            </Form.Label>
            <Col sm={7}>
              <Select
                id="year"
                name="userRole"
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
      {/* --------------------------------------------------------------------------------------------- SOURCE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Source*
          </Form.Label>
          <Col sm={7}>
            <Select
              name="userRole"
              id="source"
              isDisabled={historyDpCodeData && !historyEdit}
              onChange={(e) => onChangeFormData({ currentTarget: { id: 'source', value: e } })}
              value={formData.source && { label: formData.source.sourceName, value: formData.source }}
              // onChange={}
              options={sourceApiData.map((source) => ({ label: source.sourceName, value: source }))}
              // isSearchable={}
              // className={}
              placeholder="Choose source"
              maxLength={30}
            />
          </Col>
        </Form.Group>
      </Col>
      {/* --------------------------------------------------------------------------------------------- LINE */}
      <Col lg={12} className="datapage-horizontalLine"></Col>
      {/* --------------------------------------------------------------------------------------------- DESCRIPTION */}
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
      {/* --------------------------------------------------------------------------------------------- Response */}
      <Col lg={4}>
        <Form.Group as={Row} >
          {/* <Form.Label column sm={5}>
            Response*
          </Form.Label> */}
          <Col sm={12}>
            {formData.dataType === 'number' && <Form.Control type="text" id="response" readOnly={historyDpCodeData && !historyEdit} onChange={onChangeFormData} value={formData.response} placeholder="Response" />}
            {formData.dataType === 'date' && <DatePicker className="datapage-datepicker" id="publicationDate" disabled={historyDpCodeData && !historyEdit} onChange={(e) => onChangeFormData({ currentTarget: { id: 'response', value: e } })} value={formData.response && moment(formData.response)} size="large" />}
            {formData.dataType === 'text' &&
            <Select
              name="userRole"
              isDisabled={historyDpCodeData && !historyEdit}
              onChange={(e) => onChangeFormData({ currentTarget: { id: 'response', value: e } })}
              value={formData.response && { label: formData.response, value: formData.response }}
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: 'Na', value: 'Na' }, { label: 'M', value: 'M' }, { label: 'F', value: 'F' }]}
              // isSearchable={}
              // className={}
              maxLength={30}
            />}
          </Col>
        </Form.Group>
      </Col>
      {/* --------------------------------------------------------------------------------------------- PAGE NO */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Page No*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" id="pageNo" readOnly={historyDpCodeData && !historyEdit} onChange={onChangeFormData} value={formData.pageNo} placeholder="Page No" />
          </Col>
        </Form.Group>
      </Col>
      {/* --------------------------------------------------------------------------------------------- TEXT SNIPPET */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Text Snippet*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" id="textSnippet" readOnly={historyDpCodeData && !historyEdit} onChange={onChangeFormData} value={formData.textSnippet} placeholder="Snippet" />
          </Col>
        </Form.Group>
      </Col>
      {/* --------------------------------------------------------------------------------------------- URL */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            URL*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" id="url" readOnly={historyDpCodeData && !historyEdit} onChange={onChangeFormData} value={formData.url} placeholder="Url" />
          </Col>
        </Form.Group>
      </Col>
      {/* --------------------------------------------------------------------------------------------- PUBLICATION DATE */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Publication Date*
          </Form.Label>
          <Col sm={7}>
            <DatePicker className="datapage-datepicker" id="publicationDate" disabled={historyDpCodeData && !historyEdit} onChange={(e) => onChangeFormData({ currentTarget: { id: 'publicationDate', value: e } })} value={formData.publicationDate && moment(formData.publicationDate)} size="large" />
          </Col>
        </Form.Group>
      </Col>
      {/* --------------------------------------------------------------------------------------------- SCREEN */}
      {/* <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Screen*
          </Form.Label>
          <Col sm={7}>
            <Form.Control type="text" id="screen" readOnly={historyDpCodeData} onChange={onChangeFormData} value={formData.screen} placeholder="Screen" />
          </Col>
        </Form.Group>
      </Col> */}
      {/* --------------------------------------------------------------------------------------------- FILE PATH */}
      <Col lg={6}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            Upload Screenshot*
          </Form.Label>
          <Col sm={7}>
            <Form.File
              disabled={historyDpCodeData && !historyEdit}
              id="uploadScreenshot"
              label="Browse"
              custom
              onChange={onChangeFormData}
            />
          </Col>
        </Form.Group>
      </Col>
      <Col lg={6}>
        {/* --------------------------------------------------------------------------------------------- IMAGE PREVIEW */}
        {formData.filePath ? <Image
          width="50%"
          src={formData.filePath}
        /> : null}
      </Col>
      {/* {currentDpCode.isMatrix ? BoardMembers() :
                ( */}
      {/* )
              } */}
      {/* --------------------------------------------------------------------------------------------- LINE */}
      <Col lg={12} className="datapage-horizontalLine"></Col>
      {(currentUser === 'QA') ?
        <React.Fragment>
          {/* --------------------------------------------------------------------------------------------- CHECK ERROR FLAG */}
          <Col lg={12}>
            <Form.Group as={Row} >
              <Col sm={7}>
                <Form.Check type="checkbox" onChange={(e) => { console.log(e); }} label="Error Found" />
              </Col>
            </Form.Group>
          </Col>
          {/* --------------------------------------------------------------------------------------------- ERROR TYPE */}
          <Col lg={6}>
            <Form.Group as={Row} >
              <Form.Label column sm={5}>
                Error Type*
              </Form.Label>
              <Col sm={7}>
                <Select
                  name="userRole"
                  // value={""}
                  // onChange={}
                  // options={}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                />
              </Col>
            </Form.Group>
          </Col>
          {/* --------------------------------------------------------------------------------------------- COMMENTS */}
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
          <Col lg={12} className="datapage-button-wrap">
            {/* <Button style={{ marginRight: '1.5%' }} onClick={qAShowCloseModal} variant="danger" type="submit">Close</Button>
                    <Button variant="success" onClick={qAShowSaveModal} type="submit">Save</Button> */}
            <Button style={{ marginRight: '1.5%' }} onClick={null} variant="danger" type="submit">Close</Button>
            <Button variant="success" onClick={null} type="submit">Save</Button>
          </Col>
        </React.Fragment> :
        (
          <Col lg={12} className="datapage-button-wrap">
            {/* <Button style={{ marginRight: '1.5%' }} variant="danger" onClick={analystShowCloseModal} type="submit">Close</Button>
              <Button variant="success" onClick={analystShowSaveModal} type="submit">Save</Button> */}
            { !historyDpCodeData ?
              <React.Fragment>
                <Button style={{ marginRight: '1.5%' }} variant="danger" onClick={() => { history.push(`/pendingtasks/${currentTask.taskId}`); }} type="submit">Back</Button>
                <Button style={{ marginRight: '1.5%' }} disabled={minIndex === currentIndex} variant="primary" onClick={() => { editAndPreviousClickHandler(); }} type="submit">Previous</Button>
                {maxIndex !== currentIndex && <Button variant="success" disabled={maxIndex === currentIndex} onClick={() => { saveAndNextClickHandler(); }} type="submit">Save And Next</Button>}
                {maxIndex === currentIndex && <Button style={{ marginRight: '1.5%' }} variant="danger" onClick={() => { history.push(`/pendingtasks/${currentTask.taskId}`); }} type="submit">Save And Close</Button> }
              </React.Fragment> :
              <React.Fragment>
                <Button style={{ marginRight: '1.5%' }} variant="primary" onClick={() => setHistoryEdit(true)} type="submit">Edit</Button>
                {/* {historyEdit && <Button style={{ marginRight: '1.5%' }} variant="danger" onClick={() => setHistoryEdit(!historyEdit)} type="submit">Revert</Button>} */}
              </React.Fragment> }
          </Col>
        ) }
    </Row>
  );
};

export default DataSheet;
