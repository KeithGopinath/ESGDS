/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs, message, Result } from 'antd';
import { ExclamationCircleTwoTone, InboxOutlined } from '@ant-design/icons';
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

let count = 0;

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
    const reqTask = JSON.parse(sessionStorage.filteredData);
    const reqMaxIndex = reqTask.dpCodesData.length - 1;
    const reqMinIndex = 0; // CONSTANT
    let returnableData = {};
    //  TO GET CURRENT INDEX !
    for (let i = 0; i < reqTask.dpCodesData.length; i += 1) {
      if (reqTask.dpCodesData[i].dpCode === dpCodeDetails.dpCode) {
        returnableData = {
          ...returnableData,
          reqIndexes: { maxIndex: reqMaxIndex, currentIndex: i, minIndex: reqMinIndex },
          reqDpCodeData: (dpCodeDataFromStore.dpCodeData && dpCodeDataFromStore.dpCodeData.dpCodeData) || reqTask.dpCodesData[i],
          reqTask,
        };
        break;
      }
    }

    return returnableData;
  };

  const { reqDpCodeData, reqIndexes, reqTask } = getReqData();

  const [statusAlert, setStatusAlert] = useState(false);

  const currentDataForLoading = (reqDpCodeData && reqDpCodeData.currentData) || [];

  const historicalDataForLoading = (reqDpCodeData && reqDpCodeData.historicalData) || [];

  // reqCurrentData A TEMP STATE WITH DEFAULT DATA AS ARRAY OF CURRENT DATA
  const [reqCurrentData, setReqCurrentData] = useState((reqDpCodeData && reqDpCodeData.currentData) || []);

  // reqHistoricalData A TEMP STATE WITH DEFAULT DATA AS ARRAY OF HISTORICAL DATA
  const [reqHistoricalData, setReqHistoricalData] = useState((reqDpCodeData && reqDpCodeData.historicalData) || []);

  const reqCommentsList = reqDpCodeData.comments || [];

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
        taskDetails,
        isValidationCalled: taskDetails.isValidationCalled,
      },
    });
  };

  const previousClickHandler = () => {
    console.log('previousClickHandler');
    const nextDpCode = reqTask.dpCodesData[reqIndexes.currentIndex - 1];
    history.push({
      pathname: `/dpcode/${nextDpCode.dpCode}`,
      state: {
        taskDetails,
        dpCodeDetails: nextDpCode,
        filteredData: reqTask.dpCodesData,
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
      returnableData = { ...returnableData, rejectComment: e.rejectComment, isAccepted: e.isAccepted };
    }
    if (isQA_DV) {
      returnableData = { ...returnableData, error: { ...e.error, refData: '' } };
    }
    if (isCompanyRep_DR || isClientRep_DR) {
      returnableData = {
        dpCode: e.dpCode,
        fiscalYear: e.fiscalYear,
        error: { ...e.error, refData: { ...e.error.refData, additionalDetails: additionalDetailsMapper(e.error.refData) } },
      };
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
      memberId: reqDpcodeData.memberId || '',
      memberName: reqDpcodeData.memberName || '',
      memberType: reqTask.memberType === 'Kmp Matrix' ? 'KMP Matrix' : reqTask.memberType,
      currentData: getReqDetails(reqCurrentData),
      historicalData: (isCompanyRep_DR || isClientRep_DR) ? [] : getReqDetails(reqHistoricalData),
    };
    return postableData;
  };

  const saveAndNextClickHandler = () => {
    console.log(reqDataCheckBeforeSave(), 'LIST OF NUMS');
    if ((reqDataCheckBeforeSave().currentData).length === 0 && (reqDataCheckBeforeSave().historicalData).length === 0) {
      console.log('saveAndNextClickHandler');
      if (isAnalyst_DC || isAnalyst_DCR) {
        dispatch({ type: 'DPCODEDATA_UPDATE_REQUEST', payload: getPostableData(), taskType: 'Data Collection' });
        setStatusAlert(true);
      }
      if (isQA_DV || isCompanyRep_DR || isClientRep_DR) {
        dispatch({ type: 'DPCODEDATA_UPDATE_REQUEST', payload: getPostableData(), taskType: 'Data Verification' });
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

  useEffect(() => {
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
    });
    // dispatch({ type: 'COMPANY_SOURCE_TYPES_GET_REQUEST', companyId: taskDetails.companyId });
  }, [props.location]);

  useEffect(() => {
    if (dpCodeDataUpdateFromStore && dpCodeDataUpdateFromStore.dpCodeData && statusAlert) {
      message.success(dpCodeDataUpdateFromStore.dpCodeData.message);
      setStatusAlert(false);
    }

    setReqCurrentData(reqDpCodeData.currentData || []);
    setReqHistoricalData(reqDpCodeData.historicalData || []);
  }, [dpCodeDataFromStore]);

  useEffect(() => {
    if (dpCodeDataUpdateFromStore && dpCodeDataUpdateFromStore.dpCodeData && statusAlert) {
      if (reqIndexes.currentIndex !== reqIndexes.maxIndex) {
        const nextDpCode = reqTask.dpCodesData[reqIndexes.currentIndex + 1];
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
          pathname: `/task/${reqTask.taskNumber}`,
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

  count += 1;
  console.log(count, dpCodeDataFromStore.isLoading, dpCodeDataUpdateFromStore.isLoading, statusAlert, '%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
  console.log(currentDataForLoading.length, reqCurrentData.length);

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
                  {(dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading || dpCodeDataFromStore.error) ? // (!reqHistoricalData > 0 && !(dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading)) ? // T1
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
                        {reqHistoricalData.map((e) => (
                          <Tabs.TabPane tab={e.fiscalYear} key={e.fiscalYear}>
                            <DataSheetComponent
                              isHistoryType
                              reqData={e}
                              locationData={props.location}
                              reqErrorList={reqErrorList}
                              // openSourcePanel={openSourcePanel}
                              onClickSave={saveReqHistoricalData}
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
                  {(dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading || dpCodeDataFromStore.error || (currentDataForLoading.length !== reqCurrentData.length)) ? // (!reqCurrentData > 0 && !(dpCodeDataFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading)) ? // T1
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
                              locationData={props.location}
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
