/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Button } from 'react-bootstrap';
import moment from 'moment';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import DataAccordian from './DataAccordian';
import AddSource from './AddSource';
import DataSheet from './DataSheet';
import { ANALYST_DC_DATA, QA_DV_DATA } from '../../containers/DataPage/apiData';

const DataPage = (props) => {
  console.log(props, '#######################');
  const sideBarRef = useRef();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  // const currentRole = 'Company Representative';
  const currentRole = sessionStorage.role;
  console.log(currentRole);

  const defaultApiData = () => {
    if (currentRole === 'Company Representative') {
      return QA_DV_DATA;
    }
    if (currentRole === 'Client Representative') {
      return QA_DV_DATA;
    }
    if (currentRole === 'QA') {
      return QA_DV_DATA;
    }
    if (currentRole === 'Analyst') {
      return ANALYST_DC_DATA;
    }
    return [];
  };

  const apiDataList = defaultApiData();

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

  const sourceApiDataList = [
    { sourceName: 'Annual Report', url: 'https://www.hindustanpetroleum.com/documents/doc/HPCL%20Annual%20Report%202019-2020.pdf', publicationDate: moment('Tue May 04 2021') },
  ];

  const [sourceApiData, setSourceApiData] = useState(sourceApiDataList);

  const onUploadAddSource = (value) => {
    const filteredData = sourceApiData.filter((src) => (value.sourceName !== src.sourceName));
    setSourceApiData([...filteredData, { ...value }]);
  };

  console.log(sourceApiData);

  const getDataForDataSheet = (data) => {
    console.log(props);
    const { taskId, dpCode } = props.location.state;
    const [currentTask] = data.filter((task) => (task.taskId === taskId));
    const max = currentTask.dpCodesData.length - 1;
    const min = 0;
    return (currentTask.dpCodesData.map((dpData, index) => {
      if (dpData.dpCode === dpCode) {
        return ({
          maxIndex: max, minIndex: min, currentIndex: index, currentDpCode: dpData, currentTask,
        });
      }
      return null;
    })).filter((e) => (e !== null));
  };

  const onClickOpenAddSource = () => {
    setIsDrawerOpened(true);
  };

  const onClickCloseAddSource = () => {
    setIsDrawerOpened(false);
  };

  const [{
    maxIndex, minIndex, currentIndex, currentDpCode, currentTask,
  }] = getDataForDataSheet(apiDataList);

  // console.log(getDataForDataSheet(ANALYST_DC_DATA));


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
              visible={isDrawerOpened}
              key="right"
              width={300}
              headerStyle={{ backgroundColor: '#2199c8' }}
            >
              {isDrawerOpened && <AddSource onUploadAddSource={onUploadAddSource} closeAddSourcePanel={onClickCloseAddSource} />}
            </Drawer>
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="History">
                {currentRole === 'Analyst' && <DataSheet isAnalystHistory dpCodeData={currentDpCode} location={props.location} sourceData={sourceApiData} /> }
                {currentRole === 'QA' && <DataSheet isQAHistory dpCodeData={currentDpCode} location={props.location} sourceData={sourceApiData} />}
                {currentRole === 'Company Representative' && <DataSheet isCompanyRepHistory dpCodeData={currentDpCode} location={props.location} sourceData={sourceApiData} />}
              </DataAccordian>
            </Col>
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="Current" isActive >
                {currentRole === 'Analyst' && <DataSheet isAnalyst indexes={{ maxIndex, minIndex, currentIndex }} dpCodeData={currentDpCode} taskData={currentTask} location={props.location} sourceData={sourceApiData} openSourcePanel={onClickOpenAddSource} />}
                {currentRole === 'QA' && <DataSheet isQA indexes={{ maxIndex, minIndex, currentIndex }} dpCodeData={currentDpCode} taskData={currentTask} location={props.location} sourceData={sourceApiData} errorList={errorList} openSourcePanel={onClickOpenAddSource} />}
                {currentRole === 'Company Representative' && <DataSheet isCompanyRep indexes={{ maxIndex, minIndex, currentIndex }} dpCodeData={currentDpCode} taskData={currentTask} location={props.location} sourceData={sourceApiData} openSourcePanel={onClickOpenAddSource} />}
              </DataAccordian>
            </Col>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DataPage;
