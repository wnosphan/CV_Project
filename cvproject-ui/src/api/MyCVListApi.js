import { instance } from './baseApi'
import cvListSlice from '~/redux/slices/cvListSlice'
import handleLogError from '~/utils/HandleError'


export const myCVListApi = {
    getCV,
    getCvById,
    createCV,
    deleteCV,
    deleteCVs,
    fileUpload,
    updateMultipleStatus,
    updateCV,
    getUniversity,
    getSkill,
    getPosition
}

// function getCV(username, page, limit, filters, sorter = false) {
//     const queryParams = new URLSearchParams();
//     queryParams.append('page', page);
//     queryParams.append('limit', limit);
//     if (sorter && sorter.sort_by && sorter.sort_type) {
//         queryParams.append('sorter_by', sorter.sort_by);
//         queryParams.append('sorter_type', sorter.sort_type);
//     }
//     console.log(queryParams.toString());
//     return (dispatch) => {
//         dispatch(cvListSlice.actions.fetchDataBegin());
//         return instance.post(`/api/cv/user/${username}?${queryParams.toString()}`, filters, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             validateStatus: (status) => {
//                 return status < 500
//             }
//         }).then((response) => {
//             setTimeout(() => {
//                 dispatch(cvListSlice.actions.fetchDataSuccess(response.data));
//             }, 200);
//         }).catch((error) => {
//             handleLogError(error);
//         });
//     }
// }

function getCV(params) {
    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page);
    queryParams.append('limit', params.limit);
    if (params.sorter && params.sorter.sort_by && params.sorter.sort_type) {
        queryParams.append('sorter_by', params.sorter.sort_by);
        queryParams.append('sorter_type', params.sorter.sort_type);
    }
    console.log(params);
    return (dispatch) => {
        dispatch(cvListSlice.actions.fetchDataBegin());
        return instance.post(`/api/cv/user/${params.username}?${queryParams.toString()}`, params.filters, {
            headers: {
                'Content-Type': 'application/json',
            },
            validateStatus: (status) => {
                return status < 500
            }
        }).then((response) => {
            const pager = { ...params.pagination };
            setTimeout(() => {
                dispatch(cvListSlice.actions.fetchDataSuccess(response.data));
            }, 200);
        }).catch((error) => {
            handleLogError(error);
        });
    }
}

function getCvById(id) {
    return instance.get(`/api/cv/${id}`, {
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function updateCV(username, id, data) {
    return instance.put(`/api/cv/${username}/${id}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function createCV(username, post) {
    return instance.post(`/api/cv/${username}`, post, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

function deleteCV(id) {
    return instance.delete(`/api/cv/${id}`)
}

function deleteCVs(ids) {
    return instance.delete('/api/cv', {
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
            'Content-Type': 'multipart/form-data',
            'username': username
        },
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function updateMultipleStatus(ids) {
    return instance.patch('/api/cv/status', ids, {
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: (status) => {
            return status < 500
        }
    })
}

function getUniversity() {

    return instance.get('/api/cv/list/university', {
        validateStatus: (status) => {
            return status < 500
        }
    });
}
function getSkill() {
    return instance.get('/api/cv/list/skill', {
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function getPosition() {
    return instance.get('/api/cv/list/apply-position', {
        validateStatus: (status) => {
            return status < 500
        }
    });

}

