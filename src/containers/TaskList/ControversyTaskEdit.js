/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {  message } from 'antd';
import Select from 'react-select';
import Overlay from '../../components/Overlay';
import { useDispatch, useSelector } from 'react-redux';


const ControversyTaskEdit = ({ setcontroversyShow, setcontroversyValue, controversyValue, controversyShow, setcontroversyAnalyst, controversyAnalyst  }) => {
    const dispatch = useDispatch();
    const [alert, setalert] = useState('');
    const [alertStatus, setalertStatus] = useState(false);
    const userData = useSelector((filterUsers) => filterUsers.filterUsers.filterUsers);
    const isData = userData && userData.data;
    const isDataLoading = useSelector((filterUsers) => filterUsers.filterUsers);
    const controversyUpdateStatus = useSelector((controversyUpdate)=>controversyUpdate.controversyUpdate);
    console.log(controversyUpdateStatus, 'controversyUpdateStatus');
    const optionsControversyAnalyst =isData && isData.map((e)=>{
        return e.userDetails;
    });
    useEffect(()=>{
        if(isDataLoading.error || controversyUpdateStatus.error){
            setalertStatus(false);
            setalert(isDataLoading.error && isDataLoading.error.message || controversyUpdateStatus.error && controversyUpdateStatus.error.message);
        }
    },[isDataLoading,controversyUpdateStatus]);
    useEffect(()=>{
        if(controversyUpdateStatus.controversypost){
            setalertStatus(true);
            setalert(controversyUpdateStatus.controversypost && controversyUpdateStatus.controversypost.message)
        }
    },[controversyUpdateStatus.controversypost]);
  const handleClose = () => {
    setalert('');
    setalertStatus(false);
    setcontroversyShow(false);
    setcontroversyValue('');
    setcontroversyAnalyst('');
    dispatch({ type:"FILTER_USERS_RESET"});
    dispatch({type:"CONTROVERSY_UPDATE_RESET"});
  };

  const onHandleEditanalystControversy = (arg)=> {
    setcontroversyAnalyst(arg);
  }
 
 const controversyeditTaskBtn =()=>{
  const contoversyPayload=  {
      taskId:controversyValue.taskId,
      analystId: controversyAnalyst.value
    }
    dispatch({type:"CONTROVERSY_UPDATE_REQUEST", payload:contoversyPayload })
 }
  const editBody = () => (
<React.Fragment>
    <div className="edittask-content">Reassign Analyst</div>
    <div>
        <div>
        <Select
          value ={controversyAnalyst } 
          options={optionsControversyAnalyst && optionsControversyAnalyst}
          onChange={onHandleEditanalystControversy}
                  />
        </div>
    </div>
  </React.Fragment>
  );
  const editFooter = () => (
    <React.Fragment>
    <div className="foo-width">
    <div className=" batch-status-minheight">

{ alert &&
      <div className={(alertStatus)? "task-success-alert" : "task-fill-alert"} >{alert}</div>
    }
  </div>
    <div className="edittask-submit-btn">
      <div className="edittask-btn"><button type="button" className="btn btn-outline-primary" onClick={controversyeditTaskBtn}>Update</button></div>
    </div>
    </div>
</React.Fragment>
    );


  return (
    <Overlay
      className="Batch-modal"
      show={controversyShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation
      centered
      isLoading={isDataLoading.isLoading}
      size="sm"
      title={controversyValue.taskNumber}
      body={editBody()}
      onSubmitPrimary={controversyeditTaskBtn}
      footer={editFooter()}
    />
  );
};
export default ControversyTaskEdit;
