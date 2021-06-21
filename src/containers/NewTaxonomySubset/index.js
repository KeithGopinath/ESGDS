/* eslint-disable*/
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const NewTaxonomySubset = ({ show, handleClose, subsetData }) => {
    const [subsetName, setsubsetName] = useState('');

    const onNameChange = (e) => {
        setsubsetName(e.target.value)
    }

    const subsetBody = () => (
        <div>
            {/* <Form.Label>Enter subest name</Form.Label> */}
            <Form.Group>
                <Form.Control
                    // className={validate}
                    type="text"
                    name="subsetName"
                    placeholder="Enter name"
                    // value={email}
                    onChange={onNameChange}
                />
            </Form.Group>
        </div>
    )

    const onSubmitSubset = () => {
        const payload = {
            subsetName: subsetName,
            data: subsetData,
        }
        console.log(payload);
    }

    return (
        <Overlay
            className="text-center otp-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            animation
            centered
            size="md"
            title="Create Subset Taxonomy"
            body={subsetBody()}
            // alert={forgotPasswordAlert}
            primary="submit"
            onSubmitPrimary={onSubmitSubset}
        // alertClass={forgotPasswordClass}
        />
    );
};

export default NewTaxonomySubset;
