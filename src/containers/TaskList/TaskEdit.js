/* eslint-disable */
import React, {useEffect, useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import Select from 'react-select';
import Overlay from '../../components/Overlay';
import { useDispatch, useSelector } from 'react-redux';


const TaskEdit = ({ show, setShow, rowValue, analystDetail, setanalystDetail, qaDetail, setqaDetail, qasla, setqasla, analystsla, setanalystsla }) => {
    const isEditData = useSelector((taskedit) => taskedit.taskEditDetails.taskeditData);
    const isEditDataLoading = useSelector((taskedit) => taskedit.taskEditDetails.isLoading);
    const editAnalystOption = isEditData && isEditData.data.analyst;
    const editQaOption = isEditData && isEditData.data.qa;
    const [alert, setAlert] = useState('');
    const [alertStatus, setalertStatus] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch({type:"UPDATETASK_RESET"});
    },[])
  const handleClose = () => {
    setShow(false);
    setanalystDetail('');
    setqaDetail('');
    setqasla(null);
    setanalystsla(null);
    setAlert('');
    setalertStatus(false);
    dispatch({type:"UPDATETASK_RESET"});
  };
  const isDataEdited = useSelector((taskupdate) => taskupdate.taskUpdate.taskUpdate);
  const isDataEditedLoading = useSelector((taskupdate) => taskupdate.taskUpdate.isLoading);
  console.log(isDataEdited, 'isDataEdited');
  useEffect(()=>{
if(isDataEdited){
  dispatch({type:"GET_TASKLIST_REQUEST"});
  dispatch({type:"TASKEDITDETAILS_RESET"});
     setalertStatus(true);
    setAlert(isDataEdited.message);
  
}
  },[isDataEdited]);


  const getFormatDate=(arg)=>{
    const date = moment(arg, 'YYYY-MM-DD').format('YYYY-MM-DD');
    return date
  }
  const baseFormat="YYYY-MM-DD";
  const onHandleEditanalyst = (arg) => {
    if(qaDetail.value  === arg.value){
      setqaDetail('');
    }
    setanalystDetail(arg);
  };


  const onHandleEditQa = (arg) => {
      
        if(analystDetail.value  === arg.value){
          setqaDetail('');

        } else {setqaDetail(arg); }
      
  };


  const onEditanalystDate = (e) => {
    if(e !== null){
      const date = getFormatDate(e._d);
     setanalystsla(date)
      if(qasla){
      if(moment(date).isAfter(qasla, 'date')){
        setAlert('Analyst SLA Exceeds Qa SLA');
        // setTimeout(() => {
        //   setAlert(0);
        // }, 4000);
        setalertStatus(false);
        setqasla(null);
      }
     }
    
    }
     else {
      setanalystsla(e);
     }
  
  }
  const onEditqaDate = (arg) => {
    
    if(arg !== null){
      const date = getFormatDate(arg._d);
      setqasla(date);
    }
     else { 
      setqasla(arg);
     }
  
  }
  const qadisabledDate = (current) =>{
    const analystEnddate = analystsla;
    if(analystEnddate){
      return current && current < moment(analystEnddate, 'YYYY-MM-DD').add(1, 'days');
    }
  }
  const editTaskBtn = () => {
    if(analystsla && qasla && analystDetail && qaDetail ){
    
      const editTaskData = {
        taskDetails : { analystSLADate: analystsla, qaSLADate: qasla, qaId: qaDetail.value, analystId: analystDetail.value },
        taskId: rowValue.taskId,

      }
      dispatch({type:"UPDATETASK_REQUEST", payload: editTaskData });
      // setalertStatus(true);
      // setAlert('Task Updated Successfully !!');
      // setTimeout(() => {
      //   setAlert(0);
      // }, 2000);
    } else {
      setAlert('Fill all the required fields !');
      setalertStatus(false);
    }
  }
  const analystdisabledDate = (current) => {
    const yourDate = new Date();
    const date= getFormatDate(yourDate);
    const customDate = date;
    return current && current < moment(customDate, 'YYYY-MM-DD');
  }
  const editBody = () => (
    <React.Fragment>
      <Row>
        <Col lg={6}>
            <div className="edittask-contentBox">
                <div className="edittask-content">Analyst <span className="mandatory-color">*</span></div>
                <div>
                    <Select
                      
                        value ={analystDetail && analystDetail }
                        
                        options={editAnalystOption}
                        onChange={onHandleEditanalyst}
                    />
                </div>
            </div>
        </Col>
        <Col lg={6}>
            <div className="edittask-contentBox">
              <div className="edittask-content" >SLA date <span className="mandatory-color">*</span></div>
                <div>
                    <DatePicker
                        className="date-picker"
                        size="middle"
                        format="DD-MM-YYYY"
                        value={(analystsla)? moment(analystsla, baseFormat):null} 
                        onChange={onEditanalystDate}
                        disabledDate={analystdisabledDate}
                        
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
                  
                    value={qaDetail && qaDetail}
                    options={editQaOption && editQaOption.filter((e)=>e.value !== (analystDetail.value) )}
                    onChange={onHandleEditQa}
                    
                />
            </div>
          </div>
        </Col>
        <Col lg={6}>
          <div className="edittask-contentBox">
              <div className="edittask-content" >SLA date <span className="mandatory-color">*</span></div>
                <div>
                    <DatePicker
                        className="date-picker"
                        size="middle"
                        format="DD-MM-YYYY"
                        value={(qasla)? moment(qasla, baseFormat): null}
                        onChange={onEditqaDate}
                        disabledDate={qadisabledDate}
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
      <div className={(alertStatus)? "task-success-alert" : "task-fill-alert"} >{alert}</div>
    }
  </div>
    <div className="edittask-submit-btn">
      <div className="edittask-btn"><button type="button" className="btn btn-outline-primary" onClick={editTaskBtn}>Update</button></div>
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
      isLoading={isDataEditedLoading  || isEditDataLoading}
      size="lg"
      title={rowValue.taskNumber}
      body={editBody()}
      onSubmitPrimary={editTaskBtn}
      footer={editFooter()}
    />
  );
};
export default TaskEdit;
