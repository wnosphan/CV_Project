import { ListApi } from '~/api'
import handleLogError from './HandleError'

const statusFilter = ['PASS', 'NOTPASS', 'INPROGRESS'];

const getUniversityFilter = () => {
    const university = [];
    ListApi.getUniversity()
        .then(response => {

            response.data.map((item) => {
                university.push({
                    text: item,
                    value: item
                })
            })

        })
        .catch(error => {
            handleLogError(error)
        })
    return university;
}


const getSkillFilter = () => {
    const skill = [];
    ListApi.getSkill()
        .then(response => {
            response.data.map((item) => {
                skill.push({
                    text: item,
                    value: item
                })
            })
        })
        .catch(error => {
            handleLogError(error)
        })
    return skill;

}

const getPositionFilter = () => {
    const pos = [];

    ListApi.getPosition()
        .then(response => {
            response.data.map((item) => {
                pos.push({
                    text: item,
                    value: item
                })
            })
        })
        .catch(error => {
            handleLogError(error)
        })
    return pos;

}

export const filterService = {
    getUniversityFilter,
    getSkillFilter,
    getPositionFilter,
    getStatusFilter: () => {
        return statusFilter.map((item) => {
            return {
                text: item,
                value: item
            }
        })
    }
}