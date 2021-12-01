/* eslint-disable*/
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PageLoader from '../../components/PageLoader';

const Overlay = ({
  show, onHide, centered, size, title, body, alert, alertClass, primary, secondary, onSubmitPrimary, onSubmitSecondary, footer, isLoading, onKeyPress
}) =>
  <Modal
    show={show}
    onHide={onHide}
    backdrop="static"
    keyboard={false}
    animation
    centered={centered}
    size={size}
    onKeyPress={onKeyPress}
  >
    <Modal.Header className="no-border" closeButton={onHide}>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    {isLoading ? <div className="overlay-pageloader" > <PageLoader /> </div> :
      <React.Fragment>
        <Modal.Body className="justify-content-center">{body}</Modal.Body>
        <Modal.Footer className="no-border">
          {alert && <span className={`w-100 text-center text-${alertClass}`}><p>{alert}</p></span>}
          <div className="mx-auto">
            {secondary && <Button variant="primary secondary-button" onClick={onSubmitSecondary}>{secondary}</Button>}
            {primary && <Button variant="primary primary-button" onClick={onSubmitPrimary}>{primary}</Button>}
          </div>
          {footer}
        </Modal.Footer>
      </React.Fragment>
    }
  </Modal>

export default Overlay;
