import axios from 'axios'
import { properties } from '../configs/properties';

export const myCVListApi = {
    getCV,
    deleteCV,
    deleteCVs,
    fileUpload
}

function getCV() {
    return instance.get(`/api/cv`);
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
    return axios.post('https://api.escuelajs.co/api/v1/files/upload', file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// -- Axios
const instance = axios.create({
    baseURL: properties.api.baseUrl
})