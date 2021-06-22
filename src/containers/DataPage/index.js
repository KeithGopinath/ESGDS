/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { Drawer, Tabs } from 'antd';
import moment from 'moment';

import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import AddSource from './AddSource';

import { DataSheetComponent } from './DataSheet';
import DataAccordian from './DataAccordian';

import ErrorAndComment from './ErrorAndComment';

import { ANALYST_DC_DATA, QA_DV_DATA, COMPANY_REP_DATA } from '../../containers/DataPage/apiData';
import ErrorDataSheetTwo from './ErrorDataSheet2';


const DataSheetMain = (props) => {
  const currentRole = sessionStorage.role;

  const {
    reqIndexes,
    reqDpCodeData,
    reqTask,
    locationData,
    reqSourceData,
    reqErrorList,
    openSourcePanel,
  } = props;

  const [reqCurrentData, setReqCurrentData] = useState(reqDpCodeData.currentData);

  const [reqHistoricalData, setReqHistoricalData] = useState(reqDpCodeData.historicalData);

  useEffect(() => {
    setReqCurrentData(reqDpCodeData.currentData);
    setReqHistoricalData(reqDpCodeData.historicalData);
  }, [locationData]);

  const saveReqCurrentData = (data) => {
    console.log(data, 'Incoming');
    setReqCurrentData(reqCurrentData.map((e) => {
      if (e.fiscalYear === data.fiscalYear) {
        const returnableData = { ...e, ...data };
        return returnableData;
      }
      return e;
    }));
    console.log(reqCurrentData.map((e) => {
      if (e.fiscalYear === data.fiscalYear) {
        const returnableData = { ...e, ...data };
        return returnableData;
      }
      return e;
    }));
  };

  const saveReqHistoricalData = (data) => {
    console.log(data, 'Incoming');
    setReqHistoricalData(reqHistoricalData.map((e) => {
      if (e.fiscalYear === data.fiscalYear) {
        const returnableData = { ...e, ...data };
        return returnableData;
      }
      return e;
    }));
    console.log(reqHistoricalData.map((e) => {
      if (e.fiscalYear === data.fiscalYear) {
        const returnableData = { ...e, ...data };
        return returnableData;
      }
      return e;
    }));
  };

  const dataCheckBeforeSave = () => {
    console.log(reqCurrentData);
    const nonSavedYears = (reqCurrentData.map((e) => {
      if (currentRole === 'Analyst' && e.status !== 'Completed') {
        return e.fiscalYear;
      }
      if (currentRole !== 'Analyst' && e.error && e.error.errorStatus !== 'Completed') {
        return e.fiscalYear;
      }
      if (currentRole !== 'Analyst' && !e.error) {
        return e.fiscalYear;
      }
      return null;
    })).filter((e) => (e !== null));
    return nonSavedYears;
  };

  return (
    <React.Fragment>

      {/* HISTORICAL TABS */}
      <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
        <DataAccordian header="History">
          <Tabs defaultActiveKey={reqHistoricalData[0].fiscalYear} >
            {reqHistoricalData.map((e) => (
              <Tabs.TabPane tab={e.fiscalYear} key={e.fiscalYear}>
                <DataSheetComponent
                  isHistoryType
                  reqData={e}
                  reqTask={reqTask}
                  reqIndexes={reqIndexes}
                  locationData={locationData}
                  reqSourceData={reqSourceData}
                  reqErrorList={reqErrorList}
                  openSourcePanel={openSourcePanel}
                  onClickSave={saveReqHistoricalData}
                  dummyDataCheck={dataCheckBeforeSave}
                />
              </Tabs.TabPane>))}
          </Tabs>
        </DataAccordian>
      </Col>

      {/* HISTORICAL TABS */}
      {currentRole === 'Analyst' &&
      <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
        <DataAccordian header="Error" isActive >
          { false ?
            <ErrorAndComment
              action={null}
              author="QA"
              errorType="Data/information Missed"
              errorInfo={null}
              comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel ex ullamcorper, volutpat diam vel, volutpat orci. Nunc in felis sed velit rhoncus eleifend eget tempus ligula"
            /> :
            <ErrorAndComment
              action={
                [
                  <div>
                    <Button style={{ fontSize: '14px', padding: '2px 5px', margin: 3 }} variant="success">Accept</Button>
                    <Button style={{ fontSize: '14px', padding: '2px 5px', margin: 3 }} variant="danger">Reject</Button>
                  </div>,
                ]
              }
              author="QA"
              errorType="Data/information Missed"
              errorInfo={<ErrorDataSheetTwo isErrorCommentType isVisible reqData={reqDpCodeData.historicalData[0]} />}
              comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel ex ullamcorper, volutpat diam vel, volutpat orci. Nunc in felis sed velit rhoncus eleifend eget tempus ligula"
            />}
        </DataAccordian>
      </Col>}

      {/* CURRENT TABS */}
      <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
        <DataAccordian header="Current" isActive >
          <Tabs defaultActiveKey={reqCurrentData[0].fiscalYear} >
            {reqCurrentData.map((e) => (
              <Tabs.TabPane tab={e.fiscalYear} key={e.fiscalYear}>
                <DataSheetComponent
                  reqData={e}
                  reqTask={reqTask}
                  reqIndexes={reqIndexes}
                  locationData={locationData}
                  reqSourceData={reqSourceData}
                  reqErrorList={reqErrorList}
                  openSourcePanel={openSourcePanel}
                  onClickSave={saveReqCurrentData}
                  dummyDataCheck={dataCheckBeforeSave}
                />
              </Tabs.TabPane>))}
          </Tabs>
        </DataAccordian>
      </Col>

    </React.Fragment>
  );
};


