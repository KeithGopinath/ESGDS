
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

const SUPER_ADMIN_APPROVAL_DATA = [{
  requestedBy: 'Balaji',
  requestedByEmail: 'balaji@gmail.com',
  requestedFor: 'Praveen',
  requestedForEmail: 'praveen@gmail.com',
  requestedAt: '5-13-2020',
}, {
  requestedBy: 'Praveen',
  requestedByEmail: 'Pk@gmail.com',
  requestedFor: 'Avinash',
  requestedForEmail: 'avinash@gmail.com',
  requestedAt: '5-19-2020',
}];

const APPROVED_USERS_DATA = [{
  name: 'Balaji',
  email: 'balaji@gmail.com',
  role: 'Analyst',
  registeredDate: '5-13-2020',
}];

const PENDING_USERS_DATA = [{
  name: 'Balaji',
  email: 'balaji@gmail.com',
  role: 'Analyst',
  registeredDate: '5-13-2020',
},
{
  name: 'Avinash',
  email: 'avii@gmail.com',
  role: 'Super Admin',
  registeredDate: '5-26-2020',
},
];

export {
  PERSONAL_DETAILS_UPDATE_DATA,
  SUPER_ADMIN_APPROVAL_DATA,
  APPROVED_USERS_DATA,
  PENDING_USERS_DATA,
};
