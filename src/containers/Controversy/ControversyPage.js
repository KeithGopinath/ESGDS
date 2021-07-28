/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Button } from 'react-bootstrap';
import { Comment, List, Avatar, Tag, message, Spin } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import DataAccordian from '../DataPage/DataAccordian';
import { DataSheetComponent } from '../DataPage/DataSheet';
import { history } from '../../routes';
import PageLoader from '../../components/PageLoader';


const ControversyPage = (props) => {
  const dispatch = useDispatch();
  const sideBarRef = useRef();
  const { dpCodeData } = props.location.state;
  const { taskDetails, type } = props.location.state;

  const [reqCurrentData, setReqCurrentData] = useState(dpCodeData);
  const [statusAlert, setStatusAlert] = useState(false);

  const [dpCodeDataPostFromStore, dpCodeDataUpdateFromStore] = useSelector((state) => [state.dpCodeDataCreate, state.dpCodeDataEdit]);

  useEffect(() => {
    if (dpCodeDataPostFromStore && dpCodeDataPostFromStore.dpCodeData && dpCodeDataPostFromStore.dpCodeData.status && statusAlert) {
      message.success(dpCodeDataPostFromStore.dpCodeData.message);
      setStatusAlert(false);
      history.goBack();
    }
    if (dpCodeDataPostFromStore && dpCodeDataPostFromStore.error && statusAlert) {
      message.error(dpCodeDataPostFromStore.error.message ? dpCodeDataPostFromStore.error.message : 'Something went wrong, Try again later !');
      setStatusAlert(false);
    }
  }, [dpCodeDataPostFromStore]);

  useEffect(() => {
    if (dpCodeDataUpdateFromStore && dpCodeDataUpdateFromStore.dpCodeData && dpCodeDataUpdateFromStore.dpCodeData.status && statusAlert) {
      message.success(dpCodeDataUpdateFromStore.dpCodeData.message);
      setStatusAlert(false);
      history.goBack();
    }
    if (dpCodeDataUpdateFromStore && dpCodeDataUpdateFromStore.error && statusAlert) {
      message.error(dpCodeDataUpdateFromStore.error.message ? dpCodeDataUpdateFromStore.error.message : 'Something went wrong, Try again later !');
      setStatusAlert(false);
    }
  }, [dpCodeDataUpdateFromStore]);

  useEffect(() => {
    setReqCurrentData(dpCodeData);
  }, [props.location]);

  const saveReqCurrentData = (data) => {
    console.log(data, 'Incoming');
    setReqCurrentData({ ...reqCurrentData, ...data });
  };

  const getColorForResponse = (res) => {
    switch (res) {
      case 'Very High':
        return 'volcano';
      case 'High':
        return 'orange';
      case 'Medium':
        return 'blue';
      case 'Low':
        return 'green';
      case 'No':
        return 'default';
      default:
        break;
    }
    return 'default';
  };

  const submitAndCloseClickHandler = () => {
    if (reqCurrentData.status === 'Completed') {
      const postableData = {
        dpCodeId: reqCurrentData.dpCodeId,
        companyId: taskDetails.companyId,
        taskId: taskDetails.taskId,
        source: reqCurrentData.source,
        response: reqCurrentData.response,
        textSnippet: reqCurrentData.textSnippet,
        pageNo: reqCurrentData.pageNo,
        screenShot: reqCurrentData.screenShotBase64,
        comments: type === 'NEW' ? [
          {
            author: sessionStorage.role,
            content: reqCurrentData.comment,
            dateTime: moment(),
            response: {
              value: reqCurrentData.response,
              color: getColorForResponse(reqCurrentData.response),
            },
          },
        ] : [
          {
            author: sessionStorage.role,
            content: reqCurrentData.comment,
            dateTime: moment(),
            response: {
              value: reqCurrentData.response,
              color: getColorForResponse(reqCurrentData.response),
            },
          },
          ...reqCurrentData.comments,
        ],
      };
      console.log(postableData);
      if (type === 'NEW') {
        dispatch({ type: 'CONTROVERSY_DPCODEDATA_POST_REQUEST', payload: postableData });
        setStatusAlert(true);
      }
      if (type === 'UPDATE') {
        dispatch({ type: 'CONTROVERSY_DPCODEDATA_UPDATE_REQUEST', payload: postableData, controversyId: reqCurrentData.id });
        setStatusAlert(true);
      }
    } else {
      message.error('Please make sure the data is entered and saved !');
    }
  };

  const onClickBack = () => {
    history.goBack();
  };

  console.log(dpCodeDataPostFromStore.isLoading || dpCodeDataUpdateFromStore.isLoading);
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="container-main" >
          <div className="datapage-info-group">
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="Controversy" isActive >
                <Spin indicator={<PageLoader />} spinning={false} >
                  <DataSheetComponent
                    reqData={reqCurrentData}
                    onClickSave={saveReqCurrentData}
                  />
                  <Col lg={12} className="datapage-button-wrap">
                    {reqCurrentData.status === 'Completed' && <Button className="datapage-button" variant="danger" onClick={onClickBack}>Back</Button>}
                    <Button className="datapage-button" variant="success" onClick={submitAndCloseClickHandler}>Sumbit</Button>
                  </Col>
                </Spin>
              </DataAccordian>
            </Col>
            {dpCodeData.comments &&
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="Comments" isActive >
                <List
                  dataSource={dpCodeData.comments}
                  header={`${dpCodeData.comments.length} ${(dpCodeData.comments.length) > 1 ? 'replies' : 'reply'}`}
                  itemLayout="horizontal"
                  renderItem={(eachCmt) => (
                    <Comment
                      author={<span style={{ color: '#2199c8' }}>{eachCmt.author}</span>}
                      avatar={
                        <Avatar style={{ backgroundColor: '#2199c8' }}>{eachCmt.author.split(' ').map((e) => (e[0])).join('')}</Avatar>}
                      content={
                        <p
                          style={{
                            background: 'rgb(222 222 222 / 34%)',
                            padding: '10px',
                            width: 'max-content',
                            borderRadius: '5px',
                          }}
                        >{eachCmt.content}
                        </p>}
                      datetime={
                        <React.Fragment>
                          {`${moment(eachCmt.dateTime).fromNow()}, `}
                          {/* <Tag color={eachCmt.prevResponse.color} style={{ margin: 0 }}>{eachCmt.prevResponse.value}</Tag> */}
                          <SwapRightOutlined style={{ fontSize: '20px' }} />
                          <Tag color={eachCmt.response.color} style={{ margin: 0 }}>{eachCmt.response.value}</Tag>
                        </React.Fragment>}
                    />)}
                />
              </DataAccordian>
            </Col>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControversyPage;
