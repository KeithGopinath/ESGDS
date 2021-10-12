/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import CustomTable from '../../components/CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const ManageUsers = () => {
  const sideBarRef = useRef();

  const personalDetailsUpdateTableData = (props) => {
    const tableRowData = (data) => data.map((data,index) => ({
      key: index,
      name: data.name,
      email: data.email,
      phoneNo: data.phoneNo,
      type: data.type,
      primaryRole: data.primaryRole,
      requestedDate: moment(data.requestedAt).format('DD/MM/YYYY') || new Date(data.requestedAt).toDateString(),
      viewDetails: <FontAwesomeIcon icon={faEye} size="lg" className="taxonomy-subset-icons"/>
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
        id: 'phoneNo',
        align: 'center',
        label: 'Phone No',
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
        id: 'requestedDate',
        align: 'center',
        label: 'Requested Date',
        dataType: 'date',
      },
      {
        id: 'viewDetails',
        align: 'center',
        label: 'View Details',
        dataType: 'element',
      },
      ],
      tableLabel: 'Personal Details Update Request',
    };
  };

  const PERSONAL_DETAILS_UPDATE_DATA = [
    {
    name: 'Balaji',
    email: 'balaji@gmail.com',
    phoneNo: '9495540770',
    type: 'Employee',
    primaryRole: 'Group Admin',
    requestedAt: 'Tue Aug 17 2021',
  },
  {
    name: 'Praveen Kumar',
    email: 'Pk@gmail.com',
    phoneNo: '8787667789',
    type: 'Company Representative',
    primaryRole: 'NA',
    requestedAt: 'Fri March 10 2021',
  },
  {
    name: 'Jerin VS',
    email: 'jerry@gmail.com',
    phoneNo: '87873456789',
    type: 'Client Representative',
    primaryRole: 'NA',
    requestedAt: 'Wed Jan 18 2021',
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
