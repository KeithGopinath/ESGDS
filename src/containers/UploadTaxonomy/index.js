/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import Overlay from '../../components/Overlay';
import Select from 'react-select';

const UploadTaxonomy = ({ show, handleClose }) => {
    const [file, setFile] = useState('');
    const [taxonomyName, setTaxonomyName] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [errorAlert, setErrorAlert] = useState('');

    const dispatch = useDispatch();
    const taxonomyData = useSelector((state) => state.clientTaxonomy.taxonomydata);

    useEffect(() => {
        if(show){
          dispatch({ type: 'ClientTaxonomy_REQUEST' });
        }
      }, [show]);

    const taxonomyOptions = taxonomyData && taxonomyData.rows.map((data)=>({
        value: data._id,
        label: data.taxonomyName
    }))  

    const fileHandler = (e) => {
        let file = e.target.files[0];
        console.log(file);
            let reader = new FileReader();
            reader.onloadend = function () {
                setFile(reader.result);
            }
            reader.readAsDataURL(file);
    };

    const onTaxonomyChange = (taxonomy) => {
        setTaxonomyName(taxonomy)
    }

    const closeButton = () => {
        handleClose();
        setTaxonomyName('');
        setAlertMsg('');
        setErrorAlert('');
    }

    const onSubmit = () => {
        if (!taxonomyName) {
            setAlertMsg('Please select a taxonomy')
            setErrorAlert('error-alert')
        } else if (!file) {
            setAlertMsg('Please choose a file to upload');
        }
        else {
            const payload = {
                taxonomy: taxonomyName,
                file
            }
            console.log(payload);
            setErrorAlert('')
        }
    };

    const taxonomyBody = () => (
        <div>
            <Row className="upload-taxonomy-container">
                <Col md={12}>
                    <div className="head-dp">Taxonomy</div>
                    <Select
                        className={!taxonomyName && errorAlert}
                        value={taxonomyName}
                        name="taxonomy"
                        options={taxonomyOptions}
                        onChange={onTaxonomyChange}
                    />
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
            alert={alert}
            primary="Upload"
            onSubmitPrimary={onSubmit}
            alertClass={alertClassName}
        />
    );
};

export default UploadTaxonomy;
