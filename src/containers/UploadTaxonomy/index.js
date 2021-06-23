/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const UploadTaxonomy = ({ show, handleClose, subsetName, subsetId }) => {
    const [file, setFile] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const dispatch = useDispatch();

    const fileHandler = (e) => {
        let file = e.target.files[0];
        console.log(file);
        let reader = new FileReader();
        reader.onloadend = function () {
            setFile(reader.result);
        }
        reader.readAsDataURL(file);
    };

    const closeButton = () => {
        handleClose();
        setAlertMsg('');
    }

    const onSubmit = () => {
        if (!file) {
            setAlertMsg('Please choose a file to upload');
        }
        else {
            const payload = {
                id: subsetId,
                taxonomyName: subsetName,
                file
            }
            console.log(payload);
        }
    };

    const taxonomyBody = () => (
        <div>
            <Row className="upload-taxonomy-container">
                <Col md={12}>
                    <Form.Control
                        type="file"
                        name="uploadTaxonomy"
                        onChange={fileHandler}
                        className="upload-taxonomy-file"
                        accept=".xlsx, .xls, .csv"
                    />
                </Col>
            </Row>
        </div>
    )

    // condition for alertClassName
    const alertClassName = alert ? 'danger' : 'success';

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
            title="Upload File"
            body={taxonomyBody()}
            alert={alertMsg}
            primary="Upload"
            onSubmitPrimary={onSubmit}
            alertClass={alertClassName}
        />
    );
};

export default UploadTaxonomy;