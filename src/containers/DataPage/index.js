/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs, message, Result } from 'antd';
import { ExclamationCircleTwoTone, InboxOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Col, Button } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { history } from '../../routes';


import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

import { DataSheetComponent } from './DataSheet';
import DataAccordian from './DataAccordian';

import DataComment from './DataComment';
import PageLoader from '../../components/PageLoader';


const DataPage = (props) => {
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

  // TEMP CONSTANTS THAT HAVE TO COME API
  const reqErrorList = ['T1. Incorrect data input/typo', 'T1. Document missed',
    'T1. Data/Information missed',
    'T1. SOP not followed',
    'T1. Incorrect Evidence',
    'T1. Missed snippet',
    'T1. Incorrect Scoring',
    'T2. Evidence not substantive',
    'T2. Improvement for next time',
    'T2. Comments and calculation',
    'T2. Others/No error'];

  // DISPATCH TO FETCH EACH DPCODE
  // THESE DETAILS COMES FROM TASK PAGE, ....
  const { dpCodeDetails, taskDetails } = props.location.state;

  const sideBarRef = useRef();

  const dispatch = useDispatch();

  const dpCodeDataFromStore = useSelector((state) => state.dpCodeData);
  const dpCodeDataUpdateFromStore = useSelector((state) => state.dpCodeDataEdit);

  const getReqData = () => {
    // const { dpCodeDetails } = props.location.state;
    // const taskDetails = JSON.parse(sessionStorage.filteredData);
    // const taskDetails = taskDetails;
    const reqMaxIndex = taskDetails.filteredData.length - 1;
    const reqMinIndex = 0; // CONSTANT
    let returnableData = {};
    //  TO GET CURRENT INDEX !
    for (let i = 0; i < taskDetails.filteredData.length; i += 1) {
      if (taskDetails.filteredData[i].dpCode === dpCodeDetails.dpCode) {
        returnableData = {
          ...returnableData,
          reqIndexes: { maxIndex: reqMaxIndex, currentIndex: i, minIndex: reqMinIndex },
          reqDpCodeData: (dpCodeDataFromStore.dpCodeData && dpCodeDataFromStore.dpCodeData.dpCodeData) || taskDetails.filteredData[i],
        };
        break;
      }
    }

    return returnableData;
  };

  const { reqDpCodeData, reqIndexes } = getReqData();

  const [statusAlert, setStatusAlert] = useState(false);

  const currentDataForLoading = (reqDpCodeData && reqDpCodeData.currentData) || [];

  const historicalDataForLoading = (reqDpCodeData && reqDpCodeData.historicalData) || [];

  // reqCurrentData A TEMP STATE WITH DEFAULT DATA AS ARRAY OF CURRENT DATA
  const [reqCurrentData, setReqCurrentData] = useState((reqDpCodeData && reqDpCodeData.currentData) || []);

  // reqHistoricalData A TEMP STATE WITH DEFAULT DATA AS ARRAY OF HISTORICAL DATA
  const [reqHistoricalData, setReqHistoricalData] = useState((reqDpCodeData && reqDpCodeData.historicalData) || []);

  const [isDpCodeEditted, setIsDpCodeEditted] = useState(false);

  const reqCommentsList = reqDpCodeData.comments || [];

  const getDefaultCurrentDataForYear = (year) => {
    const defaultCurrentData = (reqDpCodeData && reqDpCodeData.currentData) || [];
    const [returnableData] = defaultCurrentData.filter((e) => e.fiscalYear === year);
    return returnableData;
  };

  const saveReqCurrentData = (data, isNonClick) => {
    setIsDpCodeEditted(!isNonClick);
    setReqCurrentData(reqCurrentData.map((e) => {
      if (e.fiscalYear === data.fiscalYear) {
        const returnableData = { ...e, ...data };
        return returnableData;
      }
      return e;
    }));
  };

  const saveReqHistoricalData = (data, isNonClick) => {
    setIsDpCodeEditted(!isNonClick);
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
      if (isAnalyst_DCR && e.status !== 'Completed' && (e.error.errorStatus !== 'Completed')) {
        return e.fiscalYear;
      }
      if (isAnalyst_DCR && e.status === 'Completed' && (e.error.errorStatus !== 'Completed')) {
        return e.fiscalYear;
      }
      if (isAnalyst_DCR && e.status !== 'Completed' && (e.error.errorStatus === 'Completed')) {
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

  const getIsCompletedStatus = (dpCodeObj) => {
    if (isAnalyst_DC && dpCodeObj.status === 'Completed') {
      return true;
    }
    if (isAnalyst_DCR && dpCodeObj.status === 'Completed' && (dpCodeObj.error.errorStatus === 'Completed')) {
      return true;
    }
    if ((isQA_DV || isCompanyRep_DR || isClientRep_DR) && dpCodeObj.error && dpCodeObj.error.errorStatus === 'Completed') {
      return true;
    }
    return false;
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
    history.push({
      pathname: `/task/${taskDetails.taskNumber}`,
      state: {
        taskDetails,
        isValidationCalled: taskDetails.isValidationCalled,
      },
    });
  };

  const previousClickHandler = () => {
    const nextDpCode = taskDetails.filteredData[reqIndexes.currentIndex - 1];
    history.push({
      pathname: `/dpcode/${nextDpCode.dpCode}`,
      state: {
        taskDetails,
        dpCodeDetails: nextDpCode,
        filteredData: taskDetails.filteredData,
      },
    });
  };

  const additionalDetailsMapper = (dpCodeObj) => {
    let additionalDetails = {};
    if (dpCodeObj.additionalDetails) {
      for (let i = 0; i < dpCodeObj.additionalDetails.length; i += 1) {
        additionalDetails = { ...additionalDetails, [`${dpCodeObj.additionalDetails[i].fieldName}`]: dpCodeObj.additionalDetails[i].inputType === 'Select' ? dpCodeObj.additionalDetails[i].value.value : dpCodeObj.additionalDetails[i].value };
      }
    }
    return additionalDetails || [];
  };

  const getReqHistoricalDetails = (dataList) => dataList.map((e) => {
    const returnableData = {
      dpCode: e.dpCode,
      fiscalYear: e.fiscalYear,
      textSnippet: e.textSnippet,
      pageNo: e.pageNo,
      screenShot: e.screenShotBase64,
      response: e.response,
      source: e.source,
      additionalDetails: additionalDetailsMapper(e),
    };
    return returnableData;
  });

  const getReqDetails = (dataList) => dataList.map((e) => {
    let returnableData = {
      dpCode: e.dpCode,
      fiscalYear: e.fiscalYear,
      textSnippet: e.textSnippet,
      pageNo: e.pageNo,
      screenShot: e.screenShotBase64,
      response: e.response,
      source: e.source,
      additionalDetails: additionalDetailsMapper(e),
    };

    if (isAnalyst_DCR) {
      returnableData = {
        ...returnableData, rejectComment: e.rejectComment, rejectedTo: e.rejectComment ? e.error.raisedBy : '', isAccepted: e.isAccepted,
      };
    }
    if (isQA_DV) {
      returnableData = { ...returnableData, error: { ...e.error, refData: '' } };
    }
    if (isCompanyRep_DR || isClientRep_DR) {
      returnableData = {
        dpCode: e.dpCode,
        fiscalYear: e.fiscalYear,
        error: {
          ...e.error,
          refData: {
            textSnippet: e.error.refData.textSnippet,
            pageNo: e.error.refData.pageNo,
            screenShot: e.error.refData.screenShotBase64,
            response: e.error.refData.response,
            source: e.error.refData.source,
            additionalDetails: additionalDetailsMapper(e.error.refData),
          },
        },
      };
    }
    return returnableData;
  });

  const getPostableData = () => {
    const reqDpcodeData = taskDetails.filteredData[reqIndexes.currentIndex];
    const postableData = {
      taskId: taskDetails.taskId,
      taskNumber: taskDetails.taskNumber,
      dpCodeId: reqDpcodeData.dpCodeId,
      companyId: reqDpcodeData.companyId,
      pillarId: reqDpcodeData.pillarId,
      memberId: reqDpcodeData.memberId || '',
      memberName: reqDpcodeData.memberName || '',
      memberType: taskDetails.memberType === 'Kmp Matrix' ? 'KMP Matrix' : taskDetails.memberType,
      currentData: getReqDetails(reqCurrentData),
      historicalData: (isCompanyRep_DR || isClientRep_DR) ? [] : getReqHistoricalDetails(reqHistoricalData),
    };
    return postableData;
  };

  const saveAndNextClickHandler = () => {
    if ((reqDataCheckBeforeSave().currentData).length === 0 && (reqDataCheckBeforeSave().historicalData).length === 0) {
      if (isAnalyst_DC || isAnalyst_DCR) {
        dispatch({ type: 'DPCODEDATA_UPDATE_REQUEST', payload: getPostableData(), taskType: 'DATA_COLLECTION_CORRECTION' });
        setStatusAlert(true);
      }
      if (isQA_DV) {
        dispatch({ type: 'DPCODEDATA_UPDATE_REQUEST', payload: getPostableData(), taskType: 'DATA_VERIFICATION' });
        setStatusAlert(true);
      }
      if (isCompanyRep_DR || isClientRep_DR) {
        dispatch({ type: 'DPCODEDATA_UPDATE_REQUEST', payload: getPostableData(), taskType: 'DATA_REVIEW' });
        setStatusAlert(true);
      }
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
    saveAndNextClickHandler();
  };

  const nextClickHandler = () => {
    const nextDpCode = taskDetails.filteredData[reqIndexes.currentIndex + 1];
    if (reqIndexes.currentIndex !== reqIndexes.maxIndex) {
      history.push({
        pathname: `/dpcode/${nextDpCode.dpCode}`,
        state: {
          taskDetails,
          dpCodeDetails: nextDpCode,
          filteredData: taskDetails.filteredData,
        },
      });
    } else {
      history.push({
        pathname: `/task/${taskDetails.taskNumber}`,
        state: {
          taskDetails,
          isValidationCalled: taskDetails.isValidationCalled,
        },
      });
    }
  };

  const closeClickHandler = () => {
    nextClickHandler();
  };

  useEffect(() => {
    if (isAnalyst_DC || isAnalyst_DCR || isQA_DV) {
      dispatch({
        type: 'DPCODEDATA_GET_REQUEST',
        payload: {
          taskId: taskDetails.taskId,
          datapointId: dpCodeDetails.dpCodeId,
          year: dpCodeDetails.fiscalYear,
          memberType: taskDetails.memberType === 'Kmp Matrix' ? 'KMP Matrix' : taskDetails.memberType,
          memberName: dpCodeDetails.memberName || '',
          memberId: dpCodeDetails.memberId || '',
        },
        taskType: 'DATA_COLLECTION_CORRECTION_VERIFICATION',
      });
    }

    if (isClientRep_DR || isCompanyRep_DR) {
      dispatch({
        type: 'DPCODEDATA_GET_REQUEST',
        payload: {
          taskId: taskDetails.taskId,
          datapointId: dpCodeDetails.dpCodeId,
          year: dpCodeDetails.fiscalYear,
          memberType: taskDetails.memberType === 'Kmp Matrix' ? 'KMP Matrix' : taskDetails.memberType,
          memberName: dpCodeDetails.memberName || '',
          memberId: dpCodeDetails.memberId || '',
        },
        taskType: 'DATA_REVIEW',
      });
    }
  }, [props.location]);

  useEffect(() => {
    if (dpCodeDataUpdateFromStore && dpCodeDataUpdateFromStore.dpCodeData && statusAlert) {
      message.success(dpCodeDataUpdateFromStore.dpCodeData.message);
      setStatusAlert(false);
    }

    setReqCurrentData((reqDpCodeData && reqDpCodeData.currentData) || []);
    setReqHistoricalData((reqDpCodeData && reqDpCodeData.historicalData) || []);

    setIsDpCodeEditted(false);
  }, [dpCodeDataFromStore]);

  useEffect(() => {
    if (dpCodeDataUpdateFromStore && dpCodeDataUpdateFromStore.dpCodeData && statusAlert) {
      if (reqIndexes.currentIndex !== reqIndexes.maxIndex) {
        const nextDpCode = taskDetails.filteredData[reqIndexes.currentIndex + 1];
        history.push({
          pathname: `/dpcode/${nextDpCode.dpCode}`,
          state: {
            dpCodeDetails: nextDpCode,
            taskDetails,
          },
        });
      } else {
        message.success(dpCodeDataUpdateFromStore.dpCodeData.message);
        setStatusAlert(false);
        history.push({
          pathname: `/task/${taskDetails.taskNumber}`,
          state: {
            taskDetails,
            isValidationCalled: taskDetails.isValidationCalled,
          },
        });
      }
    }
    if (dpCodeDataUpdateFromStore.error) {
      message.error(dpCodeDataUpdateFromStore.error.message || 'Something Went Wrong!');
      setStatusAlert(false);
    }
  }, [dpCodeDataUpdateFromStore]);

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="DP Code" sideBarRef={sideBarRef} />
        <div className="datapage-main" >
          <div className="datapage-info-group">
            {/* DATASHEETMAIN COMPONENT  */}
            <React.Fragment>
              {/* HISTORICAL TABS */}
              <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
                <DataAccordian header="History">
                  {(dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading || dpCodeDataFromStore.error) ? // T1
                    (dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading || (historicalDataForLoading.length !== reqHistoricalData.length)) ? // T2
                      <PageLoader /> : // T2R
                      (dpCodeDataFromStore.error) &&
                      <Result
                        className="custom-table-result"
                        icon={<InboxOutlined />}
                        title={(dpCodeDataFromStore.error.message) || 'Something Went Wrong!'}
                      /> : // T1R
                    reqHistoricalData.length > 0 ? // T3
                      <Tabs defaultActiveKey={reqHistoricalData[0] && reqHistoricalData[0].fiscalYear} >
                        {reqHistoricalData.map((e, i) => (
                          <Tabs.TabPane tab={e.fiscalYear} key={e.fiscalYear}>
                            <DataSheetComponent
                              isHistoryType
                              reqData={e}
                              locationData={props.location}
                              reqErrorList={reqErrorList}
                              // openSourcePanel={openSourcePanel}
                              onClickSave={saveReqHistoricalData}
                              lastHistoricalData={reqHistoricalData[i - 1] ? [reqHistoricalData[i - 1]] : []}
                            />
                          </Tabs.TabPane>))}
                      </Tabs> : // T3R
                      <Result
                        className="custom-table-result"
                        icon={<InboxOutlined />}
                        title="No Data Found!"
                      />}
                </DataAccordian>
              </Col>

              {/* CURRENT TABS */}
              <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
                <DataAccordian header="Current" isActive >
                  {(dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading || dpCodeDataFromStore.error || (currentDataForLoading.length !== reqCurrentData.length)) ? // T1
                    (dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading || (currentDataForLoading.length !== reqCurrentData.length)) ? // T2
                      <PageLoader /> : // T2R
                      (dpCodeDataFromStore.error) &&
                      <Result
                        className="custom-table-result"
                        icon={<InboxOutlined />}
                        title={(dpCodeDataFromStore.error.message) || 'Something Went Wrong!'}
                        extra={
                          <React.Fragment>
                            { ((isAnalyst_DC || isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) &&
                              <Button className="datapage-button" variant="danger" onClick={backClickHandler}>Back</Button>}
                          </React.Fragment>
                        }
                      /> : // T1R
                    reqCurrentData.length > 0 ? // T3
                      <Tabs defaultActiveKey={reqCurrentData[0] && reqCurrentData[0].fiscalYear}>
                        {reqCurrentData.map((e, i) => (
                          <Tabs.TabPane
                            tab={
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {e.fiscalYear}
                                {getIsCompletedStatus(e) ? <CheckCircleTwoTone style={{ margin: '0 0 0 5px' }} twoToneColor="#52c41a" /> : <ExclamationCircleTwoTone style={{ margin: '0 0 0 5px' }} twoToneColor="#FF0000" />}
                              </div>
                            }
                            key={e.fiscalYear}
                          >
                            <DataSheetComponent
                              reqData={e}
                              locationData={props.location}
                              reqErrorList={reqErrorList}
                              // openSourcePanel={openSourcePanel}
                              getDefaultCurrentDataForYear={getDefaultCurrentDataForYear}
                              onClickSave={saveReqCurrentData}
                              lastHistoricalData={reqCurrentData[i - 1] ? [reqCurrentData[i - 1]] : reqHistoricalData.filter((ec, ic) => (ic === reqHistoricalData.length - 1))}
                            />
                            <Col lg={12} className="datapage-button-wrap">
                              {/* BACK Button */}
                              { ((isAnalyst_DC || isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) &&
                              <Button className="datapage-button" variant="danger" onClick={backClickHandler}>Back</Button>}

                              {/* PREVIOUS Button */}
                              { (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && (reqIndexes.currentIndex !== reqIndexes.minIndex) &&
                              <Button className="datapage-button" variant="primary" onClick={previousClickHandler}>Previous</Button>}

                              {/* cURRENT INDEX Button */}
                              { (isAnalyst_DC || isAnalyst_DCR || isQA_DV || isCompanyRep_DR || isClientRep_DR) && reqIndexes &&
                              <Button className="datapage-button" variant="default" disabled >{`${reqIndexes.currentIndex + 1}/${reqIndexes.maxIndex + 1}`}</Button>}

                              {/* SAVE&NEXT Button */}
                              { (isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && (reqIndexes.currentIndex !== reqIndexes.maxIndex) &&
                              <Button className="datapage-button" variant="success" onClick={isDpCodeEditted ? saveAndNextClickHandler : nextClickHandler}>{isDpCodeEditted ? 'Save And Next' : 'Next'}</Button>}

                              {/* SAVE&CLOSE Button */}
                              { ((isAnalyst_DC || (isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) && (reqIndexes.currentIndex === reqIndexes.maxIndex)) &&
                              <Button className="datapage-button" variant="danger" onClick={isDpCodeEditted ? saveAndCloseClickHandler : closeClickHandler}>{isDpCodeEditted ? 'Save And Close' : 'Close'}</Button>}
                            </Col>
                          </Tabs.TabPane>))}
                      </Tabs> : // T3R
                      <Result
                        className="custom-table-result"
                        icon={<InboxOutlined />}
                        title="No Data Found!"
                        extra={
                          <React.Fragment>
                            { ((isAnalyst_DC || isAnalyst_DCR) || isQA_DV || isCompanyRep_DR || isClientRep_DR) &&
                              <Button className="datapage-button" variant="danger" onClick={backClickHandler}>Back</Button>}
                          </React.Fragment>
                        }
                      />}
                </DataAccordian>
              </Col>

              {!isAnalyst_DC &&
                <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
                  <DataAccordian header="Comments" isActive >
                    {(dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading || dpCodeDataFromStore.error || (currentDataForLoading.length !== reqCurrentData.length)) ? // T1
                      (dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading) ? // T2
                        <PageLoader /> : // T2R
                        (dpCodeDataFromStore.error) &&
                        <Result
                          className="custom-table-result"
                          icon={<InboxOutlined />}
                          title={(dpCodeDataFromStore.error.message) || 'Something Went Wrong!'}
                        /> : // T1R
                      reqCommentsList.length > 0 ? // T3
                        <DataComment reqCommentsList={reqCommentsList} /> : // T3R
                        <Result
                          className="custom-table-result"
                          icon={<InboxOutlined />}
                          title="No Data Found!"
                        />}
                  </DataAccordian>
                </Col>}

            </React.Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

DataPage.propTypes = {
  location: PropTypes.object,

};

export default DataPage;
