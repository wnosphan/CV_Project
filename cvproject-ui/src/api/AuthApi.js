import { instance } from './baseApi'


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
