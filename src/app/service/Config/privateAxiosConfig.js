import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const privateAPI = axios.create({
    baseURL: "https://ubeer-back.kindriver-299921ed.francecentral.azurecontainerapps.io/api/private",
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000
  });
  


export default privateAPI;