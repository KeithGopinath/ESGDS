import * as ESGDS from './../actionTypes/Client';

export function getcClient(clientDetails) {
  return {
    type: ESGDS.CLIENT_REQUEST,
    clientDetails,
  };
}

export function getClientSuccess(client) {
  return {
    type: ESGDS.CLIENT_SUCCESS,
    client,
  };
}

export function getClientFailure(error) {
  return {
    type: ESGDS.CLIENT_FAILURE,
    error,
  };
}
