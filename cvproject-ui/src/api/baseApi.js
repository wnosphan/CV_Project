import axios from 'axios'

import { properties } from '~/configs/properties';
// -- Axios
export const instance = axios.create({
    baseURL: properties.api.baseUrl
})