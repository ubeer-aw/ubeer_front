import axios from 'axios';


const publicAPI = axios.create({
    baseURL: "http://localhost:8080/api/public",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 10000
  });
  


export default publicAPI;