/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Overlay from '../../components/Overlay';


const ExtentionSLA = ({
  show, setShow, detail, setdetail,
}) => {
  const [day, setdays] = useState(1);
  const [alert, setalert] = useState(false);
  const [alertStatus, setalertStatus] = useState(false);
  const handleClose = () => {
    setShow(false);
    setdays(1);
    setdetail('');
    setalertStatus(false);
    setalert(false);
  };
  const currentRole = sessionStorage.role;
  const [isAnalyst, isQA] = [
    currentRole === 'Analyst',
    currentRole === 'QA',
  ];
  const dispatch = useDispatch();
  const slaRequest = useSelector((slapost) => slapost.slaExtexsion);
  const isslaData = slaRequest.slapost;
  useEffect(() => {
    if (!slaRequest.error && !slaRequest.isLoading && slaRequest.slapost) {
      setalert(slaRequest.slapost.message);
    }
  }, [isslaData]);
  const onhandleDay = (e) => {
    if ((e.target.value >= 1) && (e.target.value <= 30)) {
      setdays(e.target.value);
    }
  };
  const onExtendSla = () => {
    if (isAnalyst) {
      const modifiedsla = moment(detail.analystSLADate, 'YYYY-MM-DD').add(day, 'days');
      const sladate = moment(modifiedsla._d, 'YYYY-MM-DD').format('YYYY-MM-DD');
      const requestData = { taskId: detail.taskId, days: sladate };
      console.log(requestData, 'requestData');
      setalertStatus(true);
      dispatch({ type: 'SLA_EXTENSION_REQUEST', payload: requestData });
    }
    if (isQA) {
      const modifiedsla = moment(detail.qaSLADate, 'YYYY-MM-DD').add(day, 'days');
      const sladate = moment(modifiedsla._d, 'YYYY-MM-DD').format('YYYY-MM-DD');
      const requestData = { taskId: detail.taskId, days: sladate };
      console.log(requestData, 'requestData');
      setalertStatus(true);
      dispatch({ type: 'SLA_EXTENSION_REQUEST', payload: requestData });
    }
  };
  const editBody = () => (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <div className="editsla-box">
            <div className="editsla-content">How many days do you want to extend ? </div>
            <div className="datecount-content">
              <Form.Control
                type="number"
                name="Days"
                style={{ width: '55%' }}
                placeholder="Days"
                onChange={onhandleDay}
                value={day}
              />
            </div>
          </div>
        </Col>
      </Row>

    </React.Fragment>
  );

  const editFooter = () => (
    <div className="foo-width">
      <div className=" batch-status-minheight">

        { alert &&
        <div className={(alertStatus) ? 'task-success-alert' : 'task-fill-alert'} >{alert}</div>
        }
      </div>
      <div className="edittask-submit-btn">
        <div className="edittask-btn"><button type="button" className="btn btn-outline-primary" onClick={onExtendSla}>Submit</button></div>
      </div>
    </div>
  );
  return (
    <Overlay
      className="Batch-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation
      centered
      isLoading={slaRequest.isLoading}
      size="md"
      title={`SLA Extension Request for ${detail.taskNumber}`}
      body={editBody()}
      // onSubmitPrimary={editTaskBtn}
      footer={editFooter()}
    />
  );
};
export default ExtentionSLA;
