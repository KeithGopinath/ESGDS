/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Col } from 'react-bootstrap';
import Overlay from '../../components/Overlay';
import { history } from '../../routes';


const UserStatusManage = ({ show, handleClose, decision, userID }) => {
    const [comment, setComment] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [errorAlert, setErrorAlert] = useState('');

    const dispatch = useDispatch();

    const closeButton = () => {
        handleClose();
        setErrorAlert('');
        setAlertMsg('');
    }

    const onCommentChange = (e) => {
        setComment(e.target.value)
    }

    const onSubmit = () => {
        if (decision == 'approve') {
            const payload = {
                userId: userID,
                isUserApproved: true,
                comments: "",
            }
            console.log(payload);
            // dispatch({ type: 'COMPANY_LIST_REQUEST' });
            history.push({ pathname: '/users' });
        }
        else if (decision == 'reject') {
            if(!comment){
                setAlertMsg('Please enter the comments')
                setErrorAlert('error-alert')
            } else {
            const payload = {
                userId: userID,
                isUserApproved: false,
                comments: comment
            }
            console.log(payload);
            // dispatch({ type: 'COMPANY_LIST_REQUEST' });
            history.push({ pathname: '/users' });
             }
        }
        else if (decision == 'active') {
            const payload = {
                userId: userID,
                isUserApproved: true,
                comments: '',
                isUserActive: true
            }
            console.log(payload);
            // dispatch({ type: 'COMPANY_LIST_REQUEST' });
        }
        else if (decision == 'archive') {
            const payload = {
                userId: userID,
                isUserApproved: true,
                comments: '',
                isUserActive: false
            }
            console.log(payload);
            // dispatch({ type: 'COMPANY_LIST_REQUEST' });
        }
    };

    const userRejectBody = () => (
        <div>
            <h4>{decision == 'reject' ? 'Do you really want to reject!!' : decision == 'approve' ? 'Do you really want to approve!!'
                : decision == 'active' ? 'Do you really want to activate user!!' : 'Do you really want to deactivate user!!'}</h4>
            {decision == 'reject' &&
                <Col lg={12} sm={12} md={12}>
                    <Form.Group>
                        <Form.Control as="textarea"
                            type="text"
                            value={comment}
                            name="comment"
                            placeholder="Enter your comments"
                            onChange={onCommentChange}
                            className={!comment && errorAlert}
                        />
                    </Form.Group>
                </Col>
            }
        </div>
    )

    const alertClassName = 'danger';

    return (
        <Overlay
            className="text-center otp-modal"
            show={show}
            onHide={closeButton}
            backdrop="static"
            keyboard={false}
            animation
            centered
            size="md"
            body={userRejectBody()}
            primary={decision == 'reject' ? 'Confirm Reject' : decision == 'approve' ? 'Confirm Approve' : decision == 'active' ? 'Activate User' : 'Deactivate User'}
            onSubmitPrimary={onSubmit}
            alert={alertMsg}
            alertClass={alertClassName}
        />
    );
};

export default UserStatusManage;