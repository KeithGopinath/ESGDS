/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { DatePicker, Divider } from 'antd';
import moment from 'moment';
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import Overlay from '../../components/Overlay';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faReceipt, faUser } from '@fortawesome/free-solid-svg-icons';



const TaskEdit = ({ show, setrowValue, setShow, rowValue, analystDetail, setanalystDetail, qaDetail, setqaDetail, qaSla, setQaSla, analystSla, setAnalystSla }) => {
  const isEditData = useSelector((taskedit) => taskedit.taskEditDetails.taskeditData);
  const isSlaRequested = useSelector((raisedsladata) => raisedsladata.RaisedSla);
  const isEditDataLoading = useSelector((taskedit) => taskedit.taskEditDetails);
  const editAnalystOption = isEditData && isEditData.data.analyst;
  const editQaOption = isEditData && isEditData.data.qa;
  const rejectslaResponse = useSelector((rejectsladata) => rejectsladata.RejectSla);
  const [alert, setAlert] = useState('');
  const [alertStatus, setalertStatus] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "UPDATETASK_RESET" });
  }, [])
  const location = useLocation();
  const handleClose = () => {
    dispatch({ type: "RAISEDSLA_RESET" });
    setShow(false);
    setanalystDetail('');
    setqaDetail('');
    setQaSla(null);
    setAnalystSla(null);
    setAlert('');
    setrowValue('');
    setalertStatus(false);
    dispatch({ type: "UPDATETASK_RESET" });
    dispatch({ type: "REJECTSLA_RESET" });
  };
  const isDataEdited = useSelector((taskupdate) => taskupdate.taskUpdate.taskUpdate);
  const isDataEditedLoading = useSelector((taskupdate) => taskupdate.taskUpdate);


  useEffect(() => {
    if (isDataEdited) {
      dispatch({ type: "GET_TASKLIST_REQUEST" });
      dispatch({ type: "TASKEDITDETAILS_RESET" });
      setalertStatus(true);
      setAlert(isDataEdited.message);

    }

  }, [isDataEdited]);

  useEffect(() => {

    if (isDataEditedLoading.error || isEditDataLoading.error || rejectslaResponse.error || isSlaRequested.error) {
      setalertStatus(false);
      setAlert(isDataEditedLoading.error && isDataEditedLoading.error.message || isEditDataLoading.error && isEditDataLoading.error.message || rejectslaResponse.error && rejectslaResponse.error.message || isSlaRequested.error && isSlaRequested.error.message);
    }

    if (isSlaRequested.raisedsladata && isSlaRequested.raisedsladata.status && rejectslaResponse.rejectsladata && rejectslaResponse.rejectsladata.status) {
      setalertStatus(true);
      setAlert(rejectslaResponse.rejectsladata.message)
    }

  }, [isDataEditedLoading, isEditDataLoading, isSlaRequested]);

  useEffect(() => {
    if (rejectslaResponse.rejectsladata && rejectslaResponse.rejectsladata.status) {
      dispatch({ type: "RAISEDSLA_REQUEST", taskid: rowValue.taskId });
    }
  }, [rejectslaResponse]);
  const getFormatDate = (arg) => {
    const date = moment(arg, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return date
  }
  const baseFormat = "YYYY-MM-DD";
  const onHandleEditanalyst = (arg) => {
    if (qaDetail.value === arg.value) {
      setqaDetail('');
    }
    setanalystDetail(arg);
  };

  // useEffect(() => {
  //   if(rejectslaResponse.error)
  // }, [rejectslaResponse])


  const onHandleEditQa = (arg) => {

    if (analystDetail.value === arg.value) {
      setqaDetail('');

    } else { setqaDetail(arg); }

  };


  const onEditanalystDate = (e) => {
    if (e !== null) {
      const date = getFormatDate(e._d);
      setAnalystSla(date)
      if (qaSla) {
        if (moment(date).isAfter(qaSla, 'date')) {
          setAlert('Analyst SLA Exceeds Qa SLA');
          setalertStatus(false);
          setQaSla(null);
        }
      }

    }
    else {
      setAnalystSla(e);
    }

  }
  const onEditqaDate = (arg) => {

    if (arg !== null) {
      const date = getFormatDate(arg._d);
      setQaSla(date);
    }
    else {
      setQaSla(arg);
    }

  }
  const qadisabledDate = (current) => {
    const analystEnddate = analystSla;
    if (analystEnddate) {
      return current && current < moment(analystEnddate, 'YYYY-MM-DD');
    }
  }
  const editTaskBtn = () => {
    if (analystSla && qaSla && analystDetail && qaDetail) {
      if ((analystDetail.value === rowValue.analystId) && (qaDetail.value === rowValue.qaId) && (analystSla === moment(rowValue.analystSLA, 'YYYY-MM-DD').format('YYYY-MM-DD')) && (qaSla === moment(rowValue.qaSLA, 'YYYY-MM-DD').format('YYYY-MM-DD'))) {
        setAlert(' fields not get updated');
        setalertStatus(false);
      } else {
        const analystDate = [];
        const qaDate = [];
        isSlaRequested.raisedsladata && isSlaRequested.raisedsladata.data.map((e) => {
          if (e.requestedBy === 'Analyst') {
            analystDate.push(e.days);
          }
          if (e.requestedBy === 'QA') {
            qaDate.push(e.days);
          }
        });

        const editTaskData = {
          taskDetails: { analystSLADate: analystSla, qaSLADate: qaSla, qaId: qaDetail.value, analystId: analystDetail.value, analystRequestedDate: analystDate[0] ? analystDate[0] : "", qaRequestedDate: qaDate[0] ? qaDate[0] : "" },
          taskId: rowValue.taskId,

        }
        setAlert('');
        dispatch({ type: "REJECTSLA_RESET" });
        dispatch({ type: "UPDATETASK_REQUEST", payload: editTaskData });
      }
    } else {
      setAlert('Fill all the required fields !');
      setalertStatus(false);
    }
  }
  const analystdisabledDate = (current) => {
    const yourDate = new Date();
    const date = getFormatDate(yourDate);
    const customDate = date;
    return current && current < moment(customDate, 'YYYY-MM-DD');
  }

  // SLA reject
  const onRejectSla = (arg) => {
    dispatch({ type: "REJECTSLA_REQUEST", slaId: arg });
  }
  const editBody = () => (
    <React.Fragment>
      <div>
        <Row>
          <Col lg={4}>
            <div className="edittask-contentBox">
              <div className="edittask-content">Analyst <span className="mandatory-color">*</span></div>
              <div>
                <Select

                  value={analystDetail && analystDetail}
                  options={editAnalystOption}
                  onChange={onHandleEditanalyst}
                />
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className="edittask-contentBox">
              <div className="edittask-content" >SLA date <span className="mandatory-color">*</span></div>
              <div>
                <DatePicker
                  className="date-picker"
                  size="middle"
                  format="DD-MM-YYYY"
                  value={(analystSla) ? moment(analystSla, baseFormat) : null}
                  onChange={onEditanalystDate}
                  disabledDate={analystdisabledDate}

                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <div className="edittask-contentBox">
              <div className="edittask-content" >Quality Analyst <span className="mandatory-color">*</span></div>
              <div>
                <Select

                  value={qaDetail && qaDetail}
                  options={editQaOption && editQaOption.filter((e) => e.value !== (analystDetail.value))}
                  onChange={onHandleEditQa}

                />
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <div className="edittask-contentBox">
              <div className="edittask-content" >SLA date <span className="mandatory-color">*</span></div>
              <div>
                <DatePicker
                  className="date-picker"
                  size="middle"
                  format="DD-MM-YYYY"
                  value={(qaSla) ? moment(qaSla, baseFormat) : null}
                  onChange={onEditqaDate}
                  disabledDate={qadisabledDate}

                />
              </div>
            </div>
          </Col>
        </Row>
        {isSlaRequested.raisedsladata && isSlaRequested.raisedsladata.data.length > 0 &&
          <Row>
            <div className="sla-heading">
              SLA Pending Request
            </div>
            {isSlaRequested.raisedsladata && isSlaRequested.raisedsladata.data.length > 0 && isSlaRequested.raisedsladata.data.map((e) => (


              <Col lg={12} className="card-sla-pad">
                <Card className="sla-pending-card">
                  <div>
                    <div className="slapending-box">
                      <div className="inner-sla-box">
                        <div className="sla-pending-role-date"><FontAwesomeIcon icon={faUser} /> <span className="sla-pending-role-date-heading">Requested By</span></div>
                        <div className="sla-details">{e.requestedBy}</div>
                      </div>
                      <div className="inner-sla-box">
                        <div className="sla-pending-role-date"><FontAwesomeIcon icon={faCalendarAlt} /> <span className="sla-pending-role-date-heading">Requested Date </span></div>
                        <div className="sla-details">{moment(e.days, 'YYYY-MM-DD').format('DD-MM-YYYY')}</div>
                      </div>
                      <div className="inner-sla-box">
                        <div className="sla-pending-role-date"><FontAwesomeIcon icon={faReceipt} /> <span className="sla-pending-role-date-heading">Action </span></div>
                        <div className="sla-details"><button type="button" className="btn btn-danger btn-sm" onClick={() => { onRejectSla(e.id) }}>Reject</button></div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        }

      </div>
    </React.Fragment>
  );
  const editFooter = () => (
    <React.Fragment>
      <div className="foo-width">
        <div className=" batch-status-minheight">

          {alert &&
            <div className={(alertStatus) ? "task-success-alert" : "task-fill-alert"} >{alert}</div>
          }
        </div>
        <div className="edittask-submit-btn">

          <button type="button" className="btn btn-outline-primary" onClick={editTaskBtn}>Update</button>

        </div>
      </div>

    </React.Fragment>
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
      isLoading={isDataEditedLoading.isLoading || isEditDataLoading.isLoading || isSlaRequested.isLoading || rejectslaResponse.isLoading}
      size="md"
      title={rowValue.taskNumber}
      body={editBody()}
      onSubmitPrimary={editTaskBtn}
      footer={editFooter()}
    />
  );
};

export default TaskEdit;
