/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const NewTaxonomySubset = ({ show, handleClose, subsetData }) => {
    const [subsetName, setsubsetName] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [errorAlert, setErrorAlert] = useState('');

    const dispatch = useDispatch();
    const clientTaxonomy = useSelector((state) => state.newClientTaxonomy.newClientTaxonomy);
    const clientTaxonomyError = useSelector((state) => state.newClientTaxonomy.error);

    useEffect(() => {
        if (clientTaxonomy) {
            setAlertMsg(clientTaxonomy.message)
        } else if (clientTaxonomyError) {
            setAlertMsg(clientTaxonomyError.message)
        }
    }, [clientTaxonomy, clientTaxonomyError]);

    useEffect(() => {
        setAlertMsg('')
    }, []);

    const onNameChange = (e) => {
        setsubsetName(e.target.value)
    }

    const onClosing = () => {
        handleClose();
        setsubsetName('');
        setAlertMsg('');
        setErrorAlert('');
    }

    const subsetBody = () => (
        <div>
            <Form.Group>
                <Form.Control
                    className={!subsetName && errorAlert}
                    type="text"
                    name="subsetName"
                    placeholder="Enter name"
                    value={subsetName}
                    onChange={onNameChange}
                />
            </Form.Group>
        </div>
    )

    const onSubmitSubset = () => {
        if (!subsetName) {
            setAlertMsg('Please enter the name')
            setErrorAlert('error-alert')
        }
        else {
            const payload = {
                taxonomyName: subsetName,
                headers: subsetData,
            }
            dispatch({ type: 'NEW_CLIENT_TAXONOMY_REQUEST', payload });
            setAlertMsg('')
            setErrorAlert('')
        }
    }

    // condition for checking alert ClassName
    const alertClassName = errorAlert ? 'danger' : clientTaxonomy ? 'success' : 'danger';

    return (
        <Overlay
            className="text-center otp-modal"
            show={show}
            onHide={onClosing}
            backdrop="static"
            keyboard={false}
            animation
            centered
            size="md"
            title="Create Subset Taxonomy"
            body={subsetBody()}
            alert={alertMsg}
            primary="submit"
            onSubmitPrimary={onSubmitSubset}
            alertClass={alertClassName}
        />
    );
};

export default NewTaxonomySubset;
