import axios from 'axios'
import { properties } from '../configs/properties';

export const myCVListApi = {
    getCV,
    deleteCV,
    deleteCVs,
    fileUpload,
    updateMultipleStatus
}

function getCV(created_id) {
    return instance.get(`/api/cv/user/${created_id}`);
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

function fileUpload(file) {
    return instance.post('/upload', file, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

function updateMultipleStatus(ids) {
    return instance.patch(`/api/cv/`, {
        data: ids
    }, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

// -- Axios
const instance = axios.create({
    baseURL: properties.api.baseUrl
})