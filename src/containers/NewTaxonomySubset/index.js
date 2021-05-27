/* eslint-disable*/
import React from 'react';
import { Form } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const NewTaxonomySubset = ({ show, handleClose }) => {
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
                // onChange={onEmailChange}
                />
            </Form.Group>
        </div>
    )

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
        // onSubmitPrimary={onSubmitForgotPassword}
        // alertClass={forgotPasswordClass}
        />
    );
};

export default NewTaxonomySubset;
