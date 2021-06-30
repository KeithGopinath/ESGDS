/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { Transfer, Steps, message, Button, Result, Divider, Tabs, Tag, Table } from 'antd';
import difference from 'lodash/difference';
import {
  IdcardFilled,
  MessageOutlined,
  ExceptionOutlined
} from '@ant-design/icons';
import Select from 'react-select';
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
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedmember, setselectedmember] = useState('');
  const [grpNamedisplay, setgrpName]= useState(null);
  const [baseformat, setbaseformat] = useState([]);
  // create group states
  const [creategrpName, setcreateGrpName] = useState('');
  const [creategrpAdmin, setcreateGrpAdmin] = useState('');
  const [creategrplist, setcreateGrpList] = useState([]);
  const [inputValidate, setInputValidate] = useState(false);
  const [usertargetKeys, setuserTargetKeys] = React.useState([]);
  const sideBarRef = useRef();
  const { Step } = Steps;
  const { TabPane } = Tabs;
  const steps = [
    {
      title:'Create group',
    },
    {
      title: 'Batch Assignment',
    },
    {
      title: 'Pillar Assignment',
    },
    {
      title: 'Status',
    },
  ];
  const batches = [
    { taxonomy: 'acute1', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch1', batchId: 'id1', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute2', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch2', batchId: 'id2', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute3', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch3', batchId: 'id3', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute1', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch4', batchId: 'id4', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute2', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch5', batchId: 'id5', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute3', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch6', batchId: 'id6', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute3', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch7', batchId: 'id7', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute1', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch8', batchId: 'id8', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute2', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch9', batchId: 'id9', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute3', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch10', batchId: 'id10', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute1', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch11', batchId: 'id11', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute3', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch12', batchId: 'id12', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
    { taxonomy: 'acute2', years: [{ value: '2015-2016', label: '2016-2017' }], batchName: 'batch13', batchId: 'id13', companies: [{ id: '453d', selectedCompany: 'oiland gas' }] },
  ];
  // const groups = [
  //   { grpName: 'group1', grpID: 'grpID1', grpAdmin: { value: '345fg4', label: 'gopi' }, grpMembers: [{label: 'balaji balaji balaji', value:'34ds'}, {label: 'gopi', value:'12ds'}, {label: 'praveen', value:'3544ds'},{label: 'praveen1', value:'35fg44ds'},{label: 'praveen2', value:'3fh544ds'},{label: 'praveen3', value:'gby3544ds'},{label: 'praveen4', value:'3544gfds'},{label: 'praveen5', value:'3544gbds'},{label: 'prgfaveen6', value:'vbg3544ds'},{label: 'praveen7', value:'3544dbgs'},{label: 'praveen8', value:'3544dsgf'},{label: 'praveen9', value:'3544ds45'}] },
  //   { grpName: 'group2', grpID: 'grpID2', grpAdmin: { value: '345fg4', label: 'vj' }, grpMembers: [{label: 'rajesh', value:'d44ds'}, {label: 'jerin', value:'5g4ds'}, {label: 'vj', value:'634ds'}] },
  //   { grpName: 'group3', grpID: 'grpID3', grpAdmin: { value: '345fg4', label: 'rajesh' }, grpMembers: [{label: 'ramnath Iyer', value:'32dssd'}, {label: 'raj', value:'34dds'}] },

  // ];
  const tax = [
    { taxName: 'acute1', pillars: [{ value: 'env_id', label: 'environment' }, { value: 'social_id', label: 'social' }, { value: 'gov_id', label: 'governance' }] },
    { taxName: 'acute2', pillars: [{ value: 'pillar_env', label: 'environment' }, { value: 'social_id', label: 'social' }, { value: 'gov_id', label: 'governance' }, { value: 'x_id', label: 'pillarX' }, { value: 'y_id', label: 'pillarY' }] },
    { taxName: 'acute3', pillars: [{ value: 'z_id', label: 'pillarZ' }] },
  ];
  // create group json
  const groupAdminOptions = [
    { value: 'Praveen', label: 'Praveen' },
    { value: 'Vaijanthi', label: 'Vaijanthi' },
    { value: 'Gopi', label: 'Gopi' },
    { value: 'Rajesh', label: 'Rajesh' },
    { value: 'Balaji', label: 'Balaji' },
  ];

  const userwithRoles = [
    {
      userDetail: { value: '24dgdsf4', label: 'user1' },
      roleDetails: {
        primaryRole: { value: 'dfgvsf4', label: 'analyst' },
        secRole: [
          { value: 'dfgvsf4', label: 'qa' },
          { value: 'dfgvsf4', label: 'emp' },
        ],
      },
    },
    {
      userDetail: { value: '24dgdsfse', label: 'user2' },
      roleDetails: {
        primaryRole: { value: 'dfgvsf4', label: 'analyst' },
        secRole: [
          { value: 'dfgvsf4', label: 'qa' },
          { value: 'dfgvsf4', label: 'emp' },
        ],
      },
    },
    {
      userDetail: { value: '24dgdsfasdeg', label: 'user3' },
      roleDetails: {
        primaryRole: { value: 'dfgvsf4', label: 'analyst' },
        secRole: [
          { value: 'dfgvsf4', label: 'qa' },
          { value: 'dfgvsf4', label: 'emp' },
        ],
      },
    },
  ];

  // *** batch assignments starts ***
 
  const onChangebatchTransfer = (newTargetKeys) => {
    console.log(newTargetKeys, 'newTargetKeys')
    setTargetKeys(newTargetKeys);
  };

  const next = () => {
    const batcharr = [];
    const final = [];
    if ((targetKeys.length) > 0) {
      for (const i of targetKeys) {
        for (const j of batches) {
          if (i === j.batchId) {
            batcharr.push(j, ...j);
          }
        }
      }
      
  const memberList = creategrplist.members.map((memberinfo) => {
    const Mtemp = { name: memberinfo.userDetail.label, pillars : [
            {
              type : 'primary',
              pillar: null,
            },
            // {
            //   type : 'secondary',
            //   pillar: null,
            // }
          ] 
        };
        return Mtemp;
      });
      
  const BaseArr = batcharr.map((obj)=>{
        
    const base = {id: obj.batchId, batchName:obj.batchName ,years: obj.years, companies: obj.companies, taxonomyName:obj.taxonomy, pillarOptions:null, members : memberList };
        return base;
      });
      BaseArr && BaseArr.map((e)=>{
        for (const iterator of tax) {
          if(e.taxonomyName === iterator.taxName){
            final.push({...e, pillarOptions: iterator.pillars});
          }
        }
      });
      console.log(final, 'final');
  const finalArr = creategrplist && { grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: final };
      setassignment(finalArr);
      
      
      setbaseformat(final);
      
      setCurrent(current + 1);
    }
    else{
      const finalArr = creategrplist && { grpName: creategrplist.groupName, grpAdmin: creategrplist.groupAdmin, grpMembers: creategrplist.members, assignedBatches: [] };
      setassignment(finalArr);
      setCurrent(current + 1);
    }
  };

 // batch assignments ends **** 

// *** pillar assignments starts here ***

  const onclickDD = (batchName,memName) => {
    console.log(batchName,memName, 'batchName,memName');
   setselectedmember(memName);
   setSelectedBatch(batchName);
  }

  const onPrimaryRoleChange = (args) => {
    console.log(args, 'primary role');
    if(args){
      // console.log(Array.isArray(args), 'checking arg');
        // const pillarType = (Array.isArray(args) === true) ?'secondary':'primary';
        // const addarg = (Array.isArray(args) === true) ? {{ value: arg.},{}} :args;
  
      console.log(selectedBatch, 'selectedBatch onchange');
      console.log(selectedmember, 'selectedmember onchange');
      console.log(baseformat, 'onchange');
        
    const base =baseformat && baseformat.map((e) => {
        if(e.batchName === selectedBatch){
            const z = e.members.map((d) => {
                if(d.name === selectedmember){
                    const c = d.pillars.map((q) => {
                        if(q.type === 'primary'){
                            const o = { ...q, pillar: args };
                            return o;
                        }
                      
                      return q;
                    });
                    return { name: d.name, pillars: c };
                }
                return d;
            });
            return { id: e.id, batchName:e.batchName, taxonomyName:e.taxonomyName, pillarOptions:e.pillarOptions, members: z };
        }
        return e;
    });
      setbaseformat(base);
    }
  
  };

  const getValidate = (data) => {
    const valid= [];
    for (const i of data) {
      for (const j of i.pillars) {
        if(j.type === 'primary'){
          if(j.pillar === null){
            valid.push(j);
          }
        }
        
      }
      
    }
    console.log(valid, 'valid');
    console.log(valid.length === 0);
    return (valid.length === 0);
    
   
  }
  const getvaldd = (memobj, name) =>{
    const getvalue =[];
    console.log(memobj, name, 'getvaldd')
    for (const i of memobj) {
      if(i.name === name){
        for (const j of i.pillars) {
          if(j.type === 'primary'){
            if(j.pillar !== null){
            getvalue.push(j);
            }
          }
        }
      }
      
    }
    // setprimaryDDvalue(getvalue);
    
      console.log(getvalue[0], 'getvalue');
    return getvalue[0];
  }
  // const getvalSecdd = (memobj, name) =>{
  //   const getvaluesec =[];
  //   console.log(memobj, name, 'getvaldd')
  //   for (const i of memobj) {
  //     if(i.name === name){
  //       for (const j of i.pillars) {
  //         if(j.type === 'secondary'){
  //           if(j.pillar !== null){
  //             getvaluesec.push(j);
  //           }
  //         }
  //       }
  //     }
      
  //   }
  //   // setprimaryDDvalue(getvalue);
    
  //     console.log(getvaluesec[0], 'getvalue');
    

    
  //   return getvaluesec;
  // }
  // iterating member row
  const memberRow = baseformat && baseformat.map((row,i)=>(
    
      
      <TabPane tab={<span style={{ color: getValidate(row.members)? 'green':'#1890ff'}}  >{row.batchName}</span>} key={i} className="pillar-assign-box">
      <div className="row-header">
        <div style={{ width: '25%', display:'flex' }}>Members</div>
        <div style={{ width: '37%', marginRight: '1rem' }}>Primary pillar</div>
        {/* <div style={{ width: '37%' }}>Optional pillar</div> */}
      </div>
      <Divider  className="divide" ></Divider>
      {/* <Divider orientation="right"><Tag color='processing' style={{margin:'0px', fontSize:'1.5rem', padding:'7px 7px 7px 7px'}}>{row.batchName}</Tag></Divider> */}
      { row.members.map((mem)=>(

        <div className="row-pillar">
              <div style={{ width: '25%', display:'flex', color:'#04385a', alignItems:'center',fontWeight:'450' }}><div>{mem.name}</div></div>
              <div style={{ width: '37%', marginRight: '1rem' }} onClick={()=>onclickDD(row.batchName,mem.name)}>
                <Select
                  onChange = {onPrimaryRoleChange}
                  options={row.pillarOptions}
                  placeholder="primary pillar"
                  value={(getvaldd(row.members, mem.name)) ? (getvaldd(row.members, mem.name).pillar) : 'primary pillar'}
                />
              </div>
              
              {/* <div style={{ width: '37%' }} onClick={()=>onclickDD(row.batchName,mem.name)}>
                <Select
                  isMulti
                  onChange = {onPrimaryRoleChange}
                  options={row.pillarOptions.filter((e) => { 
                     return e.label !== (mem.pillars[0].pillar && mem.pillars[0].pillar.label)} )}
                  placeholder="(optional)"
                  isDisabled={(mem.pillars[0].pillar)? false: true}
                  value = {(getvalSecdd(row.members, mem.name)) ? (getvalSecdd(row.members, mem.name).pillar) : '(optional)'  }
                  
                />
              </div> */}
          </div>
        ))}
         </TabPane>
         
      
   
  ));
  // pillar assignment ends here ***

  
  // commom button
  const prev = () => {
  
    setCurrent(current - 1);
  };
  const onHandledone = () => {
    console.log(baseformat , 'baseformat done');
    setcreateGrpAdmin('');
    setselectedmember('');
    setSelectedBatch('');
    setcreateGrpName('');
    setuserTargetKeys([]);
    setbaseformat([]);
    setgrpName(null);
    setTargetKeys([]);
    setCurrent(0);
  }
  const onHandleassign = () => {
    console.log(assignment, 'assignment handleassign');
    if(assignment && assignment.assignedBatches.length > 0){
    console.log(current, 'stepper');
    console.log(baseformat, 'onHandleassign');
    const nullObj=[];
    for (const i of baseformat) {
      for (const j of i.members) {
        for (const k of j.pillars) {
          if(k.type === 'primary'){
            if(k.pillar === null){
              nullObj.push(k);
            }
          }
        }
      }
    }
    if(nullObj.length === 0){
      const finalpayload = {...assignment, assignedBatches : baseformat}
      console.log(finalpayload , 'finalpayload')
      setCurrent(current + 1);
      
    }
    else {
      message.error("Assign Pillars for all batches !")
    }
    console.log(nullObj.length, 'nullObj length');
  }
  else{
    setCurrent(current + 1);
  }
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
    for (const i of userwithRoles) {
      for (const j of usertargetKeys) {
        if(i.userDetail.value === j){
          memobj.push(i);
        }
      }
    }
    console.log(memobj, 'memobj');
    if ((creategrpName.length && creategrpAdmin.value.length && usertargetKeys.length) > 0) {
      const grpDetails = { groupName: creategrpName, groupAdmin: creategrpAdmin, members: memobj };
      // const updatedgrplist = [grpDetails, ...grplist];
      setcreateGrpList(grpDetails);
      setgrpName(creategrpName);
      // setGrpCount(grplist.length + 1);
      message.success('Group created sucessfully');
      setCurrent(current + 1);
     
    } else {
      message.error('Fill all the required fields');
      setcreateGrpList([]);
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


  const mockData = userwithRoles.map((obj) => {
    const dumArr = { key: obj.userDetail.value, title: obj.userDetail.label, PRoles: obj.roleDetails.primaryRole.label, SecRole: obj.roleDetails.secRole };
    return dumArr;
  });

  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'PRoles',
      title: 'Primary',
      render: (Primary) => <Tag color="blue">{Primary}</Tag>,
    },
    {
      dataIndex: 'SecRole',
      title: 'Secondary',
      render: (Secondary) => Secondary.map((e) => (<Tag color="cyan">{e.label}</Tag>)),
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
  ];

 
  

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
  const batchlistwise = batches.map((b) => {
    const batchDetail = { key: b.batchId, title: b.batchName, taxonomy:b.taxonomy };
    return batchDetail;
  });

  const onhandelgrpName = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setcreateGrpName(e.target.value);
    }
  };
  const onhandlegrpAdmin = (groupAdmin) => {
    setcreateGrpAdmin(groupAdmin);
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
          <div className="group-content">Group name*</div>
          <div className="form-group group-input-width" ><input type="text" value={creategrpName} className={`form-control ${creategrpName === '' && inputValidate}`} onChange={onhandelgrpName} autoComplete="off" required></input></div>
        </Col>
        <Col lg={6} sm={12}>
          <div className="group-dropdown-width">
            <div className="group-content" >Select Group Admin*</div>
            <div className={creategrpAdmin.length === 0 && inputValidate && 'group-dropdown-alert'}>
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
          <div className="group-content">Add members to your group*</div>
          <div className="add-batches">
            <TableTransfer
              dataSource={mockData}
              targetKeys={usertargetKeys}
              onChange={onChangeTransfer}
              leftColumns={leftTableColumns}
              rightColumns={rightTableColumns}
              pagination
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
              dataSource={batchlistwise}
              targetKeys={targetKeys}
              onChange={onChangebatchTransfer}
              leftColumnsbatch={LeftTableColumns}
              rightColumnsbatch={RightTableColumns}
              pagination
            />
      </div>
    </div>
  );
 

 
  // pillar assignments
  const pillarAssignments = () => (
    <div>
      <Container>
        <Row>
          <Col lg={12}>
            { assignment && assignment.assignedBatches.length > 0 &&
              <Tabs defaultActiveKey="0" >
                  {memberRow}
              </Tabs>
            }
            {assignment && assignment.assignedBatches.length === 0 &&
              <div className= "not-batch-assign-screen">
                <div className = "not-batch-assign-screen-inner">
                  <div className="info-icon-batch"><ExceptionOutlined /></div>
                  <div className="info-text-batch">Batch not assigned!</div>
                </div>
                
              </div>
            }
          </Col>
        </Row>
      </Container>

    </div>
  );
  // status assignments
  const statusAssignments = () => (
    <div className="status-assign">
      <Result
        status="success"
        title="Assigned Successfully!"
      />
    </div>
  );
  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Create Group" />
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
                          {current === 2 && pillarAssignments()}
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
                                Next
                              </Button>
                            )}
                            {current === 2 && (
                              <Button type="primary" onClick={() => onHandleassign()}>
                                Assign
                              </Button>
                            )}
                            {current === 3 && (
                              <Button type="primary" onClick={() => onHandledone()}>
                                Done
                              </Button>
                            )}
                            {(current === 1 || current === 2)  && (
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
