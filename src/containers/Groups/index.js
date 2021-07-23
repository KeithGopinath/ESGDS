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
import SideMenuBar from '../../components/SideMenuBar';



const Groups = () => {
  const [targetKeys, setTargetKeys] = React.useState([]);
  const [current, setCurrent] = React.useState(0);
  const [assignment, setassignment] = useState(null);
  const [grpNamedisplay, setgrpName]= useState(null);
  const [result, setresult]=useState('');
  // create group states
  const [creategrpName, setcreateGrpName] = useState('');
  const [creategrpAdmin, setcreateGrpAdmin] = useState('');
  const [creategrplist, setcreateGrpList] = useState([]);
  const [inputValidate, setInputValidate] = useState(false);
  const [usertargetKeys, setuserTargetKeys] = React.useState([]);
  const [isdisableduser, setisdisableduser] = useState(true);
  const sideBarRef = useRef();
  const { Step } = Steps;

  const dispatch = useDispatch();
 
  const steps = [
    {
      title:'Create group',
    },
    {
      title: 'Batch Assignment',
    },
    {
      title: 'Status',
    },
  ];

  // *** API call *** ***
  useEffect(()=>{
    const payload = { 
      filters: [
        { filterWith: "isUserApproved", value: true },
        { filterWith: "isAssignedToGroup", value: false },
        { filterWith: "isRoleAssigned", value: true },
        { filterWith: "isUserActive", value: true },
        { filterWith: "userType", value: "Employee" }
        
      ] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
  },[])
  const isGroupCreated = useSelector((creategroup) => creategroup.creategroup.grouppost);
 
  const batchData = useSelector((unassignedbatchlist) => unassignedbatchlist.unassignedBatch.unassignedbatchdata);
  const batchAssignment = batchData && batchData.rows;
  
  const userData = useSelector((filterUsers) => filterUsers.filterUsers.filterUsers);
  const isData = userData && userData.data;
  useEffect(() => {
    if (isGroupCreated) {
      message.success(isGroupCreated.message);
      setCurrent(current + 1);
    }
    
  }, [isGroupCreated]);
  const grpAdminlist = [];
  const userList = [];
  isData && isData.map((e)=>{
    e.roleDetails.role.map((arg)=>{
      if(arg.label === "GroupAdmin"){
        grpAdminlist.push(e);
      }
    })
  });
  console.log(grpAdminlist, 'grpAdminlist');
  const groupAdminOptions = [];
  grpAdminlist.map((obj)=>{
    groupAdminOptions.push(obj.userDetails);
  });
  console.log(groupAdminOptions, 'groupAdminOptions');
  if(isData){
  for (const i of isData) {
    for (const j of i.roleDetails.role) {
      if(j.label === 'Analyst' || j.label === 'QA'){
        userList.push(i);
        break;
      }
    }
  }
}
 
  console.log(userList, 'userList');
  console.log(userData, 'userData');
  // *** batch assignments starts ***
 
  const onChangebatchTransfer = (newTargetKeys) => {
    console.log(newTargetKeys, 'newTargetKeys')
    setTargetKeys(newTargetKeys);
  };

  const next = () => {
   
    const batcharr = [];
    if ((targetKeys.length) > 0) {
      for (const i of targetKeys) {
        for (const j of batchAssignment) {
          if (i === j._id) {
            batcharr.push(j, ...j);
          }
        }
      }
      
  const finalArr = creategrplist && { grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: batcharr };
      setassignment(finalArr);
      dispatch({ type:"GROUP_CREATE_REQUEST", payload : finalArr });
      const payload = { 
        filters: [
          { filterWith: "isUserApproved", value: true },
          { filterWith: "isAssignedToGroup", value: false },
          { filterWith: "isRoleAssigned", value: true },
          { filterWith: "isUserActive", value: true }
          
        ] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
      setresult('Group has been created with batches');
    }
    else{
      setresult('Group has been created without batches');
      const finalArr = creategrplist && { grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: [] };
      
      dispatch({ type:"GROUP_CREATE_REQUEST", payload : finalArr });
      const payload = { 
        filters: [
          { filterWith: "isUserApproved", value: true },
          { filterWith: "isAssignedToGroup", value: false },
          { filterWith: "isRoleAssigned", value: true },
          { filterWith: "isUserActive", value: true }
          
        ] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
      setassignment(finalArr);
    }
  };

 // batch assignments ends **** 
  // commom button
  const prev = () => {
  
    setCurrent(current - 1);
  };
  const onHandledone = () => {
    dispatch({type:"GROUP_RESET"});
    setcreateGrpAdmin('');
    setcreateGrpName('');
    setuserTargetKeys([]);
    setgrpName(null);
    setTargetKeys([]);
   setisdisableduser(true);
  setCurrent(0);
  }
 

// *** create group starts here ***
const onChangeTransfer = (newTargetKeys) => {
    console.log(newTargetKeys, 'newTargetKeys');
    setuserTargetKeys(newTargetKeys);
  };

  const createGroup = () => {
    const memobj = [];
    if (!creategrpName) {
      setInputValidate('border-danger');
     
    } else if (!creategrpAdmin) {
      setInputValidate(true);
      
    }
    for (const i of userList) {
      for (const j of usertargetKeys) {
        if(i.userDetails.value === j){
          memobj.push(i);
        }
      }
    }
    console.log(memobj, 'memobj');
    if(creategrpAdmin){

      if ((creategrpName.length && usertargetKeys.length && creategrpAdmin.value.length) > 0) {
        const grpDetails = { groupName: creategrpName, groupAdmin: creategrpAdmin, members: memobj };
        // const updatedgrplist = [grpDetails, ...grplist];
        setcreateGrpList(grpDetails);
        setgrpName(creategrpName);
        // setGrpCount(grplist.length + 1);
  
        setCurrent(current + 1);
        dispatch({ type: 'UNASSIGNEDBATCH_REQUEST' });
       
      
      } else {
        message.error('Fill all the required fields');
        setcreateGrpList([]);
      }
    }
    else{
      message.error('Fill all the required fields');
    }  
    console.log(creategrplist, 'grplist');
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
    // {
    //   dataIndex: 'PRoles',
    //   title: 'Primary',
    //   render: (Primary) => <Tag color="blue">{Primary}</Tag>,
    // },
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
  ];


  
  const batchlistwise = batchAssignment && batchAssignment.map((b) => {
    const batchDetail = { key: b._id, title: b.batchName, taxonomy:b.taxonomy.label };
    return batchDetail;
  });
  // console.log(batchlistwise, 'batchlistwise_bala')
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
  ];
 

  const onhandelgrpName = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setcreateGrpName(e.target.value);
    }
  };
  const onhandlegrpAdmin = (groupAdmin) => {
    setcreateGrpAdmin(groupAdmin);
    setisdisableduser(false);
  };


 const GroupCreation = () =>(
    <Container>
      {/* <Row >
        <Col lg={12}>
          <div className="group-detail">
            <div>Group Details</div>
          </div>
        </Col>
      </Row> */}
      <Row>
        <Col lg={6} sm={12}>
          <div className="group-content">Group name <span className="mandatory-color">*</span></div>
          <div className="form-group group-input-width" ><input type="text" value={creategrpName} className={`form-control ${creategrpName === '' && inputValidate}`} onChange={onhandelgrpName} autoComplete="off" required></input></div>
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
              dataSource={mockData.filter((e)=>( creategrpAdmin.value !== e.key))}
              targetKeys={usertargetKeys}
              disabled={isdisableduser}
              onChange={onChangeTransfer}
              leftColumns={leftTableColumns}
              rightColumns={rightTableColumns}
              //pagination
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
              dataSource={(batchlistwise)? batchlistwise : []}
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
                       
                          {/* { alert &&
                            <div style={{ display: 'flex', justifyContent: 'center', color: 'red', marginTop: '2rem' }}>
                              <div>{alert}</div>
                            </div>
                          } */}
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
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Groups;
