/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// proof details
const ProofUpload = ({ role, onCompany, onEmployeeId, onCancelledCheque, previousStep, nextStep, setActiveStep, activeStep }) => {
  const [fileName, setFileName] = useState('');
  const [empID, setEmpID] = useState('');
  const [cancelledCheque, setCancelledCheque] = useState('');
  const [fileSize, setFileSize] = useState({ authentication: '', idProof: '', cancelCheque: '' });
  const [uploadFile, setUploadFile] = useState(false);

  // file upload base64 format
  const onChangeCompRep = (e) => {
    let file = e.target.files[0];
    if (file.type.match('^([a-zA-Z0-9-_\s_\\.\-:])+(/png|/jpg|/jpeg)$')) {
      let reader = new FileReader();
      setFileName(file.name);
      reader.onloadend = function () {
        onCompany(reader.result);
      }
      reader.readAsDataURL(file);
      setFileSize({ ...fileSize, authentication: file.size });
    } else {
      message.error("File type should be .png/.jpg/.jpeg");
    }
  }

  const onChangeEmpId = (e) => {
    let file = e.target.files[0];
    if (file.type.match('^([a-zA-Z0-9-_\s_\\.\-:])+(/png|/jpg|/jpeg)$')) {
      setEmpID(file.name);
      let reader = new FileReader();
      reader.onloadend = function () {
        onEmployeeId(reader.result);
      }
      reader.readAsDataURL(file);
      setFileSize({ ...fileSize, idProof: file.size });
    } else {
      message.error('File type should be .png/.jpg/.jpeg');
    }
  };

  const onChangeCancelledCheque = (e) => {
    let file = e.target.files[0];
    if (file.type.match('^([a-zA-Z0-9-_\s_\\.\-:])+(/png|/jpg|/jpeg)$')) {
      let reader = new FileReader();
      setCancelledCheque(file.name);
      reader.onloadend = function () {
        onCancelledCheque(reader.result);
      }
      reader.readAsDataURL(file);
      setFileSize({ ...fileSize, cancelCheque: file.size });
    } else {
      message.error('File type should be .png/.jpg/.jpeg');
    }
  };

  // save and continue
  const goToLoginCredentials = () => {
    if (role === 'client' || role === 'company') {
      if (!fileName && !empID) {
        message.error('Should upload all files');
        setUploadFile(true);
      } else if (!fileName || !empID) {
        message.error('Should upload all files');
        setUploadFile(true);
      } else if ((fileName && fileSize.authentication > 3145728) && (empID && fileSize.idProof > 3145728) || (fileName && fileSize.authentication > 3145728) || (empID && fileSize.idProof > 3145728)) {
        message.error('File size should not be more than 3 MB');
        setUploadFile(true);
      } else {
        nextStep();
        setUploadFile(false);
        setActiveStep(activeStep + 1);
      }
    } else if (role === 'employee') {
      if (!fileName && !empID && !cancelledCheque || !fileName || !empID || !cancelledCheque) {
        message.error('Should upload all files');
        setUploadFile(true);
      } else if (((fileName && fileSize.authentication > 3145728) && (empID && fileSize.idProof > 3145728) && (cancelledCheque && fileSize.cancelCheque > 3145728)) || (fileName && fileSize.authentication > 3145728) || (empID && fileSize.idProof > 3145728) || (cancelledCheque && fileSize.cancelCheque > 3145728)) {
        message.error('File size should not be more than 3 MB');
        setUploadFile(true);
      } else {
        nextStep();
        setUploadFile(false);
        setActiveStep(activeStep + 1);
      }
    }
  };

  // back button
  const goToPersonalDetails = () => {
    previousStep();
    setActiveStep(activeStep - 1);
  };

  // tool tip
  const renderTooltip = (props) => (
    <Tooltip className="proofUpload-tooltip" {...props}>
      <strong>File :</strong>
      <li>type should be in .png/.jpg/.jpeg</li>
      <li>size should not exceed 3MB</li>
    </Tooltip>
  );

  return (
    <Container>
      <Row className="proof-content mr-0">
        <Card className="personal-details shadow mb-5">
          <h4 className="proof-text">Proof Upload</h4>
          <Row className="d-flex ml-2 mr-2">
            <Col sm={6} md={6} lg={6} >
              <Form.Group>
                {role === 'company' && <Form.Label className="company-proof-upload">Upload your letter of Authentication<sup className="text-danger">*</sup>
                  <span>
                    <OverlayTrigger placement="top" overlay={renderTooltip} className="proof-upload-tooltip">
                      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                    </OverlayTrigger>
                  </span>
                </Form.Label>}
                {role === 'client' && <Form.Label className="client-proof-upload">Upload your letter of Authentication<sup className="text-danger">*</sup>
                  <span>
                    <OverlayTrigger placement="top" overlay={renderTooltip} className="proof-upload-tooltip">
                      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                    </OverlayTrigger>
                  </span>
                </Form.Label>}
                {role === 'employee' && <Form.Label>Upload your Pan Card <sup className="text-danger">* </sup>
                  <span>
                    <OverlayTrigger placement="top" overlay={renderTooltip} className="proof-upload-tooltip">
                      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                    </OverlayTrigger>
                  </span>
                </Form.Label>}
                <Form.File
                  type="file"
                  accept="image/*"
                  className={!fileName ? uploadFile && 'file-not-upload' : ''}
                  id="choose-file"
                  label={fileName === '' ? 'Drag and drop a file or click' : fileName}
                  onChange={onChangeCompRep}
                  custom
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={6} lg={6}>
              <Form.Group>
                {role === 'company' && <Form.Label className="company-proof-upload">Upload your employee ID proof <sup className="text-danger">* </sup>
                  <span>
                    <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                    </OverlayTrigger>
                  </span>
                </Form.Label>}
                {role === 'client' && <Form.Label className="client-proof-upload">Upload your company ID proof <sup className="text-danger">* </sup>
                  <span>
                    <OverlayTrigger placement="top" overlay={renderTooltip} className="proof-upload-tooltip">
                      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                    </OverlayTrigger>
                  </span>
                </Form.Label>}
                {role === 'employee' && <Form.Label>Upload your Aadhar <sup className="text-danger">* </sup>
                  <span>
                    <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                    </OverlayTrigger>
                  </span>
                </Form.Label>}
                <Form.File
                  type="file"
                  accept="image/*"
                  className={!empID ? uploadFile && 'file-not-upload' : ''}
                  id=""
                  label={empID === '' ? 'Drag and drop a file or click' : empID}
                  onChange={onChangeEmpId}
                  custom
                />
              </Form.Group>
            </Col>
            {role === 'employee' && <Col sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Upload your Cancelled Cheque <sup className="text-danger">*</sup>                          <span>
                  <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                    <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                  </OverlayTrigger>
                </span>
                </Form.Label>
                <Form.File
                  type="file"
                  accept="image/*"
                  className={!cancelledCheque ? uploadFile && 'file-not-upload' : ''}
                  id=""
                  label={cancelledCheque === '' ? 'Drag and drop a file or click' : cancelledCheque}
                  onChange={onChangeCancelledCheque}
                  custom
                />
              </Form.Group>
            </Col>}
          </Row>
          <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required fields</span>
          <div className="d-flex flex-row justify-content-end mt-1">
            <span><Button className="back mr-1" onClick={goToPersonalDetails}>Back</Button></span>
            <span><Button className="save-continue" onClick={goToLoginCredentials}>Save & Continue</Button></span>
          </div>
        </Card>
      </Row>
    </Container>
  );
};

export default ProofUpload;
