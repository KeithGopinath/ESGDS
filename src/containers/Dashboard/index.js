/* eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Card, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
import PageLoader from '../../components/PageLoader';

const Dashboard = () => {
  const sideBarRef = useRef();
  const [tabFlag, setTabFlag] = useState('');
  const [activeUserData, setActiveUserData] = useState([]);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.login.login);
  const otpDetails = useSelector((state) => state.otp.otp);
  const roleChange = useSelector((state) => state.roleChange.roleChange);
  const dashboard = useSelector((state) => state.dashboard.dashboard);
  const loading = useSelector((state) => state.dashboard.isLoading);

  const dashboardData = dashboard && dashboard.data;

  const currentRole = roleChange && roleChange.label || otpDetails && otpDetails.user.roleDetails.primaryRole.label ||
    userDetails && userDetails.user.roleDetails.primaryRole.label || sessionStorage.role

  useEffect(() => {
    dispatch({ type: 'GET_DASHBOARD_REQUEST' });
  }, []);

  useEffect(() => {
    if (currentRole == 'SuperAdmin' || currentRole == 'Admin') {
      setActiveUserData(dashboardData && dashboardData.superAdminStats)
      setTabFlag(dashboardData && dashboardData.superAdminStats[0].title)
    } else if (currentRole == 'GroupAdmin') {
      setActiveUserData(dashboardData && dashboardData.groupAdminStats)
      setTabFlag(dashboardData && dashboardData.groupAdminStats[0].title)
    } else if (currentRole == 'Analyst') {
      setActiveUserData(dashboardData && dashboardData.analystStats)
      setTabFlag(dashboardData && dashboardData.analystStats[0].title)
    } else {
      setActiveUserData(dashboardData && dashboardData.qaStats)
      setTabFlag(dashboardData && dashboardData.qaStats[0].title)
    }
    dashboardTabsRef.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const defaultTab = dashboardTabsRef.current[0].current;
    defaultTab.classList.add('tabs-label-count-wrap-active');

  }, [currentRole, dashboard]);

  // for SuperAdmin, Admin & GroupAdmin
  const adminTabLabels = [
    { label: 'Tasks' },
    { label: 'Errors' },
    { label: 'SLA' },
    { label: 'Employees' },
  ];

  // for QA & Analyst
  const analystTabLabels = [
    { label: 'Tasks' },
    { label: 'Errors' },
    { label: 'SLA' },
  ];

  const adminTabRef = useRef(adminTabLabels.map(() => React.createRef()));
  const analystTabRef = useRef(analystTabLabels.map(() => React.createRef()));
  const dashboardTabsRef = (currentRole == 'SuperAdmin' || currentRole == 'Admin' || currentRole == 'GroupAdmin') ? adminTabRef : analystTabRef
  const currentTabs = (currentRole == 'SuperAdmin' || currentRole == 'Admin' || currentRole == 'GroupAdmin') ? adminTabLabels : analystTabLabels;
  const activeTabData = activeUserData && activeUserData.filter(val => tabFlag == val.title);

  const tabsClickHandler = (event, label) => {
    dashboardTabsRef.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const target = event.currentTarget;
    target.classList.add('tabs-label-count-wrap-active');
    setTabFlag(label);
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Dashboard" />
        <div className="container-main">
          <div className="dashboard-tabs-stack">
            {currentTabs.map((data, index) =>
              <div key={index} ref={dashboardTabsRef.current[index]} onClick={(event) => (tabsClickHandler(event, data.label))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {data.label}
                </div>
              </div>
            )}
          </div>
          {loading ?
            <PageLoader />
            :
            <div>
              {activeTabData && activeTabData.map(({ title, data }) => (
                <div key={title} className="dashboard-container">
                  <Row className="dashboard-cardstack">
                    {data && data.map(({ label, value }) => (
                      <Col key={label} className="dashboard-card-wrapper" xs={12} sm={6} md={6} lg={4} xl={3}>
                        <Card as={Col} className="dashboard-card" >
                          <div className="dashboard-card-avatar">
                            <Avatar size="50" color="#2199c8" round name={label} />
                          </div>
                          <div className="dashboard-card-labelset">
                            <div className="dashboard-card-labelvalue">{value}</div>
                            <div className="dashboard-card-labeltext">{label}</div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;