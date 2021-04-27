/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Container } from 'react-bootstrap';

// proof details
const ProofUpload = ({ role }) => {
    const [fileName, setFileName] = useState('');
    const [empID, setEmpID] = useState('');
    const [cancelledCheque, setCancelledCheque] = useState('');

    const onChangeCompRep = (e) => {
        setFileName(e.target.files[0].name);
    };

    const onChangeEmpId = (e) => {
        setEmpID(e.target.files[0].name);
    };

    const onCancelledCheque = (e) => {
        setCancelledCheque(e.target.files[0].name);
    };

    return (
        <Container>
            <Row className="proof-content">
                <Card className="personal-details shadow mb-5">
                    <h4 className="proof-text">Proof Upload</h4>
                    <Row className="d-flex ml-2 mr-2">
                        <Col sm={6} md={6} lg={6} >
                            <Form.Group>
                                {role === 'company' && <Form.Label>Upload your letter of Authentication(for company representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'client' && <Form.Label className="client-proof-upload">Upload your letter of Authentication(for client representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'employee' && <Form.Label>Upload your Pancard <sup className="text-danger">*</sup></Form.Label>}
                                <Form.File
                                    type="file"
                                    className=""
                                    id=""
                                    label={fileName}
                                    onChange={onChangeCompRep}
                                    custom
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                            <Form.Group>
                                {role === 'company' && <Form.Label>Upload your employee ID proof(for company representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'client' && <Form.Label className="client-proof-upload">Upload your company ID proof(for client  representative) <sup className="text-danger">*</sup></Form.Label>}
                                {role === 'employee' && <Form.Label>Upload your Aadhar <sup className="text-danger">*</sup></Form.Label>}
                                <Form.File
                                    type="file"
                                    className=""
                                    id=""
                                    label={empID}
                                    onChange={onChangeEmpId}
                                    custom
                                />
                            </Form.Group>
                        </Col>
                        {role === 'employee' && <Col sm={6} md={6} lg={6}>
                            <Form.Group>
                                <Form.Label>Upload your Cancelled Cheque <sup className="text-danger">*</sup></Form.Label>
                                <Form.File
                                    type="file"
                                    className=""
                                    id=""
                                    label={cancelledCheque}
                                    onChange={onCancelledCheque}
                                    custom
                                />
                            </Form.Group>
                        </Col>}
                    </Row>
                    <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required Fields</span>
                    <p className="ml-3 mt-2"><sup className="text-danger">*</sup> Each file size should not exceed 3 MB </p>
                </Card>
            </Row>
        </Container>
    );
};

export default ProofUpload;
