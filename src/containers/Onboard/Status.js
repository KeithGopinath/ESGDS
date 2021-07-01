/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Status = () => {

  const [statusMessage, setStatusMessage] = useState('');
  const [statusValidation, setStatusValidation] = useState(false);

 const onBoardingStatusSuccess = useSelector((state) => state.onboard.onboard);
 const onBoardingStatusFailure = useSelector((state) => state.onboard.error);

  useEffect(() => {
    if (onBoardingStatusSuccess) {
      setStatusMessage(onBoardingStatusSuccess.message);
      setStatusValidation(true);
    } else if (onBoardingStatusFailure) {
      setStatusMessage(onBoardingStatusFailure.message);
      setStatusValidation(false);
    }
  }, [onBoardingStatusSuccess, onBoardingStatusFailure]);

  return (
    <Row className="logincred-content mr-0">
      <Card className="logincred-details shadow mb-5">
        <Col className="onboarding-status text-center">
          {statusValidation === true ? 
            <FontAwesomeIcon className="status-icon text-success" icon={faCheckCircle} />:
            <FontAwesomeIcon className="status-icon text-danger" icon={faTimesCircle} />}
            <p className={statusValidation === true ?'text-success': 'text-danger'}>{statusMessage}</p>

          {/* <p>Your details has been saved successfully. We will get back to you shortly through mail </p> */}
        </Col>
      </Card>
    </Row>
  );

};

export default Status;