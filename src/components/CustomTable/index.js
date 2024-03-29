/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Button } from 'react-bootstrap';
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
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useDispatch } from 'react-redux';
import { DatePicker, Space, Result } from 'antd';
import Moment from 'moment';
import PageLoader from '../../components/PageLoader';


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
              className={headData.align === 'left' ? 'users-table-column-cell users-table-column-cell-margin-left' : 'users-table-column-cell'}
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

const CustomTable = ({ 
  tableData, showDatePicker, isLoading, message, icon, defaultNoOfRows, defaultSearchQuery, tabFlagEnable, viewCheckedCompanies, selectItem, disablePageChange, reportsTaxonomy
}) => {
  const { rowsData, columnsHeadData, tableLabel } = tableData;
  // CONSTANTS
  const DEFAULT_SORT_ORDER = 'asc';
  const DEFAULT_ORDER_BY = null;
  const DEFAULT_PAGE = 0;
  const DEFAULT_ROWS_PER_PAGE = defaultNoOfRows || 10;
  const { RangePicker } = DatePicker;

  // STATES
  const [sortDataType, setSortDataType] = useState('string');
  const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [rowsDataForPageCheck, setRowsDataForPageCheck] = useState(rowsData);
  
  useEffect(() => {
    setSortDataType('string');
    setSortOrder(DEFAULT_SORT_ORDER);
    setOrderBy(DEFAULT_ORDER_BY);
    setRowsDataForPageCheck((prevState) => {
      { prevState.length === rowsData.length ? null : setPage(DEFAULT_PAGE) }
      { prevState.length === rowsData.length ? null : setSearchQuery('') }
      return rowsData;
    });
    // { disablePageChange ? null : setPage(DEFAULT_PAGE) }
    // setRowsPerPage(DEFAULT_ROWS_PER_PAGE);
    // { disablePageChange ? null : setSearchQuery('') }
    setSearchDate(null);
  }, [tableData]);

  useEffect(() => {
    setPage(DEFAULT_PAGE);
  }, [searchQuery, reportsTaxonomy]);


  useEffect(() => {
    setSearchQuery(defaultSearchQuery || '');
  }, [defaultSearchQuery]);

  // changes by balaji (for notification)
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        light: '#66cafb',
        main: '#2199c8',
        dark: '#006b97',
      },
    },
  });

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
    return sortData.map((list) => list[0]);
  };

  const getComparator = (order, ofOrderBy) => (
    order === 'desc'
      ? (a, b) => descendingComparator(a, b, ofOrderBy)
      : (a, b) => -descendingComparator(a, b, ofOrderBy)
  );

  const descendingComparator = (a, b, ofOrderBy) => {
    if (sortDataType === 'stringSearchSortElement' && b[ofOrderBy].value && a[ofOrderBy].value) {
      if ((b[ofOrderBy].value).toLowerCase() < (a[ofOrderBy].value).toLowerCase()) {
        return -1;
      }
      if ((b[ofOrderBy].value).toLowerCase() > (a[ofOrderBy].value).toLowerCase()) {
        return 1;
      }
    }
    if (sortDataType === 'date') {
      if (Moment(b[ofOrderBy], 'DD-MM-YYYY') < Moment(a[ofOrderBy], 'DD/MM/YYYY')) {
        return -1;
      }
      if (Moment(b[ofOrderBy], 'DD/MM/YYYY') > Moment(a[ofOrderBy], 'DD/MM/YYYY')) {
        return 1;
      }
    }
    if (sortDataType === 'string' && b[ofOrderBy] && a[ofOrderBy]) {
      if ((b[ofOrderBy]).toLowerCase() < (a[ofOrderBy]).toLowerCase()) {
        return -1;
      }
      if ((b[ofOrderBy]).toLowerCase() > (a[ofOrderBy]).toLowerCase()) {
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
    newpage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    newRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlesSearch = (event) => {
    dispatch({ type: 'NOTIFICATION_RESET' });
    const searchedQuery = event.currentTarget.value;
    setSearchQuery(searchedQuery);
  };

  const onChangeSearchDate = (event) => {
    if (event) {
      setSearchDate({ startDate: event[0], endDate: event[1] });
    } else {
      setSearchDate(null);
    }
  };

  const searcher = (rowdata, coldata, searchedQuery, searchedDate) => {
    const columnsList = (coldata.map((eachColData) => ((eachColData.dataType === 'string' || eachColData.dataType === 'stringSearchSortElement' || eachColData.dataType === 'date') ? ({ id: eachColData.id, dataType: eachColData.dataType }) : (null)))).filter((eachColData) => (eachColData !== null));
    // const dateOnlyColumnsList = (coldata.map((eachColData) => ((eachColData.dataType === 'date') ? (eachColData.id) : (null)))).filter((eachColData) => (eachColData !== null));
    let rowDataToBeReturned;
    if (searchedQuery && searchedDate) {
      const filteredData = rowdata.filter((eachRowData) => {
        for (let i = 0; i < columnsList.length; i += 1) {
          if (columnsList[i].dataType === 'stringSearchSortElement' && (eachRowData[columnsList[i].id].value.toLowerCase()).includes(searchedQuery.toLowerCase())) {
            return true;
          }
          if (columnsList[i].dataType !== 'stringSearchSortElement' && eachRowData[columnsList[i].id] && (eachRowData[columnsList[i].id].toLowerCase()).includes(searchedQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
      rowDataToBeReturned = filteredData.filter((eachRowData) => {
        for (let i = 0; i < columnsList.length; i += 1) {
          if (searchedDate.startDate < Moment(eachRowData[columnsList[i].id], 'DD-MM-YYYY') && Moment(eachRowData[columnsList[i].id], 'DD-MM-YYYY') < searchedDate.endDate) {
            return true;
          }
        }
        return false;
      });
    } else if (searchedDate) {
      rowDataToBeReturned = rowdata.filter((eachRowData) => {
        for (let i = 0; i < columnsList.length; i += 1) {
          if (searchedDate.startDate < Moment(eachRowData[columnsList[i].id], 'DD-MM-YYYY') && Moment(eachRowData[columnsList[i].id], 'DD-MM-YYYY') < searchedDate.endDate) {
            return true;
          }
        }
        return false;
      });
    } else if (searchedQuery) {
      rowDataToBeReturned = rowdata.filter((eachRowData) => {
        for (let i = 0; i < columnsList.length; i += 1) {
          if (columnsList[i].dataType === 'stringSearchSortElement' && (eachRowData[columnsList[i].id].value.toLowerCase()).includes(searchedQuery.toLowerCase())) {
            return true;
          }
          if (columnsList[i].dataType !== 'stringSearchSortElement' && eachRowData[columnsList[i].id] && (String(eachRowData[columnsList[i].id]).toLowerCase()).includes(searchedQuery.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
    return rowDataToBeReturned;
  };

  const mainData = (searchQuery || searchDate) ? (searcher(rowsData, columnsHeadData, searchQuery, searchDate)) : (rowsData);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, mainData.length - (page * rowsPerPage));
console.log(mainData.length)
  return (
    <div>
      <Paper className="users-table-paper">
        <div className="users-table-label-datepicker-search-wrap">
          <div className="users-table-label">
            {tableLabel}
          </div>
          <Space style={{ display: (!showDatePicker) ? 'none' : 'unset' }} direction="vertical" size={12}>
            <RangePicker
              // showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD"
              onChange={onChangeSearchDate}
              value={searchDate && [searchDate.startDate, searchDate.endDate]}
            />
          </Space>
          <ThemeProvider theme={theme}>
            <TextField
              placeholder="Search"
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
        <TableContainer>
          <Table className="users-table">
            <ColumnsHead
              sortOrder={sortOrder}
              orderBy={orderBy}
              columnsHeadData={columnsHeadData}
              onRequestSort={handleRequestSort}
            >
            </ColumnsHead>
            <TableBody>
              {dataSorter(mainData, getComparator(sortOrder, orderBy))
                .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)
                .map((eachRow) => {
                  // const rowsDataKeyList = Object.keys(eachRow);
                  const rowsDataKeyList = columnsHeadData.map((e) => e.id);
                  const cellArray = rowsDataKeyList.map((data) => {
                    const [cellColumnData] = columnsHeadData.filter((column) => (data === column.id));
                    if (cellColumnData && cellColumnData.dataType === 'stringSearchSortElement') {
                      return (
                        <TableCell className="users-table-row-cell" key={`tabel header row ${data}`} hidden={data === 'key'} align={cellColumnData ? cellColumnData.align : 'left'}>{eachRow[data].content}</TableCell>
                      );
                    }
                    return (
                      <TableCell className="users-table-row-cell" key={`tabel header row ${data}`} hidden={data === 'key'} align={cellColumnData ? cellColumnData.align : 'left'}>{eachRow[data]}</TableCell>
                    );
                  });
                  return (
                    <TableRow
                      hover={false}
                      key={`table row data of ${eachRow.key || eachRow[rowsDataKeyList[0]]}`}
                      onClick={null}
                    >
                      {cellArray}
                    </TableRow>
                  );
                })}
              {!(mainData.length === 0) && emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={columnsHeadData.length} />
                </TableRow>
              )}
              {(mainData.length === 0) && (searchQuery || searchDate) &&
                <TableRow>
                  <TableCell style={{ height: (53) * emptyRows }} colSpan={columnsHeadData.length}>
                    <Result
                      className="custom-table-result"
                      icon={<InboxOutlined />}
                      title="No Data Found!"
                    />
                  </TableCell>
                </TableRow>}
              {(mainData.length === 0) && !(searchQuery || searchDate) &&
                <TableRow>
                  <TableCell style={{ height: (53) * emptyRows }} colSpan={columnsHeadData.length}>
                    {isLoading ?
                      <PageLoader /> :
                      <Result
                        className="custom-table-result"
                        icon={icon || <InboxOutlined />}
                        title={message || 'No Data Found!'}
                      />
                    }
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="w-100 d-flex flex-wrap">
          <div className="w-50 d-flex justify-content-end">
        {tabFlagEnable ?
            <Button className="view-checked-company-reports" onClick={viewCheckedCompanies} disabled={selectItem ? false : true}>View Task</Button>: ''}
          </div>
        <div className="w-50 d-flex justify-content-end">
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={mainData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
        </div>
      </Paper>
    </div>
  );
};

CustomTable.propTypes = {
  tableData: PropTypes.object.isRequired,
  showDatePicker: PropTypes.bool,
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  icon: PropTypes.element,
};

export default CustomTable;

//   tableData: is a Object which should contain rowData, columnsHeadData, tableLabel.
//   Eg: {
//   rowsData: [
//      {
//        taskId: '01', date: 'Tue Jul 13 2021', pillar: { value: 'Envi', content: <div>Envi</div> }, action: <a>Enter</a>,
//      }
//    ],
//   columnsHeadData: [
//     {
//       id: 'taskId', label: 'Task Id', align: 'left', dataType: 'string',
//     },
//     {
//       id: 'date', label: 'Date', align: 'left', dataType: 'date',
//     },
//     {
//       id: 'pillar', label: 'pillar', align: 'left', dataType: 'stringSearchSortElement',
//     },
//     {
//       id: 'action', label: 'Action', align: 'right', dataType: 'element',
//     },
//   ],
//   tableLabel: 'Table Name',
// };
//   showDatePicker: true || false,
//   isLoading: true || false,
//   defaultNoOfRows: 5 || 10 || 20
//   messageAndIcon: is a Object which should contain show, message, icon,
//   Eg: {
//         show: true || false,
//         message: 'Hello',
//         icon: <Smile />,
//       }
