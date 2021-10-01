/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Overlay from '../../components/Overlay';


const ExtentionSLA = ({
  show, setShow, detail, setdetail, setrejectslaDate, rejectSlaDate,
}) => {
  const [alert, setalert] = useState(false);
  const [alertStatus, setalertStatus] = useState(false);
  const handleClose = () => {
    setShow(false);
    setdetail('');
    setalertStatus(false);
    setalert(false);
  };

  const dispatch = useDispatch();
  const slaRequest = useSelector((slapost) => slapost.slaExtexsion);
  const isslaData = slaRequest.slapost;
  useEffect(() => {
    if (!slaRequest.error && !slaRequest.isLoading && slaRequest.slapost) {
      setalert(slaRequest.slapost.message);
    }
  }, [isslaData]);

  const baseFormat = 'YYYY-MM-DD';
  const onExtendSla = () => {
    setalertStatus(true);
    const requestData = { taskId: detail.taskId, days: rejectSlaDate };
    dispatch({ type: 'SLA_EXTENSION_REQUEST', payload: requestData });
  };
  const getFormatDate = (arg) => {
    const date = moment(arg, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return date;
  };
  const sladisabledDate = (current) => {
    const yourDate = new Date();
    const date = getFormatDate(yourDate);
    const customDate = date;
    return current && current < moment(customDate, 'YYYY-MM-DD');
  };
  const onEditslaDate = (arg) => {
    if (arg !== null) {
      const date = getFormatDate(arg._d);
      setrejectslaDate(date);
    } else {
      setrejectslaDate(arg);
    }
  };
  const editBody = () => (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <div className="editsla-box">
            <div className="editsla-content">How many days do you want to extend ? </div>
            <div className="datecount-content">

              <DatePicker
                className="date-picker"
                size="middle"
                format="DD-MM-YYYY"
                value={(rejectSlaDate) ? moment(rejectSlaDate, baseFormat) : null}
                onChange={onEditslaDate}
                disabledDate={sladisabledDate}
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
