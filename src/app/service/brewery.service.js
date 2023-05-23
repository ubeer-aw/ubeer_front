import publicAPI from './Config/publicAxiosConfig';
import privateAPI from './Config/privateAxiosConfig';

export default function BreweryApiService() {


  ///// PUBLIC API (WITHOUT JWT TOKEN)
  const getBrewery = async () => {
    try {
      const response = await publicAPI.get('/brewery');
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
      const response = await privateAPI.patch(`/brewery`, jsonBrewery);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addBrewery = async (jsonBrewery) => {
    try {
      const response = await privateAPI.post(`/brewery`, jsonBrewery);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBrewery = async (id) => {
    try {
      const response = await privateAPI.delete(`/brewery/${id}`);
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