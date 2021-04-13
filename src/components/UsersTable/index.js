import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { dodgerBlue } from '@material-ui/core/colors';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';

// SUB-FUNCTIONAL COMPONENT
const ColumnsHead = (props) => {
  const {
    sortOrder, orderBy, columnsHeadData, onRequestSort,
  } = props;
  const onSortClickHandler = (event, id, dataType) => {
    onRequestSort(event, id, dataType);
  };
  return (
    <TableHead>
      <TableRow>
        {columnsHeadData.map((headData) => (
          headData.dataType !== 'element' ? (
            <TableCell
              key={headData.id}
              align={headData.align}
              sortDirection={orderBy === headData.id ? sortOrder : false}
              className="users-table-column-cell"
            >
              <TableSortLabel
                active={orderBy === headData.id}
                direction={orderBy === headData.id ? sortOrder : 'asc'}
                className="users-table-column-cell"
                onClick={(event) => (onSortClickHandler(event, headData.id, headData.dataType))}
              >
                {headData.label}
              </TableSortLabel>
            </TableCell>) :
            (
              <TableCell
                key={headData.id}
                align={headData.align}
                className="users-table-column-cell"
              >
                {headData.label}
              </TableCell>
            )
        ))}
      </TableRow>
    </TableHead>
  );
};

ColumnsHead.propTypes = {
  sortOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string,
  columnsHeadData: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

const UsersTable = ({ tableData }) => {
  const { rowsData, columnsHeadData, tableLabel } = tableData;
  console.log(tableData);
  // CONSTANTS
  const DEFAULT_SORT_ORDER = 'asc';
  const DEFAULT_ORDER_BY = null;
  const DEFAULT_PAGE = 0;
  const DEFAULT_ROWS_PER_PAGE = 5;
  const { RangePicker } = DatePicker;

  // STATES
  const [sortDataType, setSortDataType] = useState('string');
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowsData.length - (page * rowsPerPage));
  console.log(emptyRows, 'empty Rows');

  // HELPER FUNCTIONS
  const dataSorter = (array, camparator) => {
    const sortData = array.map((row, index) => [row, index]);
    sortData.sort((a, b) => {
      const order = camparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    console.log(sortData);
    return sortData.map((list) => list[0]);
  };

  const getComparator = (order, ofOrderBy) => (
    order === 'desc'
      ? (a, b) => descendingComparator(a, b, ofOrderBy)
      : (a, b) => -descendingComparator(a, b, ofOrderBy)
  );

  const descendingComparator = (a, b, ofOrderBy) => {
    if (sortDataType === 'date') {
      if (new Date(b[ofOrderBy]) < new Date(a[ofOrderBy])) {
        return -1;
      }
      if (new Date(b[ofOrderBy]) > new Date(a[ofOrderBy])) {
        return 1;
      }
    } else {
      if (b[ofOrderBy] < a[ofOrderBy]) {
        return -1;
      }
      if (b[ofOrderBy] > a[ofOrderBy]) {
        return 1;
      }
    }
    return 0;
  };

  // FUNCTIONS
  const handleRequestSort = (event, id, dataType) => {
    const isAsc = orderBy === id && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
    setSortDataType(dataType);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlesSearch = (event) => {
    const searchedQuery = event.currentTarget.value;
    setSearchQuery(searchedQuery);
  };

  const searcher = (rowdata, coldata, searchedQuery) => {
    const columnsList = (coldata.map((eachColData) => ((eachColData.dataType === 'string' || eachColData.dataType === 'date') ? (eachColData.id) : (null)))).filter((eachColData) => (eachColData !== null));
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
    <div>
      <Paper className="users-table-paper">
        <TableContainer>
          <div
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '600px',
            }}
          >
            <div className="users-table-label">
              {tableLabel}
            </div>
            <Space direction="vertical" size={12}>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
              />
            </Space>
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
          <Table className="users-table">
            <ColumnsHead
              sortOrder={sortOrder}
              orderBy={orderBy}
              columnsHeadData={columnsHeadData}
              onRequestSort={handleRequestSort}
            >
            </ColumnsHead>
            <TableBody>
              {dataSorter((searchQuery) ? (searcher(rowsData, columnsHeadData, searchQuery)) : (rowsData), getComparator(sortOrder, orderBy))
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .map((eachRow) => {
                  console.log(eachRow);
                  const cellArray = Object.keys(eachRow).map((key) => {
                    let cellColumnData;
                    if (key !== 'id') {
                      [cellColumnData] = columnsHeadData.filter((column) => (key === column.id));
                      console.log(cellColumnData);
                    }
                    return (
                      <TableCell key={key} className="users-table-row-cell" hidden={key === 'id'} align={cellColumnData ? cellColumnData.align : 'left'}>{eachRow[key]}</TableCell>
                    );
                  });
                  console.log(cellArray);
                  return (
                    <TableRow
                      hover={false}
                      key={eachRow.id}
                      onClick={null}
                    >
                      {cellArray}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={columnsHeadData.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

UsersTable.propTypes = {
  tableData: PropTypes.object.isRequired,
};

export default UsersTable;
