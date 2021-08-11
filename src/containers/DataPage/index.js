/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Tabs, Spin, message } from 'antd';
import moment from 'moment';
import { history } from '../../routes';

import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
// import AddSource from './AddSource';

import { DataSheetComponent } from './DataSheet';
import DataAccordian from './DataAccordian';

import DataComment from './DataComment';
import PageLoader from '../../components/PageLoader';


const DataSheetMain = (props) => {
  // CURRENT ROLE
  const currentRole = sessionStorage.role;

  // CURRENT TAB
  const currentTab = sessionStorage.tab;

  // BOOLEANS BASED ON CURRENT ROLE & SELECTED TAB
  const [isAnalyst_DC, isAnalyst_DCR, isQA_DV, isCompanyRep_DR, isClientRep_DR] = [
    currentRole === 'Analyst' && currentTab === 'Data Collection',
    currentRole === 'Analyst' && currentTab === 'Data Correction',
    currentRole === 'QA',
    currentRole === 'Company Representative' || currentRole === 'CompanyRep',
    currentRole === 'Client Representative' || currentRole === 'ClientRep',
  ];

  // DESTRUCTURING VALUES FROM PROPS
  const {
    reqIndexes,
    reqDpCodeData,
    reqTask,
    locationData,
    reqSourceData,
    reqErrorList,
    // openSourcePanel,
  } = props;


  // reqCurrentData A TEMP STATE WITH DEFAULT DATA AS ARRAY OF CURRENT DATA
  const [reqCurrentData, setReqCurrentData] = useState(reqDpCodeData.currentData || []);

  // reqHistoricalData A TEMP STATE WITH DEFAULT DATA AS ARRAY OF HISTORICAL DATA
  const [reqHistoricalData, setReqHistoricalData] = useState(reqDpCodeData.historicalData || []);

  const reqCommentsList = reqDpCodeData.comments;

  useEffect(() => {
    setReqCurrentData(reqDpCodeData.currentData || []);
    setReqHistoricalData(reqDpCodeData.historicalData || []);
  }, [reqDpCodeData]);

  const saveReqCurrentData = (data) => {
    setReqCurrentData(reqCurrentData.map((e) => {
      if (e.fiscalYear === data.fiscalYear) {
        const returnableData = { ...e, ...data };
        return returnableData;
      }
      return e;
    }));
  };

  const saveReqHistoricalData = (data) => {
    setReqHistoricalData(reqHistoricalData.map((e) => {
      if (e.fiscalYear === data.fiscalYear) {
        const returnableData = { ...e, ...data };
        return returnableData;
      }
      return e;
    }));
  };

  const getUnsavedCurrentYears = () => {
    const nonSavedYears = (reqCurrentData.map((e) => {
      if (isAnalyst_DC && e.status !== 'Completed') {
        return e.fiscalYear;
      }
      if (isAnalyst_DCR && e.status !== 'Completed' && (e.error.status !== 'Completed')) {
        return e.fiscalYear;
      }
      if (isAnalyst_DCR && e.status === 'Completed' && (e.error.status !== 'Completed')) {
        return e.fiscalYear;
      }
      if (isAnalyst_DCR && e.status !== 'Completed' && (e.error.status === 'Completed')) {
        return e.fiscalYear;
      }
      if ((isQA_DV || isCompanyRep_DR || isClientRep_DR) && e.error && e.error.errorStatus !== 'Completed') {
        return e.fiscalYear;
      }
      if ((isQA_DV || isCompanyRep_DR || isClientRep_DR) && !e.error) {
        return e.fiscalYear;
      }
      return null;
    })).filter((e) => (e !== null));
    return nonSavedYears;
  };

  const getUnsavedHistoricalYears = () => {
    const nonSavedYears = (reqHistoricalData.map((e) => {
      if (e.status !== 'Completed') {
        return e.fiscalYear;
      }
      return null;
    })).filter((e) => (e !== null));
    return nonSavedYears;
  };

  const reqDataCheckBeforeSave = () => ({
    currentData: getUnsavedCurrentYears(),
    historicalData: getUnsavedHistoricalYears(),
  });

  const backClickHandler = () => {
    console.log('backClickHandler');
    history.push({
      pathname: `/task/${reqTask.taskNumber}`,
      state: {
        taskDetails: {
          taskId: reqTask.taskId,
          pillar: reqTask.pillar,
          company: reqTask.company,
          companyId: reqTask.companyId,
          taskNumber: reqTask.taskNumber,
        },
      },
    });
  };

  const previousClickHandler = () => {
    console.log('previousClickHandler');
    const nextDpCode = reqTask.dpCodesData[reqIndexes.currentIndex - 1];
    history.push({
      pathname: `/dpcode/${nextDpCode.dpCode}`,
      state: {
        taskDetails: {
          taskId: reqTask.taskId,
          pillar: reqTask.pillar,
          company: reqTask.company,
          taskNumber: reqTask.taskNumber,
          memberType: reqTask.memberType,
        },
        dpCodeDetails: nextDpCode,
        filteredData: reqTask.dpCodesData,
      },
    });
  };

  const additionalDetailsMapper = (dpCodeObj) => {
    let additionalDetails = {};
    if (dpCodeObj.additionalDetails) {
      for (let i = 0; i < dpCodeObj.additionalDetails.length; i += 1) {
        additionalDetails = { ...additionalDetails, [`${dpCodeObj.additionalDetails[i].fieldName}`]: dpCodeObj.additionalDetails[i].value };
      }
    }
    return additionalDetails || [];
  };

  const getReqDetails = (dataList) => dataList.map((e) => {
    let returnableData = {
      dpCode: e.dpCode,
      fiscalYear: e.fiscalYear,
      textSnippet: e.textSnippet,
      pageNo: e.pageNo,
      screenShot: e.screenShot,
      response: e.response,
      source: e.source,
      additionalDetails: additionalDetailsMapper(e),
    };

    if (isAnalyst_DCR) {
      returnableData = { ...returnableData, rejectComment: e.rejectComment, isAccepted: e.isAccepted };
    }
    if (isQA_DV) {
      returnableData = { ...returnableData, error: e.error };
    }
    if (isCompanyRep_DR || isClientRep_DR) {
      returnableData = { ...returnableData, error: e.error };
    }
    return returnableData;
  });

  const getPostableData = () => {
    const reqDpcodeData = reqTask.dpCodesData[reqIndexes.currentIndex];
    const postableData = {
      taskId: reqTask.taskId,
      taskNumber: reqTask.taskNumber,
      dpCodeId: reqDpcodeData.dpCodeId,
      companyId: reqDpcodeData.companyId,
      pillarId: reqDpcodeData.pillarId,
      currentData: getReqDetails(reqCurrentData),
      historicalData: getReqDetails(reqHistoricalData),
    };
    return postableData;
  };

  const saveAndNextClickHandler = () => {
    console.log(reqDataCheckBeforeSave(), 'LIST OF NUMS');
    if ((reqDataCheckBeforeSave().currentData).length === 0 && (reqDataCheckBeforeSave().historicalData).length === 0) {
      console.log('saveAndNextClickHandler');
      console.log(getPostableData());
      const nextDpCode = reqTask.dpCodesData[reqIndexes.currentIndex + 1];
      history.push({
        pathname: `/dpcode/${nextDpCode.dpCode}`,
        state: {
          dpCodeDetails: nextDpCode,
          taskDetails: {
            taskId: reqTask.taskId,
            pillar: reqTask.pillar,
            company: reqTask.company,
            taskNumber: reqTask.taskNumber,
            memberType: reqTask.memberType,
          },
        },
      });
    } else {
      const msgCurrent = reqDataCheckBeforeSave().currentData;
      const msgHistorical = reqDataCheckBeforeSave().historicalData;
      if (isAnalyst_DC) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `current data for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isAnalyst_DCR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is accepted or rejected.`, 8);
      }
      if (isQA_DV) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isClientRep_DR || isCompanyRep_DR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
    }
  };

  const saveAndCloseClickHandler = () => {
    if ((reqDataCheckBeforeSave().currentData).length === 0 && (reqDataCheckBeforeSave().historicalData).length === 0) {
      console.log('saveAndCloseClickHandler');
      console.log(getPostableData());
      history.push({
        pathname: `/task/${reqTask.taskNumber}`,
        state: {
          taskDetails: {
            taskId: reqTask.taskId,
            pillar: reqTask.pillar,
            company: reqTask.company,
            taskNumber: reqTask.taskNumber,
            memberType: reqTask.memberType,
          },
        },
      });
    } else {
      const msgCurrent = reqDataCheckBeforeSave().currentData;
      const msgHistorical = reqDataCheckBeforeSave().historicalData;
      if (isAnalyst_DC) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `current data for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isAnalyst_DCR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is accepted or rejected.`, 8);
      }
      if (isQA_DV) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
      if (isClientRep_DR || isCompanyRep_DR) {
        message.error(`Please make sure the ${msgCurrent.length !== 0 ? `error(s) for ${msgCurrent}` : `historical data for ${msgHistorical}`} fiscal year(s) is entered and saved.`, 8);
      }
    }
  };

  return (
    <React.Fragment>
      {/* HISTORICAL TABS */}
      <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
        <DataAccordian header="History">
          <Tabs defaultActiveKey={reqHistoricalData[0] && reqHistoricalData[0].fiscalYear} >
            {reqHistoricalData.map((e) => (
              <Tabs.TabPane tab={e.fiscalYear} key={e.fiscalYear}>
                <DataSheetComponent
                  isHistoryType
                  reqData={e}
                  locationData={locationData}
                  reqSourceData={reqSourceData}
                  reqErrorList={reqErrorList}
                  // openSourcePanel={openSourcePanel}
                  onClickSave={saveReqHistoricalData}
                />
              </Tabs.TabPane>))}
          </Tabs>
        </DataAccordian>
      </Col>

      {/* CURRENT TABS */}
      <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
        <DataAccordian header="Current" isActive >
          <Tabs defaultActiveKey={reqCurrentData[0] && reqCurrentData[0].fiscalYear}>
            {reqCurrentData.map((e) => (
              <Tabs.TabPane
                tab={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {e.fiscalYear}
                    {e.error && e.error.isErrorRaised && <ExclamationCircleTwoTone style={{ margin: '0 0 0 5px' }} twoToneColor="#FF0000" />}
                  </div>
                }
                key={e.fiscalYear}
              >
                <DataSheetComponent
                  reqData={e}
                  locationData={locationData}
                  reqSourceData={reqSourceData}
                  reqErrorList={reqErrorList}
                  // openSourcePanel={openSourcePanel}
                  onClickSave={saveReqCurrentData}
                />
                <Col lg={12} className="datapage-button-wrap"><div>{`${reqIndexes.currentIndex + 1}/${reqIndexes.maxIndex + 1}`}</div></Col>
                <Col lg={12} className="datapage-button-wrap">
                  {/* BACK Button */}
                  { ((isAnalyst_DC || isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) &&
                  <Button className="datapage-button" variant="danger" onClick={backClickHandler}>Back</Button>}

                  {/* PREVIOUS Button */}
                  { (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && (reqIndexes.currentIndex !== reqIndexes.minIndex) &&
                  <Button className="datapage-button" variant="primary" onClick={previousClickHandler}>Previous</Button>}

                  {/* SAVE&NEXT Button */}
                  { (isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && (reqIndexes.currentIndex !== reqIndexes.maxIndex) &&
                  <Button className="datapage-button" variant="success" onClick={saveAndNextClickHandler}>Save And Next</Button>}

                  {/* SAVE&CLOSE Button */}
                  { ((isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && (reqIndexes.currentIndex === reqIndexes.maxIndex)) &&
                  <Button className="datapage-button" variant="danger" onClick={saveAndCloseClickHandler}>Save And Close</Button>}
                </Col>
              </Tabs.TabPane>))}
          </Tabs>
        </DataAccordian>
      </Col>

      {reqCommentsList &&
      <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
        <DataAccordian header="Comments" isActive >
          <DataComment reqCommentsList={reqCommentsList} />
        </DataAccordian>
      </Col>}

    </React.Fragment>
  );
};


const DataPage = (props) => {
  // DISPATCH TO FETCH EACH DPCODE
  const { dpCodeDetails, taskDetails } = props.location.state;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'DPCODEDATA_GET_REQUEST',
      payload: {
        taskId: taskDetails.taskId,
        datapointId: dpCodeDetails.dpCodeId,
        memberType: taskDetails.memberType === 'Kmp Matrix' ? 'KMP Matrix' : taskDetails.memberType,
        memberName: dpCodeDetails.memberName || '',
      },
    });
  }, [props.location]);

  const dpCodeDataFromStore = useSelector((state) => state.dpCodeData);

  const sideBarRef = useRef();

  // TEMP CONSTANTS THAT HAVE TO COME API
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


  // SOURCE PANEL OPEN/CLOSE BOOLEAN FLAG
  // const [isSrcPanelOpened, setIsSrcPanelOpened] = useState(false);

  // TEMP SRC STATE TO STORE ALL SRC THAT ARE UPLODED FROM SOURCE PANEL
  // const [sourceApiData, setSourceApiData] = useState(srcList);
  const sourceApiData = (srcList);

  // FUNC THAT UPDATES SRC STATE FOR EVERY SRC THAT ARE UPLOADED FROM SRC PANEL
  // const onUploadAddSource = (value) => {
  //   const filteredData = sourceApiData.filter((src) => (value.sourceName !== src.sourceName));
  //   setSourceApiData([...filteredData, { ...value }]);
  // };

  // FUNC THAT MAKE SRC PANEL TO OPEN ON CALL
  // const onClickOpenAddSource = () => {
  //   setIsSrcPanelOpened(true);
  // };

  // // FUNC THAT MAKE SRC PANEL TO CLOSE ON CALL
  // const onClickCloseAddSource = () => {
  //   setIsSrcPanelOpened(false);
  // };

  // A * FUNCTION THAT TAKES defaultApiData AS PARAMS, AND ALSO GRABS VALUES SUCH AS taskID, dpCode FROM props.location.state,
  // AND BY HAVING ALL ABOVE DATA IT FILTER RETURNS reqDpcodeData, reqTask, reqIndexes.
  const getReqData = () => {
    // const { dpCodeDetails } = props.location.state;
    const reqTask = JSON.parse(sessionStorage.filteredData);
    const reqMaxIndex = reqTask.dpCodesData.length - 1;
    const reqMinIndex = 0; // CONSTANT
    const returnbaleData = (reqTask.dpCodesData.map((dpData, index) => {
      if (dpData.dpCode === dpCodeDetails.dpCode) {
        return ({
          reqIndexes: { maxIndex: reqMaxIndex, currentIndex: index, minIndex: reqMinIndex }, reqDpCodeData: dpCodeDataFromStore.dpCodeData ? dpCodeDataFromStore.dpCodeData.dpCodeData : (dpData || {}), reqTask,
        });
      }
      return null;
    })).filter((e) => (e !== null));

    return returnbaleData;
  };

  // reqIndexes, reqDpCodeData, reqTask are returned from getReqData FUNC
  const [{
    reqIndexes, reqTask,
  }] = getReqData();

  const [reqDpCodeData, setReqDpCodeData] = useState(getReqData()[0].reqDpCodeData);
  useEffect(() => {
    setReqDpCodeData(getReqData()[0].reqDpCodeData);
  }, [props.location]);

  useEffect(() => {
    setReqDpCodeData(getReqData()[0].reqDpCodeData);
  }, [dpCodeDataFromStore]);
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="DP Code" sideBarRef={sideBarRef} />
        <div className="datapage-main" >
          <div className="datapage-info-group">

            {/* ADD SOURCE PANEL */}
            {/* <Drawer
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
            </Drawer> */}
            <Spin spinning={false} indicator={<PageLoader />}>
              {/* DATASHEETMAIN COMPONENT  */}
              <DataSheetMain
                reqIndexes={reqIndexes}
                reqDpCodeData={reqDpCodeData}
                reqTask={reqTask}
                locationData={props.location}
                reqSourceData={sourceApiData}
                reqErrorList={errorList}
                // openSourcePanel={onClickOpenAddSource}
              />
            </Spin>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPage;
