/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Col, Row, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { Transfer, Divider, message } from 'antd';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import PageLoader from '../../components/PageLoader';


const PillarAssignment = () => {
  const sideBarRef = useRef();
  const [targetKeys, setTargetKeys] = React.useState([]);
  const [assignedMember, setassignedMember] = React.useState([]);
  const [mockData, setmockData ] = React.useState([]);
  const [isDisabledPrimary, setisDisabledPrimary] = React.useState(true);
  const [isDisabledSec, setisDisabledSec] = React.useState(true);
  const [primaryPillar, setprimaryPillar] = React.useState('');
  const [secPillar, setsecPillar] = React.useState('');
  const [inputValidate, setInputValidate] = React.useState('');
  const [group, setgroup] = React.useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GROUPLIST_REQUEST' });
    dispatch({type:"GROUPBYID_RESET"});
    
  }, []);
  const isGroup = useSelector((getgrouplist) => getgrouplist.getgrouplist.grouplist);
  const isGroupLoading = useSelector((getgrouplist) => getgrouplist.getgrouplist.isLoading);
  const groupList = isGroup && isGroup.rows;
  const groupOptions = groupList && groupList.map((e) => (
    { value: e._id, label: e.groupName }
  ));
 
  const isGroupByid = useSelector((getgroupbyid) => getgroupbyid.groupbtid.groupById);
  const isGroupByidLoading = useSelector((getgroupbyid) => getgroupbyid.groupbtid.isLoading);
  const grpDtetail = isGroupByid && isGroupByid.data;
  
  useEffect(()=>{
    if(grpDtetail){
      if(grpDtetail.memberForPillar.length === 0){
      setisDisabledPrimary(true);
      }
      const pillarassigned = [];
      const unassigned = [];
      const pillarenable = [];
      for (const e of grpDtetail.memberForPillar) {
        if(e.isPillarAssigned === true){
          pillarassigned.push(e.value);
        }
        unassigned.push({ key: e.value, title: e.label, disabled:e.isPillarAssigned});
      }
      
      setmockData(unassigned);
      setTargetKeys(pillarassigned);
      for (const obj of grpDtetail.memberForPillar) {
        if(obj.isPillarAssigned === false){
          pillarenable.push(obj);
      }
      }
      if(pillarenable.length > 0){
      setisDisabledPrimary(false);
      } else{
        setisDisabledPrimary(true);
      }
    } else {
      setisDisabledPrimary(true);
      setTargetKeys([]);
      setmockData([]);
    }
  },[grpDtetail]);
  
 




  // *** on Select groups *** //
  const onHandleGroups = (args) => {
    
    dispatch({ type: 'GROUPBYID_REQUEST', groupid: args.value });
    setprimaryPillar('');
    setsecPillar('')
    setisDisabledSec(true);
    setTargetKeys([]);
    setmockData([]);
    setInputValidate('');
    setgroup(args);

  };



const assignPillar = useSelector((assignpillar)=> assignpillar.assignpillar.pillarAssign);
const assignPillarLoading  = useSelector((assignpillar)=> assignpillar.assignpillar.isLoading);
useEffect(()=>{
  if(assignPillar){
    message.success(assignPillar.message);
    setgroup('');
    setprimaryPillar('');
    setsecPillar('')
    setisDisabledSec(true);
    setisDisabledPrimary(true);
    setTargetKeys([]);
    setmockData([]);
    setInputValidate('');
    dispatch({type:"PILLARASSIGN_RESET"});
}
},[assignPillar])

 
  const onChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    const unassignedmember = [];
    if ((newTargetKeys.length) > 0) {
      for (const i of newTargetKeys) {
        for (const j of grpDtetail.memberForPillar) {
          if (i === j.value) {
            if(j.isPillarAssigned === false){
             unassignedmember.push(j.value);
            }
          }
        }
      }
    }
    setassignedMember(unassignedmember);
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
    if ( !primaryPillar || !group) {
      setInputValidate(true);
    }
    if ( primaryPillar && group) {
      if (( primaryPillar.label.length && assignedMember.length && group.label.length) > 0) {
        const payload = {
          primary: primaryPillar,
          secondary: secPillar,
          user: assignedMember,

        };
        dispatch({type:"PILLARASSIGN_REQUEST", payload:payload})
        
      } else {
        message.error('Fill all the required fields');
      }
    } else {
      message.error('Fill all the required fields');
    }
  };
  
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
                {(isGroupLoading || assignPillarLoading || isGroupByidLoading )? <PageLoader />:
                  <Container>
                    <Row>
                      <Col lg={4}>
                        <div className="inner-pillar-content-mar-bot">
                          <div className="pillar-content">Select Groups <span className="mandatory-color">*</span></div>
                          <div className={(group.length === 0 && inputValidate) ? 'pillar-dropdown-alert' : ''}>
                            <Select
                              options={groupOptions}
                              onChange={onHandleGroups}
                              value={group}
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
                              options={grpDtetail && grpDtetail.pillarList}
                              placeholder="Primary"
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
                              options={grpDtetail && grpDtetail.pillarList.filter((e) => e.label !== primaryPillar.label)}
                              placeholder="Secondary"
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
                              dataSource={ (mockData)? mockData: []}
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
                }
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
