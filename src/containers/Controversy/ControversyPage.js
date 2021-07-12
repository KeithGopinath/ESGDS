/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Comment, List, Avatar, Tag } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import moment from 'moment';
import SideMenuBar from '../../components/SideMenuBar';
import Header from '../../components/Header';
import DataAccordian from '../DataPage/DataAccordian';
import { DataSheetComponent } from '../DataPage/DataSheet';


const ControversyPage = (props) => {
  const sideBarRef = useRef();
  const reqDpCodeData = props.location.state.dpCodeData;

  const [reqCurrentData, setReqCurrentData] = useState(reqDpCodeData);

  useEffect(() => {
    setReqCurrentData(reqDpCodeData);
  }, [props.location]);

  const saveReqCurrentData = (data) => {
    console.log(data, 'Incoming');
    setReqCurrentData({ ...reqCurrentData, ...data });
  };
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Task" sideBarRef={sideBarRef} />
        <div className="container-main" >
          <div className="datapage-info-group">
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="Controversy" isActive >
                <DataSheetComponent
                  reqData={reqCurrentData}
                  onClickSave={saveReqCurrentData}
                />
              </DataAccordian>
            </Col>
            {reqDpCodeData.comments &&
            <Col lg={12} style={{ padding: 0, margin: '3% 0' }}>
              <DataAccordian header="Comments" isActive >
                <List
                  dataSource={reqDpCodeData.comments}
                  header={`${reqDpCodeData.comments.length} ${(reqDpCodeData.comments.length) > 1 ? 'replies' : 'reply'}`}
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
                      datetime={<React.Fragment>{`${moment(eachCmt.datetime).fromNow()}, `}<Tag color={eachCmt.prevResponse.color} style={{ margin: 0 }}>{eachCmt.prevResponse.value}</Tag><SwapRightOutlined style={{ fontSize: '20px' }} /><Tag color={eachCmt.latestResponse.color} style={{ margin: 0 }}>{eachCmt.latestResponse.value}</Tag></React.Fragment>}
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
