import React, { useRef } from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import { Transfer, Divider, message } from 'antd';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';


const PillarAssignment = () => {
  const sideBarRef = useRef();
  const [targetKeys, setTargetKeys] = React.useState([]);
  const [taxonomy, settaxanomy] = React.useState('');
  const [isDisabledPrimary, setisDisabledPrimary] = React.useState(true);
  const [isDisabledSec, setisDisabledSec] = React.useState(true);
  const [primaryPillar, setprimaryPillar] = React.useState('');
  const [secPillar, setsecPillar] = React.useState('');
  const [inputValidate, setInputValidate] = React.useState('');

  const onHandleTaxonomy = (arg) => {
    settaxanomy(arg);
    console.log(taxonomy);
    setisDisabledPrimary(false);
  };
  const onChange = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };
  const onPrimaryPillarChange = (arg) => {
    setprimaryPillar(arg);
    setisDisabledSec(false);
    setsecPillar('');
  };
  const onsecPillarChange = (arg) => {
    setsecPillar(arg);
  };
  const onhandlesubmit = () => {
    if (!taxonomy || !primaryPillar) {
      setInputValidate(true);
    }
    if (taxonomy && primaryPillar) {
      if ((taxonomy.label.length && primaryPillar.label.length && targetKeys.length) > 0) {
        const payload = {
          Taxonomy: taxonomy,
          primary: primaryPillar,
          secondary: secPillar,
          user: targetKeys,

        };
        console.log(payload);
        message.success('pillar assigned successfully');
      } else {
        message.error('Fill all the required fields');
      }
    } else {
      message.error('Fill all the required fields');
    }
  };
  const taxOptions = [
    { value: 'dgsf3', label: 'acute1' },
    { value: 'sdsf3', label: 'acute2' },
    { value: '35sf3', label: 'acute3' },
  ];
  const pillarOptions = [
    { value: 'dgsd3', label: 'Environment' },
    { value: 'wdsf3', label: 'Social' },
    { value: '35jgf3', label: 'Governance' },
  ];
  const mockData = [
    {
      key: '1',
      title: 'Balaji',
    },
    {
      key: '2',
      title: 'Praveen',
    },
    {
      key: '3',
      title: 'Rajesh',
    },
    {
      key: '4',
      title: 'Jim',
    },
    {
      key: '5',
      title: 'Tom',
    },
    {
      key: '6',
      title: 'Jerin',
    },
    {
      key: '7',
      title: 'Loki',
    },
  ];
  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header sideBarRef={sideBarRef} title="Pillar assignment" />
          <div className="container-main">
            <Row>
              <Col lg={12} sm={12}>

                <Card className="grp-pad">
                  <Container>
                    <Row>
                      <Col lg={4}>
                        <div className="inner-pillar-content-mar-bot">
                          <div className="pillar-content">Select Taxanomy <span className="mandatory-color">*</span></div>
                          <div className={(taxonomy.length === 0 && inputValidate) ? 'pillar-dropdown-alert' : ''}>
                            <Select
                              options={taxOptions}
                              onChange={onHandleTaxonomy}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="inner-pillar-content-mar-bot">
                          <div className="pillar-content">primary pillar <span className="mandatory-color">*</span></div>
                          <div className={(primaryPillar.length === 0 && inputValidate) ? 'pillar-dropdown-alert' : ''} >
                            <Select
                              onChange={onPrimaryPillarChange}
                              options={pillarOptions}
                              placeholder="primary pillar"
                              isDisabled={isDisabledPrimary}
                              value={primaryPillar}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="inner-pillar-content-mar-bot">
                          <div className="pillar-content">Secondary pillar</div>
                          <div>
                            <Select
                              isMulti
                              onChange={onsecPillarChange}
                              options={pillarOptions.filter((e) => e.label !== primaryPillar.label)}
                              placeholder="Secondary pillar"
                              isDisabled={isDisabledSec}
                              value={secPillar}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <div className="inner-pillar-content-mar-bot">
                          <div className="pillar-content">Select user for pillar assignment <span className="mandatory-color">*</span></div>
                          <div>
                            <Transfer
                              dataSource={mockData}
                              targetKeys={targetKeys}
                              titles={['Unassigned', 'Assigned']}
                              onChange={onChange}
                              render={(item) => item.title}
                              oneWay
                              pagination
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Divider></Divider>
                    <Row>
                      <Col>
                        <div className=" pillar-assign-btn">
                          <button className="btn btn-success" onClick={onhandlesubmit}>Assign pillar</button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Card>

              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PillarAssignment;
