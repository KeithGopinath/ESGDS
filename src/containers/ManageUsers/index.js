/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';

const ManageUsers = () => {
  const sideBarRef = useRef();

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

  const PERSONAL_DETAILS_UPDATE_DATA = [{
    name: 'Balaji',
    email: 'balaji@gmail.com',
    phoneNo: '91XXXXXX80',
    role: 'Analyst',
    requestedAt: '5-13-2020',
  },
  {
    name: 'Praveen Kumar',
    email: 'Pk@gmail.com',
    phoneNo: '91XXXXXX80',
    role: 'QA',
    requestedAt: '5-18-2020',
  },
  ];

  const tableData = personalDetailsUpdateTableData(PERSONAL_DETAILS_UPDATE_DATA)

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="Manage Users" />
          <div className="container-main">
            <div>
              <CustomTable tableData={tableData} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ManageUsers;
