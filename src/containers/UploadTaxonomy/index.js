/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const UploadTaxonomy = ({ show, handleClose, subsetName, subsetId }) => {
    const [file, setFile] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [fileErrorAlert, setFileErrorAlert] = useState('');
    const [fileLabel, setFileLabel] = useState('');

    const dispatch = useDispatch();
    const taxonomyUpload = useSelector((state) => state.uploadTaxonomy.uploadTaxonomy);
    const taxonomyUploadError = useSelector((state) => state.uploadTaxonomy.error);

    useEffect(() => {
        setAlertMsg('');
        setFile('');
        setFileErrorAlert('');
        setFileLabel('');
    }, [show]);

    useEffect(() => {
        if (taxonomyUpload) {
            setAlertMsg(taxonomyUpload.message);
        } else if (taxonomyUploadError) {
            setAlertMsg(taxonomyUploadError.message);
        }
    }, [taxonomyUpload, taxonomyUploadError]);

    const fileHandler = (e) => {
        let file = e.target.files[0];
        setFile(file);
        setFileLabel(file.name);
    };

    const closeButton = () => {
        handleClose();
    }

    const onSubmit = () => {
        var payload = new FormData();
        payload.append('file', file);
        payload.append('clientTaxonomyId', subsetId);

        if (!file) {
            setAlertMsg('Please choose a file to upload');
            setFileErrorAlert('file-not-upload');
        }
        else {
            dispatch({ type: 'UPLOAD_TAXONOMY_REQUEST', payload });
            setFileErrorAlert('');
        }
    };

    const taxonomyBody = () => (
        <div>
            <Row className="upload-taxonomy-container">
                <Col md={12}>
                    <Form.File
                        type="file"
                        accept="*/.xlxs,*/.xls"
                        className={!file && fileErrorAlert}
                        label={fileLabel === '' ? 'Drag and drop a file or click' : fileLabel}
                        onChange={fileHandler}
                        custom
                    />
                </Col>
            </Row>
        </div>
    )

    // condition for alertClassName
    const alertClassName = fileErrorAlert ? 'danger' : (taxonomyUpload ? 'success' : 'danger');

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