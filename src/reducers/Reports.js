const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REPORTS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        reports: false,
      };
    case 'GET_REPORTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        reports: action.reports,
      };
    case 'GET_REPORTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

// Future server pagination
// const initialState = {};

// export const pendingReportlist = (state = initialState, action) => {
//   switch (action.type) {
//     case 'GET_PENDING_REPORTLIST_REQUEST':
//       return {
//         ...state,
//         isLoading: true,
//         error: false,
//         // data: false,
//       };
//     case 'GET_PENDING_REPORTLIST_SUCCESS':
//       return {
//         ...state,
//         isLoading: false,
//         error: false,
//         data: action.pendingReportlist,
//       };
//     case 'GET_PENDING_REPORTLIST_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// };

// export const completedReportlist = (state = initialState, action) => {
//   switch (action.type) {
//     case 'GET_COMPLETED_REPORTLIST_REQUEST':
//       return {
//         ...state,
//         isLoading: true,
//         error: false,
//         // data: false,
//       };
//     case 'GET_COMPLETED_REPORTLIST_SUCCESS':
//       return {
//         ...state,
//         isLoading: false,
//         error: false,
//         data: action.completedReportlist,
//       };
//     case 'GET_COMPLETED_REPORTLIST_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// };

// export const controversyReportlist = (state = initialState, action) => {
//   switch (action.type) {
//     case 'GET_CONTROVERSY_REPORTLIST_REQUEST':
//       return {
//         ...state,
//         isLoading: true,
//         error: false,
//         // data: false,
//       };
//     case 'GET_CONTROVERSY_REPORTLIST_SUCCESS':
//       return {
//         ...state,
//         isLoading: false,
//         error: false,
//         data: action.contorversyReportlist,
//       };
//     case 'GET_CONTROVERSY_REPORTLIST_FAILURE':
//       return {
//         ...state,
//         isLoading: false,
//         error: action.error,
//       };
//     default:
//       return state;
//   }
// };
