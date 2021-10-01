/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { Transfer, Steps, message, Button, Result, Divider, Tag, Table } from 'antd';
import difference from 'lodash/difference';
import {
  IdcardFilled,
} from '@ant-design/icons';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
// import ListItemText from '@material-ui/core/ListItemText';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Header from '../../components/Header';
import { useLocation } from "react-router-dom";
import PageLoader from '../../components/PageLoader';
import SideMenuBar from '../../components/SideMenuBar';



const Groups = () => {
  const [targetKeys, setTargetKeys] = React.useState([]);
  const [batchmock, setbatchmock ] = useState([]);
  const [current, setCurrent] = React.useState(0);
  const [grpNamedisplay, setgrpName]= useState(null);
  const [result, setresult]=useState('');
  // create group states
  const [creategrpName, setcreateGrpName] = useState('');
  const [creategrpAdmin, setcreateGrpAdmin] = useState('');
  const [creategrplist, setcreateGrpList] = useState([]);
  const [inputValidate, setInputValidate] = useState(false);
  const [usertargetKeys, setuserTargetKeys] = React.useState([]);
  const [isdisableduser, setisdisableduser] = useState(true);
  const [editunassignedAnalystQa,seteditunassignedAnalystQa] = useState([]);
  const [disablegrpName, setdisablegrpName ] = useState(false);
  
  const [editunassigned, seteditunassigned ] = useState([]);
  const sideBarRef = useRef();
  const { Step } = Steps;

  const dispatch = useDispatch();
  const location = useLocation();
  const steps = [
    {
      title:'Create Group',
    },
    {
      title: 'Batch Assignment',
    },
    {
      title: 'Status',
    },
  ];

  // api response
  const isGroupByid = useSelector((getgroupbyid) => getgroupbyid.groupbtid.groupById);
  const isGroupByidLoading = useSelector((getgroupbyid) => getgroupbyid.groupbtid);
  const grpDetail = isGroupByid && isGroupByid.data;

  // *** API call *** ***
  useEffect(()=>{
    // dispatch({type:"GROUPBYID_RESET"});

    if(grpDetail){
      dispatch({type: "GROUPBYID_RESET"});
    }
    if(location && !location.state){
    const payload = { 
      filters: [
        { filterWith: "isUserApproved", value: true },
        { filterWith: "isAssignedToGroup", value: false },
        { filterWith: "isRoleAssigned", value: true },
        { filterWith: "isUserActive", value: true },
        { filterWith: "userType", value: "Employee" }
        
      ] }
      dispatch({type: "GROUPBYID_RESET"});
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    } else {
      dispatch({type:"FILTER_USERS_RESET"});
      dispatch({ type: 'GROUPBYID_REQUEST', groupid: location.state });
      dispatch({type:"UNASSIGNEDBATCH_RESET"});
    }
  
    
  },[]);
  
  useEffect(() => {
    if(grpDetail && location.state){
     
      setcreateGrpName(grpDetail && grpDetail.groupName);
      setcreateGrpAdmin(grpDetail && grpDetail.admin.userDetails);
      setisdisableduser(false);
      setdisablegrpName(true);
      const assignedobj = [];
      const unassignedobj = [];
      const onlyanalystqa = [];
      
      for (const i of grpDetail.memberforgrpEdit) {
        if(i.isAssignedToGroup === true){
          assignedobj.push(i.userDetails.value);
        }
        unassignedobj.push( { key: i.userDetails.value, title: i.userDetails.label, SecRole: {primary: i.roleDetails.primaryRole.label, role: i.roleDetails.role }, disabled:i.isAssignedToGroup });
         
      }
      console.log(unassignedobj, 'unassignedobj');
      setuserTargetKeys(assignedobj);
      seteditunassigned(unassignedobj);
      
 
      for(const i of unassignedobj){
        if(i.SecRole.role.length === 1){
          for(const k of i.SecRole.role){
            if(k.label !== 'GroupAdmin'){
              onlyanalystqa.push(i);
              
            }
          }
        } 
        if(i.SecRole.role.length > 1){
        for(const k of i.SecRole.role){
          if(k.label === "Analyst" || k.label === "QA"){
          onlyanalystqa.push(i);
          break;
          }
        }
      }
      }
      console.log(onlyanalystqa, 'onlyanalystqa');
      seteditunassignedAnalystQa(onlyanalystqa);
      // for batch Edit
      const assignedbatch = [];
      const unassignedatch = [];
      for( const obj of grpDetail.assignBatch){
        if(obj.isAssignedToGroup === true){
          assignedbatch.push(obj.value);
        }
        unassignedatch.push({ key: obj.value, title: obj.label, taxonomy:obj.taxonomy.label, disabled: obj.isAssignedToGroup });
       
      }
      setTargetKeys(assignedbatch);
      setbatchmock(unassignedatch);
    } 
 }, [grpDetail]);


// edit part


  const isGroupCreated = useSelector((creategroup) => creategroup.creategroup.grouppost);
  const isGroupCreatedLoading = useSelector((creategroup) => creategroup.creategroup);
 
  const batchData = useSelector((unassignedbatchlist) => unassignedbatchlist.unassignedBatch.unassignedbatchdata);
  const batchDataLoading = useSelector((unassignedbatchlist) => unassignedbatchlist.unassignedBatch);
  const batchAssignment = batchData && batchData.rows;
  
  const userData = useSelector((filterUsers) => filterUsers.filterUsers.filterUsers);
  const userDataLoading = useSelector((filterUsers) => filterUsers.filterUsers);
  const isData = userData && userData.data;
  useEffect(() => {
    if (isGroupCreated) {
      setresult(isGroupCreated.message);
      setCurrent(current + 1);
      dispatch({type:"GROUP_RESET"});
      dispatch({type:"GROUPBYID_RESET"});
      const payload = { 
        filters: [
          { filterWith: "isUserApproved", value: true },
          { filterWith: "isAssignedToGroup", value: false },
          { filterWith: "isRoleAssigned", value: true },
          { filterWith: "isUserActive", value: true },
          { filterWith: "userType", value: "Employee" }
          
        ] }
        dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    }
    
  }, [isGroupCreated]);
  
   // throw error response 
 useEffect(()=>{
  if(isGroupByidLoading.error || isGroupCreatedLoading.error || batchDataLoading.error || userDataLoading.error) {
    message.error((isGroupByidLoading.error && isGroupByidLoading.error.message) || (isGroupCreatedLoading.error && isGroupCreatedLoading.error.message) || (batchDataLoading.error && batchDataLoading.error.message) || (userDataLoading.error && userDataLoading.error.message))
  }
 },[isGroupByidLoading.error, isGroupCreatedLoading.error, batchDataLoading.error, userDataLoading.error]);


  const grpAdminlist = [];
  const userList = [];

  // adding default value to the list ***Edit***
  
    grpDetail && grpDetail.admin.roleDetails.role.map((i)=>{
      if(i.label === "GroupAdmin"){
        grpAdminlist.push(grpDetail.admin);
      }
    });
    const filteredData = []
    for(const obj1 of editunassigned){
       const istest = usertargetKeys.filter((e)=> e === obj1.key);
       if(istest.length === 0){
        filteredData.push(obj1);
       } 
    }
   console.log(editunassigned, 'editunassigned');
    if(editunassigned){
      for(const i of filteredData){
        for(const j of i.SecRole.role){
          if(j.label === 'GroupAdmin'){
            
            const ischeck = grpAdminlist.filter((e)=>e.userDetails.value === i.key);
            if(grpAdminlist.length > 0){
            if(ischeck.length !== 1){
            grpAdminlist.push({ userDetails:{ value:i.key, label:i.title }});
            }
          } else {
            grpAdminlist.push({ userDetails:{ value:i.key, label:i.title }});
          }
          }
        }
      }
   
    }
  // *** unassign member / batches ***
  //   if(grpDetail){
  //   for (const grpobj of unassignedobj){
  //     if( grpobj.SecRole.role)
  //     grpAdminlist.push(grpobj.);
  //   }
  // }
    
  //     if(grpDetail){
  //   for (const i of grpDetail.admin.roleDetails.role) {
  //       if(i.label === 'Analyst' || i.label === 'QA'){
  //         userList.push(grpDetail.admin);
  //         break;
  //       }
      
  //   }
  // }
 
//   if(grpDetail){
//   for (const i of grpDetail.memberforgrpEdit) {
//     for (const j of i.roleDetails.role) {
//       if(j.label === 'Analyst' || j.label === 'QA'){
//         userList.push(i);
//         break;
//       }
//     }
//   }
// }
    
  if(isData){
    const filteruserData= [];
  for (const i of isData) {
    for (const j of i.roleDetails.role) {
      if(j.label === 'Analyst' || j.label === 'QA'){
        userList.push(i);
        break;
      }
    }
  }

  for (const i of isData) {
    if(i.roleDetails.role.length === 1){
    for (const j of i.roleDetails.role) {
      if(j.label === 'GroupAdmin'){
        grpAdminlist.push(i);
        break;
      }
    }
  }
  }

  for(const obj of userList){
    const istest = usertargetKeys.filter((e)=> e === obj.userDetails.value);
    if(istest.length === 0){
      filteruserData.push(obj);
    }
  }

for(const i of filteruserData){
  for(const j of i.roleDetails.role){
    if(j.label === 'GroupAdmin'){
      grpAdminlist.push(i);
    }
  }
}
}
const groupAdminOptions = [];

  grpAdminlist.map((obj)=>{
    groupAdminOptions.push(obj.userDetails);
  });


  // *** batch assignments starts ***

  const onChangebatchTransfer = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const next = () => {
   if(batchAssignment){
    const batcharr = [];
    if ((targetKeys.length) > 0) {
      for (const i of targetKeys) {
        for (const j of batchAssignment) {
          if (i === j._id) {
            batcharr.push(j, ...j);
          }
        }
      }
      const finalArr = creategrplist && { groupId: "" && grpDetail._id, grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: batcharr };
      dispatch({ type:"GROUP_CREATE_REQUEST", payload : finalArr });
    }
    else {
      const finalArr = creategrplist && { groupId: "" && grpDetail._id, grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: [] };
      dispatch({ type:"GROUP_CREATE_REQUEST", payload : finalArr });
    }
  }
    
    if(grpDetail){
      const editbatcharr = [];
if ((targetKeys.length) > 0) {
  for (const i of targetKeys) {
    for (const j of batchmock) {
      if(i === j.key){
        editbatcharr.push({...j, _id: j.key});
      }
    }

  }
   const finalArr = creategrplist && { groupId: grpDetail && grpDetail._id, grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: editbatcharr };
      dispatch({ type:"GROUP_CREATE_REQUEST", payload : finalArr });
    }   
    else {
      
      const finalArr = creategrplist && { groupId: grpDetail && grpDetail._id, grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: [] };
      dispatch({ type:"GROUP_CREATE_REQUEST", payload : finalArr });
    }
  }
  };

 // batch assignments ends **** 
  // commom button
  const prev = () => {
  
    setCurrent(current - 1);
  };
  const onHandledone = () => {
    
    setcreateGrpAdmin('');
    setcreateGrpName('');
    setuserTargetKeys([]);
    setgrpName(null);
    setTargetKeys([]);
    setresult('');
   setisdisableduser(true);
   setCurrent(0);
   setdisablegrpName(false);
  }
 

// *** create group starts here ***
const onChangeTransfer = (newTargetKeys, direction, moveKeys) => {
    setuserTargetKeys(newTargetKeys);
  };

  const createGroup = () => {
    const memobj = [];
    if (!creategrpName) {
      setInputValidate('border-danger');
     
    } else if (!creategrpAdmin) {
      setInputValidate(true);
      
    }
    if(isData){
    for (const i of userList) {
      for (const j of usertargetKeys) {
        if(i.userDetails.value === j){
          memobj.push(i);
        }
      }
    }
  } 
  if(grpDetail){
    //const uniqueEdituserData = usertargetKeys.filter((e)=>e !== creategrpAdmin.value);
    for (const i of grpDetail.memberforgrpEdit) {
      for( const j of usertargetKeys){
        if(i.userDetails.value === j){
          memobj.push(i);
        }
      }
  }
}
  
    if(creategrpAdmin){

      if ((creategrpName.length && usertargetKeys.length && creategrpAdmin.value.length) > 0) {
        const grpDetails = { groupName: creategrpName, groupAdmin: creategrpAdmin, members: memobj };
       
        setcreateGrpList(grpDetails);
        setgrpName(creategrpName);
        setCurrent(current + 1);
        if(!grpDetail){
        dispatch({ type: 'UNASSIGNEDBATCH_REQUEST' });
        }
       
      
      } else {
        message.error('Fill all the required fields');
        setcreateGrpList([]);
      }
    }
    else{
      message.error('Fill all the required fields');
    }  
  
  };

  // Add user transfer
  const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false} titles={['Unassigned users', 'Assigned users']}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;

        const rowSelection = {
          getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              // eslint-disable-next-line no-undef
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );


  const mockData = userList && userList.map((obj) => {
    const dumArr = { key: obj.userDetails.value, title: obj.userDetails.label, SecRole: {primary: obj.roleDetails.primaryRole.label, role: obj.roleDetails.role} };
    return dumArr;
  });
  

  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
   
    {
      dataIndex: 'SecRole',
      title: 'Roles',
      render: (Roles) => Roles.role.map((e) => (<Tag color={(e.label === Roles.primary)?"cyan":"blue"} style={{margin:'0.2rem'}}>{e.label}</Tag>)),
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'SecRole',
      title: 'Roles',
      render: (Roles) => Roles.role.map((e) => (<Tag color={(e.label === Roles.primary)?"cyan":"blue"} style={{margin:'0.2rem'}}>{e.label}</Tag>)),
    },
  ];


  
  const batchlistwise = batchAssignment && batchAssignment.map((b) => {
    const batchDetail = { key: b._id, title: b.batchName, taxonomy:b.taxonomy.label, disabled:false };
    return batchDetail;
  });
  // batch transfer 
  const TableTransferbatch = ({ leftColumnsbatch, rightColumnsbatch, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false} titles={['Unassigned batches', 'Assigned batches']}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumnsbatch : rightColumnsbatch;

        const rowSelection = {
          getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            const treeSelectedKeys = selectedRows
              .filter((item) => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
            onItemSelect(key, selected);
          },
          selectedRowKeys: listSelectedKeys,
        };

        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
  );
  const LeftTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'taxonomy',
      title: 'Taxonomy',
      render: (Taxonomy) => <Tag color="blue">{Taxonomy}</Tag>,
    },
   
  ];
  const RightTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'taxonomy',
      title: 'Taxonomy',
      render: (Taxonomy) => <Tag color="blue">{Taxonomy}</Tag>,
    },
  ];
 

  const onhandelgrpName = (e) => {
    if (/^(?![\s-])[\A-Za-z0-9\s-]*$/.test(e.target.value)) {
      const uppercaseName = (e.target.value).toUpperCase();
      setcreateGrpName(uppercaseName);
    }
      
    
  };
  const onhandlegrpAdmin = (groupAdmin) => {
    setcreateGrpAdmin(groupAdmin);
    setisdisableduser(false);
  };


 const GroupCreation = () =>(
   
    <Container>
      <Row>
        <Col lg={6} sm={12}>
          <div className="group-content">Group Name <span className="mandatory-color">*</span></div>
          <div className="form-group group-input-width" ><input type="text" value={creategrpName} className={`form-control ${creategrpName === '' && inputValidate}`} onChange={onhandelgrpName} autoComplete="off" required disabled={disablegrpName}></input></div>
        </Col>
        <Col lg={6} sm={12}>
          <div className="group-dropdown-width">
            <div className="group-content" >Select Group Admin <span className="mandatory-color">*</span></div>
            <div className={(creategrpAdmin.length === 0 && inputValidate) ? 'group-dropdown-alert' : ""}>
              <Select
                options={groupAdminOptions}
                name="name"
                onChange={onhandlegrpAdmin}
                value={creategrpAdmin}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} sm={12}>
          <div className="group-content">Add members to your group <span className="mandatory-color">*</span></div>
          <div className="add-batches">
            <TableTransfer
              dataSource={(grpDetail)? editunassignedAnalystQa.filter((e)=>( creategrpAdmin.value !== e.key)) : mockData.filter((e)=>( creategrpAdmin.value !== e.key))}
              targetKeys={usertargetKeys}
              disabled={isdisableduser}
              onChange={onChangeTransfer}
              leftColumns={leftTableColumns}
              rightColumns={rightTableColumns}
            />
          </div>
        </Col>
      </Row>
    </Container>
 );  

