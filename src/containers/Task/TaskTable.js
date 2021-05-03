/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TaskTable = (props) => {
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
    { id: 'status', label: 'Status', align: 'center', minWidth: 100 },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
    },
  ];

  console.log(props.data,"jjj");
  // const tablePopulate = (tableData) => tableData.map(({ taskId, data }) => data.map(( x ) => ({
  //   dpCode: x.dpCode, fiscalYear: x.fiscalYear, status: x.status, action: <Link to={`/pendingtasks/${taskId}/${x.dpCode}`}>Enter Data</Link>,
  // })));

  const tablePopulate = ({ taskId, data }) => data.map(( x ) => ({
    dpCode: x.dpCode, fiscalYear: x.fiscalYear, status: x.status, action: <Link to={`/pendingtasks/${taskId}/${x.dpCode}`}>Enter Data</Link>,
  }));

  const rows = tablePopulate(props.data);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchQuery, setSearchQuery] = useState(null);

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handlesSearch = (event) => {
    const searchedQuery = event.currentTarget.value;
    setSearchQuery(searchedQuery);
  };

  const searcher = (rowdata, coldata, searchedQuery) => {
    const columnsList = (coldata.map((eachColData) => ((eachColData.id === 'dpCode') ? (eachColData.id) : (null)))).filter((eachColData) => (eachColData !== null));
    return (
      rowdata.filter((eachRowData) => {
        for (let i = 0; i < columnsList.length; i += 1) {
          if ((eachRowData[columnsList[i]].toLowerCase()).includes(searchedQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      })
    );
  };

  return (
    <Paper className={classes.root}>
      <div className="task-table-label-search-wrap">
        <div className="task-table-label">
          Pending Dp Codes
        </div>
        <ThemeProvider theme={theme}>
          <TextField
            placeholder="search"
            style={{ padding: '20px' }}
            onChange={handlesSearch}
            autoComplete="off"
            value={searchQuery}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch} />
                </InputAdornment>
              ),
            }}
          />
        </ThemeProvider>
      </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, borderTop: '1px solid rgba(224, 224, 224, 1)' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {((searchQuery) ? (searcher(rows, columns, searchQuery)) : (rows)).slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row) => (
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
