/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Col, Row, Form } from 'react-bootstrap';
import { Comment, Tag, Divider } from 'antd';
import ErrorDataSheetTwo from './ErrorDataSheet';


const FieldWrapper = (props) => {
  if (props.visible) {
    return (
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col lg={12}>
          <Form.Label>{props.label}</Form.Label>
          {props.body}
        </Col>
      </Row>
    );
  }
  return null;
};


const ErrorPanel = (props) => {
  const defaultError = props.reqErrorData;

  const [isQARaisedError, isCompanyRepRaisedError, isClientRepRaisedError] = [
    defaultError.raisedBy === 'QA',
    (defaultError.raisedBy === 'CompanyRep' || defaultError.raisedBy === 'Company Representative'),
    (defaultError.raisedBy === 'ClientRep' || defaultError.raisedBy === 'Client Representative'),
  ];


  const { errorComment, setErrorComment } = props;
  return (
    <React.Fragment>
      { isQARaisedError &&
      <React.Fragment>
        <Comment
          actions={null}
          author={null}
          avatar={
            <CloseCircleTwoTone style={{ fontSize: 'xx-large' }} twoToneColor="#dc4535" />
          }
          content={
            <React.Fragment>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Tag
                  style={{
                    fontSize: 'x-large',
                    alignItems: 'center',
                    display: 'flex',
                    padding: '1%',
                    width: 'max-content',
                    background: 'none',
                    border: 'none',
                  }}
                  color="orange"
                >
                  {defaultError.type}
                </Tag>
                <Tag style={{ margin: '5px' }}>Raised By {defaultError.raisedBy}</Tag>
                {props.isAccepted !== null && <Tag style={{ margin: '5px' }}>{props.isAccepted ? 'Accepted' : 'Rejected'}</Tag>}
              </div>
              {!props.isAccepted && props.isAccepted !== null && <Divider />}
              <FieldWrapper
                label="Comments*"
                visible={!props.isAccepted && defaultError.errorStatus !== 'Completed' && props.isAccepted !== null}
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
          datetime={null}
        />
      </React.Fragment>}

      { (isCompanyRepRaisedError || isClientRepRaisedError) &&
      <React.Fragment>
        <Comment
          actions={null}
          author={null}
          avatar={
            <CloseCircleTwoTone style={{ fontSize: 'xx-large' }} twoToneColor="#dc4535" />
          }
          content={
            <React.Fragment>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Tag
                  style={{
                    fontSize: 'x-large',
                    alignItems: 'center',
                    display: 'flex',
                    padding: '1%',
                    width: 'max-content',
                    background: 'none',
                    border: 'none',
                  }}
                  color="orange"
                >
                  Recommended Data
                </Tag>
                <Tag style={{ margin: '5px' }}>Raised By {defaultError.raisedBy}</Tag>
                {props.isAccepted !== null && <Tag style={{ margin: '5px' }}>{props.isAccepted ? 'Accepted' : 'Rejected'}</Tag>}
              </div>
              <Divider />
              <Row>
                <ErrorDataSheetTwo isErrorCommentType reqData={defaultError.refData} />
              </Row>
              <Divider />
              <FieldWrapper
                label="Comments*"
                visible={!props.isAccepted && defaultError.errorStatus !== 'Completed' && props.isAccepted !== null}
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
          datetime={null}
        />
      </React.Fragment>}
    </React.Fragment>
  );
};

export default ErrorPanel;
