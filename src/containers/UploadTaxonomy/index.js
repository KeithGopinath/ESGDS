/* eslint-disable*/
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const UploadTaxonomy = ({ show, handleClose }) => {
    const [file, setFile] = useState('');
    const [alert, setAlert] = useState('');

    const fileHandler = (e) => {
        setFile(e.target.files);
    };

    const closeButton = () => {
        handleClose();
        setAlert('')
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('file', file[0]);
        if (file) {
            // dispatch({});
            setAlert('');
        } else {
            setAlert('Please choose the file to upload');
        }
    };

    const taxonomyBody = () => (
        <div>
            <Form.Group>
                <Form.Control
                    type="file"
                    name="uploadTaxonomy"
                    id="email"
                    onChange={fileHandler}
                />
            </Form.Group>
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
            alert={alert}
            primary="Upload"
            onSubmitPrimary={onSubmit}
            alertClass={alertClassName}
        />
    );
};

export default UploadTaxonomy;
