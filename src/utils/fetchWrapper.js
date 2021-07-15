import envConfig from 'envConfig'; //eslint-disable-line

const { baseUrl } = envConfig;
const TIMEOUT = 10000;

/**
* @description function to handle the time out error
* @param  {Promise} promise
* @param  {number} timeout
* @param  {string} error
* @return
*/
function timeoutPromise(promise, timeout, error) {
  return new Promise((resolve, reject) => {
    const clearTimeOut = setTimeout(() => {
      reject(error);
    }, timeout);
    promise.then((data) => {
      clearTimeout(clearTimeOut);
      resolve(data);
    }, (data) => {
      clearTimeout(clearTimeOut);
      reject(data);
    });
  });
}

/** @description Sending a GET request to JSON API.
 * doGet method resolves or rejects the promise that is obtained
 * from the fetchURl method
 * @param {string} url
 * @param {string} urlPrefix
 * @returns {object}
 */
export const doGet = (url, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTI1MTBlMzU2ZDM2NjYwNWIwNDUzMyIsImlhdCI6MTYyNDYzOTQ4NH0.W60O7jay-RA4MVcJ_dswPJ8a_n51iRKiXL87UyxNTLw',
    },
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });
//   return fetchData;
// };

/** @description Sending a POST request.
 * @param {string} url
 * @param {object} body
 * @param {string} urlPrefix
 * @returns {Promise}
 */
export const doPost = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTI1MTBlMzU2ZDM2NjYwNWIwNDUzMyIsImlhdCI6MTYyNDYzOTQ4NH0.W60O7jay-RA4MVcJ_dswPJ8a_n51iRKiXL87UyxNTLw',
    },
    body: JSON.stringify(body),
  }),
), TIMEOUT, 501)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });

/** @description Sending a PUT request.
 * @param {string} url
 * @param {object} body
 * @param {string} urlPrefix
 * @returns {Promise}
 */
export const doPut = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${sessionStorage.access}`,
    },
    body: JSON.stringify(body),
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });

/** @description Sending a DELETE request.
 * @param {string} url
 * @param {object} body
 * @param {string} urlPrefix
 * @returns {Promise}
 */
export const doDelete = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    if (res.ok) {
      response = res.json();
    }
    return response;
  });

/** @description Sending a POST FILE request* */
export const doPostFile = (url, body, urlPrefix = baseUrl) => timeoutPromise(fetch(
  urlPrefix.concat(url),
  Object.assign({}, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${sessionStorage.access}`,
    },
    body,
  }),
), TIMEOUT, 504)
  .then((res) => {
    let response = null;
    response = res.json();
    if (res.ok) {
      return response;
    }
    return response.then((error) => { throw error; });
  });
