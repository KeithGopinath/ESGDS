/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { CloseCircleTwoTone } from '@ant-design/icons';
import { Col, Row, Form } from 'react-bootstrap';
import { Comment, Tag, Tooltip, Divider } from 'antd';
import ErrorDataSheetTwo from './ErrorDataSheet2';


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
    defaultError.raisedBy === 'CompanyRep',
    defaultError.raisedBy === 'ClientRep',
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
                >
                  Data/information Missed
                </Tag>
                <Tag style={{ margin: '5px' }}>Raised By QA</Tag>
                <Tag style={{ margin: '5px' }}>
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                </Tag>
              </div>
              {!props.isAccepted && props.isAccepted !== null && <Divider />}
              {/* {props.isAccepted !== null && <Divider orientation="left">{`Status: ${props.isAccepted ? 'Accepted' : (props.isAccepted === false ? 'Rejected' : '')}`}</Divider>} */}
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
                >
                  Data/information Missed
                </Tag>
                <Tag style={{ margin: '5px' }}>Raised By Client Representative</Tag>
                <Tag style={{ margin: '5px' }}>
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                </Tag>
              </div>
              <Divider />
              <Row>
                <ErrorDataSheetTwo isErrorCommentType reqData={defaultError.refData} />
              </Row>
              <Divider />
              {/* {props.isAccepted !== null && <Divider orientation="left">{`Status: ${props.isAccepted ? 'Accepted' : (props.isAccepted === false ? 'Rejected' : '')}`}</Divider>} */}
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
          datetime={null}
        />
      </React.Fragment>}
    </React.Fragment>
  );
};

export default ErrorPanel;
