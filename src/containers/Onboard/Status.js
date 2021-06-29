/*eslint-disable*/
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Status = () => {
  return (
    <Row className="logincred-content mr-0">
      <Card className="logincred-details shadow mb-5">
        <Col className="onboarding-status text-center">
          <FontAwesomeIcon className="status-icon text-success" icon={faCheckCircle} />
          <p>Your details saved successfully. You will get mail shortly</p>
        </Col>
      </Card>
    </Row>
  );

};

export default Status;