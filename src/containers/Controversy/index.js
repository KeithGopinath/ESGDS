/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import { Tabs, Divider } from 'antd';
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
  const tablePopulate = (data) => data.map(({
    source, response,
  }, index) => ({
    index,
    srcName: source.sourceName,
    publicationDate: source.publicationDate,
    response,
    action:
  <Link
    href
    to={{
      pathname: '/controversypage',
      state: { page: 'edit' },
    }}
  >Enter
  </Link>,
  }));

  const CONTROVERSY_PENDING_TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'index', label: 'Id', align: 'center', dataType: 'string',
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

const controversyJSONList = [
  {
    id: '001',
    dpCode: 'BUSN001',
    year: '2018-2019, 2019-2020',
    indicator: 'Biodiversity Controversies',

    currentData: [
      {
        dpCode: 'BUSN001',
        fiscalYear: '2018-2019',
        avgResponseUnit: 'High', // it can high/medium/low/na
        controversyList: [
          {
            dpCode: 'BIOP002',
            fiscalYear: '2018-2019',
            status: 'unknown',
            description: 'Are there any reported controversies on biodiversity for the fiscal year?',
            dataType: 'text',
            textSnippet: 'Snippet',
            pageNo: '45',
            screenShot: '',
            response: 'High',
            uploadedFile: '',
            source: { sourceName: 'The Hindu', url: 'https://admin.mrpl.co.in/img/UploadedFiles/AnnualReport/Files/1c7d3b3b1d7f4c65b46e50c3422a1bdb.pdf', publicationDate: 'Tue May 04 2017' },
          },
          {
            dpCode: 'BIOP002',
            fiscalYear: '2018-2019',
            status: 'unknown',
            description: 'Are there any reported controversies on biodiversity for the fiscal year?',
            dataType: 'text',
            textSnippet: 'Snippet',
            pageNo: '45',
            screenShot: '',
            response: 'High',
            uploadedFile: '',
            source: { sourceName: 'India Times', url: 'https://admin.mrpl.co.in/img/UploadedFiles/AnnualReport/Files/1c7d3b3b1d7f4c65b46e50c3422a1bdb.pdf', publicationDate: 'Tue May 04 2017' },
          },
        ],
      },
      {
        dpCode: 'BUSN001',
        fiscalYear: '2019-2020',
        avgResponseUnit: 'Low', // it can high/medium/low/na
        controversyList: [
          {
            dpCode: 'BIOP002',
            fiscalYear: '2019-2020',
            status: 'unknown',
            description: 'Are there any reported controversies on biodiversity for the fiscal year?',
            dataType: 'text',
            textSnippet: 'Snippet',
            pageNo: '45',
            screenShot: '',
            response: 'High',
            uploadedFile: '',
            source: { sourceName: 'India Times', url: 'https://admin.mrpl.co.in/img/UploadedFiles/AnnualReport/Files/1c7d3b3b1d7f4c65b46e50c3422a1bdb.pdf', publicationDate: 'Tue May 04 2017' },
          },
        ],
      },
    ],
  },
];
const Controversy = () => {
  const sideBarRef = useRef();
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="container-main" >
          <div className="task-info-group">
            <div className="task-id-year-wrap" style={{ marginBottom: '1%' }}>
              <div className="task-pillar">BUSN001</div>
            </div>
            <div className="task-keyissue">
              <Row>
                <FieldWrapper
                  label="Description*"
                  visible
                  body="Are there any reported controversies on biodiversity for the fiscal year?"
                />
                <FieldWrapper
                  label="Indicator*"
                  visible
                  body="Biodiversity Controversies"
                />
                <FieldWrapper
                  label="KeyIssue*"
                  visible
                  body="Biodiversity impact"
                />
              </Row>
            </div>
            {false && controversyJSONList.map((e) => <div>{e.id}</div>)}
            <div style={{ padding: '20px 2%' }}>
              <Tabs defaultActiveKey={controversyJSONList[0].currentData[0].fiscalYear} >
                {controversyJSONList[0].currentData.map((e) => (
                  <Tabs.TabPane style={{ padding: '0 !important' }} tab={<span style={{ fontSize: '1rem' }}>{e.fiscalYear}</span>} key={e.fiscalYear}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <FieldWrapper
                        label="Response*"
                        visible
                        body="High"
                      />
                      <Button
                        variant="light"
                        style={{ color: '#007bff' }}
                        onClick={() => history.push({
                          pathname: '/controversypage',
                          state: { page: 'new' },
                        })}
                      >Add New +
                      </Button>
                    </div>
                    <Divider />
                    <ControversyPendingTaskTable data={e.controversyList} />
                  </Tabs.TabPane>))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controversy;
