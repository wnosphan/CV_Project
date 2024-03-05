import axios from 'axios'
import { properties } from '../configs/properties';

export const Api = {
    // getToDos,
    // addToDo,
    // deleteToDo,
    // updateToDo,
    hello
}

// function getToDos() {
//     return instance.get('/api/todos')
// }

// function addToDo(addToDoRequest) {
//     return instance.post('/api/todos', addToDoRequest, {
//         headers: { 'Content-type': 'application/json' }
//     })
// }

// function deleteToDo(id) {
//     return instance.delete(`/api/todos/${id}`)
// }

// function updateToDo(id, completed) {
//     return instance.patch(`/api/todos/${id}?completed=${completed}`)
// }

function hello(access_token) {
    return instance.post('/hello', {
        headers: {'Authorization': `Bearer ${access_token}`}
    });
}

// -- Axios

const instance = axios.create({
    baseURL: properties.api.baseUrl,
})