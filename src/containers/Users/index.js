/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import Dropdown from 'react-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import 'antd/dist/antd.css';
import CustomTable from '../../components/CustomTable';
import { PENDING_USERS_DATA, APPROVED_USERS_DATA, SUPER_ADMIN_APPROVAL_DATA, PERSONAL_DETAILS_UPDATE_DATA } from '../../../src/constants/TableConstants';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';

const PopoverPopupState = () => (
  <PopupState variant="popover" popupId="demo-popup-popover">
    {(popupState) => (
      <div>
        <FontAwesomeIcon {...bindTrigger(popupState)} icon={faEllipsisV} />
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          style={{ marginLeft: '10px', minWidth: '120px' }}
        >
          <div className="pending-users-more-popover">
            <div className="pending-users-more-approve">Approve User</div>
            <div className="pending-users-more-delete">Delete User</div>
          </div>
        </Popover>
      </div>
    )}
  </PopupState>
);

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

const superAdminApprovalTableData = (props) => {
  const tableRowData = (data) => data.map(({
    requestedBy, requestedByEmail, requestedFor, requestedForEmail, requestedAt,
  }, index) => ({
    id: index,
    requestedBy,
    requestedByEmail,
    requestedFor,
    requestedForEmail,
    requestedAt: new Date(requestedAt).toDateString(),
    action: <div className="super-admin-approval-action-wrap" > <div className="super-admin-approval-action-approve" > Approve </div><div className="super-admin-approval-action-reject">Reject</div > </div>,
  }));

  return {
    rowsData: tableRowData(props),
    columnsHeadData: [{
      id: 'requestedBy',
      align: 'left',
      label: 'Requested By',
      dataType: 'string',
    },
    {
      id: 'requestedByEmail',
      align: 'left',
      label: 'Email',
      dataType: 'string',
    },
    {
      id: 'requestedFor',
      align: 'left',
      label: 'Requested For',
      dataType: 'string',
    },
    {
      id: 'requestedForEmail',
      align: 'left',
      label: 'Email',
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
    tableLabel: 'Super Admin Approval Request',
  };
};

const approvedUsersTableData = (props) => {
  const tableRowData = (data) => data.map(({
    name, email, role, registeredDate,
  }, index) => ({
    id: index,
    name,
    email,
    role,
    registeredDate: new Date(registeredDate).toDateString(),
    pillar:
  <Checkbox.Group
    style={{ textAlign: 'start' }}
    options={[
      { value: 'Environment', label: 'E' },
      { value: 'Social', label: 'S' },
      { value: 'Governance', label: 'G' }]}
    defaultValue={['Environment']}
    onChange={null}
  />,
    groupAssigned:
  <div className="approved-users-groupassigned">
    <Dropdown
      menuClassName="groupassigned-dropdown-menu"
      placeholderClassName="groupassigned-dropdown-placeholder"
      controlClassName="groupassigned-dropdown-control"
      options={
        [{
          label: 'Unassigned',
          className: 'label-unassigned',
        }, {
          label: 'Assigned',
          className: 'label-assigned',
        }]
      }
      value="Unassigned"
    />
  </div>,
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
      id: 'role',
      align: 'left',
      label: 'Role',
      dataType: 'string',
    },
    {
      id: 'registeredDate',
      align: 'left',
      label: 'Registered Date',
      dataType: 'date',
    },
    {
      id: 'pillar',
      align: 'center',
      label: 'Pillar',
      dataType: 'element',
    },
    {
      id: 'groupAssigned',
      align: 'center',
      label: 'Group Assigned',
      dataType: 'element',
    },
    ],
    tableLabel: 'Approved Users',
  };
};

const pendingUsersTableData = (props) => {
  const tableRowData = (data) => data.map(({
    name, email, role, registeredDate,
  }, index) => ({
    id: index,
    name,
    email,
    role,
    registeredDate: new Date(registeredDate).toDateString(),
    status: <div className="pending-users-status" > Pending Approval </div>,
    more: PopoverPopupState(),
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
      id: 'role',
      align: 'left',
      label: 'Role',
      dataType: 'string',
    },
    {
      id: 'registeredDate',
      align: 'left',
      label: 'Registered Date',
      dataType: 'date',
    },
    {
      id: 'status',
      align: 'left',
      label: 'Status',
      dataType: 'element',
    },
    {
      id: 'more',
      align: 'left',
      label: 'More',
      dataType: 'element',
    },
    ],
    tableLabel: 'Pending Users',
  };
};


const Users = () => {
  const sideBarRef = useRef();
  const tabLabelSets = [
    { label: 'Pending Users', value: PENDING_USERS_DATA.length, data: pendingUsersTableData(PENDING_USERS_DATA) },
    { label: 'Approved Users', value: APPROVED_USERS_DATA.length, data: approvedUsersTableData(APPROVED_USERS_DATA) },
    { label: 'Super Admin Approval', value: SUPER_ADMIN_APPROVAL_DATA.length, data: superAdminApprovalTableData(SUPER_ADMIN_APPROVAL_DATA) },
    { label: 'Personal details update', value: PERSONAL_DETAILS_UPDATE_DATA.length, data: personalDetailsUpdateTableData(PERSONAL_DETAILS_UPDATE_DATA) },
  ];

  const [tableData, setTableData] = useState(pendingUsersTableData(PENDING_USERS_DATA));

  useEffect(() => {
    defaultTab();
  }, []);

  const tabsRefs = useRef(tabLabelSets.map(() => React.createRef()));

  const defaultTab = () => {
    setTableData(pendingUsersTableData(PENDING_USERS_DATA));
    tabsRefs.current[0].current.classList.add('tabs-label-count-wrap-active');
  };

  const tabsClickHandler = (event, data) => {
    tabsRefs.current.forEach((element) => {
      const target = element.current;
      target.classList.remove('tabs-label-count-wrap-active');
    });
    const target = event.currentTarget;
    target.classList.add('tabs-label-count-wrap-active');
    setTableData(data);
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header title="Users" show />
        <div className="container-main">
          <div className="users-tabs-stack">
            {tabLabelSets.map(({ label, value, data }, index) => (
              <div key={label} ref={tabsRefs.current[index]} onClick={(event) => (tabsClickHandler(event, data))} className="tabs-label-count-wrap">
                <div className="tabs-label">
                  {label}
                </div>
                <div title={value} className="tabs-count-wrap">
                  <div className="tabs-count">{value}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <CustomTable tableData={tableData} showDatePicker />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
