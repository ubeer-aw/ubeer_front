import axios from 'axios';


const publicAPI = axios.create({
    baseURL: "https://ubeer-back.delightfulwave-c4dff4f3.francecentral.azurecontainerapps.io/api/public",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 10000
  });
  


export default publicAPI;