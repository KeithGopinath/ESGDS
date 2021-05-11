/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import UsersTable from '../../components/UsersTable/index';

const TaskTable = (props) => {
  const tablePopulate = ({ taskId, data }) => data.map((x) => ({
    dpCode: x.dpCode, fiscalYear: x.fiscalYear, status: x.status, action: <Link to={`/pendingtasks/${taskId}/${x.dpCode}`}>Enter Data</Link>,
  }));

  const TASK_DATA = {
    rowsData: tablePopulate(props.data),
    columnsHeadData: [
      {
        id: 'dpCode', label: 'DP Code', align: 'left', dataType: 'string',
      },
      {
        id: 'fiscalYear', label: 'Fiscal Year', align: 'left', dataType: 'string',
      },
      {
        id: 'status', label: 'Status', align: 'center', dataType: 'string',
      },
      {
        id: 'action', label: 'Action', align: 'right', dataType: 'element',
      },
    ],
    tableLabel: 'Pending Tasks',
  };

  return (
    <UsersTable tableData={TASK_DATA} />
  );
};

export default TaskTable;
