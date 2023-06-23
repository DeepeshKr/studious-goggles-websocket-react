// api.js
import axios from 'axios';

export function fetchDataFromAPI(payload) {
  // Replace the URL with your actual API endpoint
  const url = 'https://api.example.com/data';
  
  // Make the API call using Axios
  return axios.get(url, { params: { payload } })
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.message);
    });
}
