import axios from 'axios'

const api = axios.create({
  baseURL: "http://192.168.1.60:8080",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000
})

const addProduct = async (jsonProduct) => {
    try {
        const response = await api.post(`/product`, jsonProduct)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export {
    addProduct
}