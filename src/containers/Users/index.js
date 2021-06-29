/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import CustomTable from '../../components/CustomTable';
import { SUPER_ADMIN_APPROVAL_DATA, PERSONAL_DETAILS_UPDATE_DATA } from '../../../src/constants/TableConstants';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { history } from '../../routes';
import UserStatusManage from '../../containers/UserStatusManage';


const personalDetailsUpdateTableData = (props) => {
  const tableRowData = (data) => data.map(({
    name, email, phoneNo, role, requestedAt,
  }, index) => ({
    id: index,
    name,
    email,
    phoneNo,
    role,
    requestedAt: new Date(requestedAt).toDateString(),
    action: <div className="personal-details-action-wrap" > <div className="personal-details-action-details" > View updated details </div><div className="personal-details-action-reject">Reject</div > </div>,
  }));

  return {
    rowsData: tableRowData(props),
    columnsHeadData: [{
      id: 'name',
      align: 'left',
      label: 'Name',
      dataType: 'string',
    },
    {
      id: 'email',
      align: 'left',
      label: 'Email',
      dataType: 'string',
    },
    {
      id: 'phoneNo',
      align: 'left',
      label: 'Phone No',
      dataType: 'string',
    },
    {
      id: 'role',
      align: 'left',
      label: 'Role',
      dataType: 'string',
    },
    {
      id: 'requestedAt',
      align: 'left',
      label: 'Requested At',
      dataType: 'date',
    },
    {
      id: 'action',
      align: 'left',
      label: 'Action',
      dataType: 'element',
    },
    ],
    tableLabel: 'Personal Details Update Request',
  };
};

// const superAdminApprovalTableData = (props) => {
//   const tableRowData = (data) => data.map(({
//     requestedBy, requestedByEmail, requestedFor, requestedForEmail, requestedAt,
//   }, index) => ({
//     id: index,
//     requestedBy,
//     requestedByEmail,
//     requestedFor,
//     requestedForEmail,
//     requestedAt: new Date(requestedAt).toDateString(),
//     action: <div className="super-admin-approval-action-wrap" > <div className="super-admin-approval-action-approve" > Approve </div><div className="super-admin-approval-action-reject">Reject</div > </div>,
//   }));

//   return {
//     rowsData: tableRowData(props),
//     columnsHeadData: [{
//       id: 'requestedBy',
//       align: 'left',
//       label: 'Requested By',
//       dataType: 'string',
//     },
//     {
//       id: 'requestedByEmail',
//       align: 'left',
//       label: 'Email',
//       dataType: 'string',
//     },
//     {
//       id: 'requestedFor',
//       align: 'left',
//       label: 'Requested For',
//       dataType: 'string',
//     },
//     {
//       id: 'requestedForEmail',
//       align: 'left',
//       label: 'Email',
//       dataType: 'string',
//     },
//     {
//       id: 'requestedAt',
//       align: 'left',
//       label: 'Requested At',
//       dataType: 'date',
//     },
//     {
//       id: 'action',
//       align: 'left',
//       label: 'Action',
//       dataType: 'element',
//     },
//     ],
//     tableLabel: 'Super Admin Approval Request',
//   };
// };


// const APPROVED_USERS_DATA = [{
//   name: 'Balaji',
//   email: 'balaji@gmail.com',
//   role: 'Analyst',
//   registeredDate: '5-13-2020',
// }];



