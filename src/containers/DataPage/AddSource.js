import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { DatePicker, Upload, Button as AntButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import Select from 'react-select';
// import moment from 'moment';
const uploadScreenshotCheck = () => false;
const AddSource = () => (
  <Row>
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
            //   onChange={onChangeFormData}
            //   value={formData.response}
            placeholder="Enter Name"
          />
        </Col>
      </Form.Group>
    </Col>
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
            //   onChange={onChangeFormData}
            //   value={formData.response}
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
          <Upload style={{ width: '100%' }} multiple beforeUpload={uploadScreenshotCheck} onChange={null}>
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
            // onChange={(e) => onChangeFormData({ currentTarget: { id: 'publicationDate', value: e } })}
            // value={formData.publicationDate && moment(formData.publicationDate)}
            size="large"
          />
        </Col>
      </Form.Group>
    </Col>
    <Col lg={12} className="datapage-horizontalLine"></Col>
    <Col lg={12} className="datapage-button-wrap">
      <Button variant="success" onClick={null} type="submit">Upload</Button>
    </Col>
  </Row>
);

export default AddSource;
