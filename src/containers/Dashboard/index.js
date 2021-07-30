/* eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Card, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';

const Dashboard = () => {
  const sideBarRef = useRef();
  const [tabFlag, setTabFlag] = useState('');
  const [activeUserData, setActiveUserData] = useState([]);

  const userDetails = useSelector((state) => state.login.login);
  const otpDetails = useSelector((state) => state.otp.otp);
  const roleChange = useSelector((state) => state.roleChange.roleChange);

  const currentRole = roleChange && roleChange.label || otpDetails && otpDetails.user.roleDetails.primaryRole.label ||
    userDetails && userDetails.user.roleDetails.primaryRole.label || sessionStorage.role

  useEffect(() => {
    if (currentRole == 'SuperAdmin' || currentRole == 'Admin') {
      setActiveUserData(superAdminCardsList)
      setTabFlag(superAdminCardsList[0].title)
    } else if (currentRole == 'GroupAdmin') {
      setActiveUserData(groupAdminCardsList)
      setTabFlag(groupAdminCardsList[0].title)
    } else if (currentRole == 'Analyst') {
      setActiveUserData(analystCardsList)
      setTabFlag(analystCardsList[0].title)
    } else {
      setActiveUserData(qualityAnalystCardsList)
      setTabFlag(qualityAnalystCardsList[0].title)
    }
    dashboardTabsRef.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const defaultTab = dashboardTabsRef.current[0].current;
    defaultTab.classList.add('tabs-label-count-wrap-active');

  }, [currentRole]);

  // for SuperAdmin, Admin & GroupAdmin
  const adminTabLabels = [
    { label: 'Companies' },
    { label: 'Errors' },
    { label: 'SLA' },
    { label: 'Batch' },
    { label: 'Employees' },
    { label: 'Services' },
  ];

  // for QA & Analyst
  const analystTabLabels = [
    { label: 'Companies' },
    { label: 'Errors' },
    { label: 'SLA' },
    { label: 'Services' },
  ];

  const adminTabRef = useRef(adminTabLabels.map(() => React.createRef()));
  const analystTabRef = useRef(analystTabLabels.map(() => React.createRef()));
  const dashboardTabsRef = (currentRole == 'SuperAdmin' || currentRole == 'Admin' || currentRole == 'GroupAdmin') ? adminTabRef : analystTabRef
  const currentTabs = (currentRole == 'SuperAdmin' || currentRole == 'Admin' || currentRole == 'GroupAdmin') ? adminTabLabels : analystTabLabels;
  const activeTabData = activeUserData && activeUserData.filter(val => tabFlag == val.title);

  const superAdminCardsList = [
    {
      title: 'Companies',
      data: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }],
    },
    {
      title: 'Errors',
      data: [{ label: 'Internal Errors', value: 67 }, { label: 'External Errors-Client Representatives', value: 140 }, { label: 'External Errors-Client Representatives(Accepted)', value: 71 }, { label: "External Errors-Company Representatives", value: 30 }, { label: "External Errors-Company Representatives(Accepted)", value: 30 }, { label: "Average quality % (external errors only)", value: '30%' }],
    },
    {
      title: 'SLA',
      data: [{ label: 'Breaches(Analyst)', value: 67 }, { label: 'Breaches(QA)', value: 140 }, { label: 'Change requests(Analyst)', value: 71 }, { label: 'Change requests(QA)', value: 30 }, { label: 'Reassignments requests(Analyst)', value: 67 }, { label: 'Reassignments requests(QA)', value: 67 }],
    },
    {
      title: 'Batch',
      data: [{ label: 'SLA extensions', value: 67 }, { label: 'SLA breaches', value: 140 }],
    },
    {
      title: 'Employees',
      data: [{ label: 'Analysts', value: 71 }, { label: 'QA', value: 30 }, { label: 'Group Admin', value: 67 }, { label: 'Admin', value: 67 }, { label: 'Idle employees', value: 67 }, { label: 'Company Representatives', value: 67 }, { label: 'Client Representatives', value: 140 }, { label: 'Environmental', value: 67 }, { label: 'Social', value: 140 }, { label: 'Governance', value: 71 }],
    },
    {
      title: 'Services',
      data: [{ label: 'Serviceability', value: '67%' }, { label: 'Fill Rate', value: '87%' }, { label: 'Aging Analysis', value: 71 },
      ],
    },
  ];

  const groupAdminCardsList = [
    {
      title: 'Companies',
      data: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }],
    },
    {
      title: 'Errors',
      data: [{ label: 'Internal Errors', value: 67 }, { label: 'External Errors(Clients)', value: 140 }, { label: 'External Errors accepted(Clients)', value: 71 }, { label: "External Errors(Company Representatives)", value: 30 }, { label: "External Errors accepted(Company Representatives)", value: 30 }, { label: "Average quality % (external errors only)", value: '30%' }],
    },
    {
      title: 'SLA',
      data: [{ label: 'Breaches(Analyst)', value: 67 }, { label: 'Breaches(QA)', value: 140 }, { label: 'Change requests(Analyst)', value: 71 }, { label: 'Change requests(QA)', value: 30 }, { label: 'Reassignments requests(Analyst)', value: 67 }, { label: 'Reassignments requests(QA)', value: 67 }],
    },
    {
      title: 'Batch',
      data: [{ label: 'SLA extensions', value: 67 }, { label: 'SLA breaches', value: 140 }],
    },
    {
      title: 'Employees',
      data: [{ label: 'Analysts', value: 71 }, { label: 'QA', value: 30 }, { label: 'Group Admin', value: 67 }, { label: 'Admin', value: 67 }, { label: 'Idle employees', value: 67 }, { label: 'Company Representatives', value: 67 }, { label: 'Client Representatives', value: 140 }, { label: 'Environmental', value: 67 }, { label: 'Social', value: 140 }, { label: 'Governance', value: 71 }],
    },
    {
      title: 'Services',
      data: [{ label: 'Serviceability', value: '67%' }, { label: 'Fill Rate', value: '72%' }, { label: 'Aging Analysis', value: 71 },
      ],
    },
  ];

  const analystCardsList = [
    {
      title: 'Companies',
      data: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }],
    },
    {
      title: 'Errors',
      data: [{ label: 'Internal Errors', value: 67 }, { label: 'External Errors', value: 47 }],
    },
    {
      title: 'SLA',
      data: [{ label: 'Breaches', value: 67 }, { label: 'Change requests', value: 71 }, { label: 'Reassignments requests', value: 67 }],
    },
    {
      title: 'Services',
      data: [{ label: 'Quality %', value: '67%' }, { label: 'Serviceability %', value: '72%' }],
    },
  ];

  const qualityAnalystCardsList = [
    {
      title: 'Companies',
      data: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }, { label: 'Sent back(Analyst)', value: 10 }],
    },
    {
      title: 'Errors',
      data: [{ label: 'External Errors', value: 67 }],
    },
    {
      title: 'SLA',
      data: [{ label: 'Breaches', value: 67 }, { label: 'Change requests', value: 71 }, { label: 'Reassignments requests', value: 67 }],
    },
    {
      title: 'Services',
      data: [{ label: 'Quality %', value: '67%' }, { label: 'Serviceability %', value: '72%' }],
    },
  ];

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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;