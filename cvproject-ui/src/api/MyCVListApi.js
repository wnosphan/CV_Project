import axios from 'axios'
import { properties } from '../configs/properties';

export const myCVListApi = {
    getCV,
    deleteCV,
    deleteCVs,
    fileUpload,
    updateMultipleStatus,
    saveUser
}

function getCV(username, page, limit) {
    return instance.get(`/api/cv/user`, {
        params: {
            page: page,
            limit: limit
        },
        headers: {
            'username': username
        }
    });
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
        }
    })
}

function fileUpload(username, file) {
    return instance.post('api/cv/upload', file, {
        headers: {
            "Content-Type": "multipart/form-data",
            'username': username
        }
    });
}

function updateMultipleStatus(ids) {
    return instance.patch(`/api/cv`, ids, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

function saveUser(username, email) {
    return instance.post(`/api/cv/save-user`, {
        headers: {
            'username': username,
            'email': email
        }
    })
}

// -- Axios
const instance = axios.create({
    baseURL: properties.api.baseUrl
})