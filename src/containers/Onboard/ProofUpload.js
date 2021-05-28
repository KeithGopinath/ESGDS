/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// proof details
const ProofUpload = ({ role, onCompany, onEmployeeId, onCancelledCheque, previousStep, nextStep, setActiveStep, activeStep }) => {
    const [fileName, setFileName] = useState('');
    const [empID, setEmpID] = useState('');
    const [cancelledCheque, setCancelledCheque] = useState('');
    const [proofUploadAlert, setProofUploadAlert] = useState('');
    const [fileSize, setFileSize] = useState({ authentication: '', idProof: '', cancelCheque: '' });
    const [authValidate, setAuthValidate] = useState(false);
    const [idProofValidate, setIdProofValidate] = useState(false);
    const [chequeValidate, setChequeValidate] = useState(false);

    const onChangeCompRep = (e) => {
        setFileName(e.target.files[0].name);
        onCompany(e.target.files[0]);
        setAuthValidate(false);
        setFileSize({ ...fileSize, authentication: e.target.files[0].size });
    };

    const onChangeEmpId = (e) => {
        setEmpID(e.target.files[0].name);
        onEmployeeId(e.target.files[0]);
        setIdProofValidate(false);
        setFileSize({ ...fileSize, idProof: e.target.files[0].size });
    };

    const onChangeCancelledCheque = (e) => {
        setCancelledCheque(e.target.files[0].name);
        onCancelledCheque(e.target.files[0]);
        setChequeValidate(false);
        setFileSize({ ...fileSize, cancelCheque: e.target.files[0].size });
    };

    const goToLoginCredentials = () => {
        if (role === 'client' || role === 'company') {
            // setValidate(false);
            if (!fileName || !empID) {
                setProofUploadAlert('Should upload all files');
                setAuthValidate(true);
                setIdProofValidate(true);
            } else if ((fileName && fileSize.authentication > 3145728) && (empID && fileSize.idProof > 3145728)) {
                setProofUploadAlert('File size should not be more than 3 MB');
                setAuthValidate(true);
                setIdProofValidate(true);
            } else if (fileName && fileSize.authentication > 3145728) {
                setProofUploadAlert('File size should not be more than 3 MB');
                setAuthValidate(true);
                setIdProofValidate(false);
            } else if (empID && fileSize.idProof > 3145728) {
                setProofUploadAlert('File size should not be more than 3 MB');
                setAuthValidate(false);
                setIdProofValidate(true);
            } else {
                nextStep();
                setAuthValidate(false);
                setIdProofValidate(false);
                setProofUploadAlert('');
                setActiveStep(activeStep + 1);
            }
        } else if (role === 'employee') {
            if (!fileName || !empID || !cancelledCheque) {
                setProofUploadAlert('Should upload all files');
                setAuthValidate(true);
                setIdProofValidate(true);
                setChequeValidate(true);
            } else if ((fileName && fileSize.authentication > 3145728) && (empID && fileSize.idProof > 3145728) && (cancelledCheque && fileSize.cancelCheque > 3145728)) {
                setProofUploadAlert('File size should not be more than 3 MB');
                setAuthValidate(true);
                setIdProofValidate(true);
                setChequeValidate(true);
            } else if (fileName && fileSize.authentication > 3145728) {
                setProofUploadAlert('File size should not be more than 3 MB');
                setAuthValidate(true);
                setIdProofValidate(false);
                setChequeValidate(false);
            } else if (empID && fileSize.idProof > 3145728) {
                setProofUploadAlert('File size should not be more than 3 MB');
                setAuthValidate(false);
                setIdProofValidate(true);
                setChequeValidate(false);
            } else if (cancelledCheque && fileSize.cancelCheque > 3145728) {
                setProofUploadAlert('File size should not be more than 3 MB');
                setAuthValidate(false);
                setIdProofValidate(false);
                setChequeValidate(true);
            } else {
                nextStep();
                setChequeValidate(false);
                setAuthValidate(false);
                setIdProofValidate(false);
                setProofUploadAlert('');
                setActiveStep(activeStep + 1);
            }
        }
    };

    const goToPersonalDetails = () => {
        previousStep();
        setActiveStep(activeStep - 1);
    };

    const renderTooltip = (props) => (
        <Tooltip className="proofUpload-tooltip" {...props}>
            File size should not exceed 3MB
        </Tooltip>
    );

    return (
        <Container>
            <Row className="proof-content">
                <Card className="personal-details shadow mb-5">
                    <h4 className="proof-text">Proof Upload</h4>
                    <Row className="d-flex ml-2 mr-2">
                        <Col sm={6} md={6} lg={6} >
                            <Form.Group>
                                {role === 'company' && <Form.Label>Upload your letter of Authentication(for company representative) <sup className="text-danger">*</sup>
                                    <span>
                                        <OverlayTrigger placement="top" overlay={renderTooltip} className="proof-upload-tooltip">
                                            <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                                        </OverlayTrigger>
                                    </span>
                                </Form.Label>}
                                {role === 'client' && <Form.Label className="client-proof-upload">Upload your letter of Authentication(for client representative) <sup className="text-danger">*</sup>
                                    <span>
                                        <OverlayTrigger placement="top-start" overlay={renderTooltip} className="proof-upload-tooltip">
                                            <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                                        </OverlayTrigger>
                                    </span>
                                </Form.Label>}
                                {role === 'employee' && <Form.Label>Upload your Pan Card <sup className="text-danger">*</sup>
                                    <span>
                                        <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                                            <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                                        </OverlayTrigger>
                                    </span>
                                </Form.Label>}
                                <Form.File
                                    type="file"
                                    className={authValidate && 'file-not-upload'}
                                    id="choose-file"
                                    label={fileName === '' ? 'Drag and drop a file or click' : fileName}
                                    onChange={onChangeCompRep}
                                    custom
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                            <Form.Group>
                                {role === 'company' && <Form.Label>Upload your employee ID proof(for company representative) <sup className="text-danger">*</sup>
                                    <span>
                                        <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                                            <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                                        </OverlayTrigger>
                                    </span>
                                </Form.Label>}
                                {role === 'client' && <Form.Label className="client-proof-upload">Upload your company ID proof(for client  representative) <sup className="text-danger">*</sup>
                                    <span>
                                        <OverlayTrigger placement="top" overlay={renderTooltip} className="proof-upload-tooltip">
                                            <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                                        </OverlayTrigger>
                                    </span>
                                </Form.Label>}
                                {role === 'employee' && <Form.Label>Upload your Aadhar <sup className="text-danger">*</sup>
                                    <span>
                                        <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                                            <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                                        </OverlayTrigger>
                                    </span>
                                </Form.Label>}
                                <Form.File
                                    type="file"
                                    className={idProofValidate && 'file-not-upload'}
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
                                    className={chequeValidate && 'file-not-upload'}
                                    id=""
                                    label={cancelledCheque === '' ? 'Drag and drop a file or click' : cancelledCheque}
                                    onChange={onChangeCancelledCheque}
                                    custom
                                />
                            </Form.Group>
                        </Col>}
                    </Row>
                    <span className="w-100 text-center text-danger">{proofUploadAlert}</span>
                    <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
                </Card>
                <div className="d-flex justify-content-between w-100">
                    <span><Button className="back" onClick={goToPersonalDetails}>Back</Button></span>
                    <span><Button className="save-continue" onClick={goToLoginCredentials}>Save & Continue</Button></span>
                </div>
            </Row>
        </Container>
    );
};

export default ProofUpload;
