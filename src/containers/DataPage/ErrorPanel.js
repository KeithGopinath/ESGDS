/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap';
import ErrorAndComment from './ErrorAndComment';
import ErrorDataSheetTwo from './ErrorDataSheet2';

const FieldWrapper = (props) => {
  if (props.visible) {
    return (
      <Col lg={12}>
        <Form.Group as={Row} >
          <Form.Label column sm={5}>
            {props.label}
          </Form.Label>
          <Col sm={7}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};


const ErrorPanel = (props) => {
  const defaultError = props.reqErrorData;
  const [isQARaisedError, isCompanyRepRaisedError, isClientRepRaisedError] = [
    defaultError.raisedBy === 'QA',
    defaultError.raisedBy === 'CompanyRep',
    defaultError.raisedBy === 'ClientRep',
  ];

  const [errorComment, setErrorComment] = useState('');
  return (
    <React.Fragment>
      { isQARaisedError &&
      <ErrorAndComment
        action={
          [
            <div>
              <React.Fragment>
                <Button
                  style={{ fontSize: '14px', padding: '2px 5px', margin: 3 }}
                  onClick={props.onClickAccept}
                  variant="success"
                >Accept
                </Button>
                <Button style={{ fontSize: '14px', padding: '2px 5px', margin: 3 }} onClick={props.onClickReject} variant="danger">Reject</Button>
              </React.Fragment>
            </div>,
          ]
        }
        author="QA"
        errorType="Data/information Missed"
        errorInfo={
          <React.Fragment>
            {/* Comments Field */}
            <FieldWrapper
              label="Comments*"
              visible={!props.isAccepted && props.isAccepted !== null}
              body={
                <Form.Control
                  as="textarea"
                  disabled={props.isAccepted}
                  aria-label="With textarea"
                  placeholder="Comments"
                  onChange={(e) => setErrorComment(e.target.value)}
                  value={errorComment}
                />
              }
            />
          </React.Fragment>
        }
      /> }
      { (isCompanyRepRaisedError || isClientRepRaisedError) && false && <div></div> }

      { (isCompanyRepRaisedError || isClientRepRaisedError) &&
      <ErrorAndComment
        action={
          [
            <div>
              <Button style={{ fontSize: '14px', padding: '2px 5px', margin: 3 }} onClick={props.onClickAccept} variant="success">Accept</Button>
              <Button style={{ fontSize: '14px', padding: '2px 5px', margin: 3 }} onClick={props.onClickReject} variant="danger">Reject</Button>
            </div>,
          ]
        }
        author="Company Representative"
        errorType={defaultError.errorType}
        errorInfo={
          <React.Fragment>
            <ErrorDataSheetTwo isErrorCommentType reqData={defaultError.refData} />
            {/* Comments Field */}
            <FieldWrapper
              label="Comments*"
              visible={!props.isAccepted && props.isAccepted !== null}
              body={
                <Form.Control
                  as="textarea"
                  disabled={props.isAccepted}
                  aria-label="With textarea"
                  placeholder="Comments"
                  onChange={(e) => setErrorComment(e.target.value)}
                  value={errorComment}
                />
              }
            />
          </React.Fragment>
        }
      />}
    </React.Fragment>
  );
};

export default ErrorPanel;
