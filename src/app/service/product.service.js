import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000
})

const getProductById = async (productId) => {
  try {
      const response = await api.get(`/public/product/${productId}`)
      return response
  } catch (error) {
      console.error(error)
  }
}

const addProduct = async (jsonProduct, breweryId) => {
    try {
        const response = await api.post(`/public/product?breweryId=${breweryId}`, jsonProduct)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const saveProduct = async (jsonProduct, breweryId) => {
  try {
      const response = await api.patch(`/private/product?breweryId=${breweryId}`, jsonProduct)
      return response.data
  } catch (error) {
      console.error(error)
  }
}

const deleteProduct = async (productId) => {
  try {
      const response = await api.delete(`/private/product/${productId}`)
      return response.data
  } catch (error) {
      console.error(error)
  }
}

export {
    getProductById,
    addProduct,
    saveProduct,
    deleteProduct
}