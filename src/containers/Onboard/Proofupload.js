import React, { useState } from 'react';
import { Card, Container, Form, Row, Col, Button } from 'react-bootstrap';
import { history } from './../../routes';

const Proofupload = () => {
  const [fileName, setFileName] = useState('');
  const [empID, setEmpID] = useState('');

  const onBackPersonalDetails = () => {
    history.push('/personal');
  };

  const goToLoginCredentials = () => {
    history.push('/logincredentials');
    history.pushState({ fileName }, { empID });
  };

  const onChangeCompRep = (e) => {
    setFileName(e.target.files[0].name);
  };

  const onChangeEmpId = (e) => {
    setEmpID(e.target.files[0].name);
  };

  return (
    <Container>
      <Card className="proof-details shadow mb-5">
        <h4 className="proof-text">Proof Upload</h4>
        <Row className="d-flex justify-content-around">
          <Col sm={6} md={6} lg={4} >
            <Form.Group>
              <Form.Label>Upload your letter fo Authentication(for company representative)</Form.Label>
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
          <Col sm={6} md={6} lg={4}>
            <Form.Group>
              <Form.Label>Upload your employee ID proof(for company representative)</Form.Label>
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
        </Row>
      </Card>
      <div>
        <Button className="btn-back" onClick={onBackPersonalDetails}> Back </Button>
        <Button className="save-btn float-right" onClick={goToLoginCredentials}>Save & Continue</Button>
      </div>
    </Container>
  );
};

export default Proofupload;