const DataPage = (props) => {
  const sideBarRef = useRef();

  const currentRole = sessionStorage.role;

  const errorList = ['T1. Incorrect data input/typo', 'T1. Document missed',
    'T1. Data/Information missed',
    'T1. SOP not followed',
    'T1. Incorrect Evidence',
    'T1. Missed snippet',
    'T1. Incorrect Scoring',
    'T2. Evidence not substantive',
    'T2. Improvement for next time',
    'T2. Comments and calculation',
    'T2. Others/No error'];

  const srcList = [
    { sourceName: 'Annual Report', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: moment('Tue May 04 2021') },
  ];

  const getDefaultApiData = () => {
    if (currentRole === 'Company Representative') {
      return COMPANY_REP_DATA;
    }
    if (currentRole === 'Client Representative') {
      return COMPANY_REP_DATA;
    }
    if (currentRole === 'QA') {
      return QA_DV_DATA;
    }
    if (currentRole === 'Analyst') {
      return ANALYST_DC_DATA;
    }
    return [];
  };

  const defaultApiData = getDefaultApiData();

  const [isSrcPanelOpened, setIsSrcPanelOpened] = useState(false);

  const [sourceApiData, setSourceApiData] = useState(srcList);

  const onUploadAddSource = (value) => {
    const filteredData = srcList.filter((src) => (value.sourceName !== src.sourceName));
    setSourceApiData([...filteredData, { ...value }]);
  };

  const onClickOpenAddSource = () => {
    setIsSrcPanelOpened(true);
  };

  const onClickCloseAddSource = () => {
    setIsSrcPanelOpened(false);
  };

  const getReqData = (data) => {
    const { taskId, dpCode } = props.location.state;
    const [reqTask] = data.filter((task) => (task.taskId === taskId));
    const reqMaxIndex = reqTask.dpCodesData.length - 1;
    const reqMinIndex = 0; // CONSTANT
    const returnbaleData = (reqTask.dpCodesData.map((dpData, index) => {
      if (dpData.dpCode === dpCode) {
        return ({
          reqIndexes: { maxIndex: reqMaxIndex, currentIndex: index, minIndex: reqMinIndex }, reqDpCodeData: dpData, reqTask,
        });
      }
      return null;
    })).filter((e) => (e !== null));

    return returnbaleData;
  };

  const [{
    reqIndexes, reqDpCodeData, reqTask,
  }] = getReqData(defaultApiData);

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="DP Code" sideBarRef={sideBarRef} />
        <div className="datapage-main" >
          <div className="datapage-info-group">

            <Drawer
              title="Add Source"
              placement="right"
              closable={false}
              onClose={onClickCloseAddSource}
              visible={isSrcPanelOpened}
              key="right"
              width={300}
              headerStyle={{ backgroundColor: '#2199c8' }}
            >
              {isSrcPanelOpened && <AddSource onUploadAddSource={onUploadAddSource} closeAddSourcePanel={onClickCloseAddSource} />}
            </Drawer>

            <DataSheetMain
              reqIndexes={reqIndexes}
              reqDpCodeData={reqDpCodeData}
              reqTask={reqTask}
              locationData={props.location}
              reqSourceData={sourceApiData}
              reqErrorList={errorList}
              openSourcePanel={onClickOpenAddSource}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
