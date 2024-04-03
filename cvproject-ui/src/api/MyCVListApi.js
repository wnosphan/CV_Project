import { instance } from './baseApi'


export const myCVListApi = {
    getCV,
    getCvById,
    createCV,
    deleteCV,
    deleteCVs,
    fileUpload,
    updateMultipleStatus,
    UpdateCV
}

function getCV(username, page, limit, dataIndex, keySearch) {
    return instance.get(`/api/cv/user/${username}`, {
        params: {
            page: page,
            limit: limit,
            [dataIndex]: keySearch,
        },
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function getCvById(id) {
    return instance.get(`/api/cv/${id}`, {
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

// function updateMultipleStatus(ids) {
//     return instance.patch(`/api/cv`, ids, {
//         headers: {
//             "Content-Type": "application/json",
//         },
//         validateStatus: (status) => {
//             return status < 500
//         }
//     })
// }

function updateMultipleStatus(ids) {
    return instance.patch(`/api/cv/status`, ids, {
        headers: {
            "Content-Type": "application/json",
        },
        validateStatus: (status) => {
            return status < 500
        }
    })
}

