import axios from 'axios'
import { properties } from '../configs/properties';

export const myCVListApi = {
    getCV,
    createCV,
    deleteCV,
    deleteCVs,
    fileUpload,
    updateMultipleStatus,
    saveUser,
    UpdateCV
}

function getCV(username, page, limit) {
    return instance.get(`/api/cv/user`, {
        params: {
            page: page,
            limit: limit
        },
        headers: {
            'username': username
        },
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function UpdateCV(id, data) {
    return instance.get(`/api/cv/${id}`, {
        data: data,
        validateStatus: (status) => {
            return status < 500
        }
    });
}
function createCV(post) {
    return instance.post(`/api/cv`, post, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

function deleteCV(id) {
    return instance.delete(`/api/cv/${id}`)
}

function deleteCVs(ids) {
    return instance.delete(`/api/cv`, {
        data: {
            ids: ids
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        validateStatus: (status) => {
            return status < 500
        }
    })
}

function fileUpload(username, file) {
    return instance.post('api/cv/upload', file, {
        headers: {
            "Content-Type": "multipart/form-data",
            'username': username
        },
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function updateMultipleStatus(ids) {
    return instance.patch(`/api/cv`, ids, {
        headers: {
            "Content-Type": "application/json",
        },
        validateStatus: (status) => {
            return status < 500
        }
    })
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