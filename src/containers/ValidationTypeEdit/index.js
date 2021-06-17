/*eslint-disable*/
import React from 'react';
import Overlay from '../../components/Overlay';

const ValidationTypeEdit = ({ show, handleClose, onEditSubmit, onSubmitSecondary, selectedType }) => {

  const EditTypeBody = () => (
    <div className="w-100 text-center">
      <p>Do you want to edit <span className="font-weight-bold text-primary">{selectedType}?</span></p>
    </div>);

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
      title="Edit Type"
      body={EditTypeBody()}
      primary="Yes"
      secondary="No"
      onSubmitPrimary={onEditSubmit}
      onSubmitSecondary={onSubmitSecondary}

    />
  );
};

export default ValidationTypeEdit;