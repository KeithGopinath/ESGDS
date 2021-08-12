/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Input, Select as AntSelect, Divider, DatePicker, message, Spin } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PageLoader from '../../components/PageLoader';


const FieldWrapper = (props) => {
  // PROPS ARE {VISIBLE}, {LABEL}, {BODY}, {SIZE} !
  if (props.visible) {
    return (
      <Col lg={props.size[0]}>
        <Form.Group as={Row} >
          <Form.Label column sm={props.size[1]}>
            {props.label}
          </Form.Label>
          <Col sm={props.size[2]}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

FieldWrapper.propTypes = {
  visible: PropTypes.bool.isRequired,
  size: PropTypes.array.isRequired,
  label: PropTypes.string,
  body: PropTypes.element,
};

const AddNewKMPMember = (props) => {
  // DISPATCH
  const dispatch = useDispatch();

  // USESELECTOR
  const reqTASK = (useSelector((state) => state.task));
  const activeMembersFromStore = useSelector((state) => state.activeMembers);
  const activeBoardMembersList = (activeMembersFromStore.activeMembers && activeMembersFromStore.activeMembers.BoardMembersList) || [];
  const activeKmpMembersList = (activeMembersFromStore.activeMembers && activeMembersFromStore.activeMembers.KMPList) || [];


  const addNewMemberFromStore = useSelector((state) => state.addNewMember);
  const terminateMembersFromStore = useSelector((state) => state.terminateMembers);

  // PROPS
  const { modalType, taskDetails, closeModal } = props;

  // FLAGS
  const [isAddNewKmp, isAddNewBoard, isTerminateKmp, isTerminateBoard] = [
    modalType === 'AddNewKmpType',
    modalType === 'AddNewBoardType',
    modalType === 'TerminateKmpType',
    modalType === 'TerminateBoardType',
  ];

  const getMemberType = () => {
    if (isAddNewBoard || isTerminateBoard) return 'Board';
    if (isTerminateKmp || isAddNewKmp) return 'Kmp';
    return null;
  };
  const memberType = getMemberType();

  // STATES
  const [title, setTitle] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [gender, setGender] = useState(null);
  const [nationality, setNationality] = useState('');
  const [financialExp, setFinancialExp] = useState(null);
  const [industrialExp, setIndustrialExp] = useState(null);

  const [dob, setDob] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isExecutiveType, setIsExecutiveType] = useState(false);

  const [boardMembersToTerminate, setBoardMembersToTerminate] = useState([]);
  const [kmpMembersToTerminate, setKmpMembersToTerminate] = useState([]);
  const [endDate, setEndDate] = useState(null);

  const [statusAlert, setStatusAlert] = useState(false);

  const [hasError, setHasError] = useState({
    title: false,
    firstName: false,
    middlename: false,
    lastName: false,
    gender: false,
    nationality: false,
    financialExp: false,
    industrialExp: false,
    dob: false,
    startDate: false,
    isExecutiveType: false,
    boardMembersToTerminate: false,
    kmpMembersToTerminate: false,
    endDate: false,
  });

  useEffect(() => {
    setTitle(null);
    setFirstName('');
    setMiddleName('');
    setLastName('');

    setGender(null);
    setNationality('');
    setFinancialExp(null);
    setIndustrialExp(null);

    setDob(null);
    setStartDate(null);
    setIsExecutiveType(false);

    setBoardMembersToTerminate([]);
    setKmpMembersToTerminate([]);
    setEndDate(null);

    setStatusAlert(false);

    setHasError({
      title: false,
      firstName: false,
      middlename: false,
      lastName: false,
      gender: false,
      nationality: false,
      financialExp: false,
      industrialExp: false,
      dob: false,
      startDate: false,
      isExecutiveType: false,
      boardMembersToTerminate: false,
      kmpMembersToTerminate: false,
      endDate: false,
    });

    // DISPATCH ACTION
    if (isTerminateKmp || isTerminateBoard) {
      dispatch({ type: 'ACTIVE_MEMBERS_GET_REQUEST', companyId: taskDetails.companyId, memberType });
      setStatusAlert(true);
    }
  }, []);

  useEffect(() => {
    if (activeMembersFromStore.error && statusAlert) {
      message.error(activeMembersFromStore.error.message || 'Something went wrong!');
      setStatusAlert(false);
    }
  }, [activeMembersFromStore]);

  useEffect(() => {
    if (addNewMemberFromStore.error && statusAlert) {
      message.error(addNewMemberFromStore.error.message || 'Something went wrong!');
      setStatusAlert(false);
    }
    if (addNewMemberFromStore.newMember && statusAlert) {
      dispatch({ type: 'TASK_GET_REQUEST', taskId: taskDetails.taskId });
    }
  }, [addNewMemberFromStore]);

  useEffect(() => {
    if (addNewMemberFromStore.newMember && reqTASK.task && reqTASK.task.status === '200' && statusAlert) {
      message.success(addNewMemberFromStore.newMember.message);
      setStatusAlert(false);
      dispatch({ type: 'ADD_NEW_MEMBER_SET_DEFAULT' });
      closeModal();
    }
    if (terminateMembersFromStore.terminateMembers && reqTASK.task && reqTASK.task.status === '200' && statusAlert) {
      message.success(terminateMembersFromStore.terminateMembers.message);
      setStatusAlert(false);
      dispatch({ type: 'TERMINATE_MEMBERS_SET_DEFAULT' });
      closeModal();
    }
  }, [reqTASK]);

  useEffect(() => {
    if (terminateMembersFromStore.error && statusAlert) {
      message.error(terminateMembersFromStore.error.message || 'Something went wrong!');
      setStatusAlert(false);
    }
    if (terminateMembersFromStore.terminateMembers && statusAlert) {
      dispatch({ type: 'TASK_GET_REQUEST', taskId: taskDetails.taskId });
    }
  }, [terminateMembersFromStore]);

  // SALUTATIONS
  const tempSalutationList = [
    { label: 'Dr.', value: 'Dr.' },
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mrs.', value: 'Mrs.' },
    { label: 'Ms.', value: 'Ms.' },
  ];

  // ONCHANGE FUNCS
  const onChangetitle = (event) => {
    setTitle(event);
  };

  const onChangeFirstName = (event) => {
    setFirstName(event.currentTarget.value);
  };

  const onChangeMiddleName = (event) => {
    setMiddleName(event.currentTarget.value);
  };

  const onChangeLastName = (event) => {
    setLastName(event.currentTarget.value);
  };

  const onChangeGender = (event) => {
    setGender(event);
  };

  const onChangeNationality = (event) => {
    setNationality(event.currentTarget.value);
  };

  const onChangeFinancialExp = (event) => {
    setFinancialExp(event);
  };

  const onChangeIndustrialExp = (event) => {
    setIndustrialExp(event);
  };

  const onChangeDob = (event) => {
    setDob(event);
  };

  const onChangeStartDate = (event) => {
    setStartDate(event);
  };

  const onChangeIsExecutiveType = (event) => {
    setIsExecutiveType(event);
  };

  const onChangeBoardMembersToTerminate = (event) => {
    setBoardMembersToTerminate(event);
  };

  const onChangeKmpMembersToTerminate = (event) => {
    setKmpMembersToTerminate(event);
  };

  const onChangeEndDate = (event) => {
    setEndDate(event);
  };

  // doValidate Function does the validation based on the flags and return boolean
  const doValidate = () => {
    const error = {
      title: !title,
      firstName: !(firstName && (/^([a-zA-Z]{1,}[ ]{0,})+$/.test(firstName))),
      middleName: false,
      lastName: false,
      gender: !gender,
      nationality: !(nationality && (/^([a-zA-Z]{1,}[ ]{0,})+$/.test(nationality))),
      financialExp: !financialExp,
      industrialExp: !industrialExp,
      dob: !dob,
      startDate: !startDate,
      isExecutiveType: !isExecutiveType,
      boardMembersToTerminate: !(boardMembersToTerminate && boardMembersToTerminate.length > 0),
      kmpMembersToTerminate: !(kmpMembersToTerminate && kmpMembersToTerminate.length > 0),
      endDate: !endDate,
    };

    setHasError({ ...hasError, ...error });
    if (isAddNewKmp) {
      return (error.title || error.firstName || error.middleName || error.lastName || error.gender || error.dob || error.startDate);
    }
    if (isAddNewBoard) {
      return (error.title || error.firstName || error.middleName || error.lastName || error.gender || error.nationality
        || error.financialExp || error.industrialExp || error.dob || error.startDate || error.isExecutiveType);
    }
    if (isTerminateKmp) {
      return (error.kmpMembersToTerminate || error.endDate);
    }
    if (isTerminateBoard) {
      return (error.boardMembersToTerminate || error.endDate);
    }
    return true;
  };

  // ONCLICK FUNCS
  const onSubmitClick = () => {
    // postableData aka req payload that sent via api, based on flags
    let postableData;

    if (!doValidate()) {
      if (isAddNewKmp) {
        postableData = {
          companyId: taskDetails.companyId,
          clientTaxonomyId: taskDetails.clientTaxonomyId,
          memberName: `${title} ${firstName}${middleName && ` ${middleName}`}${lastName && ` ${lastName}`}`,
          gender: gender.value,
          dob,
          startDate,
          endDate: '', // NO FRONT END VALUE
        };
      }
      if (isAddNewBoard) {
        postableData = {
          companyId: taskDetails.companyId,
          clientTaxonomyId: taskDetails.clientTaxonomyId,
          memberName: `${title} ${firstName}${middleName && ` ${middleName}`}${lastName && ` ${lastName}`}`,
          gender: gender.value,
          nationality,
          financialExp: financialExp.value,
          industrialExp: industrialExp.value,
          dob,
          startDate,
          isExecutiveType: isExecutiveType.value,
          endDate: '', // NO FRONT END VALUE
        };
      }

      // DISPATCH ACTION
      dispatch({ type: 'ADD_NEW_MEMBER_POST_REQUEST', memberType, payload: postableData });
      setStatusAlert(true);
    } else {
      message.error('Please Enter Required Fields !');
    }
  };

  const onTerminateClick = () => {
    // postableData aka req payload that sent via api, based on flags
    let postableData;

    if (!doValidate()) {
      if (isTerminateKmp) {
        postableData = {
          companyId: taskDetails.companyId,
          kmpMembersToTerminate,
          endDate,
        };
      }
      if (isTerminateBoard) {
        postableData = {
          companyId: taskDetails.companyId,
          boardMembersToTerminate,
          endDate,
        };
      }
      // DISPATCH ACTION
      dispatch({ type: 'TERMINATE_MEMBERS_POST_REQUEST', memberType, payload: postableData });
      setStatusAlert(true);
    } else {
      message.error('Please Enter Required Fields !');
    }
  };
  return (
    <Spin indicator={<PageLoader />} spinning={activeMembersFromStore.isLoading || addNewMemberFromStore.isLoading || terminateMembersFromStore.isLoading || reqTASK.isLoading} >
      <Row>
        {/* --------------------------------------------------------------------------------------------- DPCODE */}
        {/* KMP && BOARD MEMBER NAME */}
        <FieldWrapper
          visible={isAddNewBoard || isAddNewKmp}
          size={[12, 2, 10]}
          label={
            <React.Fragment>
              <div>Full Name<span className="addNewMember-red-asterik"> * </span></div>
              <div>{isAddNewBoard && '(BOSP004)'}{isAddNewKmp && '(MASP003)'}{isExecutiveType.value && '/(MASP003)'}</div>
            </React.Fragment>
          }
          body={
            <Input.Group className="addNewMember-member-name-group">
              <AntSelect size="large" className={hasError.title ? 'addNewMember-title addNewMember-select-red-border' : 'addNewMember-title'} placeholder="Title" value={title} onChange={onChangetitle}>
                {tempSalutationList.map((e) => <AntSelect.Option key={e.value} value={e.value}>{e.label}</AntSelect.Option>)}
              </AntSelect>
              <Input size="large" className={hasError.firstName ? 'addNewMember-memberName addNewMember-red-border' : 'addNewMember-memberName'} placeholder="First Name" value={firstName} onChange={onChangeFirstName} />
              <Input size="large" className="addNewMember-memberName" placeholder="Middle Name (Optional)" value={middleName} onChange={onChangeMiddleName} />
              <Input size="large" className="addNewMember-memberName" placeholder="Last Name (Optional)" value={lastName} onChange={onChangeLastName} />
            </Input.Group>
          }
        />

        {(isAddNewBoard || isAddNewKmp) && <Divider />}

        {/* KMP && BOARD MEMBER GENDER */}
        <FieldWrapper
          visible={isAddNewBoard || isAddNewKmp}
          size={[6, 6, 6]}
          label={
            <React.Fragment>
              <div>Gender<span className="addNewMember-red-asterik"> * </span></div>
              <div>{isAddNewBoard && '(BODR005)'}{isAddNewKmp && '(MASR008)'}{isExecutiveType.value && '/(MASR008)'}</div>
            </React.Fragment>
          }
          body={
            <Select
              value={gender}
              onChange={onChangeGender}
              className={hasError.gender ? 'addNewMember-select-red-border' : ''}
              options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }, { label: 'NA', value: 'Na' }]}
              maxLength={30}
            />
          }
        />

        {/* BOARD MEMBER BOSP006 */}
        <FieldWrapper
          visible={isAddNewBoard}
          size={[6, 6, 6]}
          label={
            <React.Fragment>
              <div>Does the board member have financial expertise?<span className="addNewMember-red-asterik"> * </span></div>
              <div>(BOSP006)</div>
            </React.Fragment>
          }
          body={
            <Select
              value={financialExp}
              onChange={onChangeFinancialExp}
              className={hasError.financialExp ? 'addNewMember-select-red-border' : ''}
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              maxLength={30}
            />
          }
        />

        {/* BOARD MEMBER BOSP005 */}
        <FieldWrapper
          visible={isAddNewBoard}
          size={[6, 6, 6]}
          label={
            <React.Fragment>
              <div>Does the board member have industry experience?<span className="addNewMember-red-asterik"> * </span></div>
              <div>(BOSP005)</div>
            </React.Fragment>
          }
          body={
            <Select
              value={industrialExp}
              onChange={onChangeIndustrialExp}
              className={hasError.industrialExp ? 'addNewMember-select-red-border' : ''}
              options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
              maxLength={30}
            />
          }
        />

        {/* BOARD MEMBER BODP001 */}
        <FieldWrapper
          visible={isAddNewBoard}
          size={[6, 6, 6]}
          label={
            <React.Fragment>
              <div>Board member ethnicity/culture/nationality<span className="addNewMember-red-asterik"> * </span></div>
              <div>(BODP001)</div>
            </React.Fragment>
          }
          body={
            <Form.Control
              type="text"
              className={hasError.nationality ? 'addNewMember-red-border' : ''}
              onChange={onChangeNationality}
              value={nationality}
            />
          }
        />

        {/* KMP && BOARD MEMBER DOB */}
        <FieldWrapper
          visible={isAddNewBoard || isAddNewKmp}
          size={[6, 6, 6]}
          label={
            <React.Fragment>
              DOB<span className="addNewMember-red-asterik"> * </span>
            </React.Fragment>
          }
          body={
            <DatePicker size="large" value={dob && moment(dob)} onChange={onChangeDob} className={hasError.dob ? 'addNewMember-dob addNewMember-red-border' : 'addNewMember-dob'} />
          }
        />

        {/* EXECUTIVE */}
        <FieldWrapper
          visible={isAddNewBoard}
          size={[6, 6, 6]}
          label={
            <React.Fragment>
              Is also a executive member ?<span className="addNewMember-red-asterik"> * </span>
            </React.Fragment>
          }
          body={
            <Select
              value={isExecutiveType}
              className={hasError.isExecutiveType ? 'addNewMember-select-red-border' : ''}
              onChange={onChangeIsExecutiveType}
              options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
              maxLength={30}
            />
          }
        />

        {/* KMP && BOARD MEMBER START DATE */}
        <FieldWrapper
          visible={isAddNewBoard || isAddNewKmp}
          size={[6, 6, 6]}
          label={
            <React.Fragment>
              Start Date<span className="addNewMember-red-asterik"> * </span>
            </React.Fragment>
          }
          body={
            <DatePicker size="large" value={startDate && moment(startDate)} onChange={onChangeStartDate} className={hasError.startDate ? 'addNewMember-start-date addNewMember-red-border' : 'addNewMember-start-date'} />
          }
        />

        <FieldWrapper
          visible={isTerminateBoard}
          size={[12, 6, 6]}
          label={
            <React.Fragment>
              Members List<span className="addNewMember-red-asterik"> * </span>
            </React.Fragment>
          }
          body={
            <AntSelect maxTagCount="responsive" mode="multiple" size="large" className={hasError.boardMembersToTerminate ? 'terminateMember-memberList addNewMember-red-border' : 'terminateMember-memberList'} placeholder="Choose" value={boardMembersToTerminate} onChange={onChangeBoardMembersToTerminate}>
              {activeBoardMembersList.map((e) => <AntSelect.Option key={e.value} value={e.value}>{e.label}</AntSelect.Option>)}
            </AntSelect>
          }
        />

        <FieldWrapper
          visible={isTerminateKmp}
          size={[12, 6, 6]}
          label={
            <React.Fragment>
              Members List<span className="addNewMember-red-asterik"> * </span>
            </React.Fragment>
          }
          body={
            <AntSelect maxTagCount="responsive" mode="multiple" size="large" className={hasError.kmpMembersToTerminate ? 'terminateMember-memberList addNewMember-red-border' : 'terminateMember-memberList'} placeholder="Choose" value={kmpMembersToTerminate} onChange={onChangeKmpMembersToTerminate}>
              {activeKmpMembersList.map((e) => <AntSelect.Option key={e.value} value={e.value}>{e.label}</AntSelect.Option>)}
            </AntSelect>
          }
        />

        <FieldWrapper
          visible={isTerminateBoard || isTerminateKmp}
          size={[12, 6, 6]}
          label={
            <React.Fragment>
              End Date<span className="addNewMember-red-asterik"> * </span>
            </React.Fragment>
          }
          body={
            <DatePicker size="large" value={endDate && moment(endDate)} onChange={onChangeEndDate} className={hasError.endDate ? 'terminateMember-end-date addNewMember-red-border' : 'terminateMember-end-date'} />
          }
        />


        <Divider />

        <Col lg={12} className="addNewTerminate-button-wrap">
          {/* {(isAddNewBoard || isAddNewKmp) && <Button onClick={onSubmitClick} variant="success">Submit</Button>}
          {(isTerminateKmp || isTerminateBoard) && <Button onClick={onTerminateClick} variant="danger">Terminate</Button>} */}
          { (isAddNewBoard || isAddNewKmp || isTerminateKmp || isTerminateBoard) &&
            <Button
              onClick={(isAddNewBoard || isAddNewKmp) ? onSubmitClick : (isTerminateKmp || isTerminateBoard) ? onTerminateClick : null}
              variant={(isAddNewBoard || isAddNewKmp) ? 'success' : (isTerminateKmp || isTerminateBoard) ? 'danger' : null}
            >{(isAddNewBoard || isAddNewKmp) ? 'Submit' : (isTerminateKmp || isTerminateBoard) ? 'Terminate' : null}
            </Button>
          }
        </Col>
      </Row>
    </Spin>);
};

AddNewKMPMember.propTypes = {
  modalType: PropTypes.string.isRequired,
  taskDetails: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default AddNewKMPMember;

