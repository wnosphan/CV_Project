import axios from 'axios'
import { properties } from '~/configs/properties';

export const AuthApi = {
    saveUser,
}

function saveUser(user) {
    return instance.post('/api/cv/save-user', user, {
        validateStatus: (status) => {
            return status < 500
        }
    })
}
// -- Axios
const instance = axios.create({
    baseURL: properties.api.baseUrl
})