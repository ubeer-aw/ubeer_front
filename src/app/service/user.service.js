import privateAPI from './Config/privateAxiosConfig';

export default function UserApiService() {

    //// PRIVATE API (WITH JWT TOKEN)
    const addUser = async (email) => {
        try {
            const response = await privateAPI.post(`/user?email=${email}`)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    return {
        addUser
    }
}