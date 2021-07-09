/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import PageLoader from '../../components/PageLoader';

const Status = () => {

  const [statusMessage, setStatusMessage] = useState('');
  const [statusValidation, setStatusValidation] = useState(false);

 const onBoardingStatusSuccess = useSelector((state) => state.onboard.onboard);
 const onBoardingStatusFailure = useSelector((state) => state.onboard.error);
 const loadder = useSelector((state) => state.onboard.isLoading);

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
        <Col className="text-center">
          {loadder ? <PageLoader /> :
          <React.Fragment>
          {statusValidation === true ? 
            <FontAwesomeIcon className="status-icon text-success" icon={faCheckCircle} />:
            <FontAwesomeIcon className="status-icon text-danger" icon={faTimesCircle} />}
            <p className={statusValidation === true ?'text-success': 'text-danger'}>{statusMessage}</p>
            </React.Fragment>
          }
        </Col>
      </Card>
    </Row>
  );

};

export default Status;