import axios from 'axios'

const api = axios.create({
  baseURL: "http://192.168.1.60:8080",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000
})

const getBrewery = async () => {
  try {
    const response = await api.get('/brewery')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getBreweryById = async (id) => {
    try {
        const response = await api.get(`/brewery/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const saveBrewery = async (jsonBrewery) => {
    try {
        const response = await api.patch(`/brewery`, jsonBrewery)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const addBrewery = async (jsonBrewery) => {
  try {
      const response = await api.post(`/brewery`, jsonBrewery)
      return response.data
  } catch (error) {
      console.error(error)
  }
}

const deleteBrewery = async (id) => {
  try {
      const response = await api.delete(`/brewery/${id}`)
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