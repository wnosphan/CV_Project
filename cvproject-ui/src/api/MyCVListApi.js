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

function getCV(username, page, limit, obj) {
    return (dispatch) => {
        dispatch(cvListSlice.actions.fetchDataBegin());
        return instance.get(`/api/cv/user/${username}`, {
            params: {
                page: page,
                limit: limit,
            },
            data: obj,
            headers: {
                "Content-Type": "application/json",
            },
            validateStatus: (status) => {
                return status < 500
            }
        }).then((response) => {

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
            "Content-Type": "application/json",
        },
        validateStatus: (status) => {
            return status < 500
        }
    });
}

function createCV(username, post) {
    return instance.post(`/api/cv/${username}`, post, {
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

