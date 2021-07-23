/* eslint-disable */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { DatePicker } from 'antd';
import moment from 'moment';
import Select from 'react-select';
import Overlay from '../../components/Overlay';


const TaskEdit = ({ show, setShow, rowValue, setrowValue }) => {
    console.log(rowValue, 'rowValue');
    const assignedAnalyst = { value: rowValue.analyst, label: rowValue.analyst };
    const assignedQa = { value: rowValue.qa, label: rowValue.qa }
  const handleClose = () => {
    setShow(false);
    setrowValue('');
  };
  const baseFormat="DD-MM-YYYY";
  console.log(rowValue.analystSla,'rowValue.analystSla');
  const editBody = () => (
    <React.Fragment>
      <Row>
        <Col lg={6}>
            <div className="edittask-contentBox">
                <div className="edittask-content">Analyst <span className="mandatory-color">*</span></div>
                <div>
                    <Select
                        value={assignedAnalyst}
                    />
                </div>
            </div>
        </Col>
        <Col lg={6}>
            <div className="edittask-contentBox">
              <div className="edittask-content" >Sla date <span className="mandatory-color">*</span></div>
                <div>
                    <DatePicker
                        className="date-picker"
                        size="middle"
                        format="DD-MM-YYYY"
                        defaultValue={moment(rowValue.analystSLA, baseFormat)}
                    />
                </div>
            </div>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <div className="edittask-contentBox">
            <div className="edittask-content" >Quality Analyst <span className="mandatory-color">*</span></div>
            <div>
                <Select
                    value={assignedQa }
                />
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className="edittask-contentBox">
              <div className="edittask-content" >Sla date <span className="mandatory-color">*</span></div>
                <div>
                    <DatePicker
                        className="date-picker"
                        size="middle"
                        format="DD-MM-YYYY"
                        defaultValue={moment(rowValue.qaSLA, baseFormat)}
                    />
                </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
  const editFooter = () => (
    <div className="edittask-submit-btn">
      <div className="edittask-btn"><button type="button" className="btn btn-outline-primary" >Update</button></div>
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
      size="lg"
      title={rowValue.taskNumber}
      body={editBody()}
      // onSubmitPrimary={onCreatebBatch}
      footer={editFooter()}
    />
  );
};
export default TaskEdit;
