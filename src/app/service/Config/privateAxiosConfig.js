import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const privateAPI = axios.create({
    baseURL: "https://ubeer-back.delightfulwave-c4dff4f3.francecentral.azurecontainerapps.io/api/private",
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000
  });
  


export default privateAPI;