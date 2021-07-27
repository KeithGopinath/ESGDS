/* eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Card, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState([]);
  const sideBarRef = useRef();

  const userDetails = useSelector((state) => state.login.login);
  const otpDetails = useSelector((state) => state.otp.otp);
  const roleChange = useSelector((state) => state.roleChange.roleChange);

  useEffect(() => {
    const defaultTab = dashboardTabsRef.current[0].current;
    defaultTab.classList.add('tabs-label-count-wrap-active');
    setActiveTab([cardsList[0]]);
  }, []);

  const currentRole = roleChange && roleChange.label || otpDetails && otpDetails.user.roleDetails.primaryRole.label ||
  userDetails && userDetails.user.roleDetails.primaryRole.label || sessionStorage.role

  const superAdminCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }, { label: 'External Errors-Client Representatives', value: 140 }, { label: 'External Errors-Client Representatives(Accepted)', value: 71 }, { label: "External Errors-Company Representatives", value: 30 }, { label: "External Errors-Company Representatives(Accepted)", value: 30 }, { label: "Average quality % (external errors only)", value: '30%' }],
    },
    {
      Clabel: 'SLA',
      cards: [{ label: 'Breaches(Analyst)', value: 67 }, { label: 'Breaches(QA)', value: 140 }, { label: 'Change requests(Analyst)', value: 71 }, { label: 'Change requests(QA)', value: 30 }, { label: 'Reassignments requests(Analyst)', value: 67 }, { label: 'Reassignments requests(QA)', value: 67 }],
    },
    {
      Clabel: 'Batch',
      cards: [{ label: 'SLA extensions', value: 67 }, { label: 'SLA breaches', value: 140 }],
    },
    {
      Clabel: 'Employees',
      cards: [{ label: 'Analysts', value: 71 }, { label: 'QA', value: 30 }, { label: 'Group Admin', value: 67 }, { label: 'Super Admin', value: 67 }, { label: 'Idle employees', value: 67 }, { label: 'Company Representatives', value: 67 }, { label: 'Client Representatives', value: 140 }, { label: 'Environmental', value: 67 }, { label: 'Social', value: 140 }, { label: 'Governance', value: 71 }],
    },
    {
      Clabel: 'Services',
      cards: [{ label: 'Serviceability', value: '67%' }, { label: 'Fill Rate', value: '87%' }, { label: 'Aging Analysis', value: 71 },
      ],
    },
  ];

  const groupAdminCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }, { label: 'External Errors(Clients)', value: 140 }, { label: 'External Errors accepted(Clients)', value: 71 }, { label: "External Errors(Company Representatives)", value: 30 }, { label: "External Errors accepted(Company Representatives)", value: 30 }, { label: "Average quality % (external errors only)", value: '30%' }],
    },
    {
      Clabel: 'SLA',
      cards: [{ label: 'Breaches(Analyst)', value: 67 }, { label: 'Breaches(QA)', value: 140 }, { label: 'Change requests(Analyst)', value: 71 }, { label: 'Change requests(QA)', value: 30 }, { label: 'Reassignments requests(Analyst)', value: 67 }, { label: 'Reassignments requests(QA)', value: 67 }],
    },
    {
      Clabel: 'Batch',
      cards: [{ label: 'SLA extensions', value: 67 }, { label: 'SLA breaches', value: 140 }],
    },
    {
      Clabel: 'Employees',
      cards: [{ label: 'Analysts', value: 71 }, { label: 'QA', value: 30 }, { label: 'Group Admin', value: 67 }, { label: 'Super Admin', value: 67 }, { label: 'Idle employees', value: 67 }, { label: 'Company Representatives', value: 67 }, { label: 'Client Representatives', value: 140 }, { label: 'Environmental', value: 67 }, { label: 'Social', value: 140 }, { label: 'Governance', value: 71 }],
    },
    {
      Clabel: 'Services',
      cards: [{ label: 'Serviceability', value: '67%' }, { label: 'Fill Rate', value: '72%' }, { label: 'Aging Analysis', value: 71 },
      ],
    },
  ];

  const analystCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }],
    },
    {
      Clabel: 'SLA',
      cards: [{ label: 'Breaches', value: 67 }, { label: 'Change requests', value: 71 }, { label: 'Reassignments requests', value: 67 }],
    },
    {
      Clabel: 'Services',
      cards: [{ label: 'Quality %', value: '67%' }, { label: 'Serviceability %', value: '72%' }],
    },
  ];

  const qualityAnalystCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Pending', value: 67 }, { label: 'Submitted', value: 140 }, { label: 'Sent back', value: 10 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }],
    },
    {
      Clabel: 'SLA',
      cards: [{ label: 'Breaches', value: 67 }, { label: 'Change requests', value: 71 }, { label: 'Reassignments requests', value: 67 }],
    },
    {
      Clabel: 'Services',
      cards: [{ label: 'Quality %', value: '67%' }, { label: 'Serviceability %', value: '72%' }],
    },
  ];

  const cardsList = currentRole == 'SuperAdmin' || currentRole == 'Admin' ? superAdminCardsList : currentRole == 'GroupAdmin' ? groupAdminCardsList :
    currentRole == 'Analyst' ? analystCardsList :  currentRole == 'QA' ? qualityAnalystCardsList : analystCardsList;

  console.log('card',cardsList);
  const dashboardTabsRef =  useRef(cardsList.map(() => React.createRef()));
  
  console.log('tabrefs',dashboardTabsRef);

  const tabsClickHandler = (event, data) => {
    setActiveTab([data])
    dashboardTabsRef.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const target = event.currentTarget;
    target.classList.add('tabs-label-count-wrap-active');
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Dashboard" />
        <div className="container-main">
          <div className="dashboard-tabs-stack">
            {cardsList.map((card, index) =>
              <div key={card.Clabel} ref={dashboardTabsRef.current[index]} onClick={(event) => (tabsClickHandler(event, card))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {card.Clabel}
                </div>
                {/* <div title={card.cards.length} className="tabs-count-wrap">
                  <div className="tabs-count">{card.cards.length}
                  </div>
                </div> */}
              </div>
            )}
          </div>
          <div>
            {activeTab.map(({ Clabel, cards }) => (
              <div key={Clabel} className="dashboard-container">
                <Row className="dashboard-cardstack">
                  {cards.map(({ label, value }) => (
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
