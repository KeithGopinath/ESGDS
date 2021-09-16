/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import 'antd/dist/antd.css';
import CustomTable from '../../components/CustomTable';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { history } from '../../routes';
import UserStatusManage from '../../containers/UserStatusManage';

const Users = (props) => {
  const sideBarRef = useRef();
  const [show, setShow] = useState(false);
  const [tabFlag, setTabFlag] = useState();
  const [userID, setUserID] = useState('');
  const [decision, setDecision] = useState('');

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.filterUsers.filterUsers);
  const loading = useSelector((state) => state.filterUsers.isLoading);
  const filteredUsers = userData && userData.data;

  useEffect(() => {
    if (props.location.state == 'approve') {
      tabsRefs.current[1].current.classList.add('tabs-label-count-wrap-active');
      setTabFlag('Approved Users')
    } else if (props.location.state == 'reject') {
      tabsRefs.current[2].current.classList.add('tabs-label-count-wrap-active');
      setTabFlag('Rejected Users')
    } else {
      tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
      setTabFlag('Pending Users')
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'FILTER_USERS_RESET' });
    if (tabFlag == 'Pending Users') {
      const payload = { filters: [{ filterWith: "isUserApproved", value: false }, { filterWith: "isUserRejected", value: false }] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    } else if (tabFlag == 'Approved Users') {
      const payload = { filters: [{ filterWith: "isUserApproved", value: true }] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    } else if (tabFlag == 'Rejected Users') {
      const payload = { filters: [{ filterWith: "isUserRejected", value: true }] }
      dispatch({ type: 'FILTER_USERS_REQUEST', payload });
    }
  }, [tabFlag]);

  const pendingUsersTableData = (props) => {
    const tableRowData = (data) => data.map((data) => ({
      key: data.userDetails.value,
      name: data.userDetails.label,
      email: data.email,
      type: data.userType,
      registeredDate: new Date(data.createdAt).toDateString(),
      viewDetails: <FontAwesomeIcon icon={faEye} size="lg" className="taxonomy-subset-icons" onClick={() => { onViewUser(data.userDetails.value) }} />
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
      key: data.userDetails.value,
      name: data.userDetails.label,
      email: data.email,
      type: data.userType,
      primaryRole: data.userType == 'Employee' ? (data.roleDetails.primaryRole.label ? data.roleDetails.primaryRole.label : "NA") : "NA",
      roleAssigned: data.userType == 'Employee' ? (data.isRoleAssigned ? 'Assigned' : 'Unassigned') : "NA",
      groupAssigned: data.userType == 'Employee' ? (data.isAssignedToGroup ? 'Assigned' : 'Unassigned') : "NA",
      registeredDate: new Date(data.createdAt).toDateString(),
      status: data.isUserActive ? "Active" : "Inactive",
      action: <FontAwesomeIcon icon={faUser} size="lg" onClick={() => { handleShow(data.userDetails.value, data.isUserActive) }} className={data.isUserActive ? "user-active-icon" : "user-inactive-icon"} />
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
        id: 'primaryRole',
        align: 'center',
        label: 'Primary Role',
        dataType: 'string',
      },
      {
        id: 'roleAssigned',
        align: 'center',
        label: 'Role Assigned',
        dataType: 'string',
      },
      {
        id: 'groupAssigned',
        align: 'center',
        label: 'Group Assigned',
        dataType: 'string',
      },
      {
        id: 'registeredDate',
        align: 'center',
        label: 'Registered Date',
        dataType: 'date',
      },
      {
        id: 'status',
        align: 'center',
        label: 'Status',
        dataType: 'string',
      },
      {
        id: 'action',
        align: 'center',
        label: 'Action',
        dataType: 'element',
      },
      ],
      tableLabel: 'Approved Users',
    };
  };

  const rejectedUsersTableData = (props) => {
    const tableRowData = (data) => data.map((data) => ({
      key: data.userDetails.value,
      name: data.userDetails.label,
      email: data.email,
      type: data.userType,
      registeredDate: new Date(data.createdAt).toDateString(),
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

  const onViewUser = (userId) => {
    dispatch({ type: 'USER_BY_ID_REQUEST', userId });
    history.push({ pathname: '/user-view' });
  }

  const tabLabelSets = [
    { label: 'Pending Users' },
    { label: 'Approved Users' },
    { label: 'Rejected Users' },
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
    const userTab = label;
    dispatch({ type: 'USER_TAB_CHANGE', userTab });
  };

  const handleShow = (id, status) => {
    setUserID(id);
    setShow(true);
    status ? setDecision('archive') : setDecision('active')
  }

  const handleClose = () => {
    setShow(false)
  }

  const tableData = userData ? (tabFlag == "Pending Users" ? pendingUsersTableData(filteredUsers) : tabFlag == "Approved Users" ? approvedUsersTableData(filteredUsers) : tabFlag == "Rejected Users" ? rejectedUsersTableData(filteredUsers) : pendingUsersTableData([])) : pendingUsersTableData([])

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Users" />
        <div className="container-main">
          <div className="users-tabs-stack">
            {tabLabelSets.map(({ label }, index) => (
              <div key={label} ref={tabsRefs.current[index]} onClick={(event) => (tabsClickHandler(event, label))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div>
            <CustomTable tableData={tableData} showDatePicker isLoading={loading} />
            <UserStatusManage show={show} handleClose={handleClose} decision={decision} userID={userID} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
