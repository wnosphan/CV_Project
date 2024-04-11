import axios from 'axios'

// -- Axios
export const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})