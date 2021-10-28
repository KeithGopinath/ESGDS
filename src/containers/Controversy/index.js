/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { CloseCircleFilled } from '@ant-design/icons';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import CustomTable from '../../components/CustomTable';
import { history } from '../../routes';


// Field Wrapper Components Wrap Up The Fields With Boostrap Rows And Colums With Props as {visible}, {body}, {label}
const FieldWrapper = (props) => {
  if (props.visible) {
    return (
      <Col style={{ padding: '0 5px' }} lg={4}>
        <Form.Group>
          <Form.Label style={{ color: '#04385a', fontWeight: 500 }} column sm={3}>
            {props.label}
          </Form.Label>
          <Col style={{ display: 'flex', alignItems: 'center' }} sm={9}>
            {props.body}
          </Col>
        </Form.Group>
      </Col>
    );
  }
  return null;
};

// CONTROVERSY PENDING TASK TABLE GETS {controversyList}, {taskDetails}, {isLoading} & {controversyResponseList} AS PROPS AND RETURN A TABLE WITH ALL DETAILS TABULATED
const ControversyPendingTaskTable = (props) => {
  // TABLE POPULATE FUNC POPULATES ROWS DATA THAT REQUIRESD FOR TABLE
  const tablePopulate = (data) => data.map((e) => ({
    key: e.controversyNumber,
    controversyNumber: e.controversyNumber,
    srcName: e.source.sourceName,
    publicationDate: moment(e.source.publicationDate).format('DD/MM/YYYY'),
    response: e.response,
    action:
  <Link
    href
    to={{
      pathname: '/controversypage',
      state: { dpCodeData: { ...e, status: 'Completed', inputValues: props.inputValues }, type: 'UPDATE', taskDetails: props.taskDetails },
    }}
  >View
  </Link>,
  }));

  const CONTROVERSY_PENDING_TASK_DATA = {
    rowsData: tablePopulate(props.controversyList),
    columnsHeadData: [
      {
        id: 'controversyNumber', label: 'No', align: 'left', dataType: 'string',
      },
      {
        id: 'srcName', label: 'Source Name', align: 'left', dataType: 'string',
      },
      {
        id: 'publicationDate', label: 'Publication Date', align: 'left', dataType: 'date',
      },
      {
        id: 'response', label: 'Response', align: 'left', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Controveries',
  };

  return (
    <CustomTable tableData={CONTROVERSY_PENDING_TASK_DATA} isLoading={props.isLoading} message={props.message} icon={props.icon} />
  );
};

const Controversy = (props) => {
  // PROPS { taskDetails, dpCodeDetails }
  const { taskDetails, dpCodeDetails } = props.location.state;

  // DISPATCH DECLARATION
  const dispatch = useDispatch();

  // COMPONENT DID MOUNT LIKE USEEFFECT HOOKS TO CALL API
  useEffect(() => {
    dispatch({ type: 'CONTROVERSY_DPCODEDATA_GET_REQUEST', companyId: taskDetails.companyId, dpCodeId: dpCodeDetails.dpCodeId });
  }, []);


  const reqConDpCodeDataFromStore = useSelector((state) => state.dpCodeData);
  const reqConDpCodeData = reqConDpCodeDataFromStore && reqConDpCodeDataFromStore.dpCodeData;

  const sideBarRef = useRef();

  // EXTRACT DPCODE DATA
  const extractReqDpCode = (data) => data.filter((e) => (e.dpCode === dpCodeDetails.dpCode));

  // session.storage to props.location.state
  // const reqDpCodesData = JSON.parse(sessionStorage.filteredData);

  const reqDpCodesData = taskDetails.filteredData;

  const [reqDpCodeData] = reqConDpCodeData && reqConDpCodeData.data ? [reqConDpCodeData.data] : extractReqDpCode(reqDpCodesData);

  const onClickAddNewControversy = () => history.push({
    pathname: '/controversypage',
    state: {
      dpCodeData:
      {
        ...reqDpCodeData,
        controversyResponseList: reqDpCodeData.responseList,
        status: 'Add New',
      },
      type: 'NEW',
      taskDetails,
    },
  });

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Controversy" sideBarRef={sideBarRef} />
        <div className="controversy-main" >
          <div className="task-info-group">
            <div className="task-id-year-wrap" style={{ marginBottom: '1%' }}>
              <div className="task-pillar">{reqDpCodeData.dpCode}</div>
            </div>
            <div className="task-keyissue">
              <Row>
                {/* <FieldWrapper
                  label="Description*"
                  visible
                  body={reqDpCodeData.description}
                /> */}
                <FieldWrapper
                  label="Indicator*"
                  visible={reqDpCodeData.indicator}
                  body={reqDpCodeData.indicator}
                />
                <FieldWrapper
                  label="KeyIssue*"
                  visible={reqDpCodeData.keyIssue}
                  body={reqDpCodeData.keyIssue}
                />
                <FieldWrapper
                  label="Response*"
                  visible={reqDpCodeData.avgResponse}
                  body={reqDpCodeData.avgResponse}
                />
                { (!reqConDpCodeDataFromStore.error && !reqConDpCodeDataFromStore.isLoading) && <Divider /> }
                <Col lg={12} style={{ justifyContent: 'flex-end', alignItems: 'center', display: 'flex' }}>
                  { (!reqConDpCodeDataFromStore.error && !reqConDpCodeDataFromStore.isLoading) &&
                  <Button
                    variant="light"
                    style={{ color: '#007bff' }}
                    onClick={onClickAddNewControversy}
                  >Add New +
                  </Button>}
                </Col>
              </Row>
            </div>
            <div style={{ padding: '20px 2%' }}>
              <ControversyPendingTaskTable
                controversyList={reqDpCodeData.controversyList ? reqDpCodeData.controversyList : []}
                isLoading={reqConDpCodeDataFromStore.isLoading}
                message={(reqConDpCodeDataFromStore && reqConDpCodeDataFromStore.error) ? (reqConDpCodeDataFromStore.error.message || 'Something went wrong !') : null}
                icon={(reqConDpCodeDataFromStore && reqConDpCodeDataFromStore.error) ? <CloseCircleFilled /> : null}
                taskDetails={taskDetails}
                inputValues={reqDpCodeData.inputValues}
              />
            </div>
            <Col lg={12} className="datapage-button-wrap" style={{ marginBottom: '3%' }}>
              {/* Button */}
              { true &&
              <Button
                className="datapage-button"
                variant="danger"
                onClick={() => {
                  history.push({
                    pathname: `/task/${taskDetails.taskId}`, state: { taskDetails },
                  });
                }}
              >Back
              </Button>}
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controversy;
