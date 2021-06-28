/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row } from 'react-bootstrap';
import { Comment as AntComment, Avatar } from 'antd';
import moment from 'moment';

const ErrorAndComment = (props) => (
  <AntComment
    actions={props.action}
    author={<a>{props.author}</a>}
    avatar={
      <Avatar>{((props.author.split(' ')).map((e) => (e[0]))).join('')}</Avatar>
    }
    content={
      <p>
        <span style={{ fontSize: 18, fontWeight: 700 }}>{props.errorType}<span style={{ fontSize: 14, color: '#e3e3e3' }}> [Error]</span></span>
        <br />
        <br />
        <Row>
          {props.errorInfo}
        </Row>
      </p>
    }
    datetime={
      <span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
    }
  />
);

export default ErrorAndComment;
