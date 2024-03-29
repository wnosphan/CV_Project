import axios from 'axios'
import { properties } from '~/configs/properties';

export const AuthApi = {
    saveUser,
}

function saveUser(username, email) {
    return instance.post('/api/cv/save-user', {
        headers: {
            'Content-Type': 'application/json',
            'username': username,
            'email': email
        },
        validateStatus: (status) => {
            return status < 500
        }
    })
}
// -- Axios
const instance = axios.create({
    baseURL: properties.api.baseUrl
})