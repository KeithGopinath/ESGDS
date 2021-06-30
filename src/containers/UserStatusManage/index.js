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
    const userUpdate = useSelector((state) => state.userUpdate.userUpdate);
    const userUpdateError = useSelector((state) => state.userUpdate.error);

    useEffect(() => {
        if (userUpdate) {
            setAlertMsg(userUpdate.message);
        }
        else if (userUpdateError) {
            setAlertMsg(userUpdateError.message)
        }
    }, [userUpdate, userUpdateError]);

    useEffect(() => {
        setAlertMsg('')
        setErrorAlert('')
    }, []);

    const closeButton = () => {
        handleClose();
        setErrorAlert('');
        setAlertMsg('');
    }

    const handleRedirect = () => {
        if (decision == 'approve' || decision == 'reject') {
            setTimeout(() => {
                closeButton();
                history.push({ pathname: '/users', state: decision });
            }, 2000);
        } else {
            setTimeout(() => {
                closeButton();
                const payload = { filters: [{ filterWith: "isUserApproved", value: true }] }
                dispatch({ type: 'FILTER_USERS_REQUEST', payload });
            }, 2000);

        }
    }

    const onCommentChange = (e) => {
        setComment(e.target.value)
    }

    const onSubmit = () => {
        if (decision == 'approve') {
            const payload = { userId: userID, userDetails: { isUserApproved: true } }
            dispatch({ type: 'USER_UPDATE_REQUEST', payload });
            handleRedirect();
        }
        else if (decision == 'reject') {
            if (!comment) {
                setAlertMsg('Please enter the comments')
                setErrorAlert('border-danger')
            } else {
                const payload = { userId: userID, userDetails: { isUserApproved: false, comments: comment } }
                dispatch({ type: 'USER_UPDATE_REQUEST', payload });
                handleRedirect();
            }
        }
        else if (decision == 'active') {
            const payload = { userId: userID, userDetails: { isUserActive: true } }
            dispatch({ type: 'USER_UPDATE_REQUEST', payload });
            handleRedirect();
        }
        else if (decision == 'archive') {
            const payload = { userId: userID, userDetails: { isUserActive: false } }
            dispatch({ type: 'USER_UPDATE_REQUEST', payload });
            handleRedirect();
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

    const alertClassName = userUpdate ? 'success' : 'danger';

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