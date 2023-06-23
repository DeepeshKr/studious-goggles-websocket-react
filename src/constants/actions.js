// actions.js

export const fetchDataRequest = payload => ({
    type: 'FETCH_DATA_REQUEST',
    payload,
  });
  
  export const fetchDataSuccess = data => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  });
  
  export const fetchDataFailure = error => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error,
  });
  