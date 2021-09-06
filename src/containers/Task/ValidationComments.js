/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { Modal } from 'antd';

import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ValidationComments = () => {
  const [isCmtModalOpened, setIsCmtModalOpened] = useState(false);
  return (
    <React.Fragment>
      <div
        title="Add Comments"
        onClick={() => { setIsCmtModalOpened(true); }}
        style={{ cursor: 'pointer', color: 'dodgerblue' }}
      >
        <FontAwesomeIcon icon={faCommentAlt} />
      </div>
      <Modal
        title="Add Comments"
        className="task-modal"
        maskClosable={false}
        width="80%"
        style={{ maxWidth: '700px' }}
        visible={isCmtModalOpened}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="success">Sumbit</Button>
          </div>}
        onCancel={() => setIsCmtModalOpened(false)}
      >
        <React.Fragment>
          <Form.Control
            as="textarea"
            disabled={false}
            aria-label="With textarea"
            placeholder="Comments"
            onChange={null}
          />
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

export default ValidationComments;
