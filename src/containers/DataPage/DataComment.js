/* eslint-disable */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { Comment, List, Avatar } from 'antd';
import moment from 'moment';


const DataComment = (props) => {
  const comments = props.reqCommentsList;
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${(comments.length) > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(eachCmt) => (
        <Comment
          author={<span className="author-name">{eachCmt.author}</span>}
          avatar={
            <Avatar className="author-avatar">{eachCmt.author ? eachCmt.author.split(' ').map((e) => (e[0])).join('') : ''}</Avatar>}
          content={
            <p
              style={{
                background: 'rgb(222 222 222 / 34%)',
                padding: '10px',
                width: 'max-content',
                borderRadius: '5px',
              }}
            >{eachCmt.content}
            </p>}
          datetime={`${moment(eachCmt.dateTime).fromNow()}, (${eachCmt.fiscalYear})`}
        />)}
    />
  );
};

export default DataComment;
