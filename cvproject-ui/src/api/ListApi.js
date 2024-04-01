import axios from 'axios'
import { properties } from '~/configs/properties';


export const ListApi = {
    getUniversity,
    getSkill
}

function getUniversity() {
    return instance.get('/api/cv/list/university');
}
function getSkill() {
    return instance.get('/api/cv/list/skill');
}

const instance = axios.create({
    baseURL: properties.api.baseUrl
})