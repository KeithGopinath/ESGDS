/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const TaskTable = () => {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: '2% 0',
      zIndex: 0,
    },
    container: {
      maxHeight: 'none',
    },
  });
  const columns = [
    { id: 'dpCode', label: 'DP Code', minWidth: 170 },
    { id: 'fiscalYear', label: 'Fiscal Year', minWidth: 100 },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
    },
  ];

  const rows = [
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
    {
      dpCode: 'AUDP001', fiscalYear: '2018-2019', action: <Link to="/pendingtasks/0001/AUDP001">Enter Data</Link>,
    },
  ];
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TaskTable;
