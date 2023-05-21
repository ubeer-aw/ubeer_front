import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000
})

const getBrewery = async () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  try {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      // Utilisez le jeton JWT ici pour les requêtes axios ou effectuez toute autre action nécessaire
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const response = await api.get('/public/brewery')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getBreweryById = async (id) => {
    try {
        const response = await api.get(`/public/brewery/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const saveBrewery = async (jsonBrewery) => {
    try {
        const response = await api.patch(`/private/brewery`, jsonBrewery)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const addBrewery = async (jsonBrewery) => {
  try {
      const response = await api.post(`/private/brewery`, jsonBrewery)
      return response.data
  } catch (error) {
      console.error(error)
  }
}

const deleteBrewery = async (id) => {
  try {
      const response = await api.delete(`/private/brewery/${id}`)
      return response.data
  } catch (error) {
      console.error(error)
  }
}

export {
    getBrewery,
    getBreweryById,
    addBrewery,
    saveBrewery,
    deleteBrewery
}