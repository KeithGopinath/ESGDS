/* eslint-disable object-curly-newline */
import React, { useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const GroupCreation = () => {
  const [grpName, setgrpName] = useState('');
  const [grpAdmin, setrgrpAdmin] = useState('');
  const [batch, setBatch] = useState('');
  const [QArole, setQArole] = useState('');
  const [Analystrole, setAnalystrole] = useState('');
  const [grplist, setgrplist] = useState([]);
  const [grpCount, setgrpCount] = useState(0);
  const groupAdminOptions = [
    { value: 'Praveen', label: 'Praveen' },
    { value: 'Vaijanthi', label: 'Vaijanthi' },
    { value: 'Gopi', label: 'Gopi' },
    { value: 'Rajesh', label: 'Rajesh' },
    { value: 'Balaji', label: 'Balaji' },
  ];
  const BatchOptions = [
    { value: 'batch 1', label: 'batch 1' },
    { value: 'batch 2', label: 'batch 2' },
    { value: 'batch 3', label: 'batch 3' },
    { value: 'batch 4', label: 'batch 4' },
    { value: 'batch 5', label: 'batch 5' },
  ];
  const QAOptions = [
    { value: 'Sam', label: 'Sam' },
    { value: 'Tom', label: 'Tom' },
    { value: 'Bolt', label: 'Bolt' },
    { value: 'Rohit', label: 'Rohit' },
    { value: 'Mohit', label: 'Mohit' },
  ];
  const AnalystOptions = [
    { value: 'Ram', label: 'Ram' },
    { value: 'Sundar', label: 'Sundar' },
    { value: 'Zampa', label: 'Zampa' },
    { value: 'Dhoni', label: 'Dhoni' },
    { value: 'Virat', label: 'Virat' },
  ];
  const sideBarRef = useRef();
  const onhandelgrpName = (e) => {
    setgrpName(e.target.value);
  };
  const onhandlegrpAdmin = (groupAdmin) => {
    setrgrpAdmin(groupAdmin);
  };
  const onhandleassignBatch = (Assignedbatch) => {
    setBatch(Assignedbatch);
  };
  const onhandleQA = (QA) => {
    setQArole(QA);
  };
  const onhandleAnalyst = (assignedAnalyst) => {
    setAnalystrole(assignedAnalyst);
  };
  const createGroup = () => {
    console.log(grpName.length, grpAdmin.value.length, batch.value.length, QArole.length, Analystrole.length);
    if ((grpName.length && grpAdmin.value.length && batch.value.length && QArole.length && Analystrole.length) > 0) {
      alert('Group created successfully !');
      const grpDetails = { groupName: grpName, groupAdmin: grpAdmin.value, Assignedbatch: batch.value, AssignedQA: QArole, AssignedAnalyst: Analystrole };
      const updatedgrplist = [grpDetails, ...grplist];
      setgrplist(updatedgrplist);
      setgrpCount(grplist.length + 1);
      console.log(grplist.length, 'all group details');
    } else {
      alert('fill all the above fields');
    }
  };
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <Container className="wrapper">
          <div className="group-heading-wrapper" ><div className="group-heading-name">Group Creation</div></div>
          <Row>
            <Col lg={12} sm={12}>
              <div className="group-detail">
                <div>Group Details</div>
              </div>
            </Col>
            <Col lg={5} sm={12} className="group-detail-wrapper">
              <div className="group-name">Group name* :</div>
              <div className="form-group group-input-width" ><input type="text" className="form-control" onChange={onhandelgrpName} autoComplete="off" required></input></div>
              <div className="group-dropdown-width">
                <div className="group-dropdown-name" >Select Group Admin*</div>
                <div>
                  <Select
                    options={groupAdminOptions}
                    name="name"
                    onChange={onhandlegrpAdmin}
                  />
                </div>
              </div>
              <div className="group-dropdown-width">
                <div className="group-dropdown-name">Assign Batches*</div>
                <div>
                  <Select
                    options={BatchOptions}
                    name="name"
                    onChange={onhandleassignBatch}
                  />
                </div>
              </div>
            </Col>
            <Col lg={5} sm={12} className="group-detail-wrapper">
              <div className="group-dropdown-width">
                <div className="group-dropdown-name">Assign QA*</div>
                <div>
                  <Select
                    isMulti
                    options={QAOptions}
                    name="name"
                    onChange={onhandleQA}
                  />
                </div>
              </div>
              <div className="group-dropdown-width">
                <div className="group-dropdown-name">Assign Analyst*</div>
                <div>
                  <Select
                    isMulti
                    options={AnalystOptions}
                    name="name"
                    onChange={onhandleAnalyst}
                  />
                </div>
              </div>
            </Col>
            <Col lg={2} sm={12} className="side-border" >
              <div >
                <button type="button" className="btn btn-primary groups-btn" >Groups <span className="badge bg-secondary groups-badge" >{grpCount}</span></button >
                <button type="button" className="btn btn-secondary  groups-batch-btn" >Create batch </button>
              </div>
            </Col>
            <Col lg={10} sm={12}>
              <div className="group-submit-btn">
                <button type="button" className="btn btn-outline-primary" onClick={createGroup}>Create Group</button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default GroupCreation;
