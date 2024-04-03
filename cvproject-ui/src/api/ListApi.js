import {instance} from './baseApi'

export const ListApi = {
    getUniversity,
    getSkill,
    getPosition
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
