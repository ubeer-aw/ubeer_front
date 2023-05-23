import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';


const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImxldmY3ejhZbzR1X2JtUk1MWVNlZiJ9.eyJpc3MiOiJodHRwczovL2Rldi1qZmN5Nng2eTM1Z2FjdnlvLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNjQ3NDM2MTQwMjcxOTEwMjYzNyIsImF1ZCI6WyJodHRwczovL2Rldi1qZmN5Nng2eTM1Z2FjdnlvLnVzLmF1dGgwLmNvbS9hcGkvdjIvIiwiaHR0cHM6Ly9kZXYtamZjeTZ4NnkzNWdhY3Z5by51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjg0NzU3NDg1LCJleHAiOjE2ODQ4NDM4ODUsImF6cCI6ImpYR1dSYjU1R0U1cUNoVjhETkFKUE5jUVpMM3hGSWg0Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.jY2SZYsW7pPvqYJ1KhfDNvVO89h4NVPwADvR0Lj8GNKK-dsQp26IN43WcW0IPfAqsZvRBEd6nqHVgVrsrI1gYk7Csqm7eMwsDkCw-9hrU80KZjw_XBROvZsOtK0jV0p2ulAEYu4CK7tD3i7LEedbUM2PYPuzw5TkCfZZuCR6GGLOOTTYO55OUM4NxXgzYEZPxhuI8DfDuxeGHqvELGpnWrL1hc4glYD_rthfhoRVMtl1R15dwpET2yHsrKCiKv8f9uGRJtB4F2a9uPWtB-Idx-ksb0a7gQ5fsswMnJLcPt-jN0eG_eeqyAj3x3GV5_YgeV5nvyI2AH69vbdW6uF9hA'
  },
  timeout: 10000
});

export default function BreweryApiService() {
  
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  
  

  const getBrewery = async () => {
    

    try {
      const response = await api.get('/public/brewery');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getBreweryById = async (id) => {
    try {
      const response = await api.get(`/public/brewery/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const saveBrewery = async (jsonBrewery) => {
    try {
      const response = await api.patch(`/private/brewery`, jsonBrewery);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addBrewery = async (jsonBrewery) => {
    try {
      const response = await api.post(`/private/brewery`, jsonBrewery);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBrewery = async (id) => {
    try {
      const response = await api.delete(`/private/brewery/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getBrewery,
    getBreweryById,
    addBrewery,
    saveBrewery,
    deleteBrewery,
  };
}