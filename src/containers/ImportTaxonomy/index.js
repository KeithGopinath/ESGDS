/* eslint-disable*/
import React from 'react';
import { Form } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const ImportTaxonomy = ({
    show, handleClose, onSubmitImportTaxonomy, importTaxonomyAlert, importTaxonomyClass
}) => {

    const taxonomyBody = () => (
        <div>
            <Form.Group>
                <Form.Control
                    type="file"
                    name="importTaxonomy"
                    id="email"
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
            title="Import File"
            body={taxonomyBody()}
            alert={importTaxonomyAlert}
            primary="Import"
            onSubmitPrimary={onSubmitImportTaxonomy}
            // footer={<Redirect />}
            alertClass={importTaxonomyClass}
        />
    );
};

export default ImportTaxonomy;
