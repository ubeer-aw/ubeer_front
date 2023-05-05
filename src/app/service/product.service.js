import axios from 'axios'

const api = axios.create({
  baseURL: "http://ubeer-back--uf92q9y.icypond-fbdb4d78.francecentral.azurecontainerapps.io/",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000
})

const getProductById = async (productId) => {
  try {
      const response = await api.get(`/product/${productId}`)
      return response
  } catch (error) {
      console.error(error)
  }
}

const addProduct = async (jsonProduct, breweryId) => {
    try {
        const response = await api.post(`/product?breweryId=${breweryId}`, jsonProduct)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

const saveProduct = async (jsonProduct, breweryId) => {
  try {
      const response = await api.patch(`/product?breweryId=${breweryId}`, jsonProduct)
      return response.data
  } catch (error) {
      console.error(error)
  }
}

const deleteProduct = async (productId) => {
  try {
      const response = await api.delete(`/product/${productId}`)
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