// create group ends here ***


// batch assiginment
  const batchAssignments = () => (
    <div>
     
      <div className="group-content">Add batches to your groups</div>
      <div className="add-member">
        <TableTransferbatch
              dataSource={(batchlistwise)? batchlistwise  : batchmock }
              targetKeys={targetKeys}
              onChange={onChangebatchTransfer}
              leftColumnsbatch={LeftTableColumns}
              rightColumnsbatch={RightTableColumns}
              pagination
            />
      </div>
    </div>
  );
 
  // status assignments
  const statusAssignments = () => (
    <div className="status-assign">
      <Result
        status="success"
        title= {result}
      />
    </div>
  );
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Group Assignment" />
        <div className="container-main">
          <Row>
            <Col lg={12}>
              <Card className="grp-pad">
              {(userDataLoading.isLoading || isGroupByidLoading.isLoading || batchDataLoading.isLoading || isGroupCreatedLoading.isLoading )?<PageLoader /> :
                <Container>
                  <Row>
                    <Col lg={3} sm={12}>
                      { grpNamedisplay && 
                      <div className="display-grpname"> 
                        <Tag className="grpname-prop" icon={<IdcardFilled />} >
                            {grpNamedisplay}
                        </Tag>
                      </div>
                      }
                      <div className="stepper-outer">
                        <Steps current={current} direction="vertical">
                          {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                          ))}
                        </Steps>
                      </div>
                    </Col>
                    <Col lg={9} sm={12} className="assignment-box">
                      <Row>
                        <Col lg={12} sm={12} >
                        
                     
                          {current ===0 && GroupCreation()}
                          {current === 1 && batchAssignments()}
                          {current === steps.length - 1 && statusAssignments()}
                        

                        </Col>
                        <Col lg={12}>
                       
                          <div className="btn-assignment">
                            {current === 0 && (
                              <Button type="primary" onClick={() => createGroup()}>
                                Next
                              </Button>
                            )}
                            {current === 1 && (
                              <Button type="primary" onClick={() => next()}>
                                Submit
                              </Button>
                            )}
                            {current === 2 && (
                              <Button type="primary" onClick={() => onHandledone()}>
                                Done
                              </Button>
                            )}
                            {current === 1   && (
                              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Previous
                              </Button>
                            )}
                          </div>
                        </Col>
                      </Row>
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
  );
};

export default Groups;
