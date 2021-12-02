export const getReports = () => ({
  type: 'GET_REPORTS_REQUEST',
});

export const getReportsSuccess = (reports) => ({
  type: 'GET_REPORTS_SUCCESS',
  reports,
});

export const getReportsFailure = (error) => ({
  type: 'GET_REPORTS_FAILURE',
  error,
});

// Future server pagination
// // Pending ReportList
// export const getPendingReportListSuccess = (pendingReportlist) => ({
//   type: 'GET_PENDING_REPORTLIST_SUCCESS',
//   pendingReportlist,
// });

// export const getPendingReportListFailure = (error) => ({
//   type: 'GET_PENDING_REPORTLIST_FAILURE',
//   error,
// });

// // Completed ReportList
// export const getCompletedReportListSuccess = (completedReportlist) => ({
//   type: 'GET_COMPLETED_REPORTLIST_SUCCESS',
//   completedReportlist,
// });

// export const getCompletedReportListFailure = (error) => ({
//   type: 'GET_COMPLETED_REPORTLIST_FAILURE',
//   error,
// });

// // Controversy ReportList
// export const getControversyReportListSuccess = (contorversyReportlist) => ({
//   type: 'GET_CONTROVERSY_REPORTLIST_SUCCESS',
//   contorversyReportlist,
// });

// export const getControversyReportListFailure = (error) => ({
//   type: 'GET_CONTROVERSY_REPORTLIST_FAILURE',
//   error,
// });
