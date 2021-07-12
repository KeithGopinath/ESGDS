export const matrixMemberPutRequest = () => ({
  type: 'MATRIX_MEMBER_PUT_REQUEST',
});

export const matrixMemberPutSuccess = (matrixMember) => ({
  type: 'MATRIX_MEMBER_PUT_SUCCESS',
  matrixMember,
});

export const matrixMemberPutFailure = (error) => ({
  type: 'MATRIX_MEMBER_PUT_FAILURE',
  error,
});
