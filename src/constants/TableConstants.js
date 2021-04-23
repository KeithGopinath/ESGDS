import React from 'react';
import Dropdown from 'react-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';


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

const PERSONAL_DETAILS_UPDATE_DATA = {
  rowsData: [{
    id: 0,
    name: 'Balaji',
    email: 'balaji@gmail.com',
    phoneNo: '91XXXXXX80',
    role: 'Analyst',
    requestedAt: new Date('5-13-2020').toDateString(),
    action: <div className="personal-details-action-wrap" > <div className="personal-details-action-details" > View updated details </div><div className="personal-details-action-reject">Reject</div > </div>,
  },
  {
    id: 1,
    name: 'Praveen Kumar',
    email: 'Pk@gmail.com',
    phoneNo: '91XXXXXX80',
    role: 'QA',
    requestedAt: new Date('5-18-2020').toDateString(),
    action: <div className="personal-details-action-wrap" > <div className="personal-details-action-details" > View updated details </div><div className="personal-details-action-reject">Reject</div > </div>,
  },
  ],
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

const SUPER_ADMIN_APPROVAL_DATA = {
  rowsData: [{
    id: 0,
    requestedBy: 'Balaji',
    requestedByEmail: 'balaji@gmail.com',
    requestedFor: 'Praveen',
    requestedForEmail: 'praveen@gmail.com',
    requestedAt: new Date('5-13-2020').toDateString(),
    action: <div className="super-admin-approval-action-wrap" > <div className="super-admin-approval-action-approve" > Approve </div><div className="super-admin-approval-action-reject">Reject</div > </div>,
  }, {
    id: 1,
    requestedBy: 'Praveen',
    requestedByEmail: 'Pk@gmail.com',
    requestedFor: 'Avinash',
    requestedForEmail: 'avinash@gmail.com',
    requestedAt: new Date('5-19-2020').toDateString(),
    action: <div className="super-admin-approval-action-wrap" > <div className="super-admin-approval-action-approve" > Approve </div><div className="super-admin-approval-action-reject">Reject</div > </div>,
  }],
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

const APPROVED_USERS_DATA = {
  rowsData: [{
    id: 1,
    name: 'Balaji',
    email: 'balaji@gmail.com',
    role: 'Analyst',
    registeredDate: new Date('5-13-2020').toDateString(),
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
  }],
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
    id: 'groupAssigned',
    align: 'center',
    label: 'Group Assigned',
    dataType: 'element',
  },
  ],
  tableLabel: 'Approved Users',
};

const PENDING_USERS_DATA = {
  rowsData: [{
    id: 0,
    name: 'Balaji',
    email: 'balaji@gmail.com',
    role: 'Analyst',
    registeredDate: new Date('5-13-2020').toDateString(),
    status: <div className="pending-users-status" > Pending Approval </div>,
    more: PopoverPopupState(),
  },
  {
    id: 1,
    name: 'Avinash',
    email: 'avii@gmail.com',
    role: 'Super Admin',
    registeredDate: new Date('5-26-2020').toDateString(),
    status: <div className="pending-users-status" > Pending Approval </div>,
    more: PopoverPopupState(),
  },
  ],
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

export {
  PERSONAL_DETAILS_UPDATE_DATA,
  SUPER_ADMIN_APPROVAL_DATA,
  APPROVED_USERS_DATA,
  PENDING_USERS_DATA,
};
