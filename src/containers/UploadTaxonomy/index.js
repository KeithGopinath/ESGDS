/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const UploadTaxonomy = ({ show, handleClose, subsetName, subsetId }) => {
    const [file, setFile] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [alertFlag, setAlertFlag] = useState(false);

    const dispatch = useDispatch();
    const taxonomyUpload = useSelector((state) => state.uploadTaxonomy.uploadTaxonomy);
    const taxonomyUploadError = useSelector((state) => state.uploadTaxonomy.error);

    useEffect(() => {
        setAlertMsg('');
    }, [show]);

    useEffect(() => {
        if (taxonomyUpload) {
            setAlertMsg(taxonomyUpload.message)
        } else if (taxonomyUploadError) {
            setAlertMsg(taxonomyUploadError.message)
        }
    }, [taxonomyUpload, taxonomyUploadError]);

    const fileHandler = (e) => {
        setFile(e.target.files[0])
    };

    const closeButton = () => {
        handleClose();
        setAlertMsg('');
    }

    const onSubmit = () => {
        var payload = new FormData();
        payload.append('file', file);
        payload.append('clientTaxonomyId', subsetId);

        if (!file) {
            setAlertMsg('Please choose a file to upload');
            setAlertFlag(true);
        }
        else {
            dispatch({ type: 'UPLOAD_TAXONOMY_REQUEST', payload });
            setAlertFlag(false);
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
    const alertClassName = alertFlag ? 'danger' : taxonomyUpload ? 'success' : 'danger';

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