import axios from 'axios'
import { properties } from '../configs/properties';

export const myCVListApi = {
    getCV
}

function getCV() {
    return instance.get('/cvs');
}

function deleteCV(id) {
    return instance.delete(`/api/todos/${id}`)
}

// -- Axios
const instance = axios.create({
    baseURL: properties.api.baseUrl
})