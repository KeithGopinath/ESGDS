/* eslint-disable object-curly-newline */
import React, { useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const GroupCreation = () => {
  const [grpName, setGrpName] = useState('');
  const [grpAdmin, setrGrpAdmin] = useState('');
  const [batch, setBatch] = useState('');
  const [qaRole, setQArole] = useState('');
  const [analystRole, setAnalystRole] = useState('');
  const [grplist, setGrpList] = useState([]);
  const [grpCount, setGrpCount] = useState(0);
  const [groupStatus, setGroupStatus] = useState(0);
  const [inputValidate, setInputValidate] = useState(false);

  const groupAdminOptions = [
    { value: 'Praveen', label: 'Praveen' },
    { value: 'Vaijanthi', label: 'Vaijanthi' },
    { value: 'Gopi', label: 'Gopi' },
    { value: 'Rajesh', label: 'Rajesh' },
    { value: 'Balaji', label: 'Balaji' },
  ];

  const batchOptions = [
    { value: 'batch 1', label: 'batch 1' },
    { value: 'batch 2', label: 'batch 2' },
    { value: 'batch 3', label: 'batch 3' },
    { value: 'batch 4', label: 'batch 4' },
    { value: 'batch 5', label: 'batch 5' },
  ];

  const qaOptions = [
    { value: 'Sam', label: 'Sam' },
    { value: 'Tom', label: 'Tom' },
    { value: 'Bolt', label: 'Bolt' },
    { value: 'Rohit', label: 'Rohit' },
    { value: 'Mohit', label: 'Mohit' },
  ];

  const analystOptions = [
    { value: 'Ram', label: 'Ram' },
    { value: 'Sundar', label: 'Sundar' },
    { value: 'Zampa', label: 'Zampa' },
    { value: 'Dhoni', label: 'Dhoni' },
    { value: 'Virat', label: 'Virat' },
  ];

  const sideBarRef = useRef();
  const onhandelgrpName = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setGrpName(e.target.value);
    }
  };
  const onhandlegrpAdmin = (groupAdmin) => {
    setrGrpAdmin(groupAdmin);
  };
  const onhandleassignBatch = (Assignedbatch) => {
    setBatch(Assignedbatch);
  };
  const onhandleQA = (QA) => {
    setQArole(QA);
  };
  const onhandleAnalyst = (assignedAnalyst) => {
    setAnalystRole(assignedAnalyst);
  };
  const createGroup = () => {
    if (!grpName) {
      setInputValidate('border-danger');
      setGroupStatus(2);
    } else if (!grpAdmin || !batch || !qaRole || !analystRole) {
      setInputValidate(true);
      setGroupStatus(2);
    } else {
      const grpDetails = { groupName: grpName, groupAdmin: grpAdmin.value, Assignedbatch: batch.value, AssignedQA: qaRole, AssignedAnalyst: analystRole };
      const updatedgrplist = [grpDetails, ...grplist];
      setGrpList(updatedgrplist);
      setGrpCount(grplist.length + 1);
      setTimeout(() => {
        setGroupStatus(0);
      }, 3000);
      setGroupStatus(1);
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
              <div className="form-group group-input-width" ><input type="text" value={grpName} className={`form-control ${grpName === '' && inputValidate}`} onChange={onhandelgrpName} autoComplete="off" required></input></div>
              <div className="group-dropdown-width">
                <div className="group-dropdown-name" >Select Group Admin*</div>
                <div className={grpAdmin === '' && inputValidate && 'group-dropdown-alert'}>
                  <Select
                    options={groupAdminOptions}
                    name="name"
                    onChange={onhandlegrpAdmin}
                  />
                </div>
              </div>
              <div className="group-dropdown-width">
                <div className="group-dropdown-name">Assign Batches*</div>
                <div className={batch === '' && inputValidate && 'group-dropdown-alert'}>
                  <Select
                    options={batchOptions}
                    name="name"
                    onChange={onhandleassignBatch}
                  />
                </div>
              </div>
            </Col>
            <Col lg={5} sm={12} className="group-detail-wrapper">
              <div className="group-dropdown-width">
                <div className="group-dropdown-name">Assign QA*</div>
                <div className={qaRole === '' && inputValidate && 'group-dropdown-alert'}>
                  <Select
                    isMulti
                    options={qaOptions}
                    name="name"
                    onChange={onhandleQA}
                  />
                </div>
              </div>
              <div className="group-dropdown-width">
                <div className="group-dropdown-name">Assign Analyst*</div>
                <div className={analystRole === '' && inputValidate && 'group-dropdown-alert'}>
                  <Select
                    isMulti
                    options={analystOptions}
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
              <div className="group-status-minheight">
                {groupStatus === 1 &&
                <div className="group-status-creation">
                  <div className="alert alert-success" role="alert" >Group Created successfully !!</div>
                </div>
                }
                {groupStatus === 2 &&
                  <div className="group-status-creation">
                    <div className="group-tot-alert" >Fill all the required fields !</div>
                  </div>
                }
              </div>
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
