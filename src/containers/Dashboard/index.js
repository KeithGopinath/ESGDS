import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Avatar from 'react-avatar';
const Dashboard = () => {
  const CARDS_LIST = [
    {
      Clabel: 'Companies',
      cards: [{ label: 'Companies WIP', value: 67 }, { label: 'Companies Submitted', value: 140 }, { label: 'Pendin Companies with QA/Analysts', value: 71 }, { label: "SLA's Due", value: 30 }],
    },
    {
      Clabel: 'Errors',
      cards: [{ label: 'Internal Errors', value: 67 }, { label: 'Client Errors - Accepted', value: 140 }, { label: 'Company rep Errors - Accepted', value: 71 }, { label: "SLA's Request", value: 30 }],
    },
    {
      Clabel: 'Empoyees - By Role',
      cards: [{ label: 'Compant Reps', value: 67 }, { label: 'Client Reps', value: 140 }, { label: 'Analysts', value: 71 }, { label: 'QA', value: 30 }],
    },
    {
      Clabel: 'Empoyees - By Pillar',
      cards: [{ label: 'Environmental', value: 67 }, { label: 'Social', value: 140 }, { label: 'Governance', value: 71 }],
    },
  ];
  return (
    <div className="dashboard-main">
      {/* bootstrap */}
      <React.Fragment>
        <div className="dashboard-label">STATISTICAL DASHBOARD</div>
        {CARDS_LIST.map(({ Clabel, cards }) => (
          <div key={Clabel} className="dashboard-container">
            <div className="dashboard-container-label">{Clabel}</div>
            <Row className="dashboard-cardstack">
              {cards.map(({ label, value }) => (
                <Col key={label} className="dashboard-card-wrapper" xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Card className="dashboard-card" >
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
      </React.Fragment>
      {/* bootstrap */}
    </div>
  );
};


export default Dashboard;
