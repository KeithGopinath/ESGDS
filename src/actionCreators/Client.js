import * as CLIENT from './../actionTypes/Client';

export function getcClient(clientDetails) {
  return {
    type: CLIENT.CLIENT_REQUEST,
    clientDetails,
  };
}

export function getClientSuccess(client) {
  return {
    type: CLIENT.CLIENT_SUCCESS,
    client,
  };
}

export function getClientFailure(error) {
  return {
    type: CLIENT.CLIENT_FAILURE,
    error,
  };
}
