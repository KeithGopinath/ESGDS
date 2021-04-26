/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// FUNCTION THAT RETURNS THE PENDING TASK TABLE
const PendingTaskTable = () => {
  const useStyles = makeStyles({
    root: {
      width: '100%',
      margin: '2% 0',
    },
    container: {
      maxHeight: 'none',
    },
  });

  const columns = [
    { id: 'taskId', label: 'Task Id', minWidth: 170 },
    { id: 'pillar', label: 'Pillar', minWidth: 100 },
    { id: 'company', label: 'Company', minWidth: 100 },
    { id: 'year', label: 'Year', minWidth: 100 },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'right',
    },
  ];

  const rows = [
    {
      taskId: '0001', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0002', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0001', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0002', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0001', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0002', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0001', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0002', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0001', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
    },
    {
      taskId: '0002', pillar: 'Environmental', company: 'Reliance Ltd', year: '2018-2019', action: <Link to="/pendingtasks/0001">Enter</Link>,
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

// FUNCTION THAT RETURNS THE PENDING TASK PAGE
const PendingTasks = () => {
  const sideBarRef = useRef();
  const tabs = ['Data Correction', 'Data Verification'];
  const tabsRef = useRef(tabs.map(() => React.createRef()));

  useEffect(() => {
    const defaultTab = tabsRef.current[0].current;
    if (defaultTab) {
      defaultTab.classList.add('active');
    }
  }, []);

  const onClickTabChanger = (event) => {
    tabsRef.current.forEach((element) => {
      const btn = element.current;
      btn.classList.remove('active');
    });
    const { currentTarget } = event;
    currentTarget.classList.add('active');
  };

  return (
    <div className="main">
      <SideMenuBar ref={sideBarRef} />
      <div className="rightsidepane">
        <Header sideBarRef={sideBarRef} />
        <div className="pendingtasks-main" >
          <div className="pendingtasks-label">Pending Tasks</div>
          <div className="task-tabs-wrap">
            {tabs.map((tab, index) => (<div ref={tabsRef.current[index]} onClick={onClickTabChanger} className="task-tabs">{tab}</div>))}
          </div>
          <PendingTaskTable />
        </div>
      </div>
    </div>
  );
};


export default PendingTasks;
