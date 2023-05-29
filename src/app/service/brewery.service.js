import publicAPI from './Config/publicAxiosConfig';
import privateAPI from './Config/privateAxiosConfig';

export default function BreweryApiService() {

  ///// PUBLIC API (WITHOUT JWT TOKEN)
  const getBrewery = async (name, checkedList, page, size) => {

    try {
      const response = await publicAPI.get(`/brewery?categories=${checkedList}&name=${name}&page=${page}&size=${size}`);
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

  const getBreweryCategory = async () => {
    try {
      const response = await publicAPI.get(`/brewery/category`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  //// PRIVATE API (WITH JWT TOKEN)
  const saveBrewery = async (checkedList, jsonBrewery) => {
    try {
      const response = await privateAPI.patch(`/brewery?categories=${checkedList}&email=${localStorage.getItem('user_email')}`, jsonBrewery);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const addBrewery = async (checkedList, jsonBrewery) => {
    try {
      const response = await privateAPI.post(`/brewery?categories=${checkedList}&email=${localStorage.getItem('user_email')}`, jsonBrewery);
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
    getBreweryCategory,
    getBrewery,
    getBreweryById,
    addBrewery,
    saveBrewery,
    deleteBrewery,
  };
}