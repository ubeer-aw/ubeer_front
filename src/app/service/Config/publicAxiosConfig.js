import axios from 'axios';


const publicAPI = axios.create({
    baseURL: "https://ubeer-back.kindriver-299921ed.francecentral.azurecontainerapps.io/api/public",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 10000
  });
  


export default publicAPI;