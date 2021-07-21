/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import CustomTable from '../../components/CustomTable';
import { history } from '../../routes';
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


const ControversyPendingTaskTable = (props) => {
  // TABLE DATA
  console.log(props);
  const tablePopulate = (data) => data.map((e) => ({
    conId: e.id,
    srcName: e.source.sourceName,
    publicationDate: e.source.publicationDate,
    response: e.response,
    action:
  <Link
    href
    to={{
      pathname: '/controversypage',
      state: { dpCodeData: e },
    }}
  >View
  </Link>,
  }));

  const CONTROVERSY_PENDING_TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'conId', label: 'Id', align: 'center', dataType: 'string',
      },
      {
        id: 'srcName', label: 'Source Name', align: 'center', dataType: 'string',
      },
      {
        id: 'publicationDate', label: 'Publication Date', align: 'center', dataType: 'string',
      },
      {
        id: 'response', label: 'Response', align: 'center', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Controveries',
  };

  return (
    <CustomTable tableData={CONTROVERSY_PENDING_TASK_DATA} />
  );
};

const Controversy = (props) => {
  const sideBarRef = useRef();
  const { taskDetails } = props.location.state;
  const extractReqDpCode = (data) => {
    const { dpCodeDetails } = props.location.state;
    return data.filter((e) => (e.dpCode === dpCodeDetails.dpCode));
  };
  const reqDpCodesData = JSON.parse(sessionStorage.filteredData);
  const [reqDpCodeData] = extractReqDpCode(reqDpCodesData);
  console.log(reqDpCodeData);
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Controversy" sideBarRef={sideBarRef} />
        <div className="container-main" >
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
                  visible
                  body={reqDpCodeData.indicator}
                />
                <FieldWrapper
                  label="KeyIssue*"
                  visible
                  body={reqDpCodeData.keyIssue}
                />
                <FieldWrapper
                  label="Response*"
                  visible
                  body={reqDpCodeData.avgResponse}
                />
                <Divider />
                <Col lg={12} style={{ justifyContent: 'flex-end', alignItems: 'center', display: 'flex' }}>
                  <Button
                    variant="light"
                    style={{ color: '#007bff' }}
                    onClick={() => history.push({
                      pathname: '/controversypage',
                      state: {
                        dpCodeData:
                        {
                          dpCode: reqDpCodeData.dpCode,
                          status: 'Add New',
                          description: reqDpCodeData.description,
                          dataType: reqDpCodeData.dataType,
                        },
                      },
                    })}
                  >Add New +
                  </Button>
                </Col>
              </Row>
            </div>
            <div style={{ padding: '20px 2%' }}>
              <ControversyPendingTaskTable data={reqDpCodeData.controversyList} />
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
