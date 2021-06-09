/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Avatar, Comment, Modal } from 'antd';
import moment from 'moment';
const DataComment = () => {
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <Comment
        style={{ padding: '0 2%', cursor: 'pointer' }}
        onClick={() => setVisible(true)}
        author={<a>QA</a>}
        avatar={
          <Avatar>QA</Avatar>
        }
        content={
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel ex ullamcorper,
            volutpat diam vel, volutpat orci. Nunc in felis sed velit rhoncus eleifend eget tempus ligula.
          </p>
        }
        datetime={
          <span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
        }
      />
      <Modal
        title="Comments"
        centered
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width="80%"
        bodyStyle={{ maxHeight: '50vh', overflow: 'auto' }}
      >
        <Comment
          style={{ padding: '0 2%' }}
          author={<a>Company Representative</a>}
          avatar={
            <Avatar>CR</Avatar>
          }
          content={
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel ex ullamcorper,
              volutpat diam vel, volutpat orci. Nunc in felis sed velit rhoncus eleifend eget tempus ligula.
            </p>
          }
          datetime={
            <span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
          }
        />
        <Comment
          style={{ padding: '0 2%' }}
          author={<a>QA</a>}
          avatar={
            <Avatar>QA</Avatar>
          }
          content={
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel ex ullamcorper,
              volutpat diam vel, volutpat orci. Nunc in felis sed velit rhoncus eleifend eget tempus ligula.
            </p>
          }
          datetime={
            <span>{moment().format('YYYY-MM-DD HH:mm:ss')}</span>
          }
        />
      </Modal>
    </React.Fragment>
  );
};

export default DataComment;
