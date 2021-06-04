/* eslint-disable*/
import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { Card, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';

const Dashboard = () => {
  const sideBarRef = useRef();
  const [activeTab, setActiveTab] = useState([]);

  useEffect(() => {
    const defaultTab = dashboardTabsRef.current[0].current;
    defaultTab.classList.add('tabs-label-count-wrap-active');
    setActiveTab([cardsList[0]]);
  }, []);

  const superAdminCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Companies WIP', value: 67 }, { label: 'Companies Submitted', value: 140 }, { label: 'Pending Companies with QA/Analysts', value: 71 }, { label: "SLA's Due", value: 30 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }, { label: 'Client Errors - Accepted', value: 140 }, { label: 'Company rep Errors - Accepted', value: 71 }, { label: "SLA's Request", value: 30 }],
    },
    {
      Clabel: 'Employees - By Role',
      cards: [{ label: 'Compant Reps', value: 67 }, { label: 'Client Reps', value: 140 }, { label: 'Analysts', value: 71 }, { label: 'QA', value: 30 }],
    },
    {
      Clabel: 'Employees - By Pillar',
      cards: [{ label: 'Environmental', value: 67 }, { label: 'Social', value: 140 }, { label: 'Governance', value: 71 }],
    },
    {
      Clabel: 'Misc',
      cards: [{ label: 'Idle Employees', value: 67 }, { label: 'Fill Rate', value: 140 }, { label: 'Aging Analysis', value: 71 },
      { label: 'Serviceablity', value: 71 }, { label: 'SLA Breaches By Analysts', value: 71 }, { label: 'SLA Change Requests By Analysts And QAs', value: 71 },
      { label: 'SLA Extensions For Batches', value: 71 }, { label: 'SLA Breaches For Batches', value: 71 }, { label: 'Reassignments Requests By Analysts and QAs', value: 71 }, { label: 'SLA Breahes For Controversies', value: 71 }, { label: 'Average Quality', value: 71 },
      { label: 'New Errors By Company Rep', value: 71 }, { label: 'New Errors By Clients', value: 71 },
      ],
    },
  ];

  const groupAdminCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Companies WIP', value: 67 }, { label: 'Companies Submitted', value: 140 }, { label: 'Pending Companies with QA/Analysts', value: 71 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }, { label: 'External Errors Raised By Clients', value: 67 }, { label: 'External Errors Raised By Company Rep', value: 67 }, { label: 'Client External Errors - Accepted', value: 140 }, { label: 'Company rep External Errors - Accepted', value: 71 }],
    },
    {
      Clabel: 'Employees - By Role',
      cards: [{ label: 'Compant Reps', value: 67 }, { label: 'Client Reps', value: 140 }, { label: 'Analysts', value: 71 }, { label: 'QA', value: 30 }],
    },
    {
      Clabel: 'Employees - By Pillar',
      cards: [{ label: 'Environmental', value: 67 }, { label: 'Social', value: 140 }, { label: 'Governance', value: 71 }],
    },
    {
      Clabel: 'Misc',
      cards: [{ label: 'Idle Employees', value: 67 }, { label: 'Fill Rate', value: 140 }, { label: 'Aging Analysis', value: 71 },
      { label: 'Serviceablity', value: 71 }, { label: 'SLA Breaches', value: 71 }, { label: 'SLA Change Requests By Analysts And QAs', value: 71 },
      { label: 'SLA Extensions For Batches', value: 71 }, { label: 'SLA Breaches For Batches', value: 71 }, { label: 'Reassignments Requests By Analysts and QAs', value: 71 }, { label: 'SLA Breahes For Controversies', value: 71 }, { label: 'Average Quality', value: 71 },
      ],
    },
  ];

  const qualityAnalystCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Companies WIP', value: 67 }, { label: 'Companies Submitted', value: 140 }, { label: 'Pending Companies For Data Check', value: 71 },
      { label: 'Total Companies For Analyst Revison', value: 71 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Errors', value: 67 }],
    },
    {
      Clabel: 'Misc',
      cards: [{ label: 'Serviceablity', value: 71 }, { label: 'SLA Breaches For Data Check', value: 71 }, { label: 'SLA Change Requests By QAs', value: 71 },
      { label: 'Reassignments Requests By QAs', value: 71 }, { label: 'Average Quality', value: 71 },
      ],
    },
  ];

  const analystCardsList = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Companies WIP', value: 67 }, { label: 'Companies Submitted', value: 140 }, { label: 'Pending Companies For Data Collection', value: 71 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }],
    },
    {
      Clabel: 'Misc',
      cards: [{ label: 'Serviceablity', value: 71 }, { label: 'SLA Breaches For Data Collection', value: 71 }, { label: 'SLA Breaches For Controversies', value: 71 }, { label: 'SLA Change Requests By Analysts', value: 71 },
      { label: 'Reassignments Requests By Analysts', value: 71 }, { label: 'Average Quality', value: 71 },
      ],
    },
  ];

  const cardsList = superAdminCardsList;
  const dashboardTabsRef = useRef(cardsList.map(() => React.createRef()));

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
          <div className="users-tabs-stack">
            {cardsList.map((card, index) =>
              <div key={card.Clabel} ref={dashboardTabsRef.current[index]} onClick={(event) => (tabsClickHandler(event, card))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {card.Clabel}
                </div>
                <div title={card.cards.length} className="tabs-count-wrap">
                  <div className="tabs-count">{card.cards.length}
                  </div>
                </div>
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
                          <Avatar size="50" color="#f0f0f0" round name={label} />
                        </div>
                        <div className="dashboard-card-labelset" >
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
