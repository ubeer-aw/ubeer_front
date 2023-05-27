import publicAPI from './Config/publicAxiosConfig';
import privateAPI from './Config/privateAxiosConfig';

export default function BreweryApiService() {

  ///// PUBLIC API (WITHOUT JWT TOKEN)
  const getBrewery = async (page, size) => {
    try {
      const response = await publicAPI.get(`/brewery?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getBreweryById = async (id) => {
    try {
      const response = await publicAPI.get(`/brewery/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  //// PRIVATE API (WITH JWT TOKEN)
  const saveBrewery = async (jsonBrewery) => {
    try {
      const response = await privateAPI.patch(`/brewery?email=${localStorage.getItem('user_email')}`, jsonBrewery);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addBrewery = async (jsonBrewery) => {
    try {
      const response = await privateAPI.post(`/brewery?email=${localStorage.getItem('user_email')}`, jsonBrewery);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBrewery = async (id) => {
    try {
      const response = await privateAPI.delete(`/brewery/${id}?email=${localStorage.getItem('user_email')}`);
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