import axios from 'axios';

const token = localStorage.getItem('jwtToken');

const privateAPI = axios.create({
    baseURL: "http://localhost:8080/api/private",
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 10000
  });
  


export default privateAPI;