const Users = () => {
  const sideBarRef = useRef();
  const [show, setShow] = useState(false);
  const [tabFlag, setTabFlag] = useState();
  const [userID, setUserID] = useState('');
  const [decision, setDecision] = useState('');

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.filterUsers.filterUsers);
  const filteredUsers = userData && userData.data;

  useEffect(() => {
    tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
    setTabFlag('Pending Users')
  }, []);

  useEffect(() => {
    if (tabFlag == 'Pending Users') {
      const payload = { filters: [{ filterWith: "isUserApproved", value: false }] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    } else if (tabFlag == 'Approved Users') {
      const payload = { filters: [{ filterWith: "isUserApproved", value: true }] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    }
  }, [tabFlag]);

  const pendingUsersTableData = (props) => {
    const tableRowData = (data) => data.map((data) => ({
      name: data.userDetails.label,
      email: data.email,
      type: data.userType,
      registeredDate: new Date(data.createdAt).toDateString(),
      viewDetails: <FontAwesomeIcon icon={faEye} size="lg" className="taxonomy-subset-icons" onClick={() => { onViewUser(data.userDetails.value, data.userType) }} />
    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [{
        id: 'name',
        align: 'center',
        label: 'Name',
        dataType: 'string',
      },
      {
        id: 'email',
        align: 'center',
        label: 'Email',
        dataType: 'string',
      },
      {
        id: 'type',
        align: 'center',
        label: 'Type',
        dataType: 'string',
      },
      {
        id: 'registeredDate',
        align: 'center',
        label: 'Registered Date',
        dataType: 'date',
      },
      {
        id: 'viewDetails',
        align: 'center',
        label: 'View Details',
        dataType: 'element',
      },
      ],
      tableLabel: 'Pending Users',
    };
  };

  const approvedUsersTableData = (props) => {
    const tableRowData = (data) => data.map((data) => ({
      name: data.userDetails.label,
      email: data.email,
      primaryRole: data.roleDetails.primaryRole.label,
      registeredDate: new Date(data.createdAt).toDateString(),
      roleAssigned: data.isRoleAssigned ? 'Assigned' : 'Unassigned',
      groupAssigned: data.isAssignedToGroup ? 'Assigned' : 'Unassigned',
      status: <Button onClick={() => { handleShow(data.userDetails.value, data.status) }}
        className={data.status ? 'user-status-active-button' : 'user-status-inactive-button'}>
        {data.status ? 'Active User' : 'Inactive User'}</Button>
    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [{
        id: 'name',
        align: 'center',
        label: 'Name',
        dataType: 'string',
      },
      {
        id: 'email',
        align: 'center',
        label: 'Email',
        dataType: 'string',
      },
      {
        id: 'primaryRole',
        align: 'center',
        label: 'Primary Role',
        dataType: 'string',
      },
      {
        id: 'registeredDate',
        align: 'center',
        label: 'Registered Date',
        dataType: 'date',
      },
      {
        id: 'roleAssigned',
        align: 'center',
        label: 'Group Assigned',
        dataType: 'string',
      },
      {
        id: 'groupAssigned',
        align: 'center',
        label: 'Role Assigned',
        dataType: 'string',
      },
      {
        id: 'status',
        align: 'center',
        label: 'Status',
        dataType: 'element',
      },
      ],
      tableLabel: 'Approved Users',
    };
  };

  const rejectedUsersTableData = (props) => {
    const tableRowData = (data) => data.map((data) => ({
      name: data.name,
      email: data.email,
      type: data.type,
      registeredDate: new Date(data.registeredDate).toDateString(),
    }));
    return {
      rowsData: tableRowData(props),
      columnsHeadData: [{
        id: 'name',
        align: 'center',
        label: 'Name',
        dataType: 'string',
      },
      {
        id: 'email',
        align: 'center',
        label: 'Email',
        dataType: 'string',
      },
      {
        id: 'type',
        align: 'center',
        label: 'Type',
        dataType: 'string',
      },
      {
        id: 'registeredDate',
        align: 'center',
        label: 'Registered Date',
        dataType: 'date',
      },
      ],
      tableLabel: 'Rejected Users',
    };
  };

  const rejectedUsersData = [
    {
      name: 'Balaji',
      email: 'blaji@gmail.com',
      type: 'Employee',
      registeredDate: '5-13-2020'
    }
  ]


  const onViewUser = (id, userType) => {
    const userDetails = { id, userType }
    history.push({ pathname: '/user-view', state: userDetails });
  }

  const tabLabelSets = [
    { label: 'Pending Users' },
    { label: 'Approved Users' },
    { label: 'Rejected Users' },
    { label: 'Personal details update' },
  ];

  const tabsRefs = useRef(tabLabelSets.map(() => React.createRef()));

  const tabsClickHandler = (event, label) => {
    tabsRefs.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const target = event.currentTarget;
    target.classList.add('tabs-label-count-wrap-active');
    setTabFlag(label)
  };

  const handleShow = (id, status) => {
    setUserID(id);
    setShow(true);
    status ? setDecision('archive') : setDecision('active')
  }

  const handleClose = () => {
    setShow(false)
  }

  const tableData = userData ? (tabFlag == "Pending Users" ? pendingUsersTableData(filteredUsers) : tabFlag == "Approved Users" ? approvedUsersTableData(filteredUsers) : tabFlag == "Rejected Users" ? rejectedUsersTableData(rejectedUsersData) : personalDetailsUpdateTableData(PERSONAL_DETAILS_UPDATE_DATA)) : pendingUsersTableData([])

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Users" show />
        <div className="container-main">
          <div className="users-tabs-stack">
            {tabLabelSets.map(({ label, value }, index) => (
              <div key={label} ref={tabsRefs.current[index]} onClick={(event) => (tabsClickHandler(event, label))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div>
            <CustomTable tableData={tableData} showDatePicker />
            <UserStatusManage show={show} handleClose={handleClose} decision={decision} userID={userID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
