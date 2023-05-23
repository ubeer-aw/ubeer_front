import publicAPI from './Config/publicAxiosConfig';
import privateAPI from './Config/privateAxiosConfig';


export default function ProductApiService() {

    ///// PUBLIC API (WITHOUT JWT TOKEN)
    const getProductById = async (productId) => {
    try {
        const response = await publicAPI.get(`/product/${productId}`)
        return response
    } catch (error) {
        console.error(error)
    }
    }

    //// PRIVATE API (WITH JWT TOKEN)
    const addProduct = async (jsonProduct, breweryId) => {
        try {
            const response = await privateAPI.post(`/product?breweryId=${breweryId}`, jsonProduct)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const saveProduct = async (jsonProduct, breweryId) => {
    try {
        const response = await privateAPI.patch(`/product?breweryId=${breweryId}`, jsonProduct)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

    const deleteProduct = async (productId) => {
    try {
        const response = await privateAPI.delete(`/product/${productId}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
    }

    return {
        getProductById,
        addProduct,
        saveProduct,
        deleteProduct
    }
}