/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ValidationComments = (props) => {
  // DISPATCH
  const dispatch = useDispatch();

  // STATES FROM STORE
  const dpCodeValidationFromStore = useSelector((state) => state.dpCodeValidation);
  const dpCodeValidationList = dpCodeValidationFromStore && dpCodeValidationFromStore.validation;

  // DATA WHICH IS USED TO UPDATE 'dpCodeValidation' FROM STORE WHENEVER SUBMIT BUTTON IS CLICKED
  const replacableData = dpCodeValidationFromStore;

  // STATE TO OPEN/CLOSE Comment Modal
  const [isCmtModalOpened, setIsCmtModalOpened] = useState(false);
  const [comment, setComment] = useState('');
  const [hasError, setHasErrors] = useState({
    comment: false,
  });

  // PROPS
  const { dpCodeDetails, dpCodeType, taskDetails } = props;

  // RETRIEVAL OF OBJECT KEYS BASED ON dpCodeType
  const dpCodeTypeQuery = dpCodeType === 'Standalone' ? 'standalone' : (dpCodeType === 'Board Matrix' ? 'boardMatrix' : 'kmpMatrix');

  const onClickCloseModal = () => {
    setIsCmtModalOpened(false);
  };

  const onClickOpenModal = () => {
    setIsCmtModalOpened(true);
  };

  const onChangeComment = (event) => {
    setComment(event.target.value);
  };

  const doValidate = () => {
    const errors = {
      comment: !(comment.length > 0),
    };
    setHasErrors(errors);
    return !(errors.comment);
  };


  const onClickSubmit = () => {
    if (doValidate()) {
      const postableData = {
        taskId: taskDetails.taskId,
        fiscalYear: dpCodeDetails.fiscalYear,
        dpCode: dpCodeDetails.dpCode,
        dpCodeId: dpCodeDetails.dpCodeId,
        boardMemberId: dpCodeDetails.memberId || '',
        boardMemberName: dpCodeDetails.memberName || '',
        boardMemberType: dpCodeTypeQuery === 'standalone' ? '' : dpCodeTypeQuery,
        comment,
      };

      // CHANGING THE STATUS OF DPCODE TO SUCCESS AFTER CLICKING SUBMIT BUTTON
      const reqDpCodesData = dpCodeValidationList && dpCodeValidationList[dpCodeTypeQuery] && dpCodeValidationList[dpCodeTypeQuery].dpCodesData.length > 0 && dpCodeValidationList[dpCodeTypeQuery].dpCodesData.map((eDpcode) => {
        if (eDpcode.id === dpCodeDetails.id && eDpcode.dpCode === dpCodeDetails.dpCode) {
          return {
            ...eDpcode,
            isValidResponse: true,
            description: [],
          };
        }
        return eDpcode;
      });

      // ASSIGNING THE UPDATED DPCODES LIST TO REPLACABLE DATA
      replacableData.validation[dpCodeTypeQuery].dpCodesData = reqDpCodesData;

      // USING DISPATCH UPDATING THE STORE
      dispatch({ type: 'DPCODE_VALIDATION_UPDATE', updatedValidation: replacableData.validation });
    } else {
      alert('Please Enter Commnet');
    }
  };

  return (
    <React.Fragment>
      <div
        title="Add Comments"
        onClick={onClickOpenModal}
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
            <Button variant="success" onClick={onClickSubmit}>Sumbit</Button>
          </div>}
        onCancel={onClickCloseModal}
      >
        <React.Fragment>
          <Form.Control
            as="textarea"
            className={hasError.comment ? 'addNewMember-red-border' : ''}
            disabled={false}
            aria-label="With textarea"
            placeholder="Comments"
            value={comment}
            style={{ maxHeight: 130, height: 90 }}
            onChange={onChangeComment}
          />
        </React.Fragment>
      </Modal>
    </React.Fragment>
  );
};

ValidationComments.propTypes = {
  dpCodeDetails: PropTypes.object,
  dpCodeType: PropTypes.string,
  taskDetails: PropTypes.object,
};
export default ValidationComments;
