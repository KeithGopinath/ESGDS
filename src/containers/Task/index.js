/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useEffect } from 'react';
import Select from 'react-select';
import 'antd/dist/antd.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import TaskTable from './TaskTable';


const Task = () => {
  const currentUser = 'analyst';
  const tabs = ['Enviromental', 'Social', 'Governance'];
  const sideBarRef = useRef();
  const tabsRef = useRef(tabs.map(() => React.createRef()));

  useEffect(() => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  }, []);

  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('active');
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <div className="task-main" >
          <div className="task-tabs-wrap">
            {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
          </div>
          <div className="task-info-group">
            <div className="task-id-year-wrap">
              <div className="task-id">Task Id: 00001</div>
              <div className="task-year">
                <Select
                  name="userRole"
                  placeholder="Year"
                  // value={""}
                  // onChange={}
                  // options={}
                  // isSearchable={}
                  // className={}
                  maxLength={30}
                />
              </div>
            </div>
            <Row>
              <React.Fragment>
                <Col lg={6}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={5}>
                      Key Issues*
                    </Form.Label>
                    <Col sm={7}>
                      <Select
                        name="userRole"
                        // value={""}
                        // onChange={}
                        // options={}
                        // isSearchable={}
                        // className={}
                        maxLength={30}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col className="task-table-col" sm={12}>
                  <TaskTable />
                </Col>
                {(currentUser === 'QA') ?
                  <React.Fragment>
                    <Col lg={12} className="task-button-wrap">
                      <Button style={{ marginRight: '1.5%' }} onClick={null} variant="danger" type="submit">Reject</Button>
                      <Button variant="success" onClick={null} type="submit">Submit</Button>
                    </Col>
                  </React.Fragment> :
                  (
                    <Col lg={12} className="task-button-wrap">
                      <Button variant="success" onClick={null} type="submit">Submit To QA</Button>
                    </Col>
                  )}
              </React.Fragment>